import { useRef } from 'react'
import { useState } from 'react'
import React from 'react'
import { View } from 'react-native'
import Biometry, {
  Indicator,
  Keypad,
  Typography,
} from 'react-native-biometry-module'

export const ChangePasscode = () => {
  const [isError, setIsError] = useState(false)
  const [currentPasscode, setCurrentPasscode] = useState('')

  return (
    <View>
      {/* <Typography title="Change passcode" isError={isError} /> */}
      <Indicator
        passcodeLength={4}
        isError={isError}
        currentPasscode={currentPasscode}
      />
      <Keypad
        alphabetCharsVisible
        isError={isError}
        disabled={false}
        onInputingPasscode={(passcode) => {
          setCurrentPasscode(passcode)
        }}
        onEndPasscode={(passcode) => setCurrentPasscode(passcode)}
      />
    </View>
  )
}
