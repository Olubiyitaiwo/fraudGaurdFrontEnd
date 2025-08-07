import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';

const API_URL = 'http://172.16.0.167:8080/api/auth/register';

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

  const mapRoleToEnum = (role: string): 'AGENT' | 'REGULAR_USER' => {
    return role === 'agent' ? 'AGENT' : 'REGULAR_USER';
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(API_URL, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
        role: mapRoleToEnum(currentRole),
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Account created!', 'Welcome to your dashboard.');
        router.replace('/dashboard');
      } else {
        Alert.alert('Signup failed', response.data.message || 'Unknown error');
      }
    } catch (error: any) {
      console.log('Signup error:', error);

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        if (Array.isArray(responseData?.errors)) {
          Alert.alert('Signup Error', responseData.errors.join('\n'));
        } else {
          const message =
            responseData?.message ||
            responseData?.error ||
            JSON.stringify(responseData) ||
            'Unknown server error';
          Alert.alert('Signup Error', message);
        }

        console.warn('Server responded with:', responseData);
      } else {
        Alert.alert('Unexpected Error', error.message || 'Something went wrong.');
      }
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
    backgroundColor: '#C8C7D0',
    justifyContent: 'center',
    padding: 20,
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
