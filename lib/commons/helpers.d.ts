import * as Keychain from 'react-native-keychain';
export declare const delay: (ms: number) => Promise<void>;
export declare const getSupportedBiometryType: Promise<Keychain.BIOMETRY_TYPE>;
export declare const NoBiometryAuthConfig: {
    accessControl: Keychain.ACCESS_CONTROL;
} | {
    accessControl?: undefined;
};
export declare const WithBiometryAuthConfig: {
    accessControl: Keychain.ACCESS_CONTROL;
};
export declare const setNewPasscode: (serviceName: string, newPasscode: string) => Promise<false | Keychain.Result>;
export declare const getPasscodeWithBiometryAuthentication: (serviceName: string) => Promise<string>;
export declare const getPasscode: (serviceName: string) => Promise<string>;
export declare const changePasscode: (serviceName: string, oldPasscode: string, newPasscode: string) => Promise<void>;
export declare const hasPasscode: (serviceName: string) => Promise<boolean>;
export declare const deletePasscode: (serviceName: string) => Promise<void>;
export declare const resetInternalStates: (asyncStorageKeys: string[]) => Promise<void>;
