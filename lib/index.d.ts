import { PureComponent } from "react";
import { PasscodeResultStatus, PasscodeType } from "./commons";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
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
    keypadButton?: (index: number, handler: (buttonIndex: string) => void) => JSX.Element;
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
/**
 * @param {PasscodeType} type {required} - Define type of screen
 * @param {number | undefined} numberOfAttempts - Specify max attempts of try before locked
 * @param {number | undefined} lockedTime - Specify lock time while running out attempts
 * @param {boolean | undefined} alphabetCharsVisible - Specify whether alphabets char display under numeric char
 */
declare class Biometry extends PureComponent<BiometryProps, BiometryState> {
    static defaultProps: Partial<BiometryProps>;
    constructor(props: BiometryProps);
    componentDidMount(): void;
    changeInternalStatus(status: PasscodeResultStatus): void;
    renderLockedScreen(): JSX.Element;
    render(): JSX.Element;
}
declare const hasUserSetPasscode: (serviceName?: string) => Promise<boolean>;
declare const deleteUserPasscode: (serviceName?: string) => Promise<void>;
declare const resetPasscodeInternalStates: (passcodeAttempsStorageName?: string, timePasscodeLockedStorageName?: string) => Promise<void>;
export { PasscodeType, PasscodeResultStatus, Biometry, hasUserSetPasscode, deleteUserPasscode, resetPasscodeInternalStates, };
