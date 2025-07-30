import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        //POST http://localhost:8080/api/auth/register
        //POST http://localhost:8080/api/auth/login

        email,
        password,
      });

      if (response.status === 200) {
        router.replace('/'); // Navigate to Home
      } else {
        Alert.alert('Login failed', response.data.message || 'Unknown error');
      }
    } catch (error: any) {
      Alert.alert('Login error', error.response?.data?.message || error.message);
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

