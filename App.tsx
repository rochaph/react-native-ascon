import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HashScreen from './pages/hash';
import AeadScreen from './pages/aead';
import FileScreen from './pages/file';

const Tab = createBottomTabNavigator();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Hash" component={HashScreen} />
        <Tab.Screen name="Aead" component={AeadScreen} />
        <Tab.Screen name="File" component={FileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
