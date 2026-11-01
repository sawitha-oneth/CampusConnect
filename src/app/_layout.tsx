import { useEffect, useRef } from 'react';
import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';
import { StatusBar } from 'expo-status-bar';
import { AppState, Alert } from 'react-native';

export default function RootLayout() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        // මෙතන 'as string' කියලා දැම්මා TypeScript එකට තේරෙන්න
        (appState.current as string).match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        Alert.alert(
          "Welcome Back! 👋", 
          "You have returned to Campus Connect. Don't forget to check your saved events!"
        );
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="event/[id]" 
          options={{ 
            title: 'Event Details',
            headerBackTitle: 'Back',
            headerTintColor: '#1E293B',
            headerStyle: { backgroundColor: '#F8FAFC' }
          }} 
        />
      </Stack>
    </AppProvider>
  );
}