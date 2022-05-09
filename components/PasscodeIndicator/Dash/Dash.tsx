import { range } from 'lodash'
import { View } from 'react-native'
import {
  PasscodeIndicator,
  PasscodeIndicatorProps,
  PasscodeIndicatorState,
} from '../PasscodeIndicator'

export interface DashIndicatorProps extends PasscodeIndicatorProps {}

export interface DashIndicatorState extends PasscodeIndicatorState {}

export class DashIndicator extends PasscodeIndicator<
  DashIndicatorProps,
  DashIndicatorState
> {
  render() {
    return <View></View>
  }
}
