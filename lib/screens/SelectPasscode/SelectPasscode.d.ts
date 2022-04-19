import { PureComponent } from 'react';
import { PasscodeType } from '../../commons';
import { PasscodeProps } from '../';
export interface SelectPasscodeProps extends Omit<PasscodeProps, 'endProcess' | 'title' | 'subTitle' | 'subTitleFail' | 'titleFail' | 'previousPasscode'> {
    selectTitle?: string;
    selectSubtitle?: string;
    selectErrorTitle?: string;
    selectErrorSubtitle?: string;
    confirmTitle?: string;
    confirmSubtitle?: string;
    confirmErrorTitle?: string;
    confirmErrorSubtitle?: string;
    passcodeKeychainName: string;
    biometryEnabled: boolean;
    onCancel?: () => void;
    onSuccess?: (passcode: string) => void;
    passcodeValidator?: RegExp;
}
interface SelectPasscodeState {
    type: PasscodeType;
    passcode: string;
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
