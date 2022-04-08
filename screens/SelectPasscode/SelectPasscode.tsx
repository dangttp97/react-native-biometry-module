import { PasscodeProps, Passcode } from '@screens'
import {
  delay,
  NoBiometryAuthConfig,
  PasscodeType,
  WithBiometryAuthConfig,
} from '@commons'
import React, { PureComponent } from 'react'
import { StyleProp, ViewProps } from 'react-native'
import * as Keychain from 'react-native-keychain'

export interface SelectPasscodeProps extends Omit<PasscodeProps, 'endProcess'> {
  passcodeKeychainName: string

  onCancel?: () => void
  storedPasscode?: (passcode: string) => void
  onSuccess?: (passcode: string) => void

  styleContainer?: StyleProp<ViewProps>
}

interface SelectPasscodeState {
  type: PasscodeType
  passcode: string
  errorShown: boolean
}

export class SelectPasscode extends PureComponent<
  SelectPasscodeProps,
  SelectPasscodeState
> {
  static defaultProps: Partial<SelectPasscodeProps> = {
    styleContainer: undefined,
  }

  constructor(props: SelectPasscodeProps) {
    super(props)
    this.state = { type: PasscodeType.select, passcode: '', errorShown: false }
    this.endProcessConfirmPasscode = this.endProcessConfirmPasscode.bind(this)
    this.endProcessSelectPasscode = this.endProcessSelectPasscode.bind(this)
  }

  endProcessSelectPasscode(passcode: string, isErrorValidation?: boolean) {
    this.setState({
      passcode: isErrorValidation ? '' : passcode,
      type: isErrorValidation ? PasscodeType.select : PasscodeType.confirm,
    })
  }

  async endProcessConfirmPasscode(passcode: string) {
    if (this.state.passcode === passcode) {
      if (this.props.storedPasscode) {
        this.props.storedPasscode(passcode)
      } else {
        console.log('Save passcode')
        const biometrySupported =
          (await Keychain.getSupportedBiometryType()) !== null
        await Keychain.setInternetCredentials(
          this.props.passcodeKeychainName,
          this.props.passcodeKeychainName,
          passcode,
          biometrySupported ? WithBiometryAuthConfig : NoBiometryAuthConfig,
        )
      }
      if (this.props.onSuccess) {
        this.props.onSuccess(passcode)
      }
    } else {
      this.setState({ type: PasscodeType.confirm, errorShown: true })
      await delay(2000)
      this.setState({ errorShown: false })
    }
  }

  cancelConfirm() {
    if (this.props.onCancel) {
      this.props.onCancel()
    }
    this.setState({ type: PasscodeType.select })
  }

  render() {
    return (
      <>
        {this.state.type === PasscodeType.select && (
          <Passcode
            {...this.props}
            endProcess={this.endProcessSelectPasscode}
            type={PasscodeType.select}
            title={this.props.title ?? '1 - Enter a PIN Code'}
            subTitle={this.props.subTitle ?? 'To keep your information secure'}
            subTitleFail={this.props.subTitleFail ?? ''}
          />
        )}
        {this.state.type === PasscodeType.confirm && (
          <Passcode
            {...this.props}
            type={PasscodeType.confirm}
            onCancel={this.cancelConfirm}
            endProcess={this.endProcessConfirmPasscode}
            errorShown={this.state.errorShown}
            title={this.props.title ?? '2 - Confirm your PIN Code'}
            subTitle={this.props.subTitle ?? ''}
            subTitleFail={this.props.subTitleFail ?? 'Please try again'}
            titleFail={this.props.titleFail ?? 'Your entries did not match'}
          />
        )}
      </>
    )
  }
}
