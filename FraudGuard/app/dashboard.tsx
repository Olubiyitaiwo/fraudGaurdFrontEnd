import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const ActivityCard = ({
  image,
  label,
  time,
}: {
  image: any;
  label: string;
  time?: string;
}) => (
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

export default function Dashboard(): React.JSX.Element {
  const [isProtected, setIsProtected] = useState(false);
  const toggleProtection = () => setIsProtected((prev) => !prev);

  const [transactionTime, setTransactionTime] = useState<string>('07:45 AM');
  const [flaggedTime, setFlaggedTime] = useState<string>('08:23 AM');
  const [approvedTime, setApprovedTime] = useState<string>('09:15 AM');
  const [deniedTime, setDeniedTime] = useState<string>('10:05 AM');

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Transaction Today</Text>
          <Text style={styles.timeStamp}>{transactionTime}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Flagged Transactions</Text>
          <Text style={styles.timeStamp}>{flaggedTime}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activitiesSection}>
        <Text style={styles.text}>Recent Activities</Text>

        <ActivityCard
          image={require('../assets/images/guard-image.png')}
          label="Suspicious Transactions"
        />
        <ActivityCard
          image={require('../assets/images/correct-image.avif')}
          label="Transaction Approved"
          time={approvedTime}
        />
        <ActivityCard
          image={require('../assets/images/wrong-image.png')}
          label="Transaction Denied"
          time={deniedTime}
        />
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
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#00C851',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  activitiesSection: {
    marginTop: 30,
    width: '90%',
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
  timeStamp: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  activityTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
});
