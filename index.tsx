import React, { PureComponent } from "react";
import { InputPasscode, Locked, SelectPasscode } from "./screens";
import {
  deletePinCode,
  hasPinCode,
  PasscodeResultStatus,
  PasscodeType,
  resetInternalStates,
} from "./commons";
import { StyleProp, ViewStyle } from "react-native";

export interface BiometryProps {
  type: PasscodeType;
  alphabetCharsVisible: boolean;
  biometricDisabled: boolean;
  passcodeVisible?: boolean;

  timePasscodeLockedAsyncStorageName?: string;
  passcodeKeychainName?: string;
  passcodeAttemptsAsyncStorageName?: string;

  passcodeStatus?: PasscodeResultStatus;

  lockedButton?: JSX.Element;
  lockedPage?: JSX.Element;
  bottomLeftButton?: JSX.Element;

  onSuccess?: (passcode: string) => void;
  onFailed?: (error?: any) => void;

  styleContainer?: StyleProp<ViewStyle>;
}

export interface BiometryState {
  internalPasscodeStatus: PasscodeResultStatus;
  passcodeLocked: boolean;
}

const passcodeKeychainNameDefault = "PasscodeKeychainDefault";
const passcodeAttemptsAsyncStorageNameDefault = "PasscodeAttemptsDefault";
const timePasscodeLockedAsyncStorageNameDefault = "TimePasscodeLockedDefault";

class Biometry extends PureComponent<BiometryProps, BiometryState> {
  constructor(props: BiometryProps) {
    super(props);
    this.state = {
      internalPasscodeStatus: PasscodeResultStatus.initial,
      passcodeLocked: false,
    };
    this.changeInternalStatus = this.changeInternalStatus.bind(this);
  }

  changeInternalStatus(status: PasscodeResultStatus) {
    if (status === PasscodeResultStatus.initial) {
      this.setState({ passcodeLocked: false });
    }

    this.setState({ internalPasscodeStatus: status });
  }

  renderLockedScreen() {
    return <Locked buttonComponent={this.props.lockedButton} />;
  }

  render() {
    const { type, passcodeStatus } = this.props;

    return (
      <>
        {type === PasscodeType.select && (
          <SelectPasscode
            alphabetCharsVisible={this.props.alphabetCharsVisible}
            passcodeVisible={this.props.passcodeVisible}
            onSuccess={this.props.onSuccess}
            passcodeKeychainName={
              this.props.passcodeKeychainName ?? passcodeKeychainNameDefault
            }
          />
        )}
        {type === PasscodeType.input && (
          <InputPasscode
            alphabetCharsVisible={this.props.alphabetCharsVisible}
            biometricDisabled={false}
            vibrateOnError
            onSuccess={this.props.onSuccess}
            onFailed={this.props.onFailed}
            timePasscodeLockedAsyncStorageName={
              this.props.timePasscodeLockedAsyncStorageName ??
              timePasscodeLockedAsyncStorageNameDefault
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
