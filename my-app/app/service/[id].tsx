
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const serviceProviders = {
  electrician: [
    { id: 1, name: 'Lightning Electric Co.', rating: 4.8, reviews: 142, eta: '30-45 min', price: '$75/hr' },
    { id: 2, name: 'PowerUp Services', rating: 4.6, reviews: 89, eta: '45-60 min', price: '$65/hr' },
    { id: 3, name: 'Bright Spark Electric', rating: 4.9, reviews: 203, eta: '20-35 min', price: '$85/hr' },
  ],
  plumbing: [
    { id: 1, name: 'AquaFix Pro', rating: 4.7, reviews: 156, eta: '25-40 min', price: '$70/hr' },
    { id: 2, name: 'Pipeline Masters', rating: 4.5, reviews: 94, eta: '35-50 min', price: '$60/hr' },
    { id: 3, name: 'Flow Control Services', rating: 4.8, reviews: 178, eta: '30-45 min', price: '$75/hr' },
  ],
  roofing: [
    { id: 1, name: 'TopShield Roofing', rating: 4.9, reviews: 234, eta: '60-90 min', price: '$95/hr' },
    { id: 2, name: 'SkyGuard Services', rating: 4.6, reviews: 112, eta: '45-75 min', price: '$80/hr' },
    { id: 3, name: 'Apex Roofing Co.', rating: 4.7, reviews: 189, eta: '50-80 min', price: '$90/hr' },
  ],
  painting: [
    { id: 1, name: 'ColorCraft Painters', rating: 4.8, reviews: 167, eta: '60-120 min', price: '$45/hr' },
    { id: 2, name: 'Brush & Roll Pro', rating: 4.5, reviews: 98, eta: '90-150 min', price: '$40/hr' },
    { id: 3, name: 'Perfect Finish Paint', rating: 4.9, reviews: 223, eta: '45-90 min', price: '$50/hr' },
  ],
  mechanic: [
    { id: 1, name: 'Mobile Auto Care', rating: 4.7, reviews: 134, eta: '45-75 min', price: '$85/hr' },
    { id: 2, name: 'DriveRight Services', rating: 4.6, reviews: 87, eta: '60-90 min', price: '$75/hr' },
    { id: 3, name: 'OnSite Auto Repair', rating: 4.8, reviews: 156, eta: '30-60 min', price: '$90/hr' },
  ],
  entertainment: [
    { id: 1, name: 'TechSetup Pro', rating: 4.9, reviews: 198, eta: '60-120 min', price: '$100/hr' },
    { id: 2, name: 'MediaInstall Experts', rating: 4.7, reviews: 143, eta: '90-150 min', price: '$85/hr' },
    { id: 3, name: 'HomeTheater Plus', rating: 4.8, reviews: 176, eta: '75-135 min', price: '$95/hr' },
  ],
  interior: [
    { id: 1, name: 'Design & Style Co.', rating: 4.9, reviews: 267, eta: '120-180 min', price: '$120/hr' },
    { id: 2, name: 'Modern Spaces', rating: 4.6, reviews: 134, eta: '90-150 min', price: '$100/hr' },
    { id: 3, name: 'Elite Interiors', rating: 4.8, reviews: 201, eta: '105-165 min', price: '$115/hr' },
  ],
};

const serviceNames = {
  electrician: 'Electricians',
  plumbing: 'Plumbers',
  roofing: 'Roofing Services',
  painting: 'Painters',
  mechanic: 'Auto Mechanics',
  entertainment: 'Home Entertainment',
  interior: 'Interior Designers',
};

export default function ServiceScreen() {
  const { id } = useLocalSearchParams();
  const serviceId = Array.isArray(id) ? id[0] : id;
  const providers = serviceProviders[serviceId as keyof typeof serviceProviders] || [];
  const serviceName = serviceNames[serviceId as keyof typeof serviceNames] || 'Services';

  const selectProvider = (providerId: number) => {
    router.push(`/provider/${serviceId}/${providerId}`);
  };

  return (
    <>
	  <Stack.Screen options={{headerShown: false }} />
			<ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>‹ Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>{serviceName}</ThemedText>
        <ThemedText style={styles.subtitle}>Available near you</ThemedText>
      </ThemedView>

      <ScrollView style={styles.providersContainer} showsVerticalScrollIndicator={false}>
        {providers.map((provider) => (
          <TouchableOpacity
            key={provider.id}
            style={styles.providerCard}
            onPress={() => selectProvider(provider.id)}
          >
            <ThemedView style={styles.providerInfo}>
              <ThemedText type="defaultSemiBold" style={styles.providerName}>
                {provider.name}
              </ThemedText>
              
              <ThemedView style={styles.ratingContainer}>
                <ThemedText style={styles.rating}>⭐ {provider.rating}</ThemedText>
                <ThemedText style={styles.reviews}>({provider.reviews} reviews)</ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.detailsContainer}>
                <ThemedView style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>ETA:</ThemedText>
                  <ThemedText style={styles.detailValue}>{provider.eta}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Rate:</ThemedText>
                  <ThemedText style={styles.detailValue}>{provider.price}</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            
            <ThemedText style={styles.arrow}>›</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2E8B57',
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  title: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    color: '#E8F5E8',
    fontSize: 16,
  },
  providersContainer: {
    flex: 1,
    padding: 20,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  providerInfo: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  providerName: {
    fontSize: 18,
    marginBottom: 8,
    color: '#2C3E50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  rating: {
    fontSize: 14,
    marginRight: 8,
    color: '#F39C12',
  },
  reviews: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  detailLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginRight: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  arrow: {
    fontSize: 24,
    color: '#BDC3C7',
  },
});
