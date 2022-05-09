import { PureComponent } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { FadeTimer } from './Fade';
import { FlipTimer } from './Flip';
export interface CountdownTimerProps {
    timePasscodeLockedAsyncStorageName: string;
    passcodeAttemptsAsyncStorageName: string;
    lockedTime: number;
    onTicking?: (currentTime: number) => void;
    onEndCountdown?: () => void;
    styleContainer?: StyleProp<ViewStyle>;
    styleTimerText?: StyleProp<TextStyle>;
}
export interface CountdownTimerState {
    timeDifferent: number;
}
export declare abstract class ICountdownTimer<Props extends CountdownTimerProps, State extends CountdownTimerState> extends PureComponent<Props, State> {
    lockedTime: number;
    unmounted: boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    timer(): Promise<void>;
}
declare class CountdownTimer extends ICountdownTimer<CountdownTimerProps, CountdownTimerState> {
    static Fade: typeof FadeTimer;
    static Flip: typeof FlipTimer;
    static defaultProps: Partial<CountdownTimerProps>;
    constructor(props: CountdownTimerProps);
    render(): JSX.Element;
}
export { CountdownTimer };
