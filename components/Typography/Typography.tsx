import React from 'react'
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
  isError: boolean
  title: string
  description?: string
  titleError?: string
  descriptionError?: string

  errorColor?: string
  normalColor?: string

  styleContainer?: StyleProp<ViewStyle>
  styleTitle?: StyleProp<TextStyle>
  styleDescription?: StyleProp<TextStyle>
  styleTitleError?: StyleProp<TextStyle>
  styleDescriptionError?: StyleProp<TextStyle>
}

interface TypographyState {
  isError: boolean
}

export class Typography extends React.PureComponent<
  TypographyProps,
  TypographyState
> {
  constructor(props: TypographyProps) {
    super(props)
    this.state = {
      isError: false,
    }
  }

  componentDidUpdate(prevProps: Readonly<TypographyProps>): void {
    if (!prevProps.isError && this.props.isError) {
      this.setState({
        isError: this.props.isError,
      })
    }
  }

  render() {
    return (
      <>
        {!this.state.isError && (
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
        {this.state.isError && (
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
