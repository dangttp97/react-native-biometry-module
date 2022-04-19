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
const react_1 = __importStar(require("react"));
const commons_1 = require("../../commons");
const __1 = require("../");
const Keychain = __importStar(require("react-native-keychain"));
class SelectPasscode extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = { type: commons_1.PasscodeType.select, passcode: '' };
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
            const biometrySupported = (await Keychain.getSupportedBiometryType()) !== null;
            if (biometrySupported && this.props.biometryEnabled) {
                await Keychain.setInternetCredentials(this.props.passcodeKeychainName + 'Biometry', this.props.passcodeKeychainName + 'Biometry', passcode, commons_1.WithBiometryAuthConfig);
            }
            await (0, commons_1.delay)(500);
            await Keychain.setInternetCredentials(this.props.passcodeKeychainName, this.props.passcodeKeychainName, passcode, commons_1.NoBiometryAuthConfig);
            if (this.props.onSuccess) {
                this.props.onSuccess(passcode);
            }
        }
        else {
            this.setState({ type: commons_1.PasscodeType.confirm });
        }
    }
    cancelConfirm() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.setState({ type: commons_1.PasscodeType.select });
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            this.state.type === commons_1.PasscodeType.select && (react_1.default.createElement(__1.Passcode, Object.assign({}, this.props, { endProcess: this.endProcessSelectPasscode, type: commons_1.PasscodeType.select, title: (_a = this.props.selectTitle) !== null && _a !== void 0 ? _a : '1 - Enter a PIN Code', subTitle: (_b = this.props.selectSubtitle) !== null && _b !== void 0 ? _b : 'To keep your information secure', titleFail: this.props.selectErrorTitle, subTitleFail: this.props.selectErrorSubtitle, validationRegex: this.props.passcodeValidator }))),
            this.state.type === commons_1.PasscodeType.confirm && (react_1.default.createElement(__1.Passcode, Object.assign({}, this.props, { type: commons_1.PasscodeType.confirm, onCancel: this.cancelConfirm, previousPasscode: this.state.passcode, endProcess: this.endProcessConfirmPasscode, title: (_c = this.props.confirmTitle) !== null && _c !== void 0 ? _c : '2 - Confirm your PIN Code', subTitle: (_d = this.props.confirmSubtitle) !== null && _d !== void 0 ? _d : '', subTitleFail: (_e = this.props.confirmErrorSubtitle) !== null && _e !== void 0 ? _e : 'Please try again', titleFail: (_f = this.props.confirmErrorTitle) !== null && _f !== void 0 ? _f : 'Your entries did not match' })))));
    }
}
exports.SelectPasscode = SelectPasscode;
SelectPasscode.defaultProps = {
    styleContainer: undefined,
};
