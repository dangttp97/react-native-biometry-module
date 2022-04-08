import { PureComponent } from "react";
import { PasscodeResultStatus } from "../../commons";
import { StyleProp, ViewStyle } from "react-native";
import { PasscodeProps } from "../";
export interface InputPasscodeProps extends Omit<PasscodeProps, "previousPasscode" | "keypadType" | "status" | "endProcess"> {
    maxAttempts: number;
    storedPasscode: string;
    passcodeAttemptsAsyncStorageName: string;
    timePasscodeLockedAsyncStorageName: string;
    passcodeKeychainName: string;
    passcodeFallback?: boolean;
    biometricDisabled: boolean;
    lockScreenDisabled: boolean;
    passcodeStatusExternal: PasscodeResultStatus;
    handleResult: (passcode?: string) => void;
    callbackErrorBiometric?: (err: any) => void;
    changeInternalStatus: (status: PasscodeResultStatus) => void;
    onSuccess?: (passcode: string) => void;
    onFailed?: (attempts: number) => void;
    styleContainer?: StyleProp<ViewStyle>;
}
export interface InputPasscodeState {
    passcodeStatus: PasscodeResultStatus;
    locked: boolean;
    biometryType: "faceRecognition" | "fingerprint" | undefined;
}
export declare class InputPasscode extends PureComponent<InputPasscodeProps, InputPasscodeState> {
    keychainResult: string | undefined;
    static defaultProps: Partial<InputPasscodeProps>;
    constructor(props: InputPasscodeProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<InputPasscodeProps>): void;
    componentWillUnmount(): void;
    endProcess(pinCode?: string): Promise<void>;
    launchBiometric(): Promise<void>;
    renderBottomLeftButton(): JSX.Element;
    render(): JSX.Element;
}
