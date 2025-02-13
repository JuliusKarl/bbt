import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import * as Sentry from "@sentry/react-native";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store/store';
import { decrement, increment } from '@/redux/slices/counterSlice';
import { getCrashlytics, crash, recordError, } from '@react-native-firebase/crashlytics';
import { logEvent, getAnalytics } from '@react-native-firebase/analytics';
import { MD3Theme, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <ScrollView>
      <SafeAreaView>
        <View style={style.row}>
          <Button title="-" onPress={decreaseCounter} />
          <Text>{counter}</Text>
          <Button title="+" onPress={increaseCounter} />
        </View>
        <Button title='Throw a Sentry error' onPress={() => { Sentry.captureException(new Error('First error')) }} />
        <Button title='Throw a JS crash' onPress={throwJSCrash} />
        <Button title='Throw a Fatal Crashlytics crash' onPress={() => { crash(crashlytics) }} />
        <Button title='Throw a Non-Fatal Crashlytics error' onPress={() => recordError(crashlytics, new Error(), `Test Error: ${JSON.stringify(store.getState())}`)} />
        <Button
          title="Log Firebase Analytics Event"
          onPress={async () =>
            await logEvent(analytics, 'home_page_event', { value: JSON.stringify(store.getState()) })
          }
        /></SafeAreaView>
    </ScrollView>
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
  }
});