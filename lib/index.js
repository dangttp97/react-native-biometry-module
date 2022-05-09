"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const commons_1 = require("./commons");
const screens_1 = require("./screens");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const components_1 = require("./components");
const assets_1 = require("./assets");
var PasscodeResult;
(function (PasscodeResult) {
    PasscodeResult["initial"] = "initial";
    PasscodeResult["success"] = "success";
    PasscodeResult["locked"] = "locked";
})(PasscodeResult || (PasscodeResult = {}));
const passcodeKeychainNameDefault = 'PasscodeKeychainDefault';
const passcodeAttemptsAsyncStorageNameDefault = 'PasscodeAttemptsDefault';
const timePasscodeLockedAsyncStorageNameDefault = 'TimePasscodeLockedDefault';
/**
 * @param {PasscodeType} type {required} - Define type of screen
 * @param {number | undefined} numberOfAttempts - Specify max attempts of try before locked
 * @param {number | undefined} lockedTime - Specify lock time while running out attempts
 * @param {boolean | undefined} alphabetCharsVisible - Specify whether alphabets char display under numeric char
 */
class BuildInLayout extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            internalPasscodeStatus: PasscodeResult.initial,
            passcodeLocked: false,
        };
        this.changeInternalStatus = this.changeInternalStatus.bind(this);
    }
    componentDidMount() {
        async_storage_1.default.getItem(this.props.timePasscodeLockedAsyncStorageName ||
            timePasscodeLockedAsyncStorageNameDefault).then((value) => {
            if (value !== null) {
                this.setState({
                    internalPasscodeStatus: PasscodeResult.locked,
                    passcodeLocked: true,
                });
            }
        });
    }
    changeInternalStatus(status) {
        if (status === PasscodeResult.initial) {
            this.setState({ passcodeLocked: false });
        }
        this.setState({ internalPasscodeStatus: status });
    }
    renderLockedScreen() {
        var _a, _b, _c;
        return ((0, jsx_runtime_1.jsx)(screens_1.Locked, { buttonComponent: this.props.lockedButton, timeToLock: (_a = this.props.lockedTime) !== null && _a !== void 0 ? _a : 300000, timePasscodeLockedAsyncStorageName: (_b = this.props.timePasscodeLockedAsyncStorageName) !== null && _b !== void 0 ? _b : timePasscodeLockedAsyncStorageNameDefault, passcodeAttemptsAsyncStorageName: (_c = this.props.passcodeAttemptsAsyncStorageName) !== null && _c !== void 0 ? _c : passcodeAttemptsAsyncStorageNameDefault, changeStatus: (status) => {
                switch (status) {
                    case commons_1.PasscodeResultStatus.initial:
                        this.setState({
                            internalPasscodeStatus: PasscodeResult.initial,
                            passcodeLocked: false,
                        });
                }
            }, styleContainer: this.props.styleLockedContainer, styleTextContainer: this.props.styleLockedTextContainer, styleTitle: this.props.styleLockedTitle, styleSubtitle: this.props.styleLockedSubtitle, styleIconContainer: this.props.styleLockedIconContainer, styleTimerText: this.props.styleLockedTimerText, styleTimerContainer: this.props.styleLockedTimerContainer }));
    }
    render() {
        var _a, _b, _c, _d, _e;
        const { type, passcodeStatus } = this.props;
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [type === 'change' &&
                    !this.state.passcodeLocked &&
                    this.state.internalPasscodeStatus !== PasscodeResult.locked && ((0, jsx_runtime_1.jsx)(screens_1.ChangePasscode, { passcodeKeychainName: (_a = this.props.passcodeKeychainName) !== null && _a !== void 0 ? _a : passcodeKeychainNameDefault, onSuccess: this.props.onSuccess, onFailed: this.props.onFailed, onCancel: this.props.onCancelChangePasscode, vibrateOnError: this.props.vibrateOnError, styleContainer: this.props.stylePasscodeContainer, styleTitle: this.props.stylePasscodeTitle, styleSubTitle: this.props.stylePasscodeSubtitle, stylePasscodeHidden: this.props.stylePasscodeHidden, stylePasscodeText: this.props.stylePasscodeText, styleKeypadAlphabetCharHighlighted: this.props.styleKeypadAlphabetCharHighlighted, styleKeypadAlphabetCharNormal: this.props.styleKeypadAlphabetCharNormal, styleKeypadNumberCharHighlighted: this.props.styleKeypadNumberCharHighlighted, styleKeypadNumberCharNormal: this.props.styleKeypadNumberCharNormal })), type === 'select' &&
                    !this.state.passcodeLocked &&
                    this.state.internalPasscodeStatus !== PasscodeResult.locked && ((0, jsx_runtime_1.jsx)(screens_1.SelectPasscode, { selectTitle: this.props.passcodeSelectTitle, selectSubtitle: this.props.passcodeSelectSubtitle, selectErrorTitle: this.props.passcodeSelectErrorTitle, selectErrorSubtitle: this.props.passcodeSelectErrorSubtitle, confirmTitle: this.props.passcodeConfirmTitle, confirmSubtitle: this.props.passcodeConfirmSubtitle, confirmErrorTitle: this.props.passcodeConfirmErrorTitle, confirmErrorSubtitle: this.props.passcodeConfirmErrorSubtitle, alphabetCharsVisible: this.props.alphabetCharsVisible, passcodeVisible: this.props.passcodeVisible, onSuccess: this.props.onSuccess, biometryEnabled: this.props.biometryEnabled, vibrateOnError: this.props.vibrateOnError, passcodeKeychainName: (_b = this.props.passcodeKeychainName) !== null && _b !== void 0 ? _b : passcodeKeychainNameDefault, styleContainer: this.props.stylePasscodeContainer, styleTitle: this.props.stylePasscodeTitle, styleSubTitle: this.props.stylePasscodeSubtitle, stylePasscodeHidden: this.props.stylePasscodeHidden, stylePasscodeText: this.props.stylePasscodeText, styleKeypadAlphabetCharHighlighted: this.props.styleKeypadAlphabetCharHighlighted, styleKeypadAlphabetCharNormal: this.props.styleKeypadAlphabetCharNormal, styleKeypadNumberCharHighlighted: this.props.styleKeypadNumberCharHighlighted, styleKeypadNumberCharNormal: this.props.styleKeypadNumberCharNormal })), type === 'input' &&
                    !this.state.passcodeLocked &&
                    this.state.internalPasscodeStatus !== PasscodeResult.locked && ((0, jsx_runtime_1.jsx)(screens_1.InputPasscode, { title: this.props.passcodeInputTitle, subTitle: this.props.passcodeInputSubtitle, titleFail: this.props.passcodeInputErrorTitle, subTitleFail: this.props.passcodeInputErrorSubtitle, alphabetCharsVisible: this.props.alphabetCharsVisible, biometryEnabled: this.props.biometryEnabled, vibrateOnError: this.props.vibrateOnError, maxAttempts: this.props.numberOfAttempts, onSuccess: this.props.onSuccess, callbackErrorBiometric: (error) => {
                        if (this.props.onFailed) {
                            this.props.onFailed(error);
                        }
                    }, onFailed: (attempts) => {
                        var _a;
                        if (attempts >= ((_a = this.props.numberOfAttempts) !== null && _a !== void 0 ? _a : 3)) {
                            this.setState({ passcodeLocked: true });
                        }
                        if (this.props.onFailed) {
                            this.props.onFailed(new Error('Passcode not correct'));
                        }
                    }, timePasscodeLockedAsyncStorageName: (_c = this.props.timePasscodeLockedAsyncStorageName) !== null && _c !== void 0 ? _c : timePasscodeLockedAsyncStorageNameDefault, passcodeAttemptsAsyncStorageName: (_d = this.props.passcodeAttemptsAsyncStorageName) !== null && _d !== void 0 ? _d : passcodeAttemptsAsyncStorageNameDefault, passcodeKeychainName: (_e = this.props.passcodeKeychainName) !== null && _e !== void 0 ? _e : passcodeKeychainNameDefault, styleContainer: this.props.stylePasscodeContainer, styleTitle: this.props.stylePasscodeTitle, styleSubTitle: this.props.stylePasscodeSubtitle, stylePasscodeHidden: this.props.stylePasscodeHidden, stylePasscodeText: this.props.stylePasscodeText, styleKeypadAlphabetCharHighlighted: this.props.styleKeypadAlphabetCharHighlighted, styleKeypadAlphabetCharNormal: this.props.styleKeypadAlphabetCharNormal, styleKeypadNumberCharHighlighted: this.props.styleKeypadNumberCharHighlighted, styleKeypadNumberCharNormal: this.props.styleKeypadNumberCharNormal })), (passcodeStatus === PasscodeResult.locked ||
                    this.state.internalPasscodeStatus === PasscodeResult.locked ||
                    this.state.passcodeLocked) &&
                    (this.props.lockedPage
                        ? this.props.lockedPage
                        : this.renderLockedScreen())] }));
    }
}
BuildInLayout.defaultProps = {
    numberOfAttempts: 3,
    lockedTime: 300000,
};
const hasUserSetPasscode = (keychainName) => {
    return (0, commons_1.hasPasscode)(keychainName || passcodeKeychainNameDefault);
};
const setPasscode = (newPasscode, keychainName) => {
    return (0, commons_1.setNewPasscode)(keychainName || passcodeKeychainNameDefault, newPasscode);
};
const changePreviousPasscode = (oldPasscode, newPasscode, keychainName) => {
    return (0, commons_1.changePasscode)(keychainName || passcodeKeychainNameDefault, oldPasscode, newPasscode);
};
const getPasscodeByBiometric = (keychainName) => {
    return (0, commons_1.getPasscodeWithBiometryAuthentication)(keychainName || passcodeKeychainNameDefault);
};
const getPasscodeDefault = (keychainName) => {
    return (0, commons_1.getPasscode)(keychainName || passcodeKeychainNameDefault);
};
// MARK: Export section
const Helpers = {
    hasUserSetPasscode,
    changePasscode: commons_1.changePasscode,
    getPasscodeByBiometric,
    changePreviousPasscode,
    setPasscode,
    getPasscodeDefault,
    defaultKeychainName: passcodeKeychainNameDefault,
};
const Biometry = {
    Helpers: Helpers,
    BuildInLayout: BuildInLayout,
    Colors: commons_1.colors,
    Icons: assets_1.Icons,
    CountdownTimer: components_1.CountdownTimer,
    Keypad: components_1.Keypad,
    Indicator: components_1.PasscodeIndicator,
    Typography: components_1.Typography,
};
exports.default = Biometry;
