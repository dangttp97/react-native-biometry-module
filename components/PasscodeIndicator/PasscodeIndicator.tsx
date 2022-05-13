import { range } from 'lodash'
import React from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { colors } from '../../commons'
import { DashIndicator } from './Dash'
import { TextIndicator } from './Text'

export interface PasscodeIndicatorProps {
  isError: boolean
  passcodeLength: 4 | 6
  currentPasscode: string

  highlightColor?: string
  normalColor?: string
  errorColor?: string

  styleContainer?: StyleProp<ViewStyle>
}
export interface PasscodeIndicatorState {
  currentPasscode: string
  isError: boolean
}

export class PasscodeIndicator extends React.PureComponent<
  PasscodeIndicatorProps,
  PasscodeIndicatorState
> {
  static Dash: typeof DashIndicator = DashIndicator
  static Text: typeof TextIndicator = TextIndicator

  animationProps = new Animated.Value(0)

  constructor(props: PasscodeIndicatorProps) {
    super(props)
    this.state = {
      currentPasscode: '',
      isError: false,
    }
  }

  componentDidUpdate(prevProps: Readonly<PasscodeIndicatorProps>) {
    this.setState({ currentPasscode: this.props.currentPasscode })

    if (!prevProps.isError && this.props.isError) {
      this.setState({ isError: this.props.isError })
    }

    if (this.props.currentPasscode.length === this.props.passcodeLength) {
      if (!prevProps.isError && this.props.isError) {
        this.shake()
      }
    }
  }

  async shake() {
    const length = Dimensions.get('window').width / 3

    Animated.sequence([
      Animated.timing(this.animationProps, {
        toValue: length,
        duration: 50,
        useNativeDriver: true,
        easing: (value) => Easing.bounce(value),
      }),
      Animated.timing(this.animationProps, {
        toValue: -length,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.animationProps, {
        toValue: length / 2,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.animationProps, {
        toValue: -length / 2,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.animationProps, {
        toValue: length / 4,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.animationProps, {
        toValue: -length / 4,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.animationProps, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start()
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX: this.animationProps,
            },
          ],
        }}>
        {range(1, this.state.currentPasscode.length).map((index) => {
          return (
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: this.state.currentPasscode[index]
                    ? this.props.highlightColor ?? colors.primary
                    : this.props.normalColor ?? colors.description,
                },
              ]}
            />
          )
        })}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 20,
    width: 20,
    borderRadius: 12.5,
    borderWidth: 1,
    padding: 2.5,
  },
})
