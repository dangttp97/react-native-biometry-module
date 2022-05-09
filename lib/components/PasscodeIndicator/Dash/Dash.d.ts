/// <reference types="react" />
import { PasscodeIndicator, PasscodeIndicatorProps, PasscodeIndicatorState } from '../PasscodeIndicator';
export interface DashIndicatorProps extends PasscodeIndicatorProps {
}
export interface DashIndicatorState extends PasscodeIndicatorState {
}
export declare class DashIndicator extends PasscodeIndicator<DashIndicatorProps, DashIndicatorState> {
    render(): JSX.Element;
}
