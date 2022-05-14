/// <reference types="react-native-keychain" />
import { PureComponent } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { colors } from './commons/colors';
import { CountdownTimer } from './components/CountdownTimer/CountdownTimer';
import { Keypad } from './components/Keypad/Keypad';
import { PasscodeIndicator } from './components/PasscodeIndicator/PasscodeIndicator';
import { Typography } from './components/Typography/Typography';
declare enum PasscodeResult {
    initial = "initial",
    success = "success",
    locked = "locked"
}
interface BiometryProps {
    type: 'select' | 'change' | 'input';
    numberOfAttempts?: number;
    lockedTime?: number;
    alphabetCharsVisible: boolean;
    biometryEnabled: boolean;
    passcodeVisible?: boolean;
    vibrateOnError?: boolean;
    timePasscodeLockedAsyncStorageName?: string;
    passcodeKeychainName?: string;
    passcodeAttemptsAsyncStorageName?: string;
    keypadCharHighlightedColor?: string;
    keypadCharNormalColor?: string;
    passcodeStatus?: 'initial' | 'success' | 'locked';
    deleteButtonIcon?: JSX.Element;
    biometryButtonIcon?: JSX.Element;
    lockedButton?: JSX.Element;
    lockedPage?: JSX.Element;
    bottomLeftButton?: JSX.Element;
    deleteButton?: (handler: () => void) => JSX.Element;
    keypadButton?: (index: number, handler: (buttonIndex: string) => void) => JSX.Element;
    onSuccess?: (passcode: string) => void;
    onFailed?: (error?: any) => void;
    onCancelChangePasscode?: () => void;
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
interface BiometryState {
    internalPasscodeStatus: PasscodeResult;
    passcodeLocked: boolean;
}
/**
 * @param {PasscodeType} type {required} - Define type of screen
 * @param {number | undefined} numberOfAttempts - Specify max attempts of try before locked
 * @param {number | undefined} lockedTime - Specify lock time while running out attempts
 * @param {boolean | undefined} alphabetCharsVisible - Specify whether alphabets char display under numeric char
 */
declare class BuildInLayout extends PureComponent<BiometryProps, BiometryState> {
    static defaultProps: Partial<BiometryProps>;
    constructor(props: BiometryProps);
    componentDidMount(): void;
    changeInternalStatus(status: PasscodeResult): void;
    renderLockedScreen(): JSX.Element;
    render(): JSX.Element;
}
declare const Helpers: {
    changePasscode: (serviceName: string, oldPasscode: string, newPasscode: string) => Promise<void>;
    changePreviousPasscode: (oldPasscode: string, newPasscode: string, keychainName?: string) => Promise<void>;
    defaultKeychainName: string;
    defaultLockedTimeAsyncStorageName: string;
    defaultPasscodeAttemptsAsyncStorageName: string;
    getPasscodeByBiometric: (keychainName?: string) => Promise<string>;
    getPasscodeDefault: (keychainName?: string) => Promise<string>;
    hasUserSetPasscode: (keychainName?: string) => Promise<boolean>;
    setPasscode: (newPasscode: string, keychainName?: string) => Promise<false | import("react-native-keychain").Result>;
    vibrate: () => void;
};
declare const Components: {
    CountdownTimer: typeof CountdownTimer;
    Keypad: typeof Keypad;
    Icons: {
        ic_locked: any;
        ic_fingerprint: any;
        ic_face: any;
        ic_delete: any;
    };
    Typography: typeof Typography;
    Indicator: typeof PasscodeIndicator;
};
declare const Biometry: typeof BuildInLayout;
export { Biometry as default, colors as Colors, Components, Helpers };
