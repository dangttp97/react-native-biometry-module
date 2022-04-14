import React, { PureComponent } from "react";

import { Icons } from "../../assets";
import {
  colors,
  delay,
  NoBiometryAuthConfig,
  PasscodeResultStatus,
  PasscodeType,
  WithBiometryAuthConfig,
} from "../../commons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Passcode, PasscodeProps } from "../";
import {
  Image,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import * as Keychain from "react-native-keychain";

export interface InputPasscodeProps
  extends Omit<
    PasscodeProps,
    "previousPasscode" | "keypadType" | "status" | "endProcess"
  > {
  maxAttempts: number;
  passcodeAttemptsAsyncStorageName: string;
  timePasscodeLockedAsyncStorageName: string;
  passcodeKeychainName: string;
  passcodeFallback?: boolean;
  biometryEnabled: boolean;
  lockScreenDisabled: boolean;
  passcodeStatusExternal: PasscodeResultStatus;

  passcodeValidOverride?: (passcode?: string) => void;
  callbackErrorBiometric?: (err: any) => void;
  onSuccess?: (passcode: string) => void;
  onFailed?: (attempts: number) => void;

  styleContainer?: StyleProp<ViewStyle>;
}

export interface InputPasscodeState {
  storedPasscode?: string;
  passcodeStatus: PasscodeResultStatus;
  locked: boolean;
  biometryType: "faceRecognition" | "fingerprint" | undefined;
}

export class InputPasscode extends PureComponent<
  InputPasscodeProps,
  InputPasscodeState
> {
  static defaultProps: Partial<InputPasscodeProps> = {
    passcodeFallback: true,
    styleContainer: null,
  };

  constructor(props: InputPasscodeProps) {
    super(props);
    this.state = {
      storedPasscode: undefined,
      passcodeStatus: PasscodeResultStatus.initial,
      locked: false,
      biometryType: undefined,
    };
    this.endProcess = this.endProcess.bind(this);
    this.launchBiometric = this.launchBiometric.bind(this);

    Keychain.getSupportedBiometryType().then((type) => {
      switch (type) {
        case Keychain.BIOMETRY_TYPE.FACE:
        case Keychain.BIOMETRY_TYPE.FACE_ID:
        case Keychain.BIOMETRY_TYPE.IRIS:
          this.setState({ biometryType: "faceRecognition" });
          break;
        case Keychain.BIOMETRY_TYPE.FINGERPRINT:
        case Keychain.BIOMETRY_TYPE.TOUCH_ID:
          this.setState({ biometryType: "fingerprint" });
          break;
        case undefined:
          this.setState({ biometryType: undefined });
          break;
      }
      console.log(type);
    });
  }

  componentDidMount() {
    Keychain.getInternetCredentials(
      this.props.passcodeKeychainName,
      NoBiometryAuthConfig
    ).then((value) => {
      this.setState({
        storedPasscode: (value && value.password) || undefined,
      });
    });
  }

  componentDidUpdate(prevProps: Readonly<InputPasscodeProps>) {
    if (
      prevProps.passcodeStatusExternal !== this.props.passcodeStatusExternal
    ) {
      this.setState({ passcodeStatus: this.props.passcodeStatusExternal });
    }
  }

  componentWillUnmount() {
    this.setState({
      storedPasscode: undefined,
      passcodeStatus: PasscodeResultStatus.initial,
      locked: false,
      biometryType: undefined,
    });
  }

  async endProcess(passcode?: string) {
    let passcodeValidOverride: any;

    if (this.props.passcodeValidOverride) {
      passcodeValidOverride = await Promise.resolve(
        this.props.passcodeValidOverride(passcode)
      );
    }

    this.setState({
      passcodeStatus: PasscodeResultStatus.initial,
    });

    const passcodeAttemptsStr = await AsyncStorage.getItem(
      this.props.passcodeAttemptsAsyncStorageName
    );
    let passcodeAttempts = passcodeAttemptsStr ? +passcodeAttemptsStr : 0;
    if (
      passcodeValidOverride !== undefined
        ? passcodeValidOverride
        : this.state.storedPasscode === passcode
    ) {
      this.setState({
        passcodeStatus: PasscodeResultStatus.success,
      });
      AsyncStorage.multiRemove([
        this.props.passcodeAttemptsAsyncStorageName,
        this.props.timePasscodeLockedAsyncStorageName,
      ]);
      if (this.props.onSuccess) {
        this.props.onSuccess(this.state.storedPasscode as string);
      }
    } else {
      passcodeAttempts++;
      if (
        +passcodeAttempts >= this.props.maxAttempts &&
        !this.props.lockScreenDisabled
      ) {
        await AsyncStorage.setItem(
          this.props.timePasscodeLockedAsyncStorageName,
          new Date().toISOString()
        );
        this.setState({
          locked: true,
          passcodeStatus: PasscodeResultStatus.locked,
        });
      } else {
        await AsyncStorage.setItem(
          this.props.passcodeAttemptsAsyncStorageName,
          passcodeAttempts.toString()
        );
        this.setState({ passcodeStatus: PasscodeResultStatus.failure });
      }
      if (this.props.onFailed) {
        await delay(1500);
        this.props.onFailed(passcodeAttempts);
      }
    }
  }

  async launchBiometric() {
    const data = await Keychain.getInternetCredentials(
      this.props.passcodeKeychainName + "Biometry",
      WithBiometryAuthConfig
    );

    try {
      if (typeof data !== "boolean") {
        this.endProcess(data.password);
      } else if (!data && this.props.callbackErrorBiometric) {
        this.props.callbackErrorBiometric(new Error("Authenticate failed"));
      }
    } catch (e) {
      if (this.props.callbackErrorBiometric) {
        this.props.callbackErrorBiometric(e);
      } else {
        console.log("Biometric error", e);
      }
    }
  }

  renderBottomLeftButton() {
    if (this.props.bottomLeftButton) {
      return this.props.bottomLeftButton;
    }
    if (!this.props.biometryEnabled || this.state.biometryType === undefined) {
      return undefined;
    }
    return (
      <TouchableWithoutFeedback
        onPress={async () => await this.launchBiometric()}
      >
        {this.state.biometryType === "fingerprint" ? (
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
    );
  }

  render() {
    const passcode = this.state.storedPasscode;

    return (
      <>
        <Passcode
          {...this.props}
          title={this.props.title ?? "Enter your PIN Code"}
          titleFail={this.props.titleFail ?? "Incorrect PIN code"}
          subTitle={this.props.subTitle ?? ""}
          subTitleFail={this.props.subTitleFail ?? "Please try again"}
          type={PasscodeType.input}
          previousPasscode={passcode}
          bottomLeftButton={this.renderBottomLeftButton()}
          endProcess={this.endProcess}
        />
      </>
    );
  }
}
