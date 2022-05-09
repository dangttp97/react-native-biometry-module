import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { FC, PureComponent, WeakValidationMap } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { colors, delay } from '../../commons'
import { FadeTimer } from './Fade'
import { FlipTimer } from './Flip'

export interface CountdownTimerProps {
  timePasscodeLockedAsyncStorageName: string
  passcodeAttemptsAsyncStorageName: string
  lockedTime: number

  onTicking?: (currentTime: number) => void
  onEndCountdown?: () => void

  styleContainer?: StyleProp<ViewStyle>
  styleTimerText?: StyleProp<TextStyle>
}

export interface CountdownTimerState {
  timeDifferent: number
}

export abstract class ICountdownTimer<
  Props extends CountdownTimerProps,
  State extends CountdownTimerState,
> extends PureComponent<Props, State> {
  lockedTime: number
  unmounted: boolean

  componentDidMount(): void {
    AsyncStorage.getItem(this.props.timePasscodeLockedAsyncStorageName).then(
      (value) => {
        if (value !== null) {
          this.lockedTime = new Date(value).getTime() + this.props.lockedTime
        } else {
          this.lockedTime = new Date().getTime() + this.props.lockedTime
        }
        this.timer()
      },
    )
  }

  componentWillUnmount(): void {
    this.unmounted = true
  }

  async timer() {
    const timeLockedTimestamp = new Date(this.lockedTime).getTime()
    const currentTimestamp = new Date().getTime()
    const timeDiff = timeLockedTimestamp - currentTimestamp
    this.setState({ timeDifferent: Math.max(0, timeDiff) })
    await delay(1000)
    if (timeDiff < 1000) {
      if (this.props.onEndCountdown) {
        this.props.onEndCountdown()
      }
      AsyncStorage.multiRemove([
        this.props.passcodeAttemptsAsyncStorageName,
        this.props.timePasscodeLockedAsyncStorageName,
      ])
    }
  }
}

class CountdownTimer extends ICountdownTimer<
  CountdownTimerProps,
  CountdownTimerState
> {
  static Fade = FadeTimer
  static Flip = FlipTimer

  static defaultProps: Partial<CountdownTimerProps> = {
    lockedTime: 300000,
  }

  constructor(props: CountdownTimerProps) {
    super(props)
    this.state = {
      timeDifferent: 0,
    }
    this.unmounted = false
    this.lockedTime = 0
    this.timer.bind(this)
  }

  render() {
    const minutes = Math.floor(this.state.timeDifferent / 1000 / 60)
    const seconds = Math.floor(this.state.timeDifferent / 1000) % 60

    return (
      <View style={[styles.timerContainer, this.props.styleContainer]}>
        <Text style={[styles.timerText, this.props.styleTimerText]}>{`${
          minutes < 10 ? '0' + minutes : minutes
        } : ${seconds < 10 ? '0' + seconds : seconds}`}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 2,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 30,
  },
  timerText: {
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20,
  },
})

export { CountdownTimer }
