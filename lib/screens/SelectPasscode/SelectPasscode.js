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
exports.SelectPasscode = void 0;
const screens_1 = require("../../screens");
const commons_1 = require("../../commons");
const react_1 = __importStar(require("react"));
const Keychain = __importStar(require("react-native-keychain"));
class SelectPasscode extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = { type: commons_1.PasscodeType.select, passcode: '', errorShown: false };
        this.endProcessConfirmPasscode = this.endProcessConfirmPasscode.bind(this);
        this.endProcessSelectPasscode = this.endProcessSelectPasscode.bind(this);
    }
    endProcessSelectPasscode(passcode, isErrorValidation) {
        this.setState({
            passcode: isErrorValidation ? '' : passcode,
            type: isErrorValidation ? commons_1.PasscodeType.select : commons_1.PasscodeType.confirm,
        });
    }
    async endProcessConfirmPasscode(passcode) {
        if (this.state.passcode === passcode) {
            if (this.props.storedPasscode) {
                this.props.storedPasscode(passcode);
            }
            else {
                console.log('Save passcode');
                const biometrySupported = (await Keychain.getSupportedBiometryType()) !== null;
                await Keychain.setInternetCredentials(this.props.passcodeKeychainName, this.props.passcodeKeychainName, passcode, biometrySupported ? commons_1.WithBiometryAuthConfig : commons_1.NoBiometryAuthConfig);
            }
            if (this.props.onSuccess) {
                this.props.onSuccess(passcode);
            }
        }
        else {
            this.setState({ type: commons_1.PasscodeType.confirm, errorShown: true });
            await (0, commons_1.delay)(2000);
            this.setState({ errorShown: false });
        }
    }
    cancelConfirm() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.setState({ type: commons_1.PasscodeType.select });
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            this.state.type === commons_1.PasscodeType.select && (react_1.default.createElement(screens_1.Passcode, Object.assign({}, this.props, { endProcess: this.endProcessSelectPasscode, type: commons_1.PasscodeType.select, title: (_a = this.props.title) !== null && _a !== void 0 ? _a : '1 - Enter a PIN Code', subTitle: (_b = this.props.subTitle) !== null && _b !== void 0 ? _b : 'To keep your information secure', subTitleFail: (_c = this.props.subTitleFail) !== null && _c !== void 0 ? _c : '' }))),
            this.state.type === commons_1.PasscodeType.confirm && (react_1.default.createElement(screens_1.Passcode, Object.assign({}, this.props, { type: commons_1.PasscodeType.confirm, onCancel: this.cancelConfirm, endProcess: this.endProcessConfirmPasscode, errorShown: this.state.errorShown, title: (_d = this.props.title) !== null && _d !== void 0 ? _d : '2 - Confirm your PIN Code', subTitle: (_e = this.props.subTitle) !== null && _e !== void 0 ? _e : '', subTitleFail: (_f = this.props.subTitleFail) !== null && _f !== void 0 ? _f : 'Please try again', titleFail: (_g = this.props.titleFail) !== null && _g !== void 0 ? _g : 'Your entries did not match' })))));
    }
}
exports.SelectPasscode = SelectPasscode;
SelectPasscode.defaultProps = {
    styleContainer: undefined,
};
