import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Ascon} from 'ascon-js';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

export default function HashScreen(): React.JSX.Element {
  useKeepAwake();
  const n = 1000000;
  const [totalTime, setTotalTime] = React.useState<number | null>(null);
  const [avgTime, setAvgTime] = React.useState<number | null>(null);

  function executeAsconHash() {
    let time = 0;
    for (let i = 0; i < n; i++) {
      const message = new TextEncoder().encode('ascon' + i);
      const start = performance.now();
      Ascon.hash(message);
      const end = performance.now();
      time += end - start;
    }
    setTotalTime(time);
    setAvgTime(time / n);
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Button onPress={executeAsconHash} title="Run" color="red" />
          <Text style={styles.text}>
            Execution time (total): {totalTime && `${totalTime} ms`}
          </Text>
          <Text style={styles.text}>
            Execution time (avg): {avgTime && `${avgTime} ms`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  text: {
    marginTop: 25,
    color: 'black',
  },
});
