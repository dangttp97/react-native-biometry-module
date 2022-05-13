/// <reference types="react" />
import { PasscodeIndicator, PasscodeIndicatorProps, PasscodeIndicatorState } from '../PasscodeIndicator';
export interface DotIndicatorProps extends PasscodeIndicatorProps {
}
export interface DotIndicatorState extends PasscodeIndicatorState {
}
export declare class DotIndicator extends PasscodeIndicator<DotIndicatorProps, DotIndicatorState> {
    constructor(props: DotIndicatorProps);
    render(): JSX.Element;
}
