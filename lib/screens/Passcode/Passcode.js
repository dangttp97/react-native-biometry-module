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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const assets_1 = require("../../assets");
const commons_1 = require("../../commons");
const _ = __importStar(require("lodash"));
const react_native_1 = require("react-native");
const ReactNativeHapticFeedback = __importStar(require("react-native-haptic-feedback"));
const PasscodeIndicator_1 = require("../../components/PasscodeIndicator");
const components_1 = require("../../components");
class Passcode extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.passcodeLength = 4;
        this.renderSubtitle = () => {
            return ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                    this.state.isError ? styles.subtitleError : styles.subtitleNormal,
                    this.props.styleSubTitle,
                ] }, { children: this.state.isError ? this.props.subTitleFail : this.props.subTitle })));
        };
        this.state = {
            passcode: '',
            movingCordinate: { x: 0, y: 0 },
            isError: false,
            selectedButtonText: '',
            attemptFailed: false,
            changeScreen: false,
            deleteButtonReverse: false,
        };
    }
    componentDidMount() {
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
            isError: true,
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
            isError: true,
            changeScreen: false,
        });
        this.shake();
        await (0, commons_1.delay)(3000);
        this.setState({ changeScreen: true, isError: false, passcode: '' });
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
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.title, this.props.styleTitle] }, { children: this.state.isError ? this.props.titleFail : this.props.title })));
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
            this.state.isError) &&
            !this.state.attemptFailed;
        return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableHighlight, Object.assign({ underlayColor: this.props.keypadHighlightedColor, disabled: disabled, onShowUnderlay: () => this.setState({
                selectedButtonText: text,
            }), onHideUnderlay: () => this.setState({
                selectedButtonText: '',
            }), onPress: () => {
                this.handleKeypadTouch(text);
            }, style: styles.keypadNormal }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: this.state.selectedButtonText === text
                            ? [
                                styles.keypadNumberHighlighted,
                                this.props.styleKeypadNumberCharHighlighted,
                            ]
                            : [
                                styles.keypadNumberNormal,
                                this.props.styleKeypadNumberCharNormal,
                            ] }, { children: text })), this.props.alphabetCharsVisible && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: this.state.selectedButtonText === text
                            ? [
                                styles.keypadAlphabetHighlighted,
                                this.props.styleKeypadAlphabetCharHighlighted,
                            ]
                            : [
                                styles.keypadAlphabetNormal,
                                this.props.styleKeypadAlphabetCharNormal,
                            ] }, { children: buttonArray.get(text) })))] }) })));
    }
    renderDeleteButton() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableWithoutFeedback, Object.assign({ onPress: () => {
                if (this.state.passcode.length > 0) {
                    const newPass = this.state.passcode.slice(0, -1);
                    this.setState({ passcode: newPass });
                    if (this.props.getCurrentLength) {
                        this.props.getCurrentLength(newPass.length);
                    }
                }
            } }, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, { children: this.props.deleteButtonIcon ? (this.props.deleteButtonIcon) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!this.props.deleteButtonDisabled && ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: assets_1.Icons.ic_delete, resizeMode: "cover" })), this.props.deleteButtonText && ((0, jsx_runtime_1.jsx)(react_native_1.Text, { children: this.props.deleteButtonText }))] })) }) })));
    }
    renderPasscodeIndicator() {
        const { passcode, 
        // movingCordinate,
        isError, changeScreen, attemptFailed, } = this.state;
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.passcodeContainer }, { children: _.range(this.passcodeLength).map((value) => {
                var _a, _b, _c, _d, _e, _f, _g;
                const lengthSup = ((passcode.length >= value + 1 && !changeScreen) || isError) &&
                    !attemptFailed;
                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ((!this.props.passcodeVisible ||
                        (!this.props.passcodeVisible && !lengthSup)) && ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [
                            styles.passcodeHiddenCharContainer,
                            !_.isEmpty(this.state.passcode[value])
                                ? {
                                    borderColor: this.state.isError
                                        ? (_a = this.props.passcodeErrorColor) !== null && _a !== void 0 ? _a : commons_1.colors.fail
                                        : (_b = this.props.passcodeHighlightColor) !== null && _b !== void 0 ? _b : commons_1.colors.primary,
                                }
                                : {
                                    borderColor: (_c = this.props.passcodeNormalColor) !== null && _c !== void 0 ? _c : commons_1.colors.description,
                                },
                        ] }, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                                styles.passcodeHiddenChar,
                                this.props.stylePasscodeHidden,
                                !_.isEmpty(this.state.passcode[value])
                                    ? {
                                        backgroundColor: this.state.isError
                                            ? (_d = this.props.passcodeErrorColor) !== null && _d !== void 0 ? _d : commons_1.colors.fail
                                            : (_e = this.props.passcodeHighlightColor) !== null && _e !== void 0 ? _e : commons_1.colors.primary,
                                    }
                                    : {
                                        backgroundColor: (_f = this.props.passcodeNormalColor) !== null && _f !== void 0 ? _f : commons_1.colors.transparent,
                                    },
                            ] }) })))) || ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.passcodeTextCharContainer] }, { children: [this.state.passcode[value] && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                                    styles.passcodeTextChar,
                                    this.props.stylePasscodeText,
                                    this.props.passcodeHighlightColor
                                        ? {
                                            color: this.props.passcodeHighlightColor,
                                        }
                                        : undefined,
                                ] }, { children: this.state.passcode[value] }))), _.isEmpty(this.state.passcode[value]) && ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                                    styles.passcodeTextLine,
                                    {
                                        backgroundColor: (_g = this.props.passcodeNormalColor) !== null && _g !== void 0 ? _g : commons_1.colors.description,
                                    },
                                ] }))] }))) }));
            }) })));
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: [(0, jsx_runtime_1.jsx)(components_1.Typography, { title: this.props.title, description: this.props.subTitle, titleError: this.props.titleFail, descriptionError: this.props.subTitleFail, isError: this.state.isError }), (0, jsx_runtime_1.jsx)(PasscodeIndicator_1.PasscodeIndicator, { passcodeLength: 4, currentPasscode: this.state.passcode, highlightColor: commons_1.colors.primary, normalColor: commons_1.colors.description, isError: this.state.isError }), (0, jsx_runtime_1.jsx)(components_1.Keypad, { alphabetCharsVisible: true, disabled: false, deleteButtonDisabled: false, isError: this.state.isError, onEndPasscode: (passcode) => {
                        switch (this.props.type) {
                            case commons_1.PasscodeType.select:
                                if (this.props.validationRegex &&
                                    this.props.validationRegex.test(passcode)) {
                                    this.showError(true);
                                }
                                else {
                                    this.endProcess(passcode);
                                }
                                break;
                            case commons_1.PasscodeType.confirm:
                                if (this.props.previousPasscode &&
                                    this.props.previousPasscode !== passcode) {
                                    this.showError();
                                }
                                else {
                                    this.endProcess(passcode);
                                }
                                break;
                            case commons_1.PasscodeType.input:
                                if (this.props.previousPasscode &&
                                    this.props.previousPasscode !== passcode) {
                                    this.showError();
                                }
                                else {
                                    this.endProcess(passcode);
                                }
                                break;
                            default:
                                break;
                        }
                    } })] })));
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
