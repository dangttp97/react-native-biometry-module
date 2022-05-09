import { isEmpty, range } from 'lodash'
import { ReactNode } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  Text as RNText,
  ViewStyle,
} from 'react-native'
import {
  PasscodeIndicator,
  PasscodeIndicatorProps,
  PasscodeIndicatorState,
} from '../PasscodeIndicator'

export interface TextIndicatorProps extends PasscodeIndicatorProps {
  styleCharWrapper?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
  styleUnderline?: StyleProp<ViewStyle>
}

export interface TextIndicatorState extends PasscodeIndicatorState {}

export class TextIndicator extends PasscodeIndicator<
  TextIndicatorProps,
  TextIndicatorState
> {
  render() {
    return (
      <View style={[styles.container, this.props.styleContainer]}>
        {range(this.props.passcodeLength).map((index) => {
          return (
            <View>
              <RNText style={[styles.text, this.props.styleText]}>
                {this.props.currentPasscode[index]}
              </RNText>
              <View
                style={[
                  styles.underline,
                  this.props.styleUnderline,
                  {
                    backgroundColor: isEmpty(this.props.currentPasscode[index])
                      ? this.props.normalColor
                      : this.props.highlightColor,
                  },
                ]}
              />
            </View>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {},
  underline: {
    height: 1,
    borderRadius: 0.5,
  },
  charWrapper: {},
})
