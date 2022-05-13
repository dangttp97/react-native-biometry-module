import { range } from 'lodash'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  Text as RNText,
  ViewStyle,
} from 'react-native'
import {
  PasscodeIndicatorProps,
  PasscodeIndicatorState,
} from '../PasscodeIndicator'

export interface TextIndicatorProps extends PasscodeIndicatorProps {
  styleCharWrapper?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
  styleUnderline?: StyleProp<ViewStyle>
}

export interface TextIndicatorState extends PasscodeIndicatorState {}

export class TextIndicator extends React.PureComponent<
  TextIndicatorProps,
  TextIndicatorState
> {
  constructor(props: TextIndicatorProps) {
    super(props)
    this.state = {
      currentPasscode: '',
      isError: false,
    }
  }

  componentDidUpdate(prevProps: Readonly<PasscodeIndicatorProps>) {
    if (!prevProps.isError && this.props.isError) {
      this.setState({ isError: this.props.isError })
    }
    this.setState({
      currentPasscode: this.props.currentPasscode,
    })
  }

  render() {
    return (
      <View style={[styles.container, this.props.styleContainer]}>
        {range(this.props.passcodeLength).map((index) => {
          return (
            <View>
              <RNText
                style={[
                  styles.text,
                  this.props.styleText,
                  {
                    color: this.state.isError
                      ? this.props.errorColor
                      : this.props.currentPasscode[index]
                      ? this.props.highlightColor
                      : this.props.normalColor,
                  },
                ]}>
                {this.props.currentPasscode[index]}
              </RNText>
              <View
                style={[
                  styles.underline,
                  this.props.styleUnderline,
                  {
                    backgroundColor: this.state.isError
                      ? this.props.errorColor
                      : this.props.currentPasscode[index]
                      ? this.props.highlightColor
                      : this.props.normalColor,
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
  container: {
    width: '100%',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
  },
  underline: {
    height: 1,
    borderRadius: 0.5,
    marginTop: 15,
  },
  charWrapper: {},
})
