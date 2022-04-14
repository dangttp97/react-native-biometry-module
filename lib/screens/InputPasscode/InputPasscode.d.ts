import { PureComponent } from "react";
import { PasscodeResultStatus } from "../../commons";
import { PasscodeProps } from "../";
import { StyleProp, ViewStyle } from "react-native";
export interface InputPasscodeProps extends Omit<PasscodeProps, "previousPasscode" | "keypadType" | "status" | "endProcess"> {
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
export declare class InputPasscode extends PureComponent<InputPasscodeProps, InputPasscodeState> {
    static defaultProps: Partial<InputPasscodeProps>;
    constructor(props: InputPasscodeProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<InputPasscodeProps>): void;
    componentWillUnmount(): void;
    endProcess(passcode?: string): Promise<void>;
    launchBiometric(): Promise<void>;
    renderBottomLeftButton(): JSX.Element;
    render(): JSX.Element;
}
