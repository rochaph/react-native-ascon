import {SafeAreaView, ScrollView, Text, View, Button} from 'react-native';
import React from 'react';
import Picker, {DocumentPickerResponse} from 'react-native-document-picker';
import {Ascon} from 'ascon-js';
import {Buffer} from 'buffer';
import RNFetchBlob from 'rn-fetch-blob';

export default function FileScreen(): React.JSX.Element {
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

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Button title="Select a file" onPress={pickDocument} />

          {file && (
            <Button onPress={executeAsconHashFile} title="Run" color="blue" />
          )}
          <Text>
            {result &&
              Buffer.from(
                result.buffer,
                result.byteOffset,
                result.byteLength,
              ).toString('hex')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
