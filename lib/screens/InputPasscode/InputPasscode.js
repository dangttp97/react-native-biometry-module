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
exports.InputPasscode = void 0;
const react_1 = __importStar(require("react"));
const assets_1 = require("../../assets");
const commons_1 = require("../../commons");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const __1 = require("../");
const react_native_1 = require("react-native");
const Keychain = __importStar(require("react-native-keychain"));
class InputPasscode extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            storedPasscode: undefined,
            passcodeStatus: commons_1.PasscodeResultStatus.initial,
            locked: false,
            biometryType: undefined,
        };
        this.endProcess = this.endProcess.bind(this);
        this.launchBiometric = this.launchBiometric.bind(this);
        Keychain.getSupportedBiometryType().then((type) => {
            switch (type) {
                case Keychain.BIOMETRY_TYPE.FACE:
                case Keychain.BIOMETRY_TYPE.FACE_ID:
                case Keychain.BIOMETRY_TYPE.IRIS:
                    this.setState({ biometryType: 'faceRecognition' });
                    break;
                case Keychain.BIOMETRY_TYPE.FINGERPRINT:
                case Keychain.BIOMETRY_TYPE.TOUCH_ID:
                    this.setState({ biometryType: 'fingerprint' });
                    break;
                case undefined:
                    this.setState({ biometryType: undefined });
                    break;
            }
        });
    }
    componentDidMount() {
        Keychain.getInternetCredentials(this.props.passcodeKeychainName, commons_1.NoBiometryAuthConfig).then((value) => {
            this.setState({
                storedPasscode: (value && value.password) || undefined,
            });
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.passcodeStatusExternal !== this.props.passcodeStatusExternal) {
            this.setState({ passcodeStatus: this.props.passcodeStatusExternal });
        }
    }
    componentWillUnmount() {
        this.setState({
            storedPasscode: undefined,
            passcodeStatus: commons_1.PasscodeResultStatus.initial,
            locked: false,
            biometryType: undefined,
        });
    }
    async endProcess(passcode) {
        let passcodeValidOverride;
        if (this.props.passcodeValidOverride) {
            passcodeValidOverride = await Promise.resolve(this.props.passcodeValidOverride(passcode));
        }
        this.setState({
            passcodeStatus: commons_1.PasscodeResultStatus.initial,
        });
        const passcodeAttemptsStr = await async_storage_1.default.getItem(this.props.passcodeAttemptsAsyncStorageName);
        let passcodeAttempts = passcodeAttemptsStr ? +passcodeAttemptsStr : 0;
        if (passcodeValidOverride !== undefined
            ? passcodeValidOverride
            : this.state.storedPasscode === passcode) {
            this.setState({
                passcodeStatus: commons_1.PasscodeResultStatus.success,
            });
            async_storage_1.default.multiRemove([
                this.props.passcodeAttemptsAsyncStorageName,
                this.props.timePasscodeLockedAsyncStorageName,
            ]);
            if (this.props.onSuccess) {
                this.props.onSuccess(this.state.storedPasscode);
            }
        }
        else {
            passcodeAttempts++;
            if (+passcodeAttempts >= this.props.maxAttempts &&
                !this.props.lockScreenDisabled) {
                await async_storage_1.default.setItem(this.props.timePasscodeLockedAsyncStorageName, new Date().toISOString());
                this.setState({
                    locked: true,
                    passcodeStatus: commons_1.PasscodeResultStatus.locked,
                });
            }
            else {
                await async_storage_1.default.setItem(this.props.passcodeAttemptsAsyncStorageName, passcodeAttempts.toString());
                this.setState({ passcodeStatus: commons_1.PasscodeResultStatus.failure });
            }
            if (this.props.onFailed) {
                await (0, commons_1.delay)(1500);
                this.props.onFailed(passcodeAttempts);
            }
        }
    }
    async launchBiometric() {
        const data = await Keychain.getInternetCredentials(this.props.passcodeKeychainName + 'Biometry', commons_1.WithBiometryAuthConfig);
        try {
            if (typeof data !== 'boolean') {
                this.endProcess(data.password);
            }
            else if (!data && this.props.callbackErrorBiometric) {
                this.props.callbackErrorBiometric(new Error('Authenticate failed'));
            }
        }
        catch (e) {
            if (this.props.callbackErrorBiometric) {
                this.props.callbackErrorBiometric(e);
            }
            else {
                console.log('Biometric error', e);
            }
        }
    }
    renderBottomLeftButton() {
        if (this.props.bottomLeftButton) {
            return this.props.bottomLeftButton;
        }
        if (!this.props.biometryEnabled || this.state.biometryType === undefined) {
            return undefined;
        }
        return (<react_native_1.TouchableWithoutFeedback onPress={async () => await this.launchBiometric()}>
        {this.state.biometryType === 'fingerprint' ? (<react_native_1.Image source={assets_1.Icons.ic_fingerprint} style={{
                    tintColor: commons_1.colors.primary,
                    height: 35,
                    width: 35,
                }}/>) : (<react_native_1.Image source={assets_1.Icons.ic_face} style={{
                    tintColor: commons_1.colors.primary,
                    height: 35,
                    width: 35,
                }}/>)}
      </react_native_1.TouchableWithoutFeedback>);
    }
    render() {
        var _a, _b, _c, _d;
        const passcode = this.state.storedPasscode;
        return (<>
        <__1.Passcode {...this.props} title={(_a = this.props.title) !== null && _a !== void 0 ? _a : 'Enter your PIN Code'} titleFail={(_b = this.props.titleFail) !== null && _b !== void 0 ? _b : 'Incorrect PIN code'} subTitle={(_c = this.props.subTitle) !== null && _c !== void 0 ? _c : ''} subTitleFail={(_d = this.props.subTitleFail) !== null && _d !== void 0 ? _d : 'Please try again'} type={commons_1.PasscodeType.input} previousPasscode={passcode} bottomLeftButton={this.renderBottomLeftButton()} endProcess={this.endProcess}/>
      </>);
    }
}
exports.InputPasscode = InputPasscode;
InputPasscode.defaultProps = {
    passcodeFallback: true,
    styleContainer: null,
};
