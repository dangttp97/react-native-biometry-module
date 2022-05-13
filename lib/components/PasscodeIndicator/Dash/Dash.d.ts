import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PasscodeIndicatorProps, PasscodeIndicatorState } from '../PasscodeIndicator';
export interface DashIndicatorProps extends PasscodeIndicatorProps {
    styleText?: StyleProp<ViewStyle>;
}
export interface DashIndicatorState extends PasscodeIndicatorState {
}
export declare class DashIndicator extends React.PureComponent<DashIndicatorProps, DashIndicatorState> {
    constructor(props: DashIndicatorProps);
    componentDidUpdate(prevProps: Readonly<DashIndicatorProps>): void;
    render(): JSX.Element;
}
