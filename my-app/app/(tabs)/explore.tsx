
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function ExploreScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      Alert.alert('Sign Out Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#2E8B57', dark: '#1D5B3F' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#FFFFFF"
          name="house.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About HouseIt</ThemedText>
      </ThemedView>

      {user && (
        <ThemedView style={styles.userInfo}>
          <ThemedText>Welcome, {user.displayName || user.email}!</ThemedText>
          <ThemedText>Email: {user.email}</ThemedText>
        </ThemedView>
      )}

      <ThemedText>
        HouseIt connects you with trusted home service professionals in your area. 
        Book services instantly and get quality work done at your convenience.
      </ThemedText>

      <Collapsible title="How it works">
        <ThemedText>
          1. Choose the service you need from our categories
        </ThemedText>
        <ThemedText>
          2. Browse available professionals near you
        </ThemedText>
        <ThemedText>
          3. Select specific services and add them to your cart
        </ThemedText>
        <ThemedText>
          4. Book and confirm your appointment
        </ThemedText>
      </Collapsible>

      <Collapsible title="Available Services">
        <ThemedText>• Electrician services</ThemedText>
        <ThemedText>• Plumbing repairs and installations</ThemedText>
        <ThemedText>• Roofing and exterior work</ThemedText>
        <ThemedText>• Professional painting services</ThemedText>
        <ThemedText>• In-house automotive mechanic</ThemedText>
        <ThemedText>• Home entertainment setup</ThemedText>
        <ThemedText>• Interior design consultation</ThemedText>
      </Collapsible>

      <Collapsible title="Quality Guarantee">
        <ThemedText>
          All service providers on HouseIt are vetted professionals with verified credentials. 
          We guarantee quality work and customer satisfaction.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Pricing">
        <ThemedText>
          Transparent pricing with no hidden fees. See exact costs before booking. 
          Pay securely through the app after service completion.
        </ThemedText>
      </Collapsible>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(46, 139, 87, 0.1)',
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerImage: {
    color: '#FFFFFF',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
