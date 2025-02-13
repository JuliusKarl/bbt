import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { store, persistor } from '../redux/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import onStartup from '../config/onStartup';
import { PaperProvider } from 'react-native-paper';
import ThemeProvider from '../providers/ThemeProvider';

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    const init = async () => {
      await onStartup();
      SplashScreen.hideAsync();
    }

    init();
  }, []);

  // TODO: Auth Boundary
  // TODO: Error Boundary

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <ThemeProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
