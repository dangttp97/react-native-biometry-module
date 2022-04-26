import { PureComponent } from 'react'

import { Passcode, PasscodeProps } from '../Passcode'
import { SelectPasscode } from '../SelectPasscode'
import {
  NoBiometryAuthConfig,
  PasscodeType,
  WithBiometryAuthConfig,
  colors,
  deletePasscode,
} from '../../commons'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import * as Keychain from 'react-native-keychain'

export interface ChangePasscodeProps
  extends Omit<
    PasscodeProps,
    | 'endProcess'
    | 'title'
    | 'subTitle'
    | 'subTitleFail'
    | 'titleFail'
    | 'type'
    | 'previousPasscode'
    | 'validationRegex'
  > {
  newPasscodeValidator?: RegExp

  oldPasscodeTitle?: string
  oldPasscodeSubtitle?: string
  oldPasscodeErrorTitle?: string
  oldPasscodeErrorSubtitle?: string

  newPasscodeSelectTitle?: string
  newPasscodeSelectSubtitle?: string
  newPasscodeConfirmTitle?: string
  newPasscodeConfirmSubtitle?: string

  newPasscodeSelectErrorTitle?: string
  newPasscodeSelectErrorSubtitle?: string
  newPasscodeConfirmErrorTitle?: string
  newPasscodeConfirmErrorSubtitle?: string

  cancelButton?: JSX.Element

  passcodeKeychainName: string

  onSuccess?: (passcode: string) => void
  onFailed?: (error?: any) => void
  onCancel?: () => void

  styleOldPasscodeTitle?: StyleProp<TextStyle>
  styleOldPasscodeSubtitle?: StyleProp<TextStyle>

  styleSelectNewPasscodeTitle?: StyleProp<TextStyle>
  styleSelectNewPasscodeSubtitle?: StyleProp<TextStyle>

  styleCancelButtonContainer?: StyleProp<ViewStyle>
  styleCancelButtonText?: StyleProp<TextStyle>
}

interface ChangePasscodeState {
  type: PasscodeType
  oldPasscode?: string
  newPasscode?: string
}

export class ChangePasscode extends PureComponent<
  ChangePasscodeProps,
  ChangePasscodeState
> {
  constructor(props: ChangePasscodeProps) {
    super(props)
    this.state = {
      type: PasscodeType.inputOldPasscode,
      oldPasscode: undefined,
      newPasscode: undefined,
    }
    this.endProcessInputOldPasscode.bind(this)
    this.endProcessSelectNewPasscode.bind(this)
    this.handleCancel.bind(this)
  }

  componentDidMount() {
    Keychain.getInternetCredentials(
      this.props.passcodeKeychainName,
      NoBiometryAuthConfig,
    ).then((value) => {
      if (value) {
        this.setState({ oldPasscode: value.password })
      }
    })
  }

  async endProcessInputOldPasscode(passcode?: string) {
    if (passcode === this.state.oldPasscode) {
      this.setState({
        type: PasscodeType.selectNewPasscode,
      })
      await deletePasscode(this.props.passcodeKeychainName)
      await deletePasscode(this.props.passcodeKeychainName + 'Biometry')
    }
  }

  async endProcessSelectNewPasscode(newPasscode: string) {
    await this.setKeychainPassword(newPasscode)

    this.setState({
      newPasscode: newPasscode,
    })
    if (this.props.onSuccess) {
      this.props.onSuccess(this.state.newPasscode || '')
    }
  }

  async setKeychainPassword(password: string) {
    const biometrySupported =
      (await Keychain.getSupportedBiometryType()) !== null

    if (biometrySupported) {
      await Keychain.setInternetCredentials(
        this.props.passcodeKeychainName + 'Biometry',
        this.props.passcodeKeychainName + 'Biometry',
        password,
        WithBiometryAuthConfig,
      )
    }
    await Keychain.setInternetCredentials(
      this.props.passcodeKeychainName,
      this.props.passcodeKeychainName,
      password,
      NoBiometryAuthConfig,
    )
  }

  async handleCancel() {
    await this.setKeychainPassword(this.state.oldPasscode ?? '')

    this.setState({
      type: PasscodeType.inputOldPasscode,
      newPasscode: undefined,
    })

    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  render() {
    return (
      <>
        {this.props.cancelButton ? (
          this.props.cancelButton
        ) : (
          <TouchableOpacity
            onPress={() => this.handleCancel()}
            style={[
              styles.cancelButton,
              this.props.styleCancelButtonContainer,
            ]}>
            <Text
              style={[
                styles.cancelButtonText,
                this.props.styleCancelButtonText,
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
        )}
        {this.state.type === PasscodeType.inputOldPasscode && (
          <Passcode
            {...this.props}
            type={PasscodeType.input}
            title={this.props.oldPasscodeTitle ?? 'Enter Your Old PIN Code'}
            subTitle={this.props.oldPasscodeSubtitle}
            titleFail={
              this.props.oldPasscodeErrorTitle ?? 'Your entries did not match'
            }
            subTitleFail={
              this.props.oldPasscodeErrorSubtitle ?? 'Please try again'
            }
            previousPasscode={this.state.oldPasscode}
            endProcess={(passcode) => {
              this.endProcessInputOldPasscode(passcode)
            }}
            styleContainer={styles.passcodeContainer}
          />
        )}
        {this.state.type === PasscodeType.selectNewPasscode && (
          <SelectPasscode
            {...this.props}
            validationRegex={this.props.newPasscodeValidator}
            selectTitle={
              this.props.newPasscodeSelectTitle ?? 'Enter Your New PIN Code'
            }
            selectSubtitle={this.props.newPasscodeSelectSubtitle ?? ''}
            confirmTitle={
              this.props.newPasscodeConfirmTitle ?? 'Verify Your New PIN Code'
            }
            confirmSubtitle={this.props.newPasscodeConfirmSubtitle ?? ''}
            selectErrorSubtitle={this.props.newPasscodeSelectErrorTitle ?? ''}
            confirmErrorSubtitle={this.props.newPasscodeConfirmErrorSubtitle}
            onSuccess={this.endProcessSelectNewPasscode}
            styleTitle={this.props.styleSelectNewPasscodeTitle}
            styleSubTitle={this.props.styleSelectNewPasscodeSubtitle}
            styleContainer={styles.passcodeContainer}
          />
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  cancelButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
    padding: 5,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.primary,
  },
  passcodeContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 100,
  },
})
