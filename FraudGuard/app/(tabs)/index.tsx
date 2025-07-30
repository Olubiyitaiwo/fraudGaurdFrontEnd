// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Image } from 'expo-image';
// import { Link } from 'expo-router';

// export default function WelcomeScreen() {
//   return (
//     <View style={styles.titleContainer}>
//       <Image
//         source={require('../../assets/images/pos-secure-image.jpeg')}
//         style={styles.reactLogo}
//       />

//       <Text style={styles.title}>FraudGuard</Text>

//       <Text style={styles.subtitle}>Your smart alert companion.</Text>
//       <Text style={styles.subtitle}>
//         Stay ahead of fraud with real-time transaction monitoring,
//       </Text>
//       <Text style={styles.subtitle}>
//         instant alerts, and quick response tools — whether you're at the terminal or on the go.
//       </Text>

//       <Text style={styles.getStarted}>Get Started</Text>

//       <View style={styles.buttonRow}>
//         <Link href="/signup" asChild>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>POS Agent</Text>
//           </TouchableOpacity>
//         </Link>

//         <Link href="/signup" asChild>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Regular User</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#110BBD',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 28,
//     color: '#fff',
//     marginVertical: 20,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 4,
//   },
//   getStarted: {
//     fontSize: 18,
//     color: '#fff',
//     marginVertical: 20,
//     fontWeight: '600',
//   },
//   reactLogo: {
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: '#110BBD',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <Image
        source={require('../../assets/images/pos-secure-image.jpeg')}
        style={styles.reactLogo}
      />

      <Text style={styles.title}>FraudGuard</Text>

      <Text style={styles.subtitle}>Your smart alert companion.</Text>
      <Text style={styles.subtitle}>
        Stay ahead of fraud with real-time transaction monitoring,
      </Text>
      <Text style={styles.subtitle}>
        instant alerts, and quick response tools — whether you're at the terminal or on the go.
      </Text>

      <Text style={styles.getStarted}>Get Started</Text>

      <View style={styles.buttonRow}>
        <Link
          href={{ pathname: '/signup', params: { role: 'agent' } }}
          asChild
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>POS Agent</Text>
          </TouchableOpacity>
        </Link>

        <Link
          href={{ pathname: '/signup', params: { role: 'user' } }}
          asChild
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Regular User</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#110BBD',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  getStarted: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 20,
    fontWeight: '600',
  },
  reactLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#110BBD',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
