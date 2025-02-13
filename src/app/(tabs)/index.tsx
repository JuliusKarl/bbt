import { Image, StyleSheet, Button, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import * as Sentry from "@sentry/react-native";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store/store';
import { decrement, increment } from '@/redux/slices/counterSlice';
import { getCrashlytics, crash, recordError, } from '@react-native-firebase/crashlytics';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const style = styles();
  const crashlytics = getCrashlytics();
  const counter = useSelector((state: RootState) => state.counter.value);

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
    </ParallaxScrollView>
  );
}

const styles = () => StyleSheet.create({
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
    alignItems: 'center'
  }
});