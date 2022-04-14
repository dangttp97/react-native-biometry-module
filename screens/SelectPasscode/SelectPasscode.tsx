import React, { PureComponent } from "react";

import {
  delay,
  NoBiometryAuthConfig,
  PasscodeType,
  WithBiometryAuthConfig,
} from "../../commons";
import { PasscodeProps, Passcode } from "../";
import * as Keychain from "react-native-keychain";

export interface SelectPasscodeProps
  extends Omit<
    PasscodeProps,
    "endProcess" | "title" | "subTitle" | "subTitleFail" | "titleFail"
  > {
  selectTitle?: string;
  selectSubtitle?: string;
  selectErrorTitle?: string;
  selectErrorSubtitle?: string;

  confirmTitle?: string;
  confirmSubtitle?: string;
  confirmErrorTitle?: string;
  confirmErrorSubtitle?: string;

  passcodeKeychainName: string;
  biometryEnabled: boolean;

  onCancel?: () => void;
  onSuccess?: (passcode: string) => void;
}

interface SelectPasscodeState {
  type: PasscodeType;
  passcode: string;
}

export class SelectPasscode extends PureComponent<
  SelectPasscodeProps,
  SelectPasscodeState
> {
  static defaultProps: Partial<SelectPasscodeProps> = {
    styleContainer: undefined,
  };

  constructor(props: SelectPasscodeProps) {
    super(props);
    this.state = { type: PasscodeType.select, passcode: "" };
    this.endProcessConfirmPasscode = this.endProcessConfirmPasscode.bind(this);
    this.endProcessSelectPasscode = this.endProcessSelectPasscode.bind(this);
  }

  endProcessSelectPasscode(passcode: string, isErrorValidation?: boolean) {
    this.setState({
      passcode: isErrorValidation ? "" : passcode,
      type: isErrorValidation ? PasscodeType.select : PasscodeType.confirm,
    });
  }

  async endProcessConfirmPasscode(passcode: string) {
    if (this.state.passcode === passcode) {
      console.log("Save passcode");
      const biometrySupported =
        (await Keychain.getSupportedBiometryType()) !== null;

      if (biometrySupported && this.props.biometryEnabled) {
        await Keychain.setInternetCredentials(
          this.props.passcodeKeychainName + "Biometry",
          this.props.passcodeKeychainName + "Biometry",
          passcode,
          WithBiometryAuthConfig
        );
      }
      await delay(500);
      await Keychain.setInternetCredentials(
        this.props.passcodeKeychainName,
        this.props.passcodeKeychainName,
        passcode,
        NoBiometryAuthConfig
      );

      if (this.props.onSuccess) {
        this.props.onSuccess(passcode);
      }
    } else {
      this.setState({ type: PasscodeType.confirm });
    }
  }

  cancelConfirm() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.setState({ type: PasscodeType.select });
  }

  render() {
    return (
      <>
        {this.state.type === PasscodeType.select && (
          <Passcode
            {...this.props}
            endProcess={this.endProcessSelectPasscode}
            type={PasscodeType.select}
            title={this.props.selectTitle ?? "1 - Enter a PIN Code"}
            subTitle={
              this.props.selectSubtitle ?? "To keep your information secure"
            }
            titleFail={this.props.selectErrorTitle}
            subTitleFail={this.props.selectErrorSubtitle}
          />
        )}
        {this.state.type === PasscodeType.confirm && (
          <Passcode
            {...this.props}
            type={PasscodeType.confirm}
            onCancel={this.cancelConfirm}
            previousPasscode={this.state.passcode}
            endProcess={this.endProcessConfirmPasscode}
            title={this.props.confirmTitle ?? "2 - Confirm your PIN Code"}
            subTitle={this.props.confirmSubtitle ?? ""}
            subTitleFail={this.props.confirmErrorSubtitle ?? "Please try again"}
            titleFail={
              this.props.confirmErrorTitle ?? "Your entries did not match"
            }
          />
        )}
      </>
    );
  }
}
