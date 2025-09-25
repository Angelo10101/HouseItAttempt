
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAlert } from '@/components/CustomAlert';

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

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { saveCartItem, clearCart, saveRequest } from '../../../services/firestoreService';

export default function ProviderMenuScreen() {
  const { serviceId, providerId } = useLocalSearchParams();
  const [cart, setCart] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [user, loading, error] = useAuthState(auth);
  const { showAlert } = useAlert();
  
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

  const addToCart = async (service: any) => {
    if (!user || loading) {
      showAlert('Authentication Required', 'Please log in to add items to cart.');
      return;
    }

    if (!user.uid) {
      showAlert('Error', 'User authentication incomplete. Please try logging out and back in.');
      return;
    }

    const existingItem = cart.find(item => item.id === service.id);
    let updatedItem;
    
    if (existingItem) {
      updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      setCart(cart.map(item => 
        item.id === service.id 
          ? updatedItem
          : item
      ));
    } else {
      updatedItem = { ...service, quantity: 1 };
      setCart([...cart, updatedItem]);
    }

    try {
      console.log('Saving cart item for user:', user.uid);
      await saveCartItem(user.uid, updatedItem);
      console.log('Cart item saved successfully');
    } catch (error) {
      console.error('Cart save error:', error);
      showAlert('Error', `Failed to save item to cart: ${error.message}`);
      
      // Revert the cart change on error
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === service.id 
            ? existingItem
            : item
        ));
      } else {
        setCart(cart.filter(item => item.id !== service.id));
      }
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkout = async () => {
    if (cart.length === 0) {
      showAlert('Cart Empty', 'Please select at least one service.');
      return;
    }

    if (!user) {
      showAlert('Authentication Required', 'Please log in to checkout.');
      return;
    }

    try {
      const requestData = {
        items: cart,
        totalAmount: getTotalPrice(),
        providerName: provider.name,
        serviceType: serviceKey,
        providerId: providerKey
      };

      const requestId = await saveRequest(user.uid, requestData);
      await clearCart(user.uid);
      setCart([]);

      showAlert(
        'Booking Confirmed!',
        `Your total is $${getTotalPrice()}. Request ID: ${requestId}. A professional will arrive within the estimated time.`,
        [
          {
            text: 'OK',
            onPress: () => router.push('/')
          }
        ]
      );
    } catch (error) {
      showAlert('Error', 'Failed to process checkout. Please try again.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
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
