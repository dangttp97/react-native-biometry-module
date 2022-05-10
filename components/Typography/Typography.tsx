import React, { Component } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { colors } from '../../commons'

export interface TypographyProps {
  showError: boolean
  title: string
  description?: string
  titleError?: string
  descriptionError?: string

  styleContainer?: StyleProp<ViewStyle>
  styleTitle?: StyleProp<TextStyle>
  styleDescription?: StyleProp<TextStyle>
  styleTitleError?: StyleProp<TextStyle>
  styleDescriptionError?: StyleProp<TextStyle>
}

export class Typography extends Component<TypographyProps> {
  render() {
    return (
      <>
        {!this.props.showError && (
          <View style={[styles.container, this.props.styleContainer]}>
            <Text style={[styles.title, this.props.styleTitle]}>
              {this.props.title}
            </Text>
            {this.props.description && (
              <Text style={[styles.description, this.props.styleDescription]}>
                {this.props.description}
              </Text>
            )}
          </View>
        )}
        {this.props.showError && (
          <View style={[styles.container, this.props.styleContainer]}>
            <Text style={[styles.titleError, this.props.styleTitleError]}>
              {this.props.titleError}
            </Text>
            {this.props.descriptionError && (
              <Text
                style={[
                  styles.descriptionError,
                  this.props.styleDescriptionError,
                ]}>
                {this.props.descriptionError}
              </Text>
            )}
          </View>
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.title,
    marginBottom: 20,
  },
  titleError: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.title,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.description,
    marginBottom: 'auto',
  },
  descriptionError: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.fail,
    marginBottom: 'auto',
  },
})
