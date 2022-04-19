import { PureComponent } from 'react';
import { PasscodeProps } from '../Passcode';
import { PasscodeType } from '../../commons';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface ChangePasscodeProps extends Omit<PasscodeProps, 'endProcess' | 'title' | 'subTitle' | 'subTitleFail' | 'titleFail' | 'type' | 'previousPasscode' | 'validationRegex'> {
    newPasscodeValidator?: RegExp;
    oldPasscodeTitle?: string;
    oldPasscodeSubtitle?: string;
    oldPasscodeErrorTitle?: string;
    oldPasscodeErrorSubtitle?: string;
    newPasscodeSelectTitle?: string;
    newPasscodeSelectSubtitle?: string;
    newPasscodeConfirmTitle?: string;
    newPasscodeConfirmSubtitle?: string;
    newPasscodeSelectErrorTitle?: string;
    newPasscodeSelectErrorSubtitle?: string;
    newPasscodeConfirmErrorTitle?: string;
    newPasscodeConfirmErrorSubtitle?: string;
    cancelButton?: JSX.Element;
    passcodeKeychainName: string;
    onSuccess?: (passcode: string) => void;
    onFailed?: (error?: any) => void;
    onCancel?: () => void;
    styleOldPasscodeTitle?: StyleProp<TextStyle>;
    styleOldPasscodeSubtitle?: StyleProp<TextStyle>;
    styleSelectNewPasscodeTitle?: StyleProp<TextStyle>;
    styleSelectNewPasscodeSubtitle?: StyleProp<TextStyle>;
    styleCancelButtonContainer?: StyleProp<ViewStyle>;
    styleCancelButtonText?: StyleProp<TextStyle>;
}
interface ChangePasscodeState {
    type: PasscodeType;
    oldPasscode?: string;
    newPasscode?: string;
}
export declare class ChangePasscode extends PureComponent<ChangePasscodeProps, ChangePasscodeState> {
    constructor(props: ChangePasscodeProps);
    componentDidMount(): void;
    endProcessInputOldPasscode(passcode?: string): Promise<void>;
    endProcessSelectNewPasscode(newPasscode: string): Promise<void>;
    setKeychainPassword(password: string): Promise<void>;
    handleCancel(): Promise<void>;
    render(): JSX.Element;
}
export {};
