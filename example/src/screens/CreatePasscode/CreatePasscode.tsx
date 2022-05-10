import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Biometry, {
  Indicator,
  Keypad,
  Colors,
  Typography,
} from 'react-native-biometry-module'

export const CreatePasscode = () => {
  const passcodeLength = 4
  const [passcode, setPasscode] = useState('')

  return (
    <View style={styles.container}>
      <Typography
        title="Enter passcode"
        showError={false}
        styleContainer={{ width: '100%' }}
        styleTitle={styles.title}
      />
      {/* <Indicator
        passcodeLength={passcodeLength}
        currentPasscode={passcode}
        highlightColor={Colors.primary}
        normalColor={Colors.description}
      />
      <Keypad
        alphabetCharsVisible
        isError={false}
        disabled={false}
        onEndPasscode={(passcode: string) => setPasscode(passcode)}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.title,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.description,
    marginBottom: 'auto',
  },
})
