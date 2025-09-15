import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';



const services = [
  { id: 'electrician', name: 'Electrician', icon: '⚡', color: '#FF6B35' },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧', color: '#4ECDC4' },
  { id: 'roofing', name: 'Roofing', icon: '🏠', color: '#45B7D1' },
  { id: 'painting', name: 'Painter', icon: '🎨', color: '#96CEB4' },
  { id: 'mechanic', name: 'In-House Mechanic', icon: '🚗', color: '#FECA57' },
  { id: 'entertainment', name: 'Home Entertainment', icon: '📺', color: '#FF9FF3' },
  { id: 'interior', name: 'Interior Design', icon: '🛋️', color: '#A8E6CF' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigateToService = (serviceId: string) => {
    router.push(`/service/${serviceId}`);
  };

  return (
  <ParallaxScrollView
    headerBackgroundColor={{ light: '#2E8B57', dark: '#1D5B3F' }}
    headerImage={
      <ThemedView
        style={[
          styles.headerContainer,
          {
            paddingTop: insets.top + 24, // ensures space for notch + extra breathing room
            height: 120,                // set a good min height for header
          },
        ]}
      >
        <ThemedText style={styles.headerTitle}>HouseIt</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Home Services at Your Fingertips</ThemedText>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/auth')}
        >
          <ThemedText style={styles.loginButtonText}>Login</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    }
  >
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>What service do you need?</ThemedText>

      <ScrollView style={styles.servicesContainer} showsVerticalScrollIndicator={false}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => navigateToService(service.id)}
          >
            <ThemedView style={[styles.serviceCard, { borderLeftColor: service.color }]}>
              <ThemedView style={styles.serviceContent}>
                <ThemedText style={styles.serviceIcon}>{service.icon}</ThemedText>
                <ThemedView style={styles.serviceInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.serviceName}>
                    {service.name}
                  </ThemedText>
                  <ThemedText style={styles.serviceDescription}>
                    Professional {service.name.toLowerCase()} services
                  </ThemedText>
                </ThemedView>
                <ThemedText style={styles.arrow}>›</ThemedText>
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  </ParallaxScrollView>
);
}

const styles = StyleSheet.create({
  headerContainer: {
	// flex: 1, // REMOVE THIS LINE
	  minHeight: 180, // or whatever fits nicely, try 180-220
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'transparent',
	  paddingBottom: 10,
	},
  headerTitle: {
    fontSize: 48,
    lineHeight: 58, // <-- add this line! (try 1.2x font size)
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F5E8',
    textAlign: 'center',
    marginTop: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  servicesContainer: {
    flex: 1,
  },
  serviceCard: {
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  serviceIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  arrow: {
    fontSize: 24,
    opacity: 0.5,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
