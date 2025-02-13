import { Image, StyleSheet, Button, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import * as Sentry from "@sentry/react-native";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store/store';
import { decrement, increment } from '@/redux/slices/counterSlice';
import { getCrashlytics, crash, recordError, } from '@react-native-firebase/crashlytics';
import { logEvent, getAnalytics } from '@react-native-firebase/analytics';
import { MD3Theme, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme();
  const style = styles(theme);
  const dispatch = useDispatch();

  const crashlytics = getCrashlytics();
  const analytics = getAnalytics();
  const counter = useSelector((state: RootState) => state.counter.value);

  theme.colors

  // Functions
  const increaseCounter = () => {
    dispatch(increment())
  }

  const decreaseCounter = () => {
    dispatch(decrement())
  }

  const throwJSCrash = () => {
    const test: any = {};
    console.log(test.should.crash);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}

        />
      }>
      <ThemedView style={style.row}>
        <Button title="-" onPress={decreaseCounter} />
        <Text>{counter}</Text>
        <Button title="+" onPress={increaseCounter} />
      </ThemedView>
      <Button title='Throw a Sentry error' onPress={() => Sentry.captureException(new Error('First error'))} />
      <Button title='Throw a JS crash' onPress={throwJSCrash} />
      <Button title='Throw a Fatal Crashlytics crash' onPress={() => { crash(crashlytics) }} />
      <Button title='Throw a Non-Fatal Crashlytics error' onPress={() => recordError(crashlytics, new Error(), `Test Error: ${JSON.stringify(store.getState())}`)} />
      <Button
        title="Log Firebase Analytics Event"
        onPress={async () =>
          await logEvent(analytics, 'home_page_event', { value: JSON.stringify(store.getState()) })
        }
      />
    </ParallaxScrollView>
  );
}

const styles = (theme: MD3Theme) => StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary
  }
});