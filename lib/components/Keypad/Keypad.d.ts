import { PureComponent } from 'react';
import { StyleProp, TextStyle } from 'react-native';
export interface KeypadProps {
    alphabetCharsVisible: boolean;
    disabled: boolean;
    isError: boolean;
    onInputingPasscode?: (passcode: string) => void;
    onEndPasscode: (passcode: string) => void;
    getCurrentLength?: (length: number) => void;
    bottomLeftButton?: JSX.Element;
    keypadButton?: (index: string, handler: (index: string) => void) => JSX.Element;
    deleteButton?: (handler: () => void) => JSX.Element;
    deleteButtonIcon?: JSX.Element;
    deleteButtonText?: string;
    deleteButtonDisabled?: boolean;
    keyHighlightColor?: string;
    styleKeypadNumberHighlight?: StyleProp<TextStyle>;
    styleKeypadNumberNormal?: StyleProp<TextStyle>;
    styleKeypadAlphabetHighlight?: StyleProp<TextStyle>;
    styleKeypadAlphabetNormal?: StyleProp<TextStyle>;
}
export interface KeypadState {
    passcode: string;
    showError: boolean;
    selectedButtonText: string;
}
export declare class Keypad extends PureComponent<KeypadProps, KeypadState> {
    passcodeLength: number;
    handleKeypadPress(number: string): void;
    renderSingleKey(number: string): JSX.Element;
    renderDeleteKey(): JSX.Element;
    render(): JSX.Element;
}
