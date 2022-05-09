/// <reference types="react" />
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { PasscodeIndicator, PasscodeIndicatorProps, PasscodeIndicatorState } from '../PasscodeIndicator';
export interface TextIndicatorProps extends PasscodeIndicatorProps {
    styleCharWrapper?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
    styleUnderline?: StyleProp<ViewStyle>;
}
export interface TextIndicatorState extends PasscodeIndicatorState {
}
export declare class TextIndicator extends PasscodeIndicator<TextIndicatorProps, TextIndicatorState> {
    render(): JSX.Element;
}
