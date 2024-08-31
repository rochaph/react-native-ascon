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
import crypto from 'crypto';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

export default function HashScreen(): React.JSX.Element {
  useKeepAwake();
  const n = 1000000;
  const [totalTime, setTotalTime] = React.useState<number | null>(null);
  const [avgTime, setAvgTime] = React.useState<number | null>(null);

  function executeAeadHash() {
    let time = 0;

    for (let i = 0; i < n; i++) {
      const key = crypto.randomBytes(16);
      const nonce = crypto.randomBytes(16);
      const plaintext = new TextEncoder().encode('ascon');
      const associatedData = new TextEncoder().encode('associated');

      const start = performance.now();
      Ascon.encrypt(key, nonce, plaintext, {
        associatedData,
      });
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
          <Button onPress={executeAeadHash} title="Run" color="blue" />
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
