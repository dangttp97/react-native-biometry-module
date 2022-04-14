import { ReactNode, PureComponent } from "react";
import { PasscodeResultStatus } from "../../commons";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Controller } from "@react-spring/native";
export interface LockedProps {
    timeToLock: number;
    title?: string;
    subtitle?: string;
    description?: string;
    buttonTitle?: string;
    timePasscodeLockedAsyncStorageName: string;
    passcodeAttemptsAsyncStorageName: string;
    titleComponent?: ReactNode;
    timerComponent?: (minutes: number, seconds: number) => ReactNode;
    iconComponent?: ReactNode;
    lockedIconComponent?: ReactNode;
    buttonComponent?: ReactNode;
    changeStatus: (status: PasscodeResultStatus) => void;
    styleContainer?: StyleProp<ViewStyle>;
    styleIconContainer?: StyleProp<ViewStyle>;
    styleTitle?: StyleProp<TextStyle>;
    styleSubtitle?: StyleProp<TextStyle>;
    styleDescription?: StyleProp<TextStyle>;
    styleTimerText?: StyleProp<TextStyle>;
    styleTextContainer?: StyleProp<ViewStyle>;
    styleTimerContainer?: StyleProp<ViewStyle>;
}
interface LockedState {
    timeDifferent: number;
}
export declare class Locked extends PureComponent<LockedProps, LockedState> {
    static defaultProps: Partial<LockedProps>;
    animations: Controller<{
        opacity: number;
    }>;
    timeLocked: number;
    isUnmounted: boolean;
    constructor(props: LockedProps);
    componentDidMount(): void;
    timer(): Promise<void>;
    componentWillUnmount(): void;
    renderTimer(minutes: number, seconds: number): JSX.Element;
    renderTitle(): JSX.Element;
    renderIcon(): JSX.Element;
    renderLockedScreen(): JSX.Element;
    render(): JSX.Element;
}
export {};
