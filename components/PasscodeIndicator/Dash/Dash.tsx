import { range } from 'lodash'
import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { colors } from '../../../commons'
import {
  PasscodeIndicatorProps,
  PasscodeIndicatorState,
} from '../PasscodeIndicator'

export interface DashIndicatorProps extends PasscodeIndicatorProps {
  styleText?: StyleProp<ViewStyle>
}

export interface DashIndicatorState extends PasscodeIndicatorState {}

export class DashIndicator extends React.PureComponent<
  DashIndicatorProps,
  DashIndicatorState
> {
  constructor(props: DashIndicatorProps) {
    super(props)
    this.state = {
      currentPasscode: '',
      isError: false,
    }
  }

  componentDidUpdate(prevProps: Readonly<DashIndicatorProps>) {
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
        {range(1, this.state.currentPasscode.length).map((index) => {
          return (
            <View style={styles.charWrapper}>
              <Text
                style={[
                  styles.text,
                  {
                    color: this.state.isError
                      ? this.props.errorColor
                      : this.state.currentPasscode[index]
                      ? colors.primary
                      : colors.title,
                  },
                ]}>
                {this.state.currentPasscode[index]
                  ? '-'
                  : this.state.currentPasscode[index]}
              </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  charWrapper: {
    padding: 5,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
  },
})
