import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Sentry from '@sentry/react-native';
import { store, persistor } from '../redux/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import onStartup from '../config/onStartup';

Sentry.init({
  dsn: 'https://65a10936fdca1657470e34da17e57810@o4508805175902209.ingest.de.sentry.io/4508805178130512',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await onStartup();
      setLoaded(true);
      SplashScreen.hideAsync();
    }

    init();
  }, []);

  if (!loaded) {
    return null;
  }

  // TODO: Auth Boundary
  // TODO: Error Boundary

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
