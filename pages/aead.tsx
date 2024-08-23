import {SafeAreaView, ScrollView, Text, View, Button} from 'react-native';
import React from 'react';
import {Ascon} from 'ascon-js';
import crypto from 'crypto';

export default function HashScreen(): React.JSX.Element {
  const n = 1000000;
  const [time, setTime] = React.useState<number | null>(null);

  function executeAeadHash() {
    const key: Uint8Array[] = [];
    const nonce: Uint8Array[] = [];
    const plaintext: Uint8Array[] = [];
    const associatedData: Uint8Array[] = [];

    for (let i = 0; i < n; i++) {
      key.push(crypto.randomBytes(16));
      nonce.push(crypto.randomBytes(16));
      plaintext.push(new TextEncoder().encode('ascon'));
      associatedData.push(new TextEncoder().encode('associated'));
    }

    const start = performance.now();
    for (let i = 0; i < n; i++) {
      Ascon.encrypt(key[i], nonce[i], plaintext[i], {
        associatedData: associatedData[i],
      });
    }
    const end = performance.now();

    setTime((end - start) / n);
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Button onPress={executeAeadHash} title="Run" color="blue" />
          <Text>Execution time: {time && `${time} ms`}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
