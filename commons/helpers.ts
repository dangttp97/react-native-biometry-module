import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import * as Keychain from 'react-native-keychain'

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const getSupportedBiometryType = Keychain.getSupportedBiometryType()

export const NoBiometryAuthConfig = Platform.select({
  android: { accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD },
  ios: {},
})
export const WithBiometryAuthConfig = Platform.select({
  android: {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
  },
  ios: {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
  },
})

export const hasPinCode = async (serviceName: string) => {
  return await Keychain.getInternetCredentials(serviceName).then(res => {
    return !!res && !!res.password
  })
}

export const deletePinCode = async (serviceName: string) => {
  return await Keychain.resetInternetCredentials(serviceName)
}

export const resetInternalStates = async (asyncStorageKeys: string[]) => {
  return await AsyncStorage.multiRemove(asyncStorageKeys)
}
