import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import Biometry, {
  Helpers,
  Icons,
  Typography,
} from 'react-native-biometry-module'

export const LockedScreen = () => {
  const [lockedTime, setLockedTime] = useState(0)

  useEffect(() => {
    AsyncStorage.getItem('TimePasscodeLockedDefault', (err, data) => {
      if (!err && data) {
        setLockedTime(Number(data))
      }
    })
  }, [])

  const getMinuteSecond = (): { minute: string; second: string } => {
    const minute = Math.floor(lockedTime / 1000 / 60)
    const second = Math.floor(lockedTime / 1000) % 60
    return {
      minute: `${minute > 10 ? minute : '0' + minute}`,
      second: `${second > 10 ? second : '0' + second}`,
    }
  }

  return (
    <View>
      <Typography
        title={`You have been locked for ${getMinuteSecond().minute}`}
      />
      <Image source={Icons.ic_locked} />
    </View>
  )
}
