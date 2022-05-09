import React, { PureComponent } from 'react'
import {
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { Card, CardType } from './Card'
import { FlipCard, FlipCardType } from './FlipCard'
import { MatrixTransform } from 'react-native'
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath'

const {
  createIdentityMatrix,
  multiplyInto,
  reusePerspectiveCommand,
  reuseTranslate3dCommand,
} = MatrixMath
const rotateXMatrix = (matrix, deg) => {
  const rad = (Math.PI / 180) * deg
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const rotate = [1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1]
  multiplyInto(matrix, matrix, rotate)
}
const perspectiveMatrix = (matrix, value) => {
  const perspective = createIdentityMatrix()
  MatrixMath.reusePerspectiveCommand(perspective, value)
  multiplyInto(matrix, matrix, perspective)
}
const translateMatrix = (matrix, origin) => {
  const { x, y, z } = origin
  const translate = createIdentityMatrix()
  reuseTranslate3dCommand(translate, x, y, z)
  multiplyInto(matrix, translate, matrix)
}
const untranslateMatrix = (matrix, origin) => {
  const { x, y, z } = origin
  const untranslate = createIdentityMatrix()
  reuseTranslate3dCommand(untranslate, -x, -y, -z)
  multiplyInto(matrix, matrix, untranslate)
}
const { width } = Dimensions.get('window')

export interface NumberCardProps {
  number: number | string
  previousNumber: number | string
  size: number
  perspective: number
  cardStyle?: StyleProp<ViewStyle>
  flipCardStyle?: StyleProp<ViewStyle>
  numberStyle?: StyleProp<TextStyle>
  numberWrapperStyle?: StyleProp<ViewStyle>
}

export class NumberCard extends PureComponent<NumberCardProps> {
  frontRef = null
  backRef = null
  rotateFront = new Animated.Value(0)
  rotateBack = new Animated.Value(-180)

  static defaultProps: NumberCardProps = {
    size: width / 6,
    perspective: 250,
    number: '',
    previousNumber: '',
  }

  setFrontRef = (ref) => {
    this.frontRef = ref
  }

  setBackRef = (ref) => {
    this.backRef = ref
  }

  animateTick() {
    this.rotateFront.setValue(0)
    this.rotateBack.setValue(-180)
    Animated.parallel([
      Animated.timing(this.rotateFront, {
        toValue: 180,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(this.rotateBack, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }

  transformRef(ref, deg, y) {
    const matrix = createIdentityMatrix()
    translateMatrix(matrix, { x: 0, y, z: 0 })
    perspectiveMatrix(matrix, this.props.perspective)
    rotateXMatrix(matrix, deg)
    untranslateMatrix(matrix, { x: 0, y, z: 0 })
    if (ref) {
      ref.setNativeProps({ style: { transform: [{ matrix }] } })
    }
  }

  componentDidMount() {
    this.animateTick()
  }

  render() {
    return (
      <View
        style={[
          styles.numberWrapper,
          {
            width: this.props.size * 0.8,
            height: this.props.size * 1.2,
            borderRadius: this.props.size / 10,
          },
          this.props.numberWrapperStyle,
        ]}>
        <Card
          type={CardType.upper}
          size={this.props.size}
          number={this.props.number}
          cardStyle={this.props.cardStyle}
          numberStyle={this.props.numberStyle}
        />
        <Card
          type={CardType.lower}
          size={this.props.size}
          number={this.props.number}
          cardStyle={this.props.cardStyle}
          numberStyle={this.props.numberStyle}
        />
        <FlipCard
          ref={this.frontRef}
          type={FlipCardType.front}
          size={this.props.size}
          number={this.props.previousNumber}
          flipCardStyle={this.props.flipCardStyle}
          numberStyle={this.props.numberStyle}
        />
        <FlipCard
          ref={this.backRef}
          type={FlipCardType.front}
          size={this.props.size}
          number={this.props.number}
          flipCardStyle={this.props.flipCardStyle}
          numberStyle={this.props.numberStyle}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  numberWrapper: {
    backgroundColor: '#333333',
    margin: 3,
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5,
  },
})
