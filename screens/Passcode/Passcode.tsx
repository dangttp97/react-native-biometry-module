import { PureComponent } from 'react'

import { Icons } from '../../assets'
import { colors, delay, grid, PasscodeType } from '../../commons'
import { animated, Controller } from '@react-spring/native'
import * as _ from 'lodash'
import {
  Dimensions,
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Vibration,
  View,
  ViewStyle,
} from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'
import * as ReactNativeHapticFeedback from 'react-native-haptic-feedback'

export interface PasscodeProps {
  alphabetCharsVisible?: boolean
  passcodeVisible?: boolean
  vibrateOnError?: boolean
  deleteButtonDisabled?: boolean

  deleteButtonText?: string
  title?: string
  titleFail?: string
  subTitle?: string
  subTitleFail?: string
  passcodeHighlightColor?: string
  passcodeNormalColor?: string
  passcodeErrorColor?: string
  keypadHighlightedColor?: string
  previousPasscode?: string

  type: PasscodeType
  validationRegex?: RegExp
  status?: 'initial' | 'success' | 'failure' | 'locked'
  delayBetweenAttempts?: number

  deleteButtonIcon?: JSX.Element
  bottomLeftButton?: JSX.Element
  deleteButton?: (handler: () => void) => JSX.Element
  keypadButton?: (
    index: number,
    handleKeypadPress: (buttonIndex: string) => void,
  ) => JSX.Element

  styleContainer?: StyleProp<ViewStyle>
  stylePasscodeHidden?: StyleProp<ViewStyle>
  stylePasscodeText?: StyleProp<TextStyle>
  styleTitle?: StyleProp<TextStyle>
  styleSubTitle?: StyleProp<TextStyle>

  styleKeypadNumberCharHighlighted?: StyleProp<TextStyle>
  styleKeypadAlphabetCharHighlighted?: StyleProp<TextStyle>
  styleKeypadNumberCharNormal?: StyleProp<TextStyle>
  styleKeypadAlphabetCharNormal?: StyleProp<TextStyle>

  getCurrentLength?: (length: number) => void
  endProcess: (passcode: string, isErrorValidate?: boolean) => void
  onPressBottomLeftButton?: () => void
  onCancel?: () => void
}

interface PasscodeState {
  movingCordinate: { x: number; y: number }
  passcode: string
  showError: boolean
  selectedButtonText: string
  attemptFailed: boolean
  changeScreen: boolean
  deleteButtonReverse: boolean
}

const AnimatedView = animated(View)

export class Passcode extends PureComponent<PasscodeProps, PasscodeState> {
  passcodeLength = 4

  static defaultProps: Partial<PasscodeProps> = {
    alphabetCharsVisible: false,
    keypadHighlightedColor: colors.primary,
    type: PasscodeType.select,
    delayBetweenAttempts: 300000,
  }

  constructor(props: PasscodeProps) {
    super(props)
    this.state = {
      passcode: '',
      movingCordinate: { x: 0, y: 0 },
      showError: false,
      selectedButtonText: '',
      attemptFailed: false,
      changeScreen: false,
      deleteButtonReverse: false,
    }
  }

  fadeInAnimation = new Controller({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 500,
    },
  })

  componentDidMount() {
    this.fadeInAnimation.start()
    if (this.props.getCurrentLength) {
      this.props.getCurrentLength(0)
    }
  }

  componentDidUpdate(prevProps: Readonly<PasscodeProps>) {
    if (prevProps.status !== 'failure' && this.props.status === 'failure') {
      this.failedAttempt()
    }
    if (prevProps.status !== 'locked' && this.props.status === 'locked') {
      this.setState({ passcode: '' })
    }
  }

  async failedAttempt() {
    await delay(300)
    this.setState({
      showError: true,
      attemptFailed: true,
      changeScreen: false,
    })
  }

  async shake() {
    const duration = 50
    const vibratePattern = [0, 30, 100, 50, 50, 30]

    if (this.props.vibrateOnError) {
      if (Platform.OS === 'android') {
        Vibration.vibrate(vibratePattern)
      } else if (Platform.OS === 'ios') {
        ReactNativeHapticFeedback.trigger('notificationError', {
          enableVibrateFallback: true,
        })
      }
    }

    const length = Dimensions.get('window').width / 3
    await delay(duration)
    this.setState({
      movingCordinate: { x: length, y: 0 },
    })
    await delay(duration)
    this.setState({
      movingCordinate: { x: -length, y: 0 },
    })
    await delay(duration)
    this.setState({
      movingCordinate: { x: length / 2, y: 0 },
    })
    await delay(duration)
    this.setState({
      movingCordinate: { x: -length / 2, y: 0 },
    })
    await delay(duration)
    this.setState({
      movingCordinate: { x: length / 4, y: 0 },
    })
    await delay(duration)
    this.setState({
      movingCordinate: { x: -length / 4, y: 0 },
    })
    await delay(duration)
    this.setState({
      movingCordinate: { x: 0, y: 0 },
    })
    if (this.props.getCurrentLength) {
      this.props.getCurrentLength(0)
    }
  }

  async showError(isErrorValidate = false) {
    this.setState({ changeScreen: true })
    await delay(300)
    this.setState({
      showError: true,
      changeScreen: false,
    })
    this.shake()
    await delay(3000)
    this.setState({ changeScreen: true, showError: false, passcode: '' })
    await delay(200)
    if (this.props.endProcess) {
      this.props.endProcess(this.state.passcode, isErrorValidate)
    }
    if (isErrorValidate) {
      this.setState({
        changeScreen: false,
      })
    }
  }

  endProcess(passcode: string) {
    setTimeout(() => {
      this.setState({ changeScreen: true })
      setTimeout(() => {
        this.props.endProcess(passcode)
        this.setState({ passcode: '' })
      }, 300)
    }, 200)
  }

  async handleKeypadTouch(text: string) {
    const currentPasscode = this.state.passcode + text
    this.setState({ passcode: currentPasscode })
    if (this.props.getCurrentLength) {
      this.props.getCurrentLength(currentPasscode.length)
    }
    if (currentPasscode.length === this.passcodeLength) {
      switch (this.props.type) {
        case PasscodeType.select:
          if (
            this.props.validationRegex &&
            this.props.validationRegex.test(currentPasscode)
          ) {
            this.showError(true)
          } else {
            this.endProcess(currentPasscode)
          }
          break
        case PasscodeType.confirm:
          if (
            this.props.previousPasscode &&
            this.props.previousPasscode !== currentPasscode
          ) {
            this.showError()
          } else {
            this.endProcess(currentPasscode)
          }
          break
        case PasscodeType.input:
          if (
            this.props.previousPasscode &&
            this.props.previousPasscode !== currentPasscode
          ) {
            this.showError()
          } else {
            this.endProcess(currentPasscode)
          }
          break
        default:
          break
      }
    }
  }

  renderTitle() {
    return (
      <Text style={[styles.title, this.props.styleTitle]}>
        {this.state.showError ? this.props.titleFail : this.props.title}
      </Text>
    )
  }

  renderSubtitle = () => {
    return (
      <Text
        style={[
          this.state.showError ? styles.subtitleError : styles.subtitleNormal,
          this.props.styleSubTitle,
        ]}>
        {this.state.showError ? this.props.subTitleFail : this.props.subTitle}
      </Text>
    )
  }

  renderKeypadButton(text: string) {
    const buttonArray = new Map([
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
      (this.state.passcode.length === this.passcodeLength ||
        this.state.showError) &&
      !this.state.attemptFailed

    return (
      <AnimatedView style={this.fadeInAnimation.springs}>
        <TouchableHighlight
          underlayColor={this.props.keypadHighlightedColor}
          disabled={disabled}
          onShowUnderlay={() =>
            this.setState({
              selectedButtonText: text,
            })
          }
          onHideUnderlay={() =>
            this.setState({
              selectedButtonText: '',
            })
          }
          onPress={() => {
            this.handleKeypadTouch(text)
          }}
          style={styles.keypadNormal}>
          <View>
            <Text
              style={
                this.state.selectedButtonText === text
                  ? [
                      styles.keypadNumberHighlighted,
                      this.props.styleKeypadNumberCharHighlighted,
                    ]
                  : [
                      styles.keypadNumberNormal,
                      this.props.styleKeypadNumberCharNormal,
                    ]
              }>
              {text}
            </Text>
            {this.props.alphabetCharsVisible && (
              <Text
                style={
                  this.state.selectedButtonText === text
                    ? [
                        styles.keypadAlphabetHighlighted,
                        this.props.styleKeypadAlphabetCharHighlighted,
                      ]
                    : [
                        styles.keypadAlphabetNormal,
                        this.props.styleKeypadAlphabetCharNormal,
                      ]
                }>
                {buttonArray.get(text)}
              </Text>
            )}
          </View>
        </TouchableHighlight>
      </AnimatedView>
    )
  }

  renderDeleteButton() {
    const deleteAnimation = new Controller({
      from: {
        translateX: -10,
      },
      to: {
        translateX: 0,
      },
      config: {
        duration: 20,
      },
      reverse: this.state.deleteButtonReverse,
    })
    deleteAnimation.start()
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ deleteButtonReverse: true })
          setTimeout(() => {
            this.setState({ deleteButtonReverse: false })
          }, 100)

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
                <animated.View key="delete" style={deleteAnimation.springs}>
                  <Image source={Icons.ic_delete} resizeMode="cover" />
                </animated.View>
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

  renderPasscodeIndicator() {
    const {
      passcode,
      // movingCordinate,
      showError,
      changeScreen,
      attemptFailed,
    } = this.state

    return (
      <View style={styles.passcodeContainer}>
        {_.range(this.passcodeLength).map((value: number) => {
          const lengthSup =
            ((passcode.length >= value + 1 && !changeScreen) || showError) &&
            !attemptFailed
          return (
            <>
              {((!this.props.passcodeVisible ||
                (!this.props.passcodeVisible && !lengthSup)) && (
                <View
                  style={[
                    styles.passcodeHiddenCharContainer,
                    !_.isEmpty(this.state.passcode[value])
                      ? {
                          borderColor: this.state.showError
                            ? this.props.passcodeErrorColor ?? colors.fail
                            : this.props.passcodeHighlightColor ??
                              colors.primary,
                        }
                      : {
                          borderColor:
                            this.props.passcodeNormalColor ??
                            colors.description,
                        },
                  ]}>
                  <View
                    style={[
                      styles.passcodeHiddenChar,
                      this.props.stylePasscodeHidden,
                      !_.isEmpty(this.state.passcode[value])
                        ? {
                            backgroundColor: this.state.showError
                              ? this.props.passcodeErrorColor ?? colors.fail
                              : this.props.passcodeHighlightColor ??
                                colors.primary,
                          }
                        : {
                            backgroundColor:
                              this.props.passcodeNormalColor ??
                              colors.transparent,
                          },
                    ]}
                  />
                </View>
              )) || (
                <View style={[styles.passcodeTextCharContainer]}>
                  {this.state.passcode[value] && (
                    <Text
                      style={[
                        styles.passcodeTextChar,
                        this.props.stylePasscodeText,
                        this.props.passcodeHighlightColor
                          ? {
                              color: this.props.passcodeHighlightColor,
                            }
                          : undefined,
                      ]}>
                      {this.state.passcode[value]}
                    </Text>
                  )}
                  {_.isEmpty(this.state.passcode[value]) && (
                    <View
                      style={[
                        styles.passcodeTextLine,
                        {
                          backgroundColor:
                            this.props.passcodeNormalColor ??
                            colors.description,
                        },
                      ]}
                    />
                  )}
                </View>
              )}
            </>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container, this.props.styleContainer]}>
        <AnimatedView key="title" style={this.fadeInAnimation.springs}>
          {this.renderTitle()}
          {this.renderSubtitle()}
        </AnimatedView>
        {this.renderPasscodeIndicator()}
        <Grid style={styles.grid}>
          <Row key="firstRow" style={styles.row}>
            {_.range(1, 4).map((index: number) => {
              return (
                <Col key={index} style={styles.col}>
                  {this.props.keypadButton
                    ? this.props.keypadButton(index, this.handleKeypadTouch)
                    : this.renderKeypadButton(index.toString())}
                </Col>
              )
            })}
          </Row>
          <Row key="secondRow" style={styles.row}>
            {_.range(4, 7).map((index: number) => {
              return (
                <Col key={index} style={styles.col}>
                  {this.props.keypadButton
                    ? this.props.keypadButton(index, this.handleKeypadTouch)
                    : this.renderKeypadButton(index.toString())}
                </Col>
              )
            })}
          </Row>
          <Row key="thirdRow" style={styles.row}>
            {_.range(7, 10).map((index: number) => {
              return (
                <Col key={index} style={styles.col}>
                  {this.props.keypadButton
                    ? this.props.keypadButton(index, this.handleKeypadTouch)
                    : this.renderKeypadButton(index.toString())}
                </Col>
              )
            })}
          </Row>
          <Row key="lastRow" style={styles.row}>
            <Col key="bottomLeftButton" style={styles.col}>
              {this.props.bottomLeftButton}
            </Col>
            <Col key="0" style={styles.col}>
              {this.props.keypadButton
                ? this.props.keypadButton(0, this.handleKeypadTouch)
                : this.renderKeypadButton('0')}
            </Col>
            <Col key="delete" style={[styles.col]}>
              <>
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
                  : this.renderDeleteButton()}
              </>
            </Col>
          </Row>
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 50,
  },
  grid: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 0,
  },
  row: {
    flex: 0,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: grid.unit * 7,
  },
  col: {
    flex: 0,
    marginLeft: grid.unit / 2,
    marginRight: grid.unit / 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: grid.unit * 6,
    height: grid.unit * 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.title,
    marginBottom: 20,
  },
  subtitleNormal: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.description,
    marginBottom: 'auto',
  },
  subtitleError: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.fail,
    marginBottom: 'auto',
  },
  keypadNormal: {
    backgroundColor: colors.keypadBackground,
    alignItems: 'center',
    justifyContent: 'center',
    width: grid.unit * 5,
    height: grid.unit * 5,
    borderRadius: grid.unit * 3,
  },
  keypadNumberNormal: {
    color: colors.primary,
    fontSize: 27,
    textAlign: 'center',
  },
  keypadAlphabetNormal: {
    color: colors.primary,
    fontSize: 13,
    textAlign: 'center',
  },
  keypadNumberHighlighted: {
    color: colors.white,
    fontSize: 27,
    textAlign: 'center',
  },
  keypadAlphabetHighlighted: {
    color: colors.white,
    fontSize: 13,
    textAlign: 'center',
  },
  passcodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    width: '80%',
    marginBottom: 10,
  },
  passcodeHiddenCharContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderRadius: 10,
    height: 20,
    width: 20,
    marginHorizontal: 20,
  },
  passcodeHiddenChar: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  passcodeTextCharContainer: {
    width: 55,
    height: 55,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passcodeTextChar: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.primary,
  },
  passcodeTextLine: {
    width: 27,
    height: 3,
  },
})
