# Custom Alert System Documentation

## Overview
The HouseIt app now uses a custom alert system that replaces the native iOS `Alert.alert()` with styled components that match the app's design language.

## Components

### CustomAlert.tsx
Main alert component with:
- Animated modal presentation with spring animations
- Type-specific styling (success, error, info)
- Consistent with app design (green theme, rounded corners, shadows)
- Support for custom buttons and callbacks

### AlertProvider.tsx
Context provider for global alert management:
- Wraps the entire app in `_layout.tsx`
- Provides `useAlert()` hook for easy access
- Handles alert state and animations
- Includes fallback to native alerts

## Usage

```tsx
import { useAlert } from '@/components/AlertProvider';

const { showAlert } = useAlert();

// Success alert
showAlert({
  title: 'Success',
  message: 'Account created successfully!',
  type: 'success',
  buttons: [{ text: 'OK', onPress: () => router.push('/') }]
});

// Error alert
showAlert({
  title: 'Error', 
  message: 'Something went wrong',
  type: 'error'
});

// Info alert
showAlert({
  title: 'Info',
  message: 'Please log in to continue',
  type: 'info'
});
```

## Migration Complete

All instances of `Alert.alert()` have been replaced:

### AuthScreen.js
- Account creation success
- Login success  
- Authentication errors

### Provider Screen
- Authentication required warnings
- Cart save errors
- Checkout success confirmation
- General error messages

## Design Specifications

- **Colors**: Success (#2E8B57), Error (#E74C3C), Info (#3498DB)
- **Typography**: Matches existing ThemedText components
- **Animations**: Spring-based entry/exit animations
- **Layout**: Responsive with proper spacing and shadows
- **Icons**: ✓ (success), ✕ (error), ⓘ (info)

## Benefits

1. **Consistent Branding**: Matches HouseIt's green theme
2. **Better UX**: Smooth animations and professional appearance
3. **Maintainable**: Single source of truth for alert styling
4. **Type Safe**: Full TypeScript support
5. **Accessible**: Proper contrast and readable text