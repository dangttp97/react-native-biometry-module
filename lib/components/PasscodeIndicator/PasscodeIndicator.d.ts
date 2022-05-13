import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { DashIndicator } from './Dash';
import { TextIndicator } from './Text';
export interface PasscodeIndicatorProps {
    isError: boolean;
    passcodeLength: 4 | 6;
    currentPasscode: string;
    highlightColor?: string;
    normalColor?: string;
    errorColor?: string;
    styleContainer?: StyleProp<ViewStyle>;
}
export interface PasscodeIndicatorState {
    currentPasscode: string;
    isError: boolean;
}
export declare class PasscodeIndicator extends React.PureComponent<PasscodeIndicatorProps, PasscodeIndicatorState> {
    static Dash: typeof DashIndicator;
    static Text: typeof TextIndicator;
    animationProps: Animated.Value;
    constructor(props: PasscodeIndicatorProps);
    componentDidUpdate(prevProps: Readonly<PasscodeIndicatorProps>): void;
    shake(): Promise<void>;
    render(): JSX.Element;
}
