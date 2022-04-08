import React, { PureComponent } from 'react'
import {
  colors,
  delay,
  NoBiometryAuthConfig,
  PasscodeResultStatus,
  PasscodeType,
  WithBiometryAuthConfig,
} from '@commons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Image,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'
import * as Keychain from 'react-native-keychain'
import { Passcode, PasscodeProps } from '@screens'
import { Icons } from '@assets'

export interface InputPasscodeProps
  extends Omit<
    PasscodeProps,
    'previousPasscode' | 'keypadType' | 'status' | 'endProcess'
  > {
  maxAttempts: number
  storedPasscode: string
  passcodeAttemptsAsyncStorageName: string
  timePasscodeLockedAsyncStorageName: string
  passcodeKeychainName: string
  passcodeFallback?: boolean
  biometricDisabled: boolean
  lockScreenDisabled: boolean
  passcodeStatusExternal: PasscodeResultStatus

  handleResult: (passcode?: string) => void
  callbackErrorBiometric?: (err: any) => void
  changeInternalStatus: (status: PasscodeResultStatus) => void
  onSuccess?: (passcode: string) => void
  onFailed?: (attempts: number) => void

  styleContainer?: StyleProp<ViewStyle>
}

export interface InputPasscodeState {
  passcodeStatus: PasscodeResultStatus
  locked: boolean
  biometryType: 'faceRecognition' | 'fingerprint' | undefined
}

export class InputPasscode extends PureComponent<
  InputPasscodeProps,
  InputPasscodeState
> {
  keychainResult: string | undefined = undefined

  static defaultProps: Partial<InputPasscodeProps> = {
    passcodeFallback: true,
    styleContainer: null,
  }

  constructor(props: InputPasscodeProps) {
    super(props)
    this.state = {
      passcodeStatus: PasscodeResultStatus.initial,
      locked: false,
      biometryType: undefined,
    }
    this.endProcess = this.endProcess.bind(this)
    this.launchBiometric = this.launchBiometric.bind(this)

    Keychain.getInternetCredentials(this.props.passcodeKeychainName)
      .then(result => {
        this.keychainResult = (result && result.password) || undefined
      })
      .catch(error => {
        console.log('PinCodeEnter: ', error)
      })
  }

  componentDidMount() {
    Keychain.getSupportedBiometryType().then(type => {
      switch (type) {
        case Keychain.BIOMETRY_TYPE.FACE:
        case Keychain.BIOMETRY_TYPE.FACE_ID:
        case Keychain.BIOMETRY_TYPE.IRIS:
          this.setState({ biometryType: 'faceRecognition' })
          break
        case Keychain.BIOMETRY_TYPE.FINGERPRINT:
        case Keychain.BIOMETRY_TYPE.TOUCH_ID:
          this.setState({ biometryType: 'fingerprint' })
          break
        case undefined:
          this.setState({ biometryType: undefined })
          break
      }
      console.log(type)
    })
  }

  componentDidUpdate(prevProps: Readonly<InputPasscodeProps>) {
    if (
      prevProps.passcodeStatusExternal !== this.props.passcodeStatusExternal
    ) {
      this.setState({ passcodeStatus: this.props.passcodeStatusExternal })
    }
  }

  componentWillUnmount() {
    this.setState({
      passcodeStatus: PasscodeResultStatus.initial,
      locked: false,
      biometryType: undefined,
    })
  }

  async endProcess(pinCode?: string) {
    if (this.props.onSuccess) {
      this.props.onSuccess(pinCode as string)
    } else {
      let passcodeValidOverride: any
      if (this.props.handleResult) {
        passcodeValidOverride = await Promise.resolve(
          this.props.handleResult(pinCode),
        )
      }
      this.setState({ passcodeStatus: PasscodeResultStatus.initial })
      this.props.changeInternalStatus(PasscodeResultStatus.initial)

      const passcodeAttemptsStr = await AsyncStorage.getItem(
        this.props.passcodeAttemptsAsyncStorageName,
      )
      let passcodeAttempts = passcodeAttemptsStr ? +passcodeAttemptsStr : 0
      const passcode = this.props.storedPasscode || this.keychainResult
      if (
        passcodeValidOverride !== undefined
          ? passcodeValidOverride
          : passcode === pinCode
      ) {
        this.setState({ passcodeStatus: PasscodeResultStatus.success })
        AsyncStorage.multiRemove([
          this.props.passcodeAttemptsAsyncStorageName,
          this.props.timePasscodeLockedAsyncStorageName,
        ])
        this.props.changeInternalStatus(PasscodeResultStatus.success)
        if (this.props.onSuccess) {
          this.props.onSuccess(passcode as string)
        }
      } else {
        passcodeAttempts++
        if (
          +passcodeAttempts >= this.props.maxAttempts &&
          !this.props.lockScreenDisabled
        ) {
          await AsyncStorage.setItem(
            this.props.timePasscodeLockedAsyncStorageName,
            new Date().toISOString(),
          )
          this.setState({
            locked: true,
            passcodeStatus: PasscodeResultStatus.locked,
          })
          this.props.changeInternalStatus(PasscodeResultStatus.locked)
        } else {
          await AsyncStorage.setItem(
            this.props.passcodeAttemptsAsyncStorageName,
            passcodeAttempts.toString(),
          )
          this.setState({ passcodeStatus: PasscodeResultStatus.failure })
          this.props.changeInternalStatus(PasscodeResultStatus.failure)
        }
        if (this.props.onFailed) {
          await delay(1500)
          this.props.onFailed(passcodeAttempts)
        }
      }
    }
  }

  async launchBiometric() {
    const options =
      this.state.biometryType !== null
        ? WithBiometryAuthConfig
        : NoBiometryAuthConfig

    const data = await Keychain.getInternetCredentials(
      this.props.passcodeKeychainName,
      options,
    )

    try {
      if (typeof data !== 'boolean') {
        this.endProcess(this.props.storedPasscode || this.keychainResult)
      } else if (!data && this.props.callbackErrorBiometric) {
        this.props.callbackErrorBiometric(new Error('Authenticate failed'))
      }
    } catch (e) {
      if (this.props.callbackErrorBiometric) {
        this.props.callbackErrorBiometric(e)
      } else {
        console.log('Biometric error', e)
      }
    }
  }

  renderBottomLeftButton() {
    if (this.props.bottomLeftButton) {
      return this.props.bottomLeftButton
    }
    if (this.props.biometricDisabled || this.state.biometryType === undefined) {
      return undefined
    }
    return (
      <TouchableWithoutFeedback
        onPress={async () => await this.launchBiometric()}>
        {this.state.biometryType === 'fingerprint' ? (
          <Image
            source={Icons.ic_fingerprint}
            style={{
              tintColor: colors.primary,
              height: 35,
              width: 35,
            }}
          />
        ) : (
          <Image
            source={Icons.ic_face}
            style={{
              tintColor: colors.primary,
              height: 35,
              width: 35,
            }}
          />
        )}
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const passcode = this.props.storedPasscode || this.keychainResult

    return (
      <>
        <Passcode
          {...this.props}
          title={this.props.title ?? 'Enter your PIN Code'}
          titleFail={this.props.titleFail ?? 'Incorrect PIN code'}
          subTitle={this.props.subTitle ?? ''}
          subTitleFail={this.props.subTitleFail ?? 'Please try again'}
          type={PasscodeType.input}
          status={this.state.passcodeStatus}
          previousPasscode={passcode}
          bottomLeftButton={this.renderBottomLeftButton()}
          endProcess={this.endProcess}
        />
      </>
    )
  }
}
