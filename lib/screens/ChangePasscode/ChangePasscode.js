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
exports.ChangePasscode = void 0;
const react_1 = __importStar(require("react"));
const Passcode_1 = require("../Passcode");
const SelectPasscode_1 = require("../SelectPasscode");
const commons_1 = require("../../commons");
const react_native_1 = require("react-native");
const Keychain = __importStar(require("react-native-keychain"));
class ChangePasscode extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: commons_1.PasscodeType.inputOldPasscode,
            oldPasscode: undefined,
            newPasscode: undefined,
        };
        this.endProcessInputOldPasscode.bind(this);
        this.endProcessSelectNewPasscode.bind(this);
        this.handleCancel.bind(this);
    }
    componentDidMount() {
        Keychain.getInternetCredentials(this.props.passcodeKeychainName, commons_1.NoBiometryAuthConfig).then((value) => {
            if (value) {
                this.setState({ oldPasscode: value.password });
            }
        });
    }
    async endProcessInputOldPasscode(passcode) {
        if (passcode === this.state.oldPasscode) {
            this.setState({
                type: commons_1.PasscodeType.selectNewPasscode,
            });
            await (0, commons_1.deletePasscode)(this.props.passcodeKeychainName);
            await (0, commons_1.deletePasscode)(this.props.passcodeKeychainName + 'Biometry');
        }
    }
    async endProcessSelectNewPasscode(newPasscode) {
        await this.setKeychainPassword(newPasscode);
        this.setState({
            newPasscode: newPasscode,
        });
        if (this.props.onSuccess) {
            this.props.onSuccess(this.state.newPasscode || '');
        }
    }
    async setKeychainPassword(password) {
        const biometrySupported = (await Keychain.getSupportedBiometryType()) !== null;
        if (biometrySupported) {
            await Keychain.setInternetCredentials(this.props.passcodeKeychainName + 'Biometry', this.props.passcodeKeychainName + 'Biometry', password, commons_1.WithBiometryAuthConfig);
        }
        await Keychain.setInternetCredentials(this.props.passcodeKeychainName, this.props.passcodeKeychainName, password, commons_1.NoBiometryAuthConfig);
    }
    async handleCancel() {
        var _a;
        await this.setKeychainPassword((_a = this.state.oldPasscode) !== null && _a !== void 0 ? _a : '');
        this.setState({
            type: commons_1.PasscodeType.inputOldPasscode,
            newPasscode: undefined,
        });
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            this.props.cancelButton ? (this.props.cancelButton) : (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => this.handleCancel(), style: [
                    styles.cancelButton,
                    this.props.styleCancelButtonContainer,
                ] },
                react_1.default.createElement(react_native_1.Text, { style: [
                        styles.cancelButtonText,
                        this.props.styleCancelButtonText,
                    ] }, "Cancel"))),
            this.state.type === commons_1.PasscodeType.inputOldPasscode && (react_1.default.createElement(Passcode_1.Passcode, Object.assign({}, this.props, { type: commons_1.PasscodeType.input, title: (_a = this.props.oldPasscodeTitle) !== null && _a !== void 0 ? _a : 'Enter Your Old PIN Code', subTitle: this.props.oldPasscodeSubtitle, titleFail: (_b = this.props.oldPasscodeErrorTitle) !== null && _b !== void 0 ? _b : 'Your entries did not match', subTitleFail: (_c = this.props.oldPasscodeErrorSubtitle) !== null && _c !== void 0 ? _c : 'Please try again', previousPasscode: this.state.oldPasscode, endProcess: (passcode) => {
                    this.endProcessInputOldPasscode(passcode);
                }, styleContainer: styles.passcodeContainer }))),
            this.state.type === commons_1.PasscodeType.selectNewPasscode && (react_1.default.createElement(SelectPasscode_1.SelectPasscode, Object.assign({}, this.props, { validationRegex: this.props.newPasscodeValidator, selectTitle: (_d = this.props.newPasscodeSelectTitle) !== null && _d !== void 0 ? _d : 'Enter Your New PIN Code', selectSubtitle: (_e = this.props.newPasscodeSelectSubtitle) !== null && _e !== void 0 ? _e : '', confirmTitle: (_f = this.props.newPasscodeConfirmTitle) !== null && _f !== void 0 ? _f : 'Verify Your New PIN Code', confirmSubtitle: (_g = this.props.newPasscodeConfirmSubtitle) !== null && _g !== void 0 ? _g : '', selectErrorSubtitle: (_h = this.props.newPasscodeSelectErrorTitle) !== null && _h !== void 0 ? _h : '', confirmErrorSubtitle: this.props.newPasscodeConfirmErrorSubtitle, onSuccess: this.endProcessSelectNewPasscode, styleTitle: this.props.styleSelectNewPasscodeTitle, styleSubTitle: this.props.styleSelectNewPasscodeSubtitle, styleContainer: styles.passcodeContainer })))));
    }
}
exports.ChangePasscode = ChangePasscode;
const styles = react_native_1.StyleSheet.create({
    cancelButton: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 20,
        padding: 5,
    },
    cancelButtonText: {
        fontSize: 16,
        color: commons_1.colors.primary,
    },
    passcodeContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 100,
    },
});
