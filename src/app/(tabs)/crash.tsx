import { StyleSheet, ScrollView } from 'react-native';

export default function TabTwoScreen() {
  const test: any = {};
  console.log(test.should.crash);


  return (
    <ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
