"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passcode = void 0;
const react_1 = __importStar(require("react"));
const assets_1 = require("../../assets");
const commons_1 = require("../../commons");
const native_1 = require("@react-spring/native");
const _ = __importStar(require("lodash"));
const react_native_1 = require("react-native");
const react_native_easy_grid_1 = require("react-native-easy-grid");
const ReactNativeHapticFeedback = __importStar(require("react-native-haptic-feedback"));
const AnimatedView = (0, native_1.animated)(react_native_1.View);
class Passcode extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.passcodeLength = 4;
        this.fadeInAnimation = new native_1.Controller({
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
            config: {
                duration: 500,
            },
        });
        this.renderSubtitle = () => {
            return (react_1.default.createElement(react_native_1.Text, { style: [
                    this.state.showError ? styles.subtitleError : styles.subtitleNormal,
                    this.props.styleSubTitle,
                ] }, this.state.showError ? this.props.subTitleFail : this.props.subTitle));
        };
        this.state = {
            passcode: '',
            movingCordinate: { x: 0, y: 0 },
            showError: false,
            selectedButtonText: '',
            attemptFailed: false,
            changeScreen: false,
            deleteButtonReverse: false,
        };
    }
    componentDidMount() {
        this.fadeInAnimation.start();
        if (this.props.getCurrentLength) {
            this.props.getCurrentLength(0);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.status !== 'failure' && this.props.status === 'failure') {
            this.failedAttempt();
        }
        if (prevProps.status !== 'locked' && this.props.status === 'locked') {
            this.setState({ passcode: '' });
        }
    }
    async failedAttempt() {
        await (0, commons_1.delay)(300);
        this.setState({
            showError: true,
            attemptFailed: true,
            changeScreen: false,
        });
    }
    async shake() {
        const duration = 50;
        const vibratePattern = [0, 30, 100, 50, 50, 30];
        if (this.props.vibrateOnError) {
            if (react_native_1.Platform.OS === 'android') {
                react_native_1.Vibration.vibrate(vibratePattern);
            }
            else if (react_native_1.Platform.OS === 'ios') {
                ReactNativeHapticFeedback.trigger('notificationError', {
                    enableVibrateFallback: true,
                });
            }
        }
        const length = react_native_1.Dimensions.get('window').width / 3;
        await (0, commons_1.delay)(duration);
        this.setState({
            movingCordinate: { x: length, y: 0 },
        });
        await (0, commons_1.delay)(duration);
        this.setState({
            movingCordinate: { x: -length, y: 0 },
        });
        await (0, commons_1.delay)(duration);
        this.setState({
            movingCordinate: { x: length / 2, y: 0 },
        });
        await (0, commons_1.delay)(duration);
        this.setState({
            movingCordinate: { x: -length / 2, y: 0 },
        });
        await (0, commons_1.delay)(duration);
        this.setState({
            movingCordinate: { x: length / 4, y: 0 },
        });
        await (0, commons_1.delay)(duration);
        this.setState({
            movingCordinate: { x: -length / 4, y: 0 },
        });
        await (0, commons_1.delay)(duration);
        this.setState({
            movingCordinate: { x: 0, y: 0 },
        });
        if (this.props.getCurrentLength) {
            this.props.getCurrentLength(0);
        }
    }
    async showError(isErrorValidate = false) {
        this.setState({ changeScreen: true });
        await (0, commons_1.delay)(300);
        this.setState({
            showError: true,
            changeScreen: false,
        });
        this.shake();
        await (0, commons_1.delay)(3000);
        this.setState({ changeScreen: true, showError: false, passcode: '' });
        await (0, commons_1.delay)(200);
        if (this.props.endProcess) {
            this.props.endProcess(this.state.passcode, isErrorValidate);
        }
        if (isErrorValidate) {
            this.setState({
                changeScreen: false,
            });
        }
    }
    endProcess(passcode) {
        setTimeout(() => {
            this.setState({ changeScreen: true });
            setTimeout(() => {
                this.props.endProcess(passcode);
                this.setState({ passcode: '' });
            }, 300);
        }, 200);
    }
    async handleKeypadTouch(text) {
        const currentPasscode = this.state.passcode + text;
        this.setState({ passcode: currentPasscode });
        if (this.props.getCurrentLength) {
            this.props.getCurrentLength(currentPasscode.length);
        }
        if (currentPasscode.length === this.passcodeLength) {
            switch (this.props.type) {
                case commons_1.PasscodeType.select:
                    if (this.props.validationRegex &&
                        this.props.validationRegex.test(currentPasscode)) {
                        this.showError(true);
                    }
                    else {
                        this.endProcess(currentPasscode);
                    }
                    break;
                case commons_1.PasscodeType.confirm:
                    if (this.props.previousPasscode &&
                        this.props.previousPasscode !== currentPasscode) {
                        this.showError();
                    }
                    else {
                        this.endProcess(currentPasscode);
                    }
                    break;
                case commons_1.PasscodeType.input:
                    if (this.props.previousPasscode &&
                        this.props.previousPasscode !== currentPasscode) {
                        this.showError();
                    }
                    else {
                        this.endProcess(currentPasscode);
                    }
                    break;
                default:
                    break;
            }
        }
    }
    renderTitle() {
        return (react_1.default.createElement(react_native_1.Text, { style: [styles.title, this.props.styleTitle] }, this.state.showError ? this.props.titleFail : this.props.title));
    }
    renderKeypadButton(text) {
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
        ]);
        const disabled = (this.state.passcode.length === this.passcodeLength ||
            this.state.showError) &&
            !this.state.attemptFailed;
        return (react_1.default.createElement(AnimatedView, { style: this.fadeInAnimation.springs },
            react_1.default.createElement(react_native_1.TouchableHighlight, { underlayColor: this.props.keypadHighlightedColor, disabled: disabled, onShowUnderlay: () => this.setState({
                    selectedButtonText: text,
                }), onHideUnderlay: () => this.setState({
                    selectedButtonText: '',
                }), onPress: () => {
                    this.handleKeypadTouch(text);
                }, style: styles.keypadNormal },
                react_1.default.createElement(react_native_1.View, null,
                    react_1.default.createElement(react_native_1.Text, { style: this.state.selectedButtonText === text
                            ? [
                                styles.keypadNumberHighlighted,
                                this.props.styleKeypadNumberCharHighlighted,
                            ]
                            : [
                                styles.keypadNumberNormal,
                                this.props.styleKeypadNumberCharNormal,
                            ] }, text),
                    this.props.alphabetCharsVisible && (react_1.default.createElement(react_native_1.Text, { style: this.state.selectedButtonText === text
                            ? [
                                styles.keypadAlphabetHighlighted,
                                this.props.styleKeypadAlphabetCharHighlighted,
                            ]
                            : [
                                styles.keypadAlphabetNormal,
                                this.props.styleKeypadAlphabetCharNormal,
                            ] }, buttonArray.get(text)))))));
    }
    renderDeleteButton() {
        const deleteAnimation = new native_1.Controller({
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
        });
        deleteAnimation.start();
        return (react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: () => {
                this.setState({ deleteButtonReverse: true });
                setTimeout(() => {
                    this.setState({ deleteButtonReverse: false });
                }, 100);
                if (this.state.passcode.length > 0) {
                    const newPass = this.state.passcode.slice(0, -1);
                    this.setState({ passcode: newPass });
                    if (this.props.getCurrentLength) {
                        this.props.getCurrentLength(newPass.length);
                    }
                }
            } },
            react_1.default.createElement(react_native_1.View, null, this.props.deleteButtonIcon ? (this.props.deleteButtonIcon) : (react_1.default.createElement(react_1.default.Fragment, null,
                !this.props.deleteButtonDisabled && (react_1.default.createElement(native_1.animated.View, { key: "delete", style: deleteAnimation.springs },
                    react_1.default.createElement(react_native_1.Image, { source: assets_1.Icons.ic_delete, resizeMode: "cover" }))),
                this.props.deleteButtonText && (react_1.default.createElement(react_native_1.Text, null, this.props.deleteButtonText)))))));
    }
    renderPasscodeIndicator() {
        const { passcode, 
        // movingCordinate,
        showError, changeScreen, attemptFailed, } = this.state;
        return (react_1.default.createElement(react_native_1.View, { style: styles.passcodeContainer }, _.range(this.passcodeLength).map((value) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const lengthSup = ((passcode.length >= value + 1 && !changeScreen) || showError) &&
                !attemptFailed;
            return (react_1.default.createElement(react_1.default.Fragment, null, ((!this.props.passcodeVisible ||
                (!this.props.passcodeVisible && !lengthSup)) && (react_1.default.createElement(react_native_1.View, { style: [
                    styles.passcodeHiddenCharContainer,
                    !_.isEmpty(this.state.passcode[value])
                        ? {
                            borderColor: this.state.showError
                                ? (_a = this.props.passcodeErrorColor) !== null && _a !== void 0 ? _a : commons_1.colors.fail
                                : (_b = this.props.passcodeHighlightColor) !== null && _b !== void 0 ? _b : commons_1.colors.primary,
                        }
                        : {
                            borderColor: (_c = this.props.passcodeNormalColor) !== null && _c !== void 0 ? _c : commons_1.colors.description,
                        },
                ] },
                react_1.default.createElement(react_native_1.View, { style: [
                        styles.passcodeHiddenChar,
                        this.props.stylePasscodeHidden,
                        !_.isEmpty(this.state.passcode[value])
                            ? {
                                backgroundColor: this.state.showError
                                    ? (_d = this.props.passcodeErrorColor) !== null && _d !== void 0 ? _d : commons_1.colors.fail
                                    : (_e = this.props.passcodeHighlightColor) !== null && _e !== void 0 ? _e : commons_1.colors.primary,
                            }
                            : {
                                backgroundColor: (_f = this.props.passcodeNormalColor) !== null && _f !== void 0 ? _f : commons_1.colors.transparent,
                            },
                    ] })))) || (react_1.default.createElement(react_native_1.View, { style: [styles.passcodeTextCharContainer] },
                this.state.passcode[value] && (react_1.default.createElement(react_native_1.Text, { style: [
                        styles.passcodeTextChar,
                        this.props.stylePasscodeText,
                        this.props.passcodeHighlightColor
                            ? {
                                color: this.props.passcodeHighlightColor,
                            }
                            : undefined,
                    ] }, this.state.passcode[value])),
                _.isEmpty(this.state.passcode[value]) && (react_1.default.createElement(react_native_1.View, { style: [
                        styles.passcodeTextLine,
                        {
                            backgroundColor: (_g = this.props.passcodeNormalColor) !== null && _g !== void 0 ? _g : commons_1.colors.description,
                        },
                    ] }))))));
        })));
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: [styles.container, this.props.styleContainer] },
            react_1.default.createElement(AnimatedView, { key: "title", style: this.fadeInAnimation.springs },
                this.renderTitle(),
                this.renderSubtitle()),
            this.renderPasscodeIndicator(),
            react_1.default.createElement(react_native_easy_grid_1.Grid, { style: styles.grid },
                react_1.default.createElement(react_native_easy_grid_1.Row, { key: "firstRow", style: styles.row }, _.range(1, 4).map((index) => {
                    return (react_1.default.createElement(react_native_easy_grid_1.Col, { key: index, style: styles.col }, this.props.keypadButton
                        ? this.props.keypadButton(index, this.handleKeypadTouch)
                        : this.renderKeypadButton(index.toString())));
                })),
                react_1.default.createElement(react_native_easy_grid_1.Row, { key: "secondRow", style: styles.row }, _.range(4, 7).map((index) => {
                    return (react_1.default.createElement(react_native_easy_grid_1.Col, { key: index, style: styles.col }, this.props.keypadButton
                        ? this.props.keypadButton(index, this.handleKeypadTouch)
                        : this.renderKeypadButton(index.toString())));
                })),
                react_1.default.createElement(react_native_easy_grid_1.Row, { key: "thirdRow", style: styles.row }, _.range(7, 10).map((index) => {
                    return (react_1.default.createElement(react_native_easy_grid_1.Col, { key: index, style: styles.col }, this.props.keypadButton
                        ? this.props.keypadButton(index, this.handleKeypadTouch)
                        : this.renderKeypadButton(index.toString())));
                })),
                react_1.default.createElement(react_native_easy_grid_1.Row, { key: "lastRow", style: styles.row },
                    react_1.default.createElement(react_native_easy_grid_1.Col, { key: "bottomLeftButton", style: styles.col }, this.props.bottomLeftButton),
                    react_1.default.createElement(react_native_easy_grid_1.Col, { key: "0", style: styles.col }, this.props.keypadButton
                        ? this.props.keypadButton(0, this.handleKeypadTouch)
                        : this.renderKeypadButton('0')),
                    react_1.default.createElement(react_native_easy_grid_1.Col, { key: "delete", style: [styles.col] },
                        react_1.default.createElement(react_1.default.Fragment, null, this.props.deleteButton
                            ? this.props.deleteButton(() => {
                                if (this.state.passcode.length > 0) {
                                    const newPass = this.state.passcode.slice(0, -1);
                                    this.setState({
                                        passcode: newPass,
                                    });
                                    if (this.props.getCurrentLength) {
                                        this.props.getCurrentLength(newPass.length);
                                    }
                                }
                            })
                            : this.renderDeleteButton()))))));
    }
}
exports.Passcode = Passcode;
Passcode.defaultProps = {
    alphabetCharsVisible: false,
    keypadHighlightedColor: commons_1.colors.primary,
    type: commons_1.PasscodeType.select,
    delayBetweenAttempts: 300000,
};
const styles = react_native_1.StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commons_1.colors.white,
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
        height: commons_1.grid.unit * 7,
    },
    col: {
        flex: 0,
        marginLeft: commons_1.grid.unit / 2,
        marginRight: commons_1.grid.unit / 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: commons_1.grid.unit * 6,
        height: commons_1.grid.unit * 6,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        color: commons_1.colors.title,
        marginBottom: 20,
    },
    subtitleNormal: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: commons_1.colors.description,
        marginBottom: 'auto',
    },
    subtitleError: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: commons_1.colors.fail,
        marginBottom: 'auto',
    },
    keypadNormal: {
        backgroundColor: commons_1.colors.keypadBackground,
        alignItems: 'center',
        justifyContent: 'center',
        width: commons_1.grid.unit * 5,
        height: commons_1.grid.unit * 5,
        borderRadius: commons_1.grid.unit * 3,
    },
    keypadNumberNormal: {
        color: commons_1.colors.primary,
        fontSize: 27,
        textAlign: 'center',
    },
    keypadAlphabetNormal: {
        color: commons_1.colors.primary,
        fontSize: 13,
        textAlign: 'center',
    },
    keypadNumberHighlighted: {
        color: commons_1.colors.white,
        fontSize: 27,
        textAlign: 'center',
    },
    keypadAlphabetHighlighted: {
        color: commons_1.colors.white,
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
        backgroundColor: commons_1.colors.white,
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
        color: commons_1.colors.primary,
    },
    passcodeTextLine: {
        width: 27,
        height: 3,
    },
});
