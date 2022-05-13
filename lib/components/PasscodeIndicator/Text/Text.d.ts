import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { PasscodeIndicatorProps, PasscodeIndicatorState } from '../PasscodeIndicator';
export interface TextIndicatorProps extends PasscodeIndicatorProps {
    styleCharWrapper?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
    styleUnderline?: StyleProp<ViewStyle>;
}
export interface TextIndicatorState extends PasscodeIndicatorState {
}
export declare class TextIndicator extends React.PureComponent<TextIndicatorProps, TextIndicatorState> {
    constructor(props: TextIndicatorProps);
    componentDidUpdate(prevProps: Readonly<PasscodeIndicatorProps>): void;
    render(): JSX.Element;
}
