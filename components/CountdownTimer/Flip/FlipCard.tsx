import { PureComponent, Ref } from 'react'
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

export enum FlipCardType {
  front,
  back,
}

export interface FlipCardProps {
  ref: Ref<View | Animated.LegacyRef<View>>
  type: FlipCardType
  size: number
  number: number | string
  flipCardStyle?: StyleProp<ViewStyle>
  numberStyle?: StyleProp<TextStyle>
}

export class FlipCard extends PureComponent<FlipCardProps> {
  render() {
    return (
      <Animated.View
        ref={this.props.ref}
        style={[
          styles.flipCard,
          this.props.type === FlipCardType.front
            ? {
                top: 0,
                borderTopLeftRadius: this.props.size / 10,
                borderTopRightRadius: this.props.size / 10,
                borderBottomWidth: 0.5,
              }
            : {
                top: '50%',
                borderBottomLeftRadius: this.props.size / 10,
                borderBottomRightRadius: this.props.size / 10,
                borderTopWidth: 0.5,
              },
          this.props.flipCardStyle,
        ]}>
        <View style={styles.overflowContainer}>
          <Text
            style={[
              styles.number,
              {
                transform: [
                  this.props.type === FlipCardType.front
                    ? { translateY: this.props.size * 0.3 }
                    : { translateY: -this.props.size * 0.3 },
                ],
                fontSize: this.props.size / 1.5,
                lineHeight: this.props.size / 1.5,
              },
              this.props.numberStyle,
            ]}>
            {this.props.number}
          </Text>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  flipCard: {
    position: 'absolute',
    left: 0,
    height: '50%',
    width: '100%',
    backgroundColor: '#333333',
    borderColor: '#1f1f1f',
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowContainer: { overflow: 'hidden' },
  number: {
    fontWeight: '700',
    color: '#cccccc',
  },
})
