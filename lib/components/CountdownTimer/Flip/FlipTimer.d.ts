import { PureComponent, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CountdownTimerProps, CountdownTimerState, ICountdownTimer } from '../CountdownTimer';
export interface FlipNumberProps {
    number: number | string;
    unit: 'hours' | 'minutes' | 'seconds';
    size: number;
    perspective: number;
    numberWrapperStyle?: StyleProp<ViewStyle>;
    cardStyle?: StyleProp<ViewStyle>;
    flipCardStyle?: StyleProp<ViewStyle>;
    numberStyle?: StyleProp<ViewStyle>;
}
export declare class FlipNumber extends PureComponent<FlipNumberProps> {
    previousNumber: string | number;
    number: string | number;
    numberSplit: string[];
    previousNumberSplit: string[];
    constructor(props: FlipNumberProps);
    render(): JSX.Element;
}
export interface FlipTimerProps extends CountdownTimerProps {
    flipNumberProps: FlipNumberProps;
    wrapperStyle?: StyleProp<ViewStyle>;
}
export interface FlipTimerState extends CountdownTimerState {
}
export declare class FlipTimer extends ICountdownTimer<FlipTimerProps, FlipTimerState> {
    constructor(props: FlipTimerProps);
    render(): ReactNode;
}
