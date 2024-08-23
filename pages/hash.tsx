import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
} from 'react-native';
import React from 'react';
import {Ascon} from 'ascon-js';

export default function HashScreen(): React.JSX.Element  {
  const n = 1000000;
  const [time, setTime] = React.useState<number | null>(null);

  function executeAsconHash() {
    const message: Uint8Array[] = [];

    for (let i = 0; i < n; i++) {
      message.push(new TextEncoder().encode('ascon' + i));
    }

    const start = performance.now();
    for (let i = 0; i < n; i++) {
      Ascon.hash(message[i]);
    }
    const end = performance.now();

    setTime((end - start) / n);
  }

  return (
    <SafeAreaView >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <Button onPress={executeAsconHash} title="Run" color="red" />
          <Text>Execution time: {time && `${time} ms`}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

