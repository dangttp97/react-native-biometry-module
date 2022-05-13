import React from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  Image,
  ViewStyle,
  ViewProps,
} from 'react-native'
import { range } from 'lodash'
import { Icons } from '../../assets'
import { colors, grid } from '../../commons'

export interface KeypadProps {
  alphabetCharsVisible: boolean
  disabled: boolean
  isError: boolean

  onInputingPasscode?: (passcode: string) => void
  onEndPasscode: (passcode: string) => void

  bottomLeftButton?: JSX.Element
  keypadButton?: (
    index: string,
    handler: (index: string) => void,
  ) => JSX.Element
  deleteButton?: (handler: () => void) => JSX.Element
  deleteButtonIcon?: JSX.Element
  deleteButtonText?: string
  deleteButtonDisabled?: boolean
  keyHighlightColor?: string

  styleContainer?: StyleProp<ViewStyle>
  styleKeypadNumberHighlight?: StyleProp<TextStyle>
  styleKeypadNumberNormal?: StyleProp<TextStyle>
  styleKeypadAlphabetHighlight?: StyleProp<TextStyle>
  styleKeypadAlphabetNormal?: StyleProp<TextStyle>
}

export interface KeypadState {
  currentPasscode: string
  isError: boolean
  selectedButtonText: string
}

class Column extends View {
  constructor(props: ViewProps) {
    super(props)
  }

  render() {
    return (
      <View
        {...this.props}
        style={[this.props.style, { flexDirection: 'column' }]}
      />
    )
  }
}
class Row extends View {
  constructor(props: ViewProps) {
    super(props)
  }

  render() {
    return (
      <View
        {...this.props}
        style={[this.props.style, { flexDirection: 'row' }]}
      />
    )
  }
}

export class Keypad extends React.PureComponent<KeypadProps, KeypadState> {
  passcodeLength: number

  static defaultProps: Partial<KeypadProps> = {
    alphabetCharsVisible: false,
  }

  constructor(props: KeypadProps) {
    super(props)

    this.state = {
      currentPasscode: '',
      isError: false,
      selectedButtonText: '',
    }

    this.handleKeypadPress.bind(this)
    this.renderDeleteKey.bind(this)
    this.renderSingleKey.bind(this)
  }

  componentDidUpdate(prevProps: Readonly<KeypadProps>) {
    if (!prevProps.isError && this.props.isError) {
      this.setState({ isError: this.props.isError })
    }
  }

  async handleKeypadPress(number: string) {
    const currentPasscode = this.state.currentPasscode + number
    this.setState({ currentPasscode: currentPasscode })

    if (this.props.onInputingPasscode) {
      this.props.onInputingPasscode(currentPasscode)
    }
    if (currentPasscode.length === this.passcodeLength) {
      this.props.onEndPasscode(currentPasscode)
    }
  }

  renderSingleKey(number: string) {
    const alphabetMap = new Map([
      ['1', ' '],
      ['2', 'ABC'],
      ['3', 'DEF'],
      ['4', 'GHI'],
      ['5', 'JKL'],
      ['6', 'MNO'],
      ['7', 'PQRS'],
      ['8', 'TUV'],
      ['9', 'WXYZ'],
      ['0', ' '],
    ])
    const disabled =
      this.state.currentPasscode.length === this.passcodeLength ||
      this.props.disabled

    return (
      <TouchableHighlight
        underlayColor={this.props.keyHighlightColor}
        disabled={disabled}
        onShowUnderlay={() => {
          this.setState({
            selectedButtonText: number,
          })
        }}
        onHideUnderlay={() => {
          this.setState({
            selectedButtonText: '',
          })
        }}
        onPress={() => {
          this.handleKeypadPress(number)
        }}
        style={styles.key}>
        <View>
          <Text
            style={
              this.state.selectedButtonText === number
                ? [
                    styles.keypadNumberHighlighted,
                    this.props.styleKeypadNumberHighlight,
                  ]
                : [
                    styles.keypadNumberNormal,
                    this.props.styleKeypadNumberNormal,
                  ]
            }>
            {number}
          </Text>
          {this.props.alphabetCharsVisible && (
            <Text
              style={
                this.state.selectedButtonText === number
                  ? [
                      styles.keypadAlphabetHighlighted,
                      this.props.styleKeypadAlphabetHighlight,
                    ]
                  : [
                      styles.keypadAlphabetNormal,
                      this.props.styleKeypadAlphabetNormal,
                    ]
              }>
              {alphabetMap.get(number)}
            </Text>
          )}
        </View>
      </TouchableHighlight>
    )
  }

  renderDeleteKey() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.state.currentPasscode.length > 0) {
            const newPass = this.state.currentPasscode.slice(0, -1)
            this.setState({ currentPasscode: newPass })
            if (this.props.onInputingPasscode) {
              this.props.onInputingPasscode(newPass)
            }
          }
        }}>
        <View>
          {this.props.deleteButtonIcon ? (
            this.props.deleteButtonIcon
          ) : (
            <>
              {!this.props.deleteButtonDisabled && (
                <Image source={Icons.ic_delete} resizeMode="cover" />
              )}
              {this.props.deleteButtonText && (
                <Text>{this.props.deleteButtonText}</Text>
              )}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View style={[styles.container, this.props.styleContainer]}>
        <Column style={styles.col}>
          <Row style={styles.row}>
            {range(1, 4).map((value) => {
              return (
                <View style={styles.key}>
                  {this.props.keypadButton
                    ? this.props.keypadButton(
                        `${value}`,
                        this.handleKeypadPress,
                      )
                    : this.renderSingleKey(`${value}`)}
                </View>
              )
            })}
          </Row>
          <Row style={styles.row}>
            {range(4, 7).map((value) => {
              return (
                <View style={styles.key}>
                  {this.props.keypadButton
                    ? this.props.keypadButton(
                        `${value}`,
                        this.handleKeypadPress,
                      )
                    : this.renderSingleKey(`${value}`)}
                </View>
              )
            })}
          </Row>
          <Row style={styles.row}>
            {range(7, 10).map((value) => {
              return (
                <View style={styles.key}>
                  {this.props.keypadButton
                    ? this.props.keypadButton(
                        `${value}`,
                        this.handleKeypadPress,
                      )
                    : this.renderSingleKey(`${value}`)}
                </View>
              )
            })}
          </Row>
          <Row style={styles.row}>
            <View style={styles.key}>{this.props.bottomLeftButton}</View>
            <View style={styles.key}>
              {this.props.keypadButton
                ? this.props.keypadButton('0', this.handleKeypadPress)
                : this.renderSingleKey('0')}
            </View>
            <View style={styles.key}>
              {this.props.deleteButton
                ? this.props.deleteButton(() => {
                    if (this.state.currentPasscode.length > 0) {
                      const newPass = this.state.currentPasscode.slice(0, -1)
                      this.setState({
                        currentPasscode: newPass,
                      })
                      if (this.props.onInputingPasscode) {
                        this.props.onInputingPasscode(newPass)
                      }
                    }
                  })
                : this.renderDeleteKey()}
            </View>
          </Row>
        </Column>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  col: {
    marginLeft: grid.unit / 2,
    marginRight: grid.unit / 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: grid.unit * 6,
    height: grid.unit * 6,
    flex: 0,
  },
  row: {
    flex: 0,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: grid.unit * 7,
  },
  key: {
    backgroundColor: colors.keypadBackground,
    alignItems: 'center',
    justifyContent: 'center',
    width: grid.unit * 5,
    height: grid.unit * 5,
    borderRadius: grid.unit * 3,
  },
  keypadNumberHighlighted: {
    color: colors.white,
    fontSize: 27,
    textAlign: 'center',
  },
  keypadNumberNormal: {
    color: colors.primary,
    fontSize: 27,
    textAlign: 'center',
  },
  keypadAlphabetHighlighted: {
    color: colors.white,
    fontSize: 13,
    textAlign: 'center',
  },
  keypadAlphabetNormal: {
    color: colors.primary,
    fontSize: 13,
    textAlign: 'center',
  },
})
