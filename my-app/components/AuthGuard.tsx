
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ActivityIndicator, StyleSheet } from 'react-native';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#2E8B57" />
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!user) {
    router.replace('/login');
    return null;
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
});
