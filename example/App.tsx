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
import { CreatePasscode } from '@screens'

const BiometryScreen = Biometry.Screen
const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CreatePasscode" component={CreatePasscode} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
