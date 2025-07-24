import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const validate = (): boolean => {
    if (!email.includes('@')) {
      Alert.alert('Invalid email');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post('https://your-api.com/api/signup', {
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Account created!', 'You can now log in.');
        router.replace('/login'); // Navigate to login
      } else {
        Alert.alert('Signup failed', response.data.message || 'Unknown error');
      }
    } catch (error: any) {
      Alert.alert('Signup error', error.response?.data?.message || error.message);
    }
  };

  return (
    <Link href="/dashboard" asChild>
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});
