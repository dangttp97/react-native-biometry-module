import React, { PureComponent } from 'react'

import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors } from './commons/colors'
import {
  hasPasscode,
  getPasscodeWithBiometryAuthentication,
  changePasscode,
  setNewPasscode,
  getPasscode,
  vibrateDevice,
} from './commons/helpers'
import { InputPasscode } from './screens/InputPasscode/InputPasscode'
import { Locked } from './screens/Locked/Locked'
import { SelectPasscode } from './screens/SelectPasscode/SelectPasscode'
import { ChangePasscode } from './screens/ChangePasscode/ChangePasscode'
import { CountdownTimer } from './components/CountdownTimer/CountdownTimer'
import { Keypad } from './components/Keypad/Keypad'
import { PasscodeIndicator } from './components/PasscodeIndicator/PasscodeIndicator'
import { Typography } from './components/Typography/Typography'
import { Icons } from './assets'

enum PasscodeResult {
  initial = 'initial',
  success = 'success',
  locked = 'locked',
}

interface BiometryProps {
  type: 'select' | 'change' | 'input'
  numberOfAttempts?: number
  lockedTime?: number
  alphabetCharsVisible: boolean
  biometryEnabled: boolean
  passcodeVisible?: boolean
  vibrateOnError?: boolean

  timePasscodeLockedAsyncStorageName?: string
  passcodeKeychainName?: string
  passcodeAttemptsAsyncStorageName?: string
  keypadCharHighlightedColor?: string
  keypadCharNormalColor?: string

  passcodeStatus?: 'initial' | 'success' | 'locked'

  deleteButtonIcon?: JSX.Element
  biometryButtonIcon?: JSX.Element
  lockedButton?: JSX.Element
  lockedPage?: JSX.Element
  bottomLeftButton?: JSX.Element
  deleteButton?: (handler: () => void) => JSX.Element
  keypadButton?: (
    index: number,
    handler: (buttonIndex: string) => void,
  ) => JSX.Element

  onSuccess?: (passcode: string) => void
  onFailed?: (error?: any) => void
  onCancelChangePasscode?: () => void

  passcodeSelectTitle?: string
  passcodeSelectSubtitle?: string
  passcodeSelectErrorTitle?: string
  passcodeSelectErrorSubtitle?: string

  passcodeConfirmTitle?: string
  passcodeConfirmSubtitle?: string
  passcodeConfirmErrorTitle?: string
  passcodeConfirmErrorSubtitle?: string

  passcodeInputTitle?: string
  passcodeInputSubtitle?: string
  passcodeInputErrorTitle?: string
  passcodeInputErrorSubtitle?: string

  lockedTitle?: string
  lockedSubtitle?: (timer: number) => string

  styleLockedContainer?: StyleProp<ViewStyle>
  styleLockedTextContainer?: StyleProp<ViewStyle>
  styleLockedTitle?: StyleProp<TextStyle>
  styleLockedSubtitle?: StyleProp<TextStyle>
  styleLockedTimerContainer?: StyleProp<ViewStyle>
  styleLockedTimerText?: StyleProp<TextStyle>
  styleLockedIconContainer?: StyleProp<ViewStyle>

  stylePasscodeContainer?: StyleProp<ViewStyle>
  stylePasscodeTitle?: StyleProp<TextStyle>
  stylePasscodeSubtitle?: StyleProp<TextStyle>
  stylePasscodeHidden?: StyleProp<ViewStyle>
  stylePasscodeText?: StyleProp<TextStyle>
  styleKeypadAlphabetCharHighlighted?: StyleProp<TextStyle>
  styleKeypadNumberCharHighlighted?: StyleProp<TextStyle>
  styleKeypadAlphabetCharNormal?: StyleProp<TextStyle>
  styleKeypadNumberCharNormal?: StyleProp<TextStyle>
}

interface BiometryState {
  internalPasscodeStatus: PasscodeResult
  passcodeLocked: boolean
}

const passcodeKeychainNameDefault = 'PasscodeKeychainDefault'
const passcodeAttemptsAsyncStorageNameDefault = 'PasscodeAttemptsDefault'
const timePasscodeLockedAsyncStorageNameDefault = 'TimePasscodeLockedDefault'

/**
 * @param {PasscodeType} type {required} - Define type of screen
 * @param {number | undefined} numberOfAttempts - Specify max attempts of try before locked
 * @param {number | undefined} lockedTime - Specify lock time while running out attempts
 * @param {boolean | undefined} alphabetCharsVisible - Specify whether alphabets char display under numeric char
 */
class BuildInLayout extends PureComponent<BiometryProps, BiometryState> {
  static defaultProps: Partial<BiometryProps> = {
    numberOfAttempts: 3,
    lockedTime: 300000,
  }

  constructor(props: BiometryProps) {
    super(props)
    this.state = {
      internalPasscodeStatus: PasscodeResult.initial,
      passcodeLocked: false,
    }
    this.changeInternalStatus = this.changeInternalStatus.bind(this)
  }

  componentDidMount() {
    AsyncStorage.getItem(
      this.props.timePasscodeLockedAsyncStorageName ||
        timePasscodeLockedAsyncStorageNameDefault,
    ).then((value) => {
      if (value !== null) {
        this.setState({
          internalPasscodeStatus: PasscodeResult.locked,
          passcodeLocked: true,
        })
      }
    })
  }

  changeInternalStatus(status: PasscodeResult) {
    if (status === PasscodeResult.initial) {
      this.setState({ passcodeLocked: false })
    }

    this.setState({ internalPasscodeStatus: status })
  }

  renderLockedScreen() {
    return (
      <Locked
        buttonComponent={this.props.lockedButton}
        timeToLock={this.props.lockedTime ?? 300000}
        timePasscodeLockedAsyncStorageName={
          this.props.timePasscodeLockedAsyncStorageName ??
          timePasscodeLockedAsyncStorageNameDefault
        }
        passcodeAttemptsAsyncStorageName={
          this.props.passcodeAttemptsAsyncStorageName ??
          passcodeAttemptsAsyncStorageNameDefault
        }
        changeStatus={(status) => {
          switch (status) {
            case 'initial':
              this.setState({
                internalPasscodeStatus: PasscodeResult.initial,
                passcodeLocked: false,
              })
          }
        }}
        styleContainer={this.props.styleLockedContainer}
        styleTextContainer={this.props.styleLockedTextContainer}
        styleTitle={this.props.styleLockedTitle}
        styleSubtitle={this.props.styleLockedSubtitle}
        styleIconContainer={this.props.styleLockedIconContainer}
        styleTimerText={this.props.styleLockedTimerText}
        styleTimerContainer={this.props.styleLockedTimerContainer}
      />
    )
  }

  render() {
    const { type, passcodeStatus } = this.props

    return (
      <>
        {type === 'change' &&
          !this.state.passcodeLocked &&
          this.state.internalPasscodeStatus !== PasscodeResult.locked && (
            <ChangePasscode
              passcodeKeychainName={
                this.props.passcodeKeychainName ?? passcodeKeychainNameDefault
              }
              onSuccess={this.props.onSuccess}
              onFailed={this.props.onFailed}
              onCancel={this.props.onCancelChangePasscode}
              vibrateOnError={this.props.vibrateOnError}
              styleContainer={this.props.stylePasscodeContainer}
              styleTitle={this.props.stylePasscodeTitle}
              styleSubTitle={this.props.stylePasscodeSubtitle}
              stylePasscodeHidden={this.props.stylePasscodeHidden}
              stylePasscodeText={this.props.stylePasscodeText}
              styleKeypadAlphabetCharHighlighted={
                this.props.styleKeypadAlphabetCharHighlighted
              }
              styleKeypadAlphabetCharNormal={
                this.props.styleKeypadAlphabetCharNormal
              }
              styleKeypadNumberCharHighlighted={
                this.props.styleKeypadNumberCharHighlighted
              }
              styleKeypadNumberCharNormal={
                this.props.styleKeypadNumberCharNormal
              }
            />
          )}
        {type === 'select' &&
          !this.state.passcodeLocked &&
          this.state.internalPasscodeStatus !== PasscodeResult.locked && (
            <SelectPasscode
              selectTitle={this.props.passcodeSelectTitle}
              selectSubtitle={this.props.passcodeSelectSubtitle}
              selectErrorTitle={this.props.passcodeSelectErrorTitle}
              selectErrorSubtitle={this.props.passcodeSelectErrorSubtitle}
              confirmTitle={this.props.passcodeConfirmTitle}
              confirmSubtitle={this.props.passcodeConfirmSubtitle}
              confirmErrorTitle={this.props.passcodeConfirmErrorTitle}
              confirmErrorSubtitle={this.props.passcodeConfirmErrorSubtitle}
              alphabetCharsVisible={this.props.alphabetCharsVisible}
              passcodeVisible={this.props.passcodeVisible}
              onSuccess={this.props.onSuccess}
              biometryEnabled={this.props.biometryEnabled}
              vibrateOnError={this.props.vibrateOnError}
              passcodeKeychainName={
                this.props.passcodeKeychainName ?? passcodeKeychainNameDefault
              }
              styleContainer={this.props.stylePasscodeContainer}
              styleTitle={this.props.stylePasscodeTitle}
              styleSubTitle={this.props.stylePasscodeSubtitle}
              stylePasscodeHidden={this.props.stylePasscodeHidden}
              stylePasscodeText={this.props.stylePasscodeText}
              styleKeypadAlphabetCharHighlighted={
                this.props.styleKeypadAlphabetCharHighlighted
              }
              styleKeypadAlphabetCharNormal={
                this.props.styleKeypadAlphabetCharNormal
              }
              styleKeypadNumberCharHighlighted={
                this.props.styleKeypadNumberCharHighlighted
              }
              styleKeypadNumberCharNormal={
                this.props.styleKeypadNumberCharNormal
              }
            />
          )}
        {type === 'input' &&
          !this.state.passcodeLocked &&
          this.state.internalPasscodeStatus !== PasscodeResult.locked && (
            <InputPasscode
              title={this.props.passcodeInputTitle}
              subTitle={this.props.passcodeInputSubtitle}
              titleFail={this.props.passcodeInputErrorTitle}
              subTitleFail={this.props.passcodeInputErrorSubtitle}
              alphabetCharsVisible={this.props.alphabetCharsVisible}
              biometryEnabled={this.props.biometryEnabled}
              vibrateOnError={this.props.vibrateOnError}
              maxAttempts={this.props.numberOfAttempts}
              onSuccess={this.props.onSuccess}
              callbackErrorBiometric={(error) => {
                if (this.props.onFailed) {
                  this.props.onFailed(error)
                }
              }}
              onFailed={(attempts: number) => {
                if (attempts >= (this.props.numberOfAttempts ?? 3)) {
                  this.setState({ passcodeLocked: true })
                }
                if (this.props.onFailed) {
                  this.props.onFailed(new Error('Passcode not correct'))
                }
              }}
              timePasscodeLockedAsyncStorageName={
                this.props.timePasscodeLockedAsyncStorageName ??
                timePasscodeLockedAsyncStorageNameDefault
              }
              passcodeAttemptsAsyncStorageName={
                this.props.passcodeAttemptsAsyncStorageName ??
                passcodeAttemptsAsyncStorageNameDefault
              }
              passcodeKeychainName={
                this.props.passcodeKeychainName ?? passcodeKeychainNameDefault
              }
              styleContainer={this.props.stylePasscodeContainer}
              styleTitle={this.props.stylePasscodeTitle}
              styleSubTitle={this.props.stylePasscodeSubtitle}
              stylePasscodeHidden={this.props.stylePasscodeHidden}
              stylePasscodeText={this.props.stylePasscodeText}
              styleKeypadAlphabetCharHighlighted={
                this.props.styleKeypadAlphabetCharHighlighted
              }
              styleKeypadAlphabetCharNormal={
                this.props.styleKeypadAlphabetCharNormal
              }
              styleKeypadNumberCharHighlighted={
                this.props.styleKeypadNumberCharHighlighted
              }
              styleKeypadNumberCharNormal={
                this.props.styleKeypadNumberCharNormal
              }
            />
          )}

        {(passcodeStatus === PasscodeResult.locked ||
          this.state.internalPasscodeStatus === PasscodeResult.locked ||
          this.state.passcodeLocked) &&
          (this.props.lockedPage
            ? this.props.lockedPage
            : this.renderLockedScreen())}
      </>
    )
  }
}

const hasUserSetPasscode = (keychainName?: string) => {
  return hasPasscode(keychainName || passcodeKeychainNameDefault)
}

const setPasscode = (newPasscode: string, keychainName?: string) => {
  return setNewPasscode(
    keychainName || passcodeKeychainNameDefault,
    newPasscode,
  )
}

const changePreviousPasscode = (
  oldPasscode: string,
  newPasscode: string,
  keychainName?: string,
) => {
  return changePasscode(
    keychainName || passcodeKeychainNameDefault,
    oldPasscode,
    newPasscode,
  )
}

const getPasscodeByBiometric = (keychainName?: string) => {
  return getPasscodeWithBiometryAuthentication(
    keychainName || passcodeKeychainNameDefault,
  )
}

const getPasscodeDefault = (keychainName?: string) => {
  return getPasscode(keychainName || passcodeKeychainNameDefault)
}

const vibrate = () => {
  vibrateDevice()
}

// MARK: Export section
const Helpers = {
  changePasscode,
  changePreviousPasscode,
  defaultKeychainName: passcodeKeychainNameDefault,
  defaultLockedTimeAsyncStorageName: timePasscodeLockedAsyncStorageNameDefault,
  defaultPasscodeAttemptsAsyncStorageName:
    passcodeAttemptsAsyncStorageNameDefault,
  getPasscodeByBiometric,
  getPasscodeDefault,
  hasUserSetPasscode,
  setPasscode,
  vibrate,
}

const Components = {
  CountdownTimer: CountdownTimer,
  Keypad: Keypad,
  Icons: Icons,
  Typography: Typography,
  Indicator: PasscodeIndicator,
}

const Biometry = BuildInLayout
// export default Biometry
export { Biometry as default, colors as Colors, Components, Helpers }
