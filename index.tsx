import React, { PureComponent } from "react";

import {
  deletePinCode,
  hasPinCode,
  PasscodeResultStatus,
  PasscodeType,
  resetInternalStates,
} from "./commons";
import { InputPasscode, Locked, SelectPasscode } from "./screens";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface BiometryProps {
  type: PasscodeType;
  numberOfAttempts?: number;
  lockedTime?: number;
  alphabetCharsVisible: boolean;
  biometryEnabled: boolean;
  passcodeVisible?: boolean;

  timePasscodeLockedAsyncStorageName?: string;
  passcodeKeychainName?: string;
  passcodeAttemptsAsyncStorageName?: string;
  keypadCharHighlightedColor?: string;
  keypadCharNormalColor?: string;

  passcodeStatus?: PasscodeResultStatus;

  deleteButtonIcon?: JSX.Element;
  biometryButtonIcon?: JSX.Element;
  lockedButton?: JSX.Element;
  lockedPage?: JSX.Element;
  bottomLeftButton?: JSX.Element;
  deleteButton?: (handler: () => void) => JSX.Element;
  keypadButton?: (
    index: number,
    handler: (buttonIndex: string) => void
  ) => JSX.Element;

  onSuccess?: (passcode: string) => void;
  onFailed?: (error?: any) => void;

  passcodeSelectTitle?: string;
  passcodeSelectSubtitle?: string;
  passcodeSelectErrorTitle?: string;
  passcodeSelectErrorSubtitle?: string;

  passcodeConfirmTitle?: string;
  passcodeConfirmSubtitle?: string;
  passcodeConfirmErrorTitle?: string;
  passcodeConfirmErrorSubtitle?: string;

  passcodeInputTitle?: string;
  passcodeInputSubtitle?: string;
  passcodeInputErrorTitle?: string;
  passcodeInputErrorSubtitle?: string;

  lockedTitle?: string;
  lockedSubtitle?: (timer: number) => string;

  styleLockedContainer?: StyleProp<ViewStyle>;
  styleLockedTextContainer?: StyleProp<ViewStyle>;
  styleLockedTitle?: StyleProp<TextStyle>;
  styleLockedSubtitle?: StyleProp<TextStyle>;
  styleLockedTimerContainer?: StyleProp<ViewStyle>;
  styleLockedTimerText?: StyleProp<TextStyle>;
  styleLockedIconContainer?: StyleProp<ViewStyle>;

  stylePasscodeContainer?: StyleProp<ViewStyle>;
  stylePasscodeTitle?: StyleProp<TextStyle>;
  stylePasscodeSubtitle?: StyleProp<TextStyle>;
  stylePasscodeHidden?: StyleProp<ViewStyle>;
  stylePasscodeText?: StyleProp<TextStyle>;
  styleKeypadAlphabetCharHighlighted?: StyleProp<TextStyle>;
  styleKeypadNumberCharHighlighted?: StyleProp<TextStyle>;
  styleKeypadAlphabetCharNormal?: StyleProp<TextStyle>;
  styleKeypadNumberCharNormal?: StyleProp<TextStyle>;
}

export interface BiometryState {
  internalPasscodeStatus: PasscodeResultStatus;
  passcodeLocked: boolean;
}

const passcodeKeychainNameDefault = "PasscodeKeychainDefault";
const passcodeAttemptsAsyncStorageNameDefault = "PasscodeAttemptsDefault";
const timePasscodeLockedAsyncStorageNameDefault = "TimePasscodeLockedDefault";

/**
 * @param {PasscodeType} type {required} - Define type of screen
 * @param {number | undefined} numberOfAttempts - Specify max attempts of try before locked
 * @param {number | undefined} lockedTime - Specify lock time while running out attempts
 * @param {boolean | undefined} alphabetCharsVisible - Specify whether alphabets char display under numeric char
 */
class Biometry extends PureComponent<BiometryProps, BiometryState> {
  static defaultProps: Partial<BiometryProps> = {
    numberOfAttempts: 3,
    lockedTime: 300000,
  };

  constructor(props: BiometryProps) {
    super(props);
    this.state = {
      internalPasscodeStatus: PasscodeResultStatus.initial,
      passcodeLocked: false,
    };
    this.changeInternalStatus = this.changeInternalStatus.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem(
      this.props.timePasscodeLockedAsyncStorageName ||
        timePasscodeLockedAsyncStorageNameDefault
    ).then((value) => {
      if (value !== null) {
        this.setState({
          internalPasscodeStatus: PasscodeResultStatus.locked,
          passcodeLocked: true,
        });
      }
    });
  }

  changeInternalStatus(status: PasscodeResultStatus) {
    if (status === PasscodeResultStatus.initial) {
      this.setState({ passcodeLocked: false });
    }

    this.setState({ internalPasscodeStatus: status });
  }

  renderLockedScreen() {
    console.log("Render locked screen");
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
            case PasscodeResultStatus.initial:
              this.setState({
                internalPasscodeStatus: status,
                passcodeLocked: false,
              });
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
    );
  }

  render() {
    const { type, passcodeStatus } = this.props;

    return (
      <>
        {type === PasscodeType.select &&
          !this.state.passcodeLocked &&
          this.state.internalPasscodeStatus !== PasscodeResultStatus.locked && (
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
              vibrateOnError
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
        {type === PasscodeType.input &&
          !this.state.passcodeLocked &&
          this.state.internalPasscodeStatus !== PasscodeResultStatus.locked && (
            <InputPasscode
              title={this.props.passcodeInputTitle}
              subTitle={this.props.passcodeInputSubtitle}
              titleFail={this.props.passcodeInputErrorTitle}
              subTitleFail={this.props.passcodeInputErrorSubtitle}
              alphabetCharsVisible={this.props.alphabetCharsVisible}
              biometryEnabled={this.props.biometryEnabled}
              vibrateOnError
              maxAttempts={this.props.numberOfAttempts}
              onSuccess={this.props.onSuccess}
              callbackErrorBiometric={(error) => {
                if (this.props.onFailed) {
                  this.props.onFailed(error);
                }
              }}
              onFailed={(attempts: number) => {
                if (attempts >= (this.props.numberOfAttempts ?? 3)) {
                  this.setState({ passcodeLocked: true });
                }
                if (this.props.onFailed) {
                  this.props.onFailed(new Error("Passcode not correct"));
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
        {(passcodeStatus === PasscodeResultStatus.locked ||
          this.state.internalPasscodeStatus === PasscodeResultStatus.locked ||
          this.state.passcodeLocked) &&
          (this.props.lockedPage
            ? this.props.lockedPage
            : this.renderLockedScreen())}
      </>
    );
  }
}

const hasUserSetPasscode = (serviceName?: string) => {
  return hasPinCode(serviceName || passcodeKeychainNameDefault);
};

const deleteUserPasscode = (serviceName?: string) => {
  return deletePinCode(serviceName || passcodeKeychainNameDefault);
};

const resetPasscodeInternalStates = (
  passcodeAttempsStorageName?: string,
  timePasscodeLockedStorageName?: string
) => {
  return resetInternalStates([
    passcodeAttempsStorageName || passcodeAttemptsAsyncStorageNameDefault,
    timePasscodeLockedStorageName || timePasscodeLockedAsyncStorageNameDefault,
  ]);
};

export {
  PasscodeType,
  PasscodeResultStatus,
  Biometry,
  hasUserSetPasscode,
  deleteUserPasscode,
  resetPasscodeInternalStates,
};
