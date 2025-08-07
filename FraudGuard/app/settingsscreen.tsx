import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>
      <Text style={styles.option}>• Notifications</Text>
      <Text style={styles.option}>• Account Info</Text>
      <Text style={styles.option}>• Help & Support</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  option: { fontSize: 18, marginBottom: 10 },
});
