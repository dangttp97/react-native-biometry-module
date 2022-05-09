import { ReactNode } from 'react';
import { Animated } from 'react-native';
import { CountdownTimerProps, CountdownTimerState, ICountdownTimer } from '../CountdownTimer';
export interface FadeTimerProps extends CountdownTimerProps {
}
interface FadeTimeState extends CountdownTimerState {
}
export declare class FadeTimer extends ICountdownTimer<FadeTimerProps, FadeTimeState> {
    static defaultProps: Partial<CountdownTimerProps>;
    moveY: Animated.Value;
    fade: Animated.Value;
    constructor(props: CountdownTimerProps);
    render(): ReactNode;
}
export {};
