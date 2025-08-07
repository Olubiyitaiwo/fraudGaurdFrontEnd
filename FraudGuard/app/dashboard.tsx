import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

// Backend API endpoint
const API_NOTIFICATION_STATS = 'http://172.16.0.167:8080/api/notifications/stats';
//  const router = useRouter();

// Enum-level badge mapping
const RISK_MAP = {
  FRAUD: {
    label: 'Fraud',
    icon: '👿',
    color: '#f44336',
  },
  WARNING: {
    label: 'Warning',
    icon: '⚠️',
    color: '#ff9800',
  },
  SAFE: {
    label: 'Safe',
    icon: '✅',
    color: '#4caf50',
  },
};

type RiskLevel = keyof typeof RISK_MAP;

type NotificationStats = {
  [key in RiskLevel]: number;
};

// Badge component
const RiskBadge = ({ level, count }: { level: RiskLevel; count: number }) => {
  const { icon, label, color } = RISK_MAP[level];
  return (
    <View style={[styles.riskBadge, { backgroundColor: color }]}>
      <Text style={styles.riskIcon}>{icon}</Text>
      <Text style={styles.riskLabel}>{label}: {count}</Text>
    </View>
  );
};

// Recent activity card
const ActivityCard = ({ image, label, time }: { image: any; label: string; time?: string }) => (
  <View style={styles.activityCard}>
    <TouchableOpacity style={styles.activityItem}>
      <Image source={image} style={styles.activityImage} />
      <View>
        <Text style={styles.activityText}>{label}</Text>
        {time && <Text style={styles.activityTime}>{time}</Text>}
      </View>
    </TouchableOpacity>
  </View>
);

export default function Dashboard() {
  const [isProtected, setIsProtected] = useState(false);
  const [notificationStats, setNotificationStats] = useState<NotificationStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const router = useRouter();

  const toggleProtection = () => setIsProtected((prev) => !prev);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(API_NOTIFICATION_STATS);
        setNotificationStats(response.data);
      } catch (err) {
        console.warn('Failed to fetch stats:', err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Go Back Button */}
        <TouchableOpacity onPress={() => router.push('/login')} style={styles.backButton}>
            <Text style={styles.backText}>🔙 Go Back</Text>
        </TouchableOpacity>

      {/* Protection Switch */}
      <View style={styles.buttonStatus}>
        <Text style={styles.label}>Protection Status</Text>
        <Switch
          value={isProtected}
          onValueChange={toggleProtection}
          thumbColor={isProtected ? '#00C851' : '#f44336'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
        <Text style={styles.status}>{isProtected ? 'Enabled' : 'Disabled'}</Text>
      </View>

      {/* Notification Summary */}
      <Text style={styles.sectionTitle}>Daily Notification Summary</Text>
      {loadingStats ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={styles.riskRow}>
          <RiskBadge level="FRAUD" count={notificationStats?.FRAUD ?? 0} />
          <RiskBadge level="WARNING" count={notificationStats?.WARNING ?? 0} />
          <RiskBadge level="SAFE" count={notificationStats?.SAFE ?? 0} />
        </View>
      )}

      {/* Navigate to Summary
      <TouchableOpacity style={styles.summaryButton} onPress={() => router.push('/summary')}>
        <Text style={styles.summaryButtonText}>View Notification Summary</Text>
      </TouchableOpacity> */}

      {/* Recent Activities */}
      <View style={styles.activitiesSection}>
        <Text style={styles.text}>Recent Activities</Text>
        <ActivityCard
          image={require('../assets/images/guard-image.png')}
          label="Suspicious Transactions"
        />
        <ActivityCard
          image={require('../assets/images/correct-image.avif')}
          label="Transaction Approved"
          time="09:15 AM"
        />
        <ActivityCard
          image={require('../assets/images/wrong-image.png')}
          label="Transaction Denied"
          time="10:05 AM"
        />
        {/* Navigate to Summary */}
      <TouchableOpacity style={styles.summaryButton} onPress={() => router.push('/summary')}>
        <Text style={styles.summaryButtonText}>View Notification Summary</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingBottom: 100,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
  buttonStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  riskRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    marginBottom: 20,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  riskIcon: {
    fontSize: 20,
    marginRight: 8,
    color: '#fff',
  },
  riskLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  summaryButton: {
    backgroundColor: '#110BBD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  activitiesSection: {
    marginTop: 30,
    width: '90%',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityImage: {
    width: 20,
    height: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  activityText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activityTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  backButton: { marginBottom: 10 

  },
  backText: { fontSize: 16, color: '#007bff' 

  },
});
