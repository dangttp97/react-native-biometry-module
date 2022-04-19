import * as Keychain from 'react-native-keychain';
export declare const delay: (ms: number) => Promise<unknown>;
export declare const getSupportedBiometryType: Promise<Keychain.BIOMETRY_TYPE>;
export declare const NoBiometryAuthConfig: {
    accessControl: Keychain.ACCESS_CONTROL;
} | {
    accessControl?: undefined;
};
export declare const WithBiometryAuthConfig: {
    accessControl: Keychain.ACCESS_CONTROL;
};
export declare const hasPasscode: (serviceName: string) => Promise<boolean>;
export declare const deletePasscode: (serviceName: string) => Promise<void>;
export declare const resetInternalStates: (asyncStorageKeys: string[]) => Promise<void>;
