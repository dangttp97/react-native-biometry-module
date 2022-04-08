import { PureComponent } from "react";
import { PasscodeResultStatus, PasscodeType } from "./commons";
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
declare class Biometry extends PureComponent<BiometryProps, BiometryState> {
    constructor(props: BiometryProps);
    changeInternalStatus(status: PasscodeResultStatus): void;
    renderLockedScreen(): JSX.Element;
    render(): JSX.Element;
}
declare const hasUserSetPasscode: (serviceName?: string) => Promise<boolean>;
declare const deleteUserPasscode: (serviceName?: string) => Promise<void>;
declare const resetPasscodeInternalStates: (passcodeAttempsStorageName?: string, timePasscodeLockedStorageName?: string) => Promise<void>;
export { PasscodeType, PasscodeResultStatus, Biometry, hasUserSetPasscode, deleteUserPasscode, resetPasscodeInternalStates, };
