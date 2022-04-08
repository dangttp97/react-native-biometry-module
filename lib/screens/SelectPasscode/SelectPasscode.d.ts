import { PasscodeProps } from '../../screens';
import { PasscodeType } from '../../commons';
import { PureComponent } from 'react';
import { StyleProp, ViewProps } from 'react-native';
export interface SelectPasscodeProps extends Omit<PasscodeProps, 'endProcess'> {
    passcodeKeychainName: string;
    onCancel?: () => void;
    storedPasscode?: (passcode: string) => void;
    onSuccess?: (passcode: string) => void;
    styleContainer?: StyleProp<ViewProps>;
}
interface SelectPasscodeState {
    type: PasscodeType;
    passcode: string;
    errorShown: boolean;
}
export declare class SelectPasscode extends PureComponent<SelectPasscodeProps, SelectPasscodeState> {
    static defaultProps: Partial<SelectPasscodeProps>;
    constructor(props: SelectPasscodeProps);
    endProcessSelectPasscode(passcode: string, isErrorValidation?: boolean): void;
    endProcessConfirmPasscode(passcode: string): Promise<void>;
    cancelConfirm(): void;
    render(): JSX.Element;
}
export {};
