import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { ReactNode, PureComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icons } from '@assets'
import { colors, delay, PinResultStatus } from '@commons'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { animated, Controller } from '@react-spring/native'

export interface LockedProps {
  timeToLock: number
  title?: string
  description?: string
  subDescription?: string
  titleComponent?: ReactNode
  timerComponent?: (minutes: number, seconds: number) => ReactNode
  iconComponent?: ReactNode
  lockedIconComponent?: ReactNode
  buttonTitle?: string
  buttonComponent?: ReactNode
  onButtonClick?: () => void
  timePinLockedAsyncStorageName: string
  pinAttemptsAsyncStorageName: string
  changeStatus: (status: PinResultStatus) => void
  styleContainer?: StyleProp<ViewStyle>
  styleIconContainer?: StyleProp<ViewStyle>
  styleTitle?: StyleProp<TextStyle>
  styleDescription?: StyleProp<TextStyle>
  styleSubDescription?: StyleProp<TextStyle>
  styleTimerText?: StyleProp<TextStyle>
  styleTextContainer?: StyleProp<ViewStyle>
  styleTimerContainer?: StyleProp<ViewStyle>
}

interface LockedState {
  timeDifferent: number
}

const AnimatedView = animated(View)

export class Locked extends PureComponent<LockedProps, LockedState> {
  static defaultProps: Partial<LockedProps> = {}
  animations = new Controller({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 700,
    },
    delay: 300,
  })

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
    AsyncStorage.getItem(this.props.timePinLockedAsyncStorageName).then(
      value => {
        if (value) {
          this.timeLocked =
            new Date(Number(value)).getTime() + this.props.timeToLock
        } else {
          this.timeLocked = new Date().getTime() + this.props.timeToLock
        }

        this.timer()
      },
    )
  }

  async timer() {
    const timeDiff = +new Date(this.timeLocked) - +new Date()
    this.setState({ timeDifferent: Math.max(0, timeDiff) })
    await delay(1000)
    if (timeDiff < 1000) {
      this.props.changeStatus(PinResultStatus.initial)
      AsyncStorage.multiRemove([
        this.props.timePinLockedAsyncStorageName,
        this.props.pinAttemptsAsyncStorageName,
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
    this.animations.start()
    const minutes = Math.floor(this.state.timeDifferent / 1000 / 60)
    const seconds = Math.floor(this.state.timeDifferent / 1000) % 60

    return (
      <AnimatedView style={this.animations.springs}>
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
          <Text style={[styles.description, this.props.styleDescription]}>
            {this.props.description
              ? this.props.description
              : `To protect your information, access has been locked for ${Math.ceil(
                  this.props.timeToLock / 60000,
                )} minutes. Come back later and try again.`}
          </Text>
        </View>
        {this.props.buttonComponent ? this.props.buttonComponent : undefined}
      </AnimatedView>
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
