import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Picker, { DocumentPickerResponse } from 'react-native-document-picker';
import { Ascon } from 'ascon-js';
import { Buffer } from 'buffer';
import RNFetchBlob from 'rn-fetch-blob';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

export default function FileScreen(): React.JSX.Element {
  useKeepAwake();
  const [file, setFile] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<Uint8Array | null>(null);

  async function pickDocument() {
    const document: DocumentPickerResponse = await Picker.pickSingle();
    const fileString = await RNFetchBlob.fs.readFile(document.uri, 'utf8');
    setFile(fileString);
  }

  function executeAsconHashFile() {
    const arquivo = new TextEncoder().encode(file!);
    setResult(Ascon.hash(arquivo));
  }

  function clearFile() {
    setFile(null);
    setResult(null);
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Button title="Select a file" onPress={pickDocument} />

          {!!file && (
            <View>
              <Button onPress={executeAsconHashFile} title="Run" color="blue" />
              <Button onPress={clearFile} title="Clear" color="red" />

            </View>
          )}

          <Text style={styles.text}>
            {result &&
              `Hash Result: ${Buffer.from(
                result.buffer,
                result.byteOffset,
                result.byteLength,
              ).toString('hex')}`}
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
