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
import {useKeepAwake} from '@sayem314/react-native-keep-awake';

export default function HashScreen(): React.JSX.Element {
  useKeepAwake();

  const n = 1000000;
  const [maxTime, setMaxTime] = React.useState<number>(0);
  const [minTime, setMinTime] = React.useState<number>(0);
  const [totalTime, setTotalTime] = React.useState<number | null>(null);
  const [avgTime, setAvgTime] = React.useState<number | null>(null);
  const [finished, setFinished] = React.useState<boolean>(false);

  function executeAsconHash() {
    setFinished(false);
    let min = Number.MAX_VALUE;
    let max = 0;
    let total = 0;

    for (let i = 0; i < n; i++) {
      const message = new TextEncoder().encode('ascon' + i);
      const start = performance.now();
      Ascon.hash(message);
      const end = performance.now();

      const calculatedTime = end - start;

      if (calculatedTime < min) {
        min = calculatedTime;
      }

      if (calculatedTime > max) {
        max = calculatedTime;
      }

      total += calculatedTime;
    }

    setMinTime(min);
    setMaxTime(max);
    setTotalTime(total);
    setAvgTime(total / n);
    setFinished(true);
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Button onPress={executeAsconHash} title="Run" color="red" />
          {finished && (
            <React.Fragment>
              <Text style={styles.text}>
                Execution time (total): {totalTime && `${totalTime} ms`}
              </Text>
              <Text style={styles.text}>
                Maximum time (max): {`${maxTime} ms`}
              </Text>
              <Text style={styles.text}>
                Minimum time (min): {`${minTime} ms`}
              </Text>
              <Text style={styles.text}>
                Execution time (avg): {avgTime && `${avgTime} ms`}
              </Text>
            </React.Fragment>
          )}
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
