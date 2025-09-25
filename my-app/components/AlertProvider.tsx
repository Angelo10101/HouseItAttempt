import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CustomAlert, AlertButton } from './CustomAlert';

interface AlertOptions {
  title: string;
  message?: string;
  buttons?: AlertButton[];
  type?: 'success' | 'error' | 'info';
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (options: AlertOptions) => {
    setAlertOptions(options);
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
    // Clear options after animation completes
    setTimeout(() => {
      setAlertOptions(null);
    }, 200);
  };

  const contextValue = { showAlert, hideAlert };

  // Set global context for utility function
  React.useEffect(() => {
    setGlobalAlertContext(contextValue);
  }, []);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {alertOptions && (
        <CustomAlert
          visible={visible}
          title={alertOptions.title}
          message={alertOptions.message}
          buttons={alertOptions.buttons}
          type={alertOptions.type}
          onDismiss={hideAlert}
        />
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}

// Utility function to replace Alert.alert with custom alert
export function showCustomAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  type?: 'success' | 'error' | 'info'
) {
  // This will be set by the AlertProvider when it's available
  if (globalAlertContext) {
    globalAlertContext.showAlert({ title, message, buttons, type });
  } else {
    // Fallback to native alert if context not available
    console.warn('AlertProvider not found, falling back to native Alert');
    const { Alert } = require('react-native');
    Alert.alert(title, message, buttons);
  }
}

// Global reference for the alert context (set by AlertProvider)
let globalAlertContext: AlertContextType | null = null;

export function setGlobalAlertContext(context: AlertContextType) {
  globalAlertContext = context;
}