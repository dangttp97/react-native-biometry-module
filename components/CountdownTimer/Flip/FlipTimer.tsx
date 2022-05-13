import React, { PureComponent, ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import {
  CountdownTimerProps,
  CountdownTimerState,
  ICountdownTimer,
} from '../CountdownTimer'
import { NumberCard } from './NumberCard'
import { Separator } from './Separator'

export interface FlipNumberProps extends CountdownTimerProps {
  number: number | string
  unit: 'hours' | 'minutes' | 'seconds'
  size: number
  perspective: number
  numberWrapperStyle?: StyleProp<ViewStyle>
  cardStyle?: StyleProp<ViewStyle>
  flipCardStyle?: StyleProp<ViewStyle>
  numberStyle?: StyleProp<ViewStyle>
}

export interface FlipNumberState extends CountdownTimerState {}

export class FlipNumber extends ICountdownTimer<
  FlipNumberProps,
  FlipNumberState
> {
  previousNumber: string | number
  number: string | number
  numberSplit: string[]
  previousNumberSplit: string[]

  constructor(props: FlipNumberProps) {
    super(props)

    let number = parseInt(`${this.props.number}`)
    let previousNumber = number - 1

    if (this.props.unit !== 'hours') {
      previousNumber = previousNumber === -1 ? 59 : previousNumber
    } else {
      previousNumber = previousNumber === -1 ? 23 : previousNumber
    }

    this.number = number < 10 ? `0${number}` : number
    this.previousNumber =
      previousNumber < 10 ? `0${previousNumber}` : previousNumber

    this.numberSplit = this.props.number.toString().split('')
    this.previousNumberSplit = this.previousNumber.toString().split('')
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <NumberCard
          number={this.numberSplit[0]}
          previousNumber={this.previousNumberSplit[0]}
          size={this.props.size}
          perspective={this.props.perspective}
          numberWrapperStyle={this.props.numberWrapperStyle}
          cardStyle={this.props.cardStyle}
          flipCardStyle={this.props.flipCardStyle}
          numberStyle={this.props.numberStyle}
        />
        <NumberCard
          number={this.numberSplit[1]}
          previousNumber={this.previousNumberSplit[1]}
          size={this.props.size}
          perspective={this.props.perspective}
          numberWrapperStyle={this.props.numberWrapperStyle}
          cardStyle={this.props.cardStyle}
          flipCardStyle={this.props.flipCardStyle}
          numberStyle={this.props.numberStyle}
        />
      </View>
    )
  }
}

export interface FlipTimerProps extends CountdownTimerProps {
  flipNumberProps: FlipNumberProps
  wrapperStyle?: StyleProp<ViewStyle>
}

export interface FlipTimerState extends CountdownTimerState {}

export class FlipTimer extends ICountdownTimer<FlipTimerProps, FlipTimerState> {
  constructor(props: FlipTimerProps) {
    super(props)
  }

  render(): ReactNode {
    const minutes = Math.floor(this.state.timeDifferent / 1000 / 60)
    const seconds = Math.floor(this.state.timeDifferent / 1000) % 60

    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        {!!minutes && (
          <FlipNumber
            number={minutes}
            unit="minutes"
            {...this.props.flipNumberProps}
          />
        )}
        <Separator />
        {!!seconds && (
          <FlipNumber
            number={seconds}
            unit="seconds"
            {...this.props.flipNumberProps}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row' },
})
