import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface KeypadProps {
    alphabetCharsVisible: boolean;
    disabled: boolean;
    isError: boolean;
    onInputingPasscode?: (passcode: string) => void;
    onEndPasscode: (passcode: string) => void;
    bottomLeftButton?: JSX.Element;
    keypadButton?: (index: string, handler: (index: string) => void) => JSX.Element;
    deleteButton?: (handler: () => void) => JSX.Element;
    deleteButtonIcon?: JSX.Element;
    deleteButtonText?: string;
    deleteButtonDisabled?: boolean;
    keyHighlightColor?: string;
    styleContainer?: StyleProp<ViewStyle>;
    styleKeypadNumberHighlight?: StyleProp<TextStyle>;
    styleKeypadNumberNormal?: StyleProp<TextStyle>;
    styleKeypadAlphabetHighlight?: StyleProp<TextStyle>;
    styleKeypadAlphabetNormal?: StyleProp<TextStyle>;
}
export interface KeypadState {
    currentPasscode: string;
    isError: boolean;
    selectedButtonText: string;
}
export declare class Keypad extends React.PureComponent<KeypadProps, KeypadState> {
    passcodeLength: number;
    static defaultProps: Partial<KeypadProps>;
    constructor(props: KeypadProps);
    componentDidUpdate(prevProps: Readonly<KeypadProps>): void;
    handleKeypadPress(number: string): Promise<void>;
    renderSingleKey(number: string): JSX.Element;
    renderDeleteKey(): JSX.Element;
    render(): JSX.Element;
}
