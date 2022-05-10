/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react'
import { View } from 'react-native'
import Biometry from 'react-native-biometry-module'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreatePasscode, LockedScreen } from './src/screens'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreatePasscode">
        <Stack.Screen name="CreatePasscode" component={CreatePasscode} />
        <Stack.Screen name="LockedScreen" component={LockedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  // return <CreatePasscode />
}

export default App
