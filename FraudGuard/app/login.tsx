import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Platform } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const LOGIN_API_URL = 'http://172.16.0.167:8080/api/auth/login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const validate = (): boolean => {
    if (!email.includes('@')) {
      Alert.alert('Invalid email address');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(LOGIN_API_URL, {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        Alert.alert('Login successful', 'Welcome back!');
        router.replace('/dashboard'); // Or your desired screen
      } else {
        Alert.alert('Login failed', response.data.message || 'Unknown error');
      }
    } catch (error: any) {
      console.log('Login error:', error);
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Server error occurred.';
        Alert.alert('Login Failed', msg);
      } else {
        Alert.alert('Unexpected Error', error.message || 'Something went wrong.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8C7D0',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
});

