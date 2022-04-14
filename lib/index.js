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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasscodeInternalStates = exports.deleteUserPasscode = exports.hasUserSetPasscode = exports.Biometry = exports.PasscodeResultStatus = exports.PasscodeType = void 0;
const react_1 = __importStar(require("react"));
const commons_1 = require("./commons");
Object.defineProperty(exports, "PasscodeResultStatus", { enumerable: true, get: function () { return commons_1.PasscodeResultStatus; } });
Object.defineProperty(exports, "PasscodeType", { enumerable: true, get: function () { return commons_1.PasscodeType; } });
const screens_1 = require("./screens");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const passcodeKeychainNameDefault = "PasscodeKeychainDefault";
const passcodeAttemptsAsyncStorageNameDefault = "PasscodeAttemptsDefault";
const timePasscodeLockedAsyncStorageNameDefault = "TimePasscodeLockedDefault";
/**
 * @param {PasscodeType} type {required} - Define type of screen
 * @param {number | undefined} numberOfAttempts - Specify max attempts of try before locked
 * @param {number | undefined} lockedTime - Specify lock time while running out attempts
 * @param {boolean | undefined} alphabetCharsVisible - Specify whether alphabets char display under numeric char
 */
class Biometry extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            internalPasscodeStatus: commons_1.PasscodeResultStatus.initial,
            passcodeLocked: false,
        };
        this.changeInternalStatus = this.changeInternalStatus.bind(this);
    }
    componentDidMount() {
        async_storage_1.default.getItem(this.props.timePasscodeLockedAsyncStorageName ||
            timePasscodeLockedAsyncStorageNameDefault).then((value) => {
            if (value !== null) {
                this.setState({
                    internalPasscodeStatus: commons_1.PasscodeResultStatus.locked,
                    passcodeLocked: true,
                });
            }
        });
    }
    changeInternalStatus(status) {
        if (status === commons_1.PasscodeResultStatus.initial) {
            this.setState({ passcodeLocked: false });
        }
        this.setState({ internalPasscodeStatus: status });
    }
    renderLockedScreen() {
        var _a, _b, _c;
        console.log("Render locked screen");
        return (react_1.default.createElement(screens_1.Locked, { buttonComponent: this.props.lockedButton, timeToLock: (_a = this.props.lockedTime) !== null && _a !== void 0 ? _a : 300000, timePasscodeLockedAsyncStorageName: (_b = this.props.timePasscodeLockedAsyncStorageName) !== null && _b !== void 0 ? _b : timePasscodeLockedAsyncStorageNameDefault, passcodeAttemptsAsyncStorageName: (_c = this.props.passcodeAttemptsAsyncStorageName) !== null && _c !== void 0 ? _c : passcodeAttemptsAsyncStorageNameDefault, changeStatus: (status) => {
                switch (status) {
                    case commons_1.PasscodeResultStatus.initial:
                        this.setState({
                            internalPasscodeStatus: status,
                            passcodeLocked: false,
                        });
                }
            }, styleContainer: this.props.styleLockedContainer, styleTextContainer: this.props.styleLockedTextContainer, styleTitle: this.props.styleLockedTitle, styleSubtitle: this.props.styleLockedSubtitle, styleIconContainer: this.props.styleLockedIconContainer, styleTimerText: this.props.styleLockedTimerText, styleTimerContainer: this.props.styleLockedTimerContainer }));
    }
    render() {
        var _a, _b, _c, _d;
        const { type, passcodeStatus } = this.props;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            type === commons_1.PasscodeType.select &&
                !this.state.passcodeLocked &&
                this.state.internalPasscodeStatus !== commons_1.PasscodeResultStatus.locked && (react_1.default.createElement(screens_1.SelectPasscode, { selectTitle: this.props.passcodeSelectTitle, selectSubtitle: this.props.passcodeSelectSubtitle, selectErrorTitle: this.props.passcodeSelectErrorTitle, selectErrorSubtitle: this.props.passcodeSelectErrorSubtitle, confirmTitle: this.props.passcodeConfirmTitle, confirmSubtitle: this.props.passcodeConfirmSubtitle, confirmErrorTitle: this.props.passcodeConfirmErrorTitle, confirmErrorSubtitle: this.props.passcodeConfirmErrorSubtitle, alphabetCharsVisible: this.props.alphabetCharsVisible, passcodeVisible: this.props.passcodeVisible, onSuccess: this.props.onSuccess, biometryEnabled: this.props.biometryEnabled, vibrateOnError: true, passcodeKeychainName: (_a = this.props.passcodeKeychainName) !== null && _a !== void 0 ? _a : passcodeKeychainNameDefault, styleContainer: this.props.stylePasscodeContainer, styleTitle: this.props.stylePasscodeTitle, styleSubTitle: this.props.stylePasscodeSubtitle, stylePasscodeHidden: this.props.stylePasscodeHidden, stylePasscodeText: this.props.stylePasscodeText, styleKeypadAlphabetCharHighlighted: this.props.styleKeypadAlphabetCharHighlighted, styleKeypadAlphabetCharNormal: this.props.styleKeypadAlphabetCharNormal, styleKeypadNumberCharHighlighted: this.props.styleKeypadNumberCharHighlighted, styleKeypadNumberCharNormal: this.props.styleKeypadNumberCharNormal })),
            type === commons_1.PasscodeType.input &&
                !this.state.passcodeLocked &&
                this.state.internalPasscodeStatus !== commons_1.PasscodeResultStatus.locked && (react_1.default.createElement(screens_1.InputPasscode, { title: this.props.passcodeInputTitle, subTitle: this.props.passcodeInputSubtitle, titleFail: this.props.passcodeInputErrorTitle, subTitleFail: this.props.passcodeInputErrorSubtitle, alphabetCharsVisible: this.props.alphabetCharsVisible, biometryEnabled: this.props.biometryEnabled, vibrateOnError: true, maxAttempts: this.props.numberOfAttempts, onSuccess: this.props.onSuccess, callbackErrorBiometric: (error) => {
                    if (this.props.onFailed) {
                        this.props.onFailed(error);
                    }
                }, onFailed: (attempts) => {
                    var _a;
                    if (attempts >= ((_a = this.props.numberOfAttempts) !== null && _a !== void 0 ? _a : 3)) {
                        this.setState({ passcodeLocked: true });
                    }
                    if (this.props.onFailed) {
                        this.props.onFailed(new Error("Passcode not correct"));
                    }
                }, timePasscodeLockedAsyncStorageName: (_b = this.props.timePasscodeLockedAsyncStorageName) !== null && _b !== void 0 ? _b : timePasscodeLockedAsyncStorageNameDefault, passcodeAttemptsAsyncStorageName: (_c = this.props.passcodeAttemptsAsyncStorageName) !== null && _c !== void 0 ? _c : passcodeAttemptsAsyncStorageNameDefault, passcodeKeychainName: (_d = this.props.passcodeKeychainName) !== null && _d !== void 0 ? _d : passcodeKeychainNameDefault, styleContainer: this.props.stylePasscodeContainer, styleTitle: this.props.stylePasscodeTitle, styleSubTitle: this.props.stylePasscodeSubtitle, stylePasscodeHidden: this.props.stylePasscodeHidden, stylePasscodeText: this.props.stylePasscodeText, styleKeypadAlphabetCharHighlighted: this.props.styleKeypadAlphabetCharHighlighted, styleKeypadAlphabetCharNormal: this.props.styleKeypadAlphabetCharNormal, styleKeypadNumberCharHighlighted: this.props.styleKeypadNumberCharHighlighted, styleKeypadNumberCharNormal: this.props.styleKeypadNumberCharNormal })),
            (passcodeStatus === commons_1.PasscodeResultStatus.locked ||
                this.state.internalPasscodeStatus === commons_1.PasscodeResultStatus.locked ||
                this.state.passcodeLocked) &&
                (this.props.lockedPage
                    ? this.props.lockedPage
                    : this.renderLockedScreen())));
    }
}
exports.Biometry = Biometry;
Biometry.defaultProps = {
    numberOfAttempts: 3,
    lockedTime: 300000,
};
const hasUserSetPasscode = (serviceName) => {
    return (0, commons_1.hasPinCode)(serviceName || passcodeKeychainNameDefault);
};
exports.hasUserSetPasscode = hasUserSetPasscode;
const deleteUserPasscode = (serviceName) => {
    return (0, commons_1.deletePinCode)(serviceName || passcodeKeychainNameDefault);
};
exports.deleteUserPasscode = deleteUserPasscode;
const resetPasscodeInternalStates = (passcodeAttempsStorageName, timePasscodeLockedStorageName) => {
    return (0, commons_1.resetInternalStates)([
        passcodeAttempsStorageName || passcodeAttemptsAsyncStorageNameDefault,
        timePasscodeLockedStorageName || timePasscodeLockedAsyncStorageNameDefault,
    ]);
};
exports.resetPasscodeInternalStates = resetPasscodeInternalStates;
