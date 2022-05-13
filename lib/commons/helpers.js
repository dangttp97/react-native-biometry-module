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
exports.vibrateDevice = exports.resetInternalStates = exports.deletePasscode = exports.hasPasscode = exports.changePasscode = exports.getPasscode = exports.getPasscodeWithBiometryAuthentication = exports.setNewPasscode = exports.WithBiometryAuthConfig = exports.NoBiometryAuthConfig = exports.getSupportedBiometryType = exports.delay = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const react_native_1 = require("react-native");
const Keychain = __importStar(require("react-native-keychain"));
const ReactNativeHapticFeedback = __importStar(require("react-native-haptic-feedback"));
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
exports.delay = delay;
exports.getSupportedBiometryType = Keychain.getSupportedBiometryType();
exports.NoBiometryAuthConfig = react_native_1.Platform.select({
    android: { accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD },
    ios: {},
});
exports.WithBiometryAuthConfig = react_native_1.Platform.select({
    android: {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    },
    ios: { accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY },
});
const setNewPasscode = async (serviceName, newPasscode) => {
    return await Keychain.setInternetCredentials(serviceName, serviceName, newPasscode);
};
exports.setNewPasscode = setNewPasscode;
const getPasscodeWithBiometryAuthentication = async (serviceName) => {
    return await Keychain.getInternetCredentials(serviceName, exports.WithBiometryAuthConfig).then((res) => {
        if (res) {
            return res.password;
        }
    });
};
exports.getPasscodeWithBiometryAuthentication = getPasscodeWithBiometryAuthentication;
const getPasscode = async (serviceName) => {
    return await Keychain.getInternetCredentials(serviceName, exports.NoBiometryAuthConfig).then((res) => {
        if (res) {
            return res.password;
        }
    });
};
exports.getPasscode = getPasscode;
const changePasscode = async (serviceName, oldPasscode, newPasscode) => {
    return await Keychain.getInternetCredentials(serviceName, exports.NoBiometryAuthConfig).then((res) => {
        if (res && res.password === oldPasscode) {
            (0, exports.deletePasscode)(serviceName);
            (0, exports.setNewPasscode)(serviceName, newPasscode);
        }
    });
};
exports.changePasscode = changePasscode;
const hasPasscode = async (serviceName) => {
    return await Keychain.getInternetCredentials(serviceName).then((res) => {
        return !!res && !!res.password;
    });
};
exports.hasPasscode = hasPasscode;
const deletePasscode = async (serviceName) => {
    return await Keychain.resetInternetCredentials(serviceName);
};
exports.deletePasscode = deletePasscode;
const resetInternalStates = async (asyncStorageKeys) => {
    return await async_storage_1.default.multiRemove(asyncStorageKeys);
};
exports.resetInternalStates = resetInternalStates;
const vibrateDevice = () => {
    const vibratePattern = [0, 30, 100, 50, 50, 30];
    if (react_native_1.Platform.OS === 'android') {
        react_native_1.Vibration.vibrate(vibratePattern);
    }
    else if (react_native_1.Platform.OS === 'ios') {
        ReactNativeHapticFeedback.trigger('notificationError', {
            enableVibrateFallback: true,
        });
    }
};
exports.vibrateDevice = vibrateDevice;
