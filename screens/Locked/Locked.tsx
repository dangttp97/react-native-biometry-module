import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { ReactNode, PureComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icons } from '../../assets'
import { colors, delay, PasscodeResultStatus } from '../../commons'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { CountdownTimer } from '../../components'

export interface LockedProps {
  timeToLock: number
  title?: string
  subtitle?: string
  description?: string
  buttonTitle?: string
  timePasscodeLockedAsyncStorageName: string
  passcodeAttemptsAsyncStorageName: string

  titleComponent?: JSX.Element
  timerComponent?: (minutes: number, seconds: number) => JSX.Element
  iconComponent?: JSX.Element
  lockedIconComponent?: JSX.Element
  buttonComponent?: JSX.Element

  changeStatus: (status: PasscodeResultStatus) => void

  styleContainer?: StyleProp<ViewStyle>
  styleIconContainer?: StyleProp<ViewStyle>
  styleTitle?: StyleProp<TextStyle>
  styleSubtitle?: StyleProp<TextStyle>
  styleDescription?: StyleProp<TextStyle>
  styleTimerText?: StyleProp<TextStyle>
  styleTextContainer?: StyleProp<ViewStyle>
  styleTimerContainer?: StyleProp<ViewStyle>
}

interface LockedState {
  timeDifferent: number
}

export class Locked extends PureComponent<LockedProps, LockedState> {
  static defaultProps: Partial<LockedProps> = {
    timeToLock: 300000,
  }

  timeLocked: number
  isUnmounted: boolean

  constructor(props: LockedProps) {
    super(props)
    this.state = {
      timeDifferent: 0,
    }
    this.isUnmounted = false
    this.timeLocked = 0
    this.timer = this.timer.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
  }

  componentDidMount() {
    AsyncStorage.getItem(this.props.timePasscodeLockedAsyncStorageName).then(
      (value) => {
        if (value !== null) {
          this.timeLocked = new Date(value).getTime() + this.props.timeToLock
        } else {
          this.timeLocked = new Date().getTime() + this.props.timeToLock
        }
        this.timer()
      },
    )
  }

  async timer() {
    const timeLockedTimestamp = new Date(this.timeLocked).getTime()
    const currentTimestamp = new Date().getTime()
    const timeDiff = timeLockedTimestamp - currentTimestamp
    this.setState({ timeDifferent: Math.max(0, timeDiff) })
    await delay(1000)
    if (timeDiff < 1000) {
      this.props.changeStatus(PasscodeResultStatus.initial)
      AsyncStorage.multiRemove([
        this.props.timePasscodeLockedAsyncStorageName,
        this.props.passcodeAttemptsAsyncStorageName,
      ])
    }
    if (!this.isUnmounted) {
      this.timer()
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  renderTimer(minutes: number, seconds: number) {
    return (
      <View style={[styles.timerContainer, this.props.styleTimerContainer]}>
        <Text style={[styles.timerText, this.props.styleTimerText]}>{`${
          minutes < 10 ? '0' + minutes : minutes
        } : ${seconds < 10 ? '0' + seconds : seconds}`}</Text>
      </View>
    )
  }

  renderTitle() {
    return (
      <Text style={[styles.title, this.props.styleTitle]}>
        {this.props.title || 'Maximum attempts reached'}
      </Text>
    )
  }

  renderIcon() {
    return (
      <View style={[styles.iconContainer, this.props.styleIconContainer]}>
        <Image
          source={Icons.ic_locked}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
    )
  }

  renderLockedScreen() {
    const minutes = Math.floor(this.state.timeDifferent / 1000 / 60)
    const seconds = Math.floor(this.state.timeDifferent / 1000) % 60

    return (
      <View>
        <View style={[styles.textContainer, this.props.styleTextContainer]}>
          {this.props.titleComponent
            ? this.props.titleComponent
            : this.renderTitle()}
          {this.props.timerComponent
            ? this.props.timerComponent(minutes, seconds)
            : this.renderTimer(minutes, seconds)}
          {this.props.iconComponent
            ? this.props.iconComponent
            : this.renderIcon()}
          <Text style={[styles.description, this.props.styleSubtitle]}>
            {this.props.subtitle
              ? this.props.subtitle
              : `To protect your information, access has been locked for ${Math.ceil(
                  this.props.timeToLock / 60000,
                )} minutes. Come back later and try again.`}
          </Text>
        </View>
        {this.props.buttonComponent ? this.props.buttonComponent : undefined}
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container, this.props.styleContainer]}>
        {this.renderLockedScreen()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 65,
    paddingVertical: 100,
  },
  timerContainer: {
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 2,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 30,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 70,
  },
  icon: {
    height: 180,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  timerText: {
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    color: colors.title,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 30,
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.description,
    textAlign: 'center',
  },
})
