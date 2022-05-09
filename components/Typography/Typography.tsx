import { PureComponent } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

export interface TypographyProps {
  showError: boolean
  title: string
  description: string
  titleError?: string
  descriptionError?: string

  styleContainer?: StyleProp<ViewStyle>
  styleTitle?: StyleProp<TextStyle>
  styleDescription?: StyleProp<TextStyle>
  styleTitleError?: StyleProp<TextStyle>
  styleDescriptionError?: StyleProp<TextStyle>
}
export class Typography extends PureComponent<TypographyProps> {
  render() {
    return (
      <>
        {!this.props.showError && (
          <View style={[styles.container, this.props.styleContainer]}>
            <Text style={[styles.title, this.props.styleTitle]}>
              {this.props.title}
            </Text>
            <Text style={[styles.description, this.props.styleDescription]}>
              {this.props.description}
            </Text>
          </View>
        )}
        {this.props.showError && (
          <View style={[styles.container, this.props.styleContainer]}>
            <Text style={[styles.titleError, this.props.styleTitleError]}>
              {this.props.titleError}
            </Text>
            <Text
              style={[
                styles.descriptionError,
                this.props.styleDescriptionError,
              ]}>
              {this.props.descriptionError}
            </Text>
          </View>
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {},
  titleError: {},
  description: {},
  descriptionError: {},
})
