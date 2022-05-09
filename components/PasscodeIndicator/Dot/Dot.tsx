import {
  PasscodeIndicator,
  PasscodeIndicatorProps,
  PasscodeIndicatorState,
} from '../PasscodeIndicator'

export interface DotIndicatorProps extends PasscodeIndicatorProps {}
export interface DotIndicatorState extends PasscodeIndicatorState {}

export class DotIndicator extends PasscodeIndicator<
  DotIndicatorProps,
  DotIndicatorState
> {}
