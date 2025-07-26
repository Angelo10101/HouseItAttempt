// AuthScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  const handleSubmit = async () => {
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Signed up!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View>
      <Text>{mode === 'signup' ? 'Sign Up' : 'Login'}</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={mode === 'signup' ? "Sign Up" : "Login"} onPress={handleSubmit} />
      <Button title={`Switch to ${mode === 'signup' ? 'Login' : 'Sign Up'}`} onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')} />
    </View>
  );
}

