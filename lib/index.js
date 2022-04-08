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
exports.resetPasscodeInternalStates = exports.deleteUserPasscode = exports.hasUserSetPasscode = exports.Biometry = exports.PasscodeResultStatus = exports.PasscodeType = void 0;
const react_1 = __importStar(require("react"));
const screens_1 = require("./screens");
const commons_1 = require("./commons");
Object.defineProperty(exports, "PasscodeResultStatus", { enumerable: true, get: function () { return commons_1.PasscodeResultStatus; } });
Object.defineProperty(exports, "PasscodeType", { enumerable: true, get: function () { return commons_1.PasscodeType; } });
const passcodeKeychainNameDefault = "PasscodeKeychainDefault";
const passcodeAttemptsAsyncStorageNameDefault = "PasscodeAttemptsDefault";
const timePasscodeLockedAsyncStorageNameDefault = "TimePasscodeLockedDefault";
class Biometry extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            internalPasscodeStatus: commons_1.PasscodeResultStatus.initial,
            passcodeLocked: false,
        };
        this.changeInternalStatus = this.changeInternalStatus.bind(this);
    }
    changeInternalStatus(status) {
        if (status === commons_1.PasscodeResultStatus.initial) {
            this.setState({ passcodeLocked: false });
        }
        this.setState({ internalPasscodeStatus: status });
    }
    renderLockedScreen() {
        return react_1.default.createElement(screens_1.Locked, { buttonComponent: this.props.lockedButton });
    }
    render() {
        var _a, _b;
        const { type, passcodeStatus } = this.props;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            type === commons_1.PasscodeType.select && (react_1.default.createElement(screens_1.SelectPasscode, { alphabetCharsVisible: this.props.alphabetCharsVisible, passcodeVisible: this.props.passcodeVisible, onSuccess: this.props.onSuccess, passcodeKeychainName: (_a = this.props.passcodeKeychainName) !== null && _a !== void 0 ? _a : passcodeKeychainNameDefault })),
            type === commons_1.PasscodeType.input && (react_1.default.createElement(screens_1.InputPasscode, { alphabetCharsVisible: this.props.alphabetCharsVisible, biometricDisabled: false, vibrateOnError: true, onSuccess: this.props.onSuccess, onFailed: this.props.onFailed, timePasscodeLockedAsyncStorageName: (_b = this.props.timePasscodeLockedAsyncStorageName) !== null && _b !== void 0 ? _b : timePasscodeLockedAsyncStorageNameDefault })),
            (passcodeStatus === commons_1.PasscodeResultStatus.locked ||
                this.state.internalPasscodeStatus === commons_1.PasscodeResultStatus.locked ||
                this.state.passcodeLocked) &&
                (this.props.lockedPage
                    ? this.props.lockedPage
                    : this.renderLockedScreen())));
    }
}
exports.Biometry = Biometry;
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
