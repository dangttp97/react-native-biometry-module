# react-native-biometry-module 

## A UI library support biometry authentication with passcode fallback for React Native

### Installation
```sh 
yarn add git+https://github.com/dangttp97/rn-biometry-module 
```

### Example
```tsx
import {Biometry, ScreenType} from 'react-native-biometry-module'

/*
Your render method
*/

return <Biometry type={ScreenType.select} biometryEnabled />
```

### Enumerations
#### `ScreenType` 
Type of screen to show. Includes:
- `select` Set passcode screen.
- `input` Input passcode screen.
- `changePasscode` Change passcode screen.

### Props
- #### Generals
|Key                               |Type                                                  |Default  |Description                                                                   |
|----------------------------------|------------------------------------------------------|---------|------------------------------------------------------------------------------|
|type                              |**`ScreenType`**                                      |         |Type of screen to display                                                     |
|numberOfAttempts                  |**`number`** <br> **`undefined`**                     |3        |Number of max attempts before screen is locked                                |
|lockedTime                        |**`number`** <br> **`undefined`**                     |300000   |Locked time in millisecond before screen unlocked.                            |
|alphabetCharsVisible              |**`boolean`** <br> **`undefined`**                    |false    |Is alphabet characters show below numeric char in keypad                      |
|biometryEnabled                   |**`boolean`**                                         |         |Is using biometry for authenticate user                                       |
|passcodeVisible                   |**`boolean`** <br> **`undefined`**                    |false    |Is passcode input visible                                                     |
|timePasscodeLockedAsyncStorageName|**`string`** <br> **`undefined`**                     |undefined|Locked time AsyncStorage save key                                             |
|passcodeKeychainName              |**`string`** <br> **`undefined`**                     |undefined|Key for saving passcode to keychain system                                    |
|passcodeAttemptsAsyncStorageName  |**`string`** <br> **`undefined`**                     |undefined|Key for saving number of failed attempts in AsyncStorage                      |
|onSuccess                         |**`(passcode: string) => void`** <br> **`undefined`** |undefined|Handler for confirm passcode success, input passcode success, biometry success|
|onFailed                          |**`(error?: any) => void`** <br> **`undefined`**      |undefined|Handler for confirm failed, input passcode failed, biometry failed            |
|passcodeSelectTitle               |**`string`** <br> **`undefined`**                     |undefined|Title for select passcode screen                                              |
|passcodeSelectSubtitle            |**`string`** <br> **`undefined`**                     |undefined|Subtitle for select passcode screen                                           |
|passcodeSelectErrorTitle          |**`string`** <br> **`undefined`**                     |undefined|Title for select passcode screen when error                                   |
|passcodeSelectErrorSubtitle       |**`string`** <br> **`undefined`**                     |undefined|Subtitle for select passcode screen when error                                |
|passcodeConfirmTitle              |**`string`** <br> **`undefined`**                     |undefined|Title for confirm passcode screen                                             |
|passcodeConfirmSubtitle           |**`string`** <br> **`undefined`**                     |undefined|Subtitle for confirm passcode screen                                          |
|passcodeConfirmErrorTitle         |**`string`** <br> **`undefined`**                     |undefined|Title for confirm passcode screen when error                                  |
|passcodeConfirmErrorSubtitle      |**`string`** <br> **`undefined`**                     |undefined|Subtitle for confirm passcode screen when error                               |
|passcodeInputTitle                |**`string`** <br> **`undefined`**                     |undefined|Title for input passcode screen                                               |
|passcodeInputSubtitle             |**`string`** <br> **`undefined`**                     |undefined|Subtitle for input passcode screen                                            |
|passcodeInputErrorTitle           |**`string`** <br> **`undefined`**                     |undefined|Title for input passcode screen when error                                    |
|passcodeInputErrorSubtitle        |**`string`** <br> **`undefined`**                     |undefined|Subtitle for input passcode screen when error                                 |
|lockedTitle                       |**`string`** <br> **`undefined`**                     |undefined|Title for locked screen                                                       |
|lockedSubtitle                    |**`(timer: number) => string`** <br> **`undefined`**  |undefined|Subtitle with remain locked time for locked screen                            |

- #### Custom components
|Key               |Type                                                                                             |Default  |Description                                              |
|------------------|-------------------------------------------------------------------------------------------------|---------|---------------------------------------------------------|
|deleteButtonIcon  |**`JSX.Element`** <br> **`undefined`**                                                           |undefined|Set icon for delete button keypad                        |
|biometryButtonIcon|**`JSX.Element`** <br> **`undefined`**                                                           |undefined|Set icon for biometry trigger keypad (bottom left button)|
|lockedButton      |**`JSX.Element`** <br> **`undefined`**                                                           |undefined|Locked page button                                       |
|lockedPage        |**`JSX.Element`** <br> **`undefined`**                                                           |undefined|Custom locked page                                       |
|bottomLeftButton  |**`JSX.Element`** <br> **`undefined`**                                                           |undefined|Custom bottom left button (biometry trigger button)      |
|deleteButton      |**`(handler: () => void) => JSX.Element`** <br> **`undefined`**                                  |undefined|Custom delete button keypad with handler method in module|
|keypadButton      |**`(index: number, handler: (buttonIndex: string) => void) => JSX.Element`** <br> **`undefined`**|undefined|Custom keypad button with handler and button index       |

- #### Styles
|Key                               |Type                                           |Default  |Description                                       |
|----------------------------------|-----------------------------------------------|---------|--------------------------------------------------|
|styleLockedContainer              |**`StyleProp<ViewStyle>`** <br> **`undefined`**|undefined|Style of locked screen's container                |
|styleLockedTextContainer          |**`StyleProp<ViewStyle>`** <br> **`undefined`**|undefined|Style of locked screen text container             |
|styleLockedTitle                  |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of locked screen's container                |
|styleLockedSubtitle               |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of locked screen's container                |
|styleLockedTimerContainer         |**`StyleProp<ViewStyle>`** <br> **`undefined`**|undefined|Style of locked screen's timer container          |
|styleLockedTimerText              |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of locked screen's timer text               |
|styleLockedIconContainer          |**`StyleProp<ViewStyle>`** <br> **`undefined`**|undefined|Style of locked screen's center icon container    |
|stylePasscodeContainer            |**`StyleProp<ViewStyle>`** <br> **`undefined`**|undefined|Style of passcode container                       |
|stylePasscodeTitle                |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of passcode title                           |
|stylePasscodeSubtitle             |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of passcode subtitle                        |
|stylePasscodeHidden               |**`StyleProp<ViewStyle>`** <br> **`undefined`**|undefined|Style of passcode indicator when hidden           |
|stylePasscodeText                 |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of passcode indicator when show text        |
|styleKeypadAlphabetCharHighlighted|**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of alphabet chars when keypad pressed       |
|styleKeypadNumberCharHighlighted  |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of numeric chars when keypad pressed        |
|styleKeypadAlphabetCharNormal     |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of alphabet chars when keypad normal        |
|styleKeypadNumberCharNormal       |**`StyleProp<TextStyle>`** <br> **`undefined`**|undefined|Style of numeric chars when keypad normal         |

### Helper functions
#### `async hasUserSetPasscode(serviceName?: string) => Promise<boolean>`
Returns a promise contains if passcode had been set or not
#### `async deleteUserPasscode(serviceName?: string) => Promise<void>`
Delete keychain stored passcode if existed
#### `async resetPasscodeInternalStates = (passcodeAttempsStorageName?: string, timePasscodeLockedStorageName?: string) => Promise<void>`
Reset all app internal state (time countdown for lock screen, number of fail attempts)
