import { PureComponent, ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { DashIndicator } from './Dash'
import { DotIndicator } from './Dot'
import { TextIndicator } from './Text'

export interface PasscodeIndicatorProps {
  passcodeLength: 4 | 6
  currentPasscode: string

  highlightColor: string
  normalColor: string

  styleContainer?: StyleProp<ViewStyle>
}
export interface PasscodeIndicatorState {}

export class PasscodeIndicator<
  Props extends PasscodeIndicatorProps,
  State extends PasscodeIndicatorState,
> extends PureComponent<Props, State> {
  static Dash: typeof DashIndicator = DashIndicator
  static Text: typeof TextIndicator = TextIndicator

  render() {
    return <DotIndicator {...this.props} />
  }
}
