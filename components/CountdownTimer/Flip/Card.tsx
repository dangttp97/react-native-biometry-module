import { PureComponent } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

export enum CardType {
  upper,
  lower,
}

export interface CardProps {
  type: CardType
  size: number
  number: number | string
  cardStyle?: StyleProp<ViewStyle>
  numberStyle?: StyleProp<TextStyle>
}

export class Card extends PureComponent<CardProps> {
  render() {
    return (
      <View
        style={[
          styles.card,
          this.props.type === CardType.upper
            ? { borderBottomWidth: 0.5 }
            : { borderTopWidth: 0.5 },
          this.props.cardStyle,
        ]}>
        <Text
          style={[
            styles.number,
            {
              transform: [
                this.props.type === CardType.upper
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
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1f1f1f',
    overflow: 'hidden',
  },
  number: {
    fontWeight: '700',
    color: '#cccccc',
  },
})
