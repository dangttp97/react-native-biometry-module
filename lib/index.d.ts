import { PureComponent } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
export declare enum ScreenType {
    select = "select",
    input = "input"
}
export declare enum PasscodeResult {
    initial = "initial",
    success = "success",
    locked = "locked"
}
export interface BiometryProps {
    type: ScreenType;
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
    passcodeStatus?: PasscodeResult;
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
    internalPasscodeStatus: PasscodeResult;
    passcodeLocked: boolean;
}
/**
 * @param {boolean} biometryEnabled - Specify using biometry or not
 * @param {PasscodeType} type - Define type of screen
 * @param {number | undefined} numberOfAttempts - Specify max attempts of try before locked
 * @param {number | undefined} lockedTime - Specify lock time while running out attempts
 * @param {boolean | undefined} alphabetCharsVisible - Specify whether alphabets char display under numeric char
 * @param {boolean | undefined} passcodeVisible = Is passcode visible when enter or not
 * @param {string | undefined} timePasscodeLockedAsyncStorageName - AsyncStorage key name for time passcode locked
 * @param {string | undefined} passcodeKeychainName - Keychain storage name for saving passcode
 * @param {string | undefined} passcodeAttemptsAsyncStorageName - AsyncStorage key name for number of attempts
 * @param {string | undefined} keypadCharHighlightedColor - Color of keypad when pressed
 * @param {string | undefined} keypadCharNormalColor - Color of keypad when not pressed
 * @param {PasscodeResult | undefined} passcodeStatus - Set current status of passcode
 * @param {JSX.Element | undefined} deleteButtonIcon - Set delete icon for delete button
 * @param {JSX.Element | undefined} biometryButtonIcon - Set icon for biometry button
 * @param {JSX.Element | undefined} lockedButton - Set button element for locked page
 * @param {JSX.Element | undefined} lockedPage - Locked page for replacement
 * @param {JSX.Element | undefined} bottomLeftButton - Bottom left button in keypad
 */
declare class Biometry extends PureComponent<BiometryProps, BiometryState> {
    static defaultProps: Partial<BiometryProps>;
    constructor(props: BiometryProps);
    componentDidMount(): void;
    changeInternalStatus(status: PasscodeResult): void;
    renderLockedScreen(): JSX.Element;
    render(): JSX.Element;
}
declare const hasUserSetPasscode: (serviceName?: string) => Promise<boolean>;
declare const deleteUserPasscode: (serviceName?: string) => Promise<void>;
declare const resetPasscodeInternalStates: (passcodeAttempsStorageName?: string, timePasscodeLockedStorageName?: string) => Promise<void>;
export { Biometry, hasUserSetPasscode, deleteUserPasscode, resetPasscodeInternalStates, };
