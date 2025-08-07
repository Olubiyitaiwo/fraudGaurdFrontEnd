// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// export default function SummaryScreen() {
//   const [showSettings, setShowSettings] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Notifications Summary</Text>

//       {/* Risk Summary Sections */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>📅 Daily</Text>
//         <Text style={styles.summary}>👿 High Risk: 3</Text>
//         <Text style={styles.summary}>⚠️ Medium Risk: 5</Text>
//         <Text style={styles.summary}>✅ Low Risk: 10</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>📈 Weekly</Text>
//         <Text style={styles.summary}>👿 High Risk: 12</Text>
//         <Text style={styles.summary}>⚠️ Medium Risk: 22</Text>
//         <Text style={styles.summary}>✅ Low Risk: 70</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>📊 Monthly</Text>
//         <Text style={styles.summary}>👿 High Risk: 43</Text>
//         <Text style={styles.summary}>⚠️ Medium Risk: 58</Text>
//         <Text style={styles.summary}>✅ Low Risk: 210</Text>
//       </View>

//       {/* Settings Dropdown */}
//       <TouchableOpacity onPress={() => setShowSettings(!showSettings)} style={styles.dropdownButton}>
//         <Text style={styles.dropdownText}>⚙️ Settings {showSettings ? '▲' : '▼'}</Text>
//       </TouchableOpacity>

//       {showSettings && (
//         <View style={styles.settingsBox}>
//           <Text style={styles.option}>• Notifications</Text>
//           <Text style={styles.option}>• Account Info</Text>
//           <Text style={styles.option}>• Help & Support</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, backgroundColor: '#f4f4f4' },
//   title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
//   section: { marginBottom: 30 },
//   sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
//   summary: { fontSize: 18, marginVertical: 3 },

//   // Dropdown styles
//   dropdownButton: {
//     backgroundColor: '#ddd',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   dropdownText: {
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   settingsBox: {
//     marginTop: 15,
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//   },
//   option: {
//     fontSize: 16,
//     paddingVertical: 6,
//   },
// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Dashboard from './dashboard';

export default function SummaryScreen() {
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity onPress={() => router.push('/dashboard')} style={styles.backButton}>
        <Text style={styles.backText}>🔙 Go Back To DashBoard</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Notifications Summary</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Daily</Text>
        <Text style={styles.summary}>👿 High Risk: 3</Text>
        <Text style={styles.summary}>⚠️ Medium Risk: 5</Text>
        <Text style={styles.summary}>✅ Low Risk: 10</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📈 Weekly</Text>
        <Text style={styles.summary}>👿 High Risk: 12</Text>
        <Text style={styles.summary}>⚠️ Medium Risk: 22</Text>
        <Text style={styles.summary}>✅ Low Risk: 70</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Monthly</Text>
        <Text style={styles.summary}>👿 High Risk: 43</Text>
        <Text style={styles.summary}>⚠️ Medium Risk: 58</Text>
        <Text style={styles.summary}>✅ Low Risk: 210</Text>
      </View>

      {/* Settings Dropdown */}
      <TouchableOpacity onPress={() => setShowSettings(!showSettings)} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>⚙️ Settings {showSettings ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showSettings && (
        <View style={styles.settingsBox}>
          <Text style={styles.option}>• Notifications</Text>
          <Text style={styles.option}>• Account Info</Text>
          <Text style={styles.option}>• Help & Support</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#f4f4f4' },
  backButton: { marginBottom: 10 },
  backText: { fontSize: 16, color: '#007bff' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  summary: { fontSize: 18, marginVertical: 3 },
  dropdownButton: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  dropdownText: { fontSize: 18, fontWeight: '500' },
  settingsBox: {
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  option: { fontSize: 16, paddingVertical: 6 },
});
