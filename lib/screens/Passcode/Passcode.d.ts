import { PureComponent } from 'react';
import { Controller } from '@react-spring/native';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { PasscodeType } from '../../commons';
export interface PasscodeProps {
    alphabetCharsVisible?: boolean;
    passcodeVisible?: boolean;
    vibrateOnError?: boolean;
    deleteButtonDisabled?: boolean;
    errorShown?: boolean;
    deleteButtonText?: string;
    title?: string;
    titleFail?: string;
    subTitle?: string;
    subTitleFail?: string;
    passcodeHighlightColor?: string;
    passcodeNormalColor?: string;
    keypadHighlightedColor?: string;
    previousPasscode?: string;
    type: PasscodeType;
    validationRegex?: RegExp;
    status?: 'initial' | 'success' | 'failure' | 'locked';
    delayBetweenAttempts?: number;
    deleteButtonIcon?: JSX.Element;
    bottomLeftButton?: JSX.Element;
    deleteButton?: (handler: () => void) => JSX.Element;
    keypadButton?: (index: number, handleKeypadPress: (index: string) => void) => JSX.Element;
    styleContainer?: StyleProp<ViewStyle>;
    stylePasscodeHidden?: StyleProp<ViewStyle>;
    stylePasscodeText?: StyleProp<TextStyle>;
    styleTitle?: StyleProp<TextStyle>;
    styleSubTitle?: StyleProp<TextStyle>;
    stylePasscodeContainer?: StyleProp<ViewStyle>;
    styleKeypadNumberHighlighted?: StyleProp<TextStyle>;
    styleKeypadAlphabetHighlighted?: StyleProp<TextStyle>;
    styleKeypadNumberNormal?: StyleProp<TextStyle>;
    styleKeypadAlphabetNormal?: StyleProp<TextStyle>;
    getCurrentLength?: (length: number) => void;
    endProcess: (pinCode: string, isErrorValidate?: boolean) => void;
    onPressBottomLeftButton?: () => void;
    onCancel?: () => void;
}
interface PasscodeState {
    movingCordinate: {
        x: number;
        y: number;
    };
    passcode: string;
    showError: boolean;
    selectedButtonText: string;
    attemptFailed: boolean;
    changeScreen: boolean;
    deleteButtonReverse: boolean;
}
export declare class Passcode extends PureComponent<PasscodeProps, PasscodeState> {
    passcodeLength: number;
    static defaultProps: Partial<PasscodeProps>;
    constructor(props: PasscodeProps);
    fadeInAnimation: Controller<{
        opacity: number;
    }>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<PasscodeProps>): void;
    failedAttempt(): Promise<void>;
    shake(): Promise<void>;
    showError(isErrorValidate?: boolean): Promise<void>;
    endProcess(passcode: string): void;
    handleKeypadTouch(text: string): Promise<void>;
    renderTitle(): JSX.Element;
    renderSubtitle: () => JSX.Element;
    renderKeypadButton(text: string): JSX.Element;
    renderDeleteButton(): JSX.Element;
    renderPasscodeIndicator(): JSX.Element;
    render(): JSX.Element;
}
export {};
