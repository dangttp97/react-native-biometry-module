import React, { ReactNode } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import {
  CountdownTimerProps,
  CountdownTimerState,
  ICountdownTimer,
} from '../CountdownTimer'

export interface FadeTimerProps extends CountdownTimerProps {}

interface FadeTimeState extends CountdownTimerState {}

export class FadeTimer extends ICountdownTimer<FadeTimerProps, FadeTimeState> {
  static defaultProps: Partial<CountdownTimerProps> = {
    lockedTime: 300000,
  }

  moveY = new Animated.Value(0)
  fade = new Animated.Value(1)

  constructor(props: CountdownTimerProps) {
    super(props)
    this.state = {
      timeDifferent: 0,
    }
    this.unmounted = false
    this.lockedTime = 0
    this.timer.bind(this)
  }

  render(): ReactNode {
    const minutes = Math.floor(this.state.timeDifferent / 1000 / 60)
    const seconds = Math.floor(this.state.timeDifferent / 1000) % 60

    Animated.parallel([
      Animated.timing(this.moveY, {
        toValue: 10,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(this.fade, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()

    return (
      <View>
        <Animated.Text style={[styles.timerText, this.props.styleTimerText]}>
          {minutes < 10 ? '0' + minutes : minutes}
        </Animated.Text>
        <Text style={[styles.timerText, this.props.styleTimerText]}>:</Text>
        <Animated.Text style={[styles.timerText, this.props.styleTimerText]}>
          {seconds < 10 ? '0' + seconds : seconds}
        </Animated.Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timerText: {},
})
