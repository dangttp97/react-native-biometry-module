import React from 'react'
import { useState } from 'react'
import { View } from 'react-native'
import Biometry from 'react-native-biometry-module'

const BiometryComponents = Biometry.BuildInComponents

export const CreatePasscode = () => {
  const passcodeLength = 4
  const [passcode, setPasscode] = useState('')

  return (
    <>
      <BiometryComponents.Indicator
        passcodeLength={passcodeLength}
        currentPasscode={passcode}
        highlightColor={BiometryComponents.Colors.primary}
        normalColor={BiometryComponents.Colors.description}
      />
      <BiometryComponents.Keypad
        alphabetCharsVisible
        isError={false}
        disabled={false}
        onEndPasscode={(passcode: string) => setPasscode(passcode)}
      />
    </>
  )
}
