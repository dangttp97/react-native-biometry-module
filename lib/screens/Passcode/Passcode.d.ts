import { PureComponent } from 'react';
import { PasscodeType } from '../../commons';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface PasscodeProps {
    alphabetCharsVisible?: boolean;
    passcodeVisible?: boolean;
    vibrateOnError?: boolean;
    deleteButtonDisabled?: boolean;
    deleteButtonText?: string;
    title?: string;
    titleFail?: string;
    subTitle?: string;
    subTitleFail?: string;
    passcodeHighlightColor?: string;
    passcodeNormalColor?: string;
    passcodeErrorColor?: string;
    keypadHighlightedColor?: string;
    previousPasscode?: string;
    type: PasscodeType;
    validationRegex?: RegExp;
    status?: 'initial' | 'success' | 'failure' | 'locked';
    delayBetweenAttempts?: number;
    deleteButtonIcon?: JSX.Element;
    bottomLeftButton?: JSX.Element;
    deleteButton?: (handler: () => void) => JSX.Element;
    keypadButton?: (index: number, handleKeypadPress: (buttonIndex: string) => void) => JSX.Element;
    styleContainer?: StyleProp<ViewStyle>;
    stylePasscodeHidden?: StyleProp<ViewStyle>;
    stylePasscodeText?: StyleProp<TextStyle>;
    styleTitle?: StyleProp<TextStyle>;
    styleSubTitle?: StyleProp<TextStyle>;
    styleKeypadNumberCharHighlighted?: StyleProp<TextStyle>;
    styleKeypadAlphabetCharHighlighted?: StyleProp<TextStyle>;
    styleKeypadNumberCharNormal?: StyleProp<TextStyle>;
    styleKeypadAlphabetCharNormal?: StyleProp<TextStyle>;
    getCurrentLength?: (length: number) => void;
    endProcess: (passcode: string, isErrorValidate?: boolean) => void;
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
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<PasscodeProps>): void;
    failedAttempt(): Promise<void>;
    shake(): Promise<void>;
    showError(isErrorValidate?: boolean): Promise<void>;
    endProcess(passcode: string): void;
    handleKeypadTouch(text: string): Promise<void>;
    renderTitle(): JSX.Element;
    renderSubtitle: () => JSX.Element;
    renderDeleteButton(): JSX.Element;
    renderPasscodeIndicator(): JSX.Element;
    render(): JSX.Element;
}
export {};
