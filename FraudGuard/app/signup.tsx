import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Signup() {
  const { role } = useLocalSearchParams<{ role: 'agent' | 'user' }>();
  const currentRole = role || 'user';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const validate = (): boolean => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    const nameRegex = /^[A-Za-z]+$/;

    if (!trimmedFirstName || !nameRegex.test(trimmedFirstName)) {
      Alert.alert('Invalid first name', 'Only letters are allowed and cannot be empty.');
      return false;
    }

    if (!trimmedLastName || !nameRegex.test(trimmedLastName)) {
      Alert.alert('Invalid last name', 'Only letters are allowed and cannot be empty.');
      return false;
    }

    if (!trimmedEmail.includes('@')) {
      Alert.alert('Invalid email');
      return false;
    }

    if (trimmedPassword.length < 6) {
      Alert.alert('Password must be at least 6 characters');
      return false;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post('http://192.168.43.16:8080/api/auth/register', {
      //const response = await axios.post('http://localhost:8080/api/auth/register', {

        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
        role: currentRole,
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Account created!', 'Welcome to your dashboard.');
        router.replace('/dashboard');
      } else {
        Alert.alert('Signup failed', response.data.message || 'Unknown error');
      }
    } catch (error: any) {
      console.log('Signup error:', error);
      Alert.alert('Signup error', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.roleDisplay}>
        Signing up as: {currentRole === 'agent' ? 'POS Agent' : 'Regular User'}
      </Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
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
    marginBottom: 10,
  },
  roleDisplay: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
});
