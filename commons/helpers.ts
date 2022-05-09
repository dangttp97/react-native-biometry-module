import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import * as Keychain from 'react-native-keychain'

export const delay = (ms: number) =>
  new Promise<void>((res) => setTimeout(res, ms))

export const getSupportedBiometryType = Keychain.getSupportedBiometryType()

export const NoBiometryAuthConfig = Platform.select({
  android: { accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD },
  ios: {},
})
export const WithBiometryAuthConfig = Platform.select({
  android: {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
  },
  ios: { accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY },
})

export const setNewPasscode = async (serviceName: string, newPasscode: string) => {
  return await Keychain.setInternetCredentials(serviceName, serviceName, newPasscode)
}

export const getPasscodeWithBiometryAuthentication = async (serviceName: string) => {
  return await Keychain.getInternetCredentials(serviceName, WithBiometryAuthConfig).then(res => {
    if (res) {
      return res.password
    }
  })
}

export const getPasscode = async (serviceName: string) => {
  return await Keychain.getInternetCredentials(serviceName, NoBiometryAuthConfig).then(res => {
    if (res) {
      return res.password
    }
  })
}

export const changePasscode = async (serviceName: string, oldPasscode: string, newPasscode: string) => {
  return await Keychain.getInternetCredentials(serviceName, NoBiometryAuthConfig).then(res => {
    if (res && res.password === oldPasscode) {
      deletePasscode(serviceName)
      setNewPasscode(serviceName, newPasscode)
    }
  })
}

export const hasPasscode = async (serviceName: string) => {
  return await Keychain.getInternetCredentials(serviceName).then((res) => {
    return !!res && !!res.password
  })
}

export const deletePasscode = async (serviceName: string) => {
  return await Keychain.resetInternetCredentials(serviceName)
}

export const resetInternalStates = async (asyncStorageKeys: string[]) => {
  return await AsyncStorage.multiRemove(asyncStorageKeys)
}
