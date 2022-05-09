import { PureComponent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DashIndicator } from './Dash';
import { TextIndicator } from './Text';
export interface PasscodeIndicatorProps {
    passcodeLength: 4 | 6;
    currentPasscode: string;
    highlightColor: string;
    normalColor: string;
    styleContainer?: StyleProp<ViewStyle>;
}
export interface PasscodeIndicatorState {
}
export declare class PasscodeIndicator<Props extends PasscodeIndicatorProps, State extends PasscodeIndicatorState> extends PureComponent<Props, State> {
    static Dash: typeof DashIndicator;
    static Text: typeof TextIndicator;
    render(): JSX.Element;
}
