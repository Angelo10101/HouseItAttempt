
import { useLocalSearchParams, router } from 'expo-router';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const providerServices = {
  electrician: {
    1: {
      name: 'Lightning Electric Co.',
      services: [
        { id: 1, name: 'Outlet Installation', price: 45, description: 'Install new electrical outlet' },
        { id: 2, name: 'Light Fixture Installation', price: 65, description: 'Install ceiling or wall light fixtures' },
        { id: 3, name: 'Circuit Breaker Repair', price: 85, description: 'Diagnose and repair circuit breaker issues' },
        { id: 4, name: 'Electrical Panel Upgrade', price: 350, description: 'Upgrade electrical panel for modern needs' },
        { id: 5, name: 'Wiring Inspection', price: 120, description: 'Complete electrical wiring safety inspection' },
      ]
    }
  },
  plumbing: {
    1: {
      name: 'AquaFix Pro',
      services: [
        { id: 1, name: 'Leak Repair', price: 85, description: 'Fix pipe and faucet leaks' },
        { id: 2, name: 'Drain Cleaning', price: 95, description: 'Clear clogged drains and pipes' },
        { id: 3, name: 'Toilet Installation', price: 150, description: 'Install new toilet fixture' },
        { id: 4, name: 'Water Heater Repair', price: 180, description: 'Diagnose and repair water heater issues' },
        { id: 5, name: 'Pipe Replacement', price: 250, description: 'Replace damaged or old pipes' },
      ]
    }
  }
};

export default function ProviderMenuScreen() {
  const { serviceId, providerId } = useLocalSearchParams();
  const [cart, setCart] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  
  const serviceKey = Array.isArray(serviceId) ? serviceId[0] : serviceId;
  const providerKey = Array.isArray(providerId) ? providerId[0] : providerId;
  
  const provider = providerServices[serviceKey as keyof typeof providerServices]?.[parseInt(providerKey)];
  
  if (!provider) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Provider not found</ThemedText>
      </ThemedView>
    );
  }

  const addToCart = (service: any) => {
    const existingItem = cart.find(item => item.id === service.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === service.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Please select at least one service.');
      return;
    }
    
    Alert.alert(
      'Booking Confirmed!',
      `Your total is $${getTotalPrice()}. A professional will arrive within the estimated time.`,
      [
        {
          text: 'OK',
          onPress: () => router.push('/')
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>‹ Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>{provider.name}</ThemedText>
        <ThemedText style={styles.subtitle}>Select services you need</ThemedText>
      </ThemedView>

      <ScrollView style={styles.servicesContainer} showsVerticalScrollIndicator={false}>
        {provider.services.map((service) => (
          <ThemedView key={service.id} style={styles.serviceCard} lightColor = "#FFFFFF">
            <ThemedView style={styles.serviceInfo}>
              <ThemedText type="defaultSemiBold" style={styles.serviceName}>
                {service.name}
              </ThemedText>
              <ThemedText style={styles.serviceDescription}>
                {service.description}
              </ThemedText>
              <ThemedText style={styles.servicePrice}>
                ${service.price}
              </ThemedText>
            </ThemedView>
            
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(service)}
            >
              <ThemedText style={styles.addButtonText}>Add</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ScrollView>

      {cart.length > 0 && (
        <ThemedView style={styles.cartContainer}>
          <ThemedView style={styles.cartHeader}>
            <ThemedText type="defaultSemiBold" style={styles.cartTitle}>
              Cart ({cart.length} items)
            </ThemedText>
            <ThemedText style={styles.cartTotal}>
              Total: ${getTotalPrice()}
            </ThemedText>
          </ThemedView>
          
          <TouchableOpacity style={styles.checkoutButton} onPress={checkout}>
            <ThemedText style={styles.checkoutButtonText}>
              Book Services - ${getTotalPrice()}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
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
  servicesContainer: {
    flex: 1,
    padding: 20,
  },
  serviceCard: {
    backgroundColor: '#f8f9fa',
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
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    marginBottom: 6,
    color: '#2C3E50',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  addButton: {
    backgroundColor: '#2E8B57',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cartContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartTitle: {
    fontSize: 18,
    color: '#2C3E50',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  checkoutButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
