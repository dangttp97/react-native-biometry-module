import React, { PureComponent } from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  Image,
  ViewProps,
} from 'react-native'
import { range } from 'lodash'
import { Icons } from '../../assets'

export interface KeypadProps {
  alphabetCharsVisible: boolean
  disabled: boolean
  isError: boolean

  onInputingPasscode?: (passcode: string) => void
  onEndPasscode: (passcode: string) => void
  getCurrentLength?: (length: number) => void

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
  styleKeypadNumberHighlight?: StyleProp<TextStyle>
  styleKeypadNumberNormal?: StyleProp<TextStyle>
  styleKeypadAlphabetHighlight?: StyleProp<TextStyle>
  styleKeypadAlphabetNormal?: StyleProp<TextStyle>
}

export interface KeypadState {
  passcode: string
  showError: boolean
  selectedButtonText: string
}

const Column = (viewProps: ViewProps) => {
  return (
    <View
      {...viewProps}
      style={[viewProps.style, { flexDirection: 'column' }]}
    />
  )
}

const Row = (viewProps: ViewProps) => {
  return (
    <View {...viewProps} style={[viewProps.style, { flexDirection: 'row' }]} />
  )
}

export class Keypad extends PureComponent<KeypadProps, KeypadState> {
  passcodeLength: number

  handleKeypadPress(number: string) {
    const currentPasscode = this.state.passcode + number
    this.setState({ passcode: currentPasscode })

    if (this.props.onInputingPasscode) {
      this.props.onInputingPasscode(currentPasscode)
    }
    if (this.props.getCurrentLength) {
      this.props.getCurrentLength(currentPasscode.length)
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
      this.state.passcode.length === this.passcodeLength || this.props.disabled
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
        }}>
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
          if (this.state.passcode.length > 0) {
            const newPass = this.state.passcode.slice(0, -1)
            this.setState({ passcode: newPass })
            if (this.props.getCurrentLength) {
              this.props.getCurrentLength(newPass.length)
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
      <View>
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
                    if (this.state.passcode.length > 0) {
                      const newPass = this.state.passcode.slice(0, -1)
                      this.setState({
                        passcode: newPass,
                      })
                      if (this.props.getCurrentLength) {
                        this.props.getCurrentLength(newPass.length)
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
  },
  col: {
    width: '100%',
    flex: 1,
  },
  row: {
    flex: 1,
  },
  key: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadNumberHighlighted: {},
  keypadNumberNormal: {},
  keypadAlphabetHighlighted: {},
  keypadAlphabetNormal: {},
})
