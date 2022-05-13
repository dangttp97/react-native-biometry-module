/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChangePasscode, CreatePasscode } from './src/screens'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CreatePasscode" component={CreatePasscode} />
        <Stack.Screen name="ChangePasscode" component={ChangePasscode} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
