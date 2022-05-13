import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Biometry, { Components } from 'react-native-biometry-module'

export const CreatePasscode = () => {
  const [isError, setIsError] = useState(false)
  const [currentPasscode, setCurrentPasscode] = useState('')

  return (
    <View style={styles.container}>
      <Components.Typography title="Creating passcode" isError={isError} />
      <Components.Indicator
        passcodeLength={4}
        isError={isError}
        currentPasscode={currentPasscode}
      />
      <Components.Keypad
        alphabetCharsVisible
        isError={isError}
        disabled={false}
        onEndPasscode={(passcode) => setCurrentPasscode(passcode)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})
