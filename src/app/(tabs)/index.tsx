import { Image, StyleSheet, Platform, Button, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import * as Sentry from "@sentry/react-native";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { decrement, increment } from '@/redux/slices/counterSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const style = styles();
  const counter = useSelector((state: RootState) => state.counter.value);

  const increaseCounter = () => {
    dispatch(increment())
  }

  const decreaseCounter = () => {
    dispatch(decrement())
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
   
        />
      }>
      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
      <ThemedView style={style.row}>
        <Button title="-" onPress={decreaseCounter}/>
          <Text>{counter}</Text>
        <Button title="+" onPress={increaseCounter}/>
      </ThemedView>
      <Button title='Throw a Sentry error' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
    </ParallaxScrollView>
  );
}

const styles = () => StyleSheet.create({
  // titleContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 8,
  // },
  // stepContainer: {
  //   gap: 8,
  //   marginBottom: 8,
  // },
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
    alignItems:'center'
  }
});
