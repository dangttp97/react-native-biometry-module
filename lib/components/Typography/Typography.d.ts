import { Component } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface TypographyProps {
    showError: boolean;
    title: string;
    description?: string;
    titleError?: string;
    descriptionError?: string;
    styleContainer?: StyleProp<ViewStyle>;
    styleTitle?: StyleProp<TextStyle>;
    styleDescription?: StyleProp<TextStyle>;
    styleTitleError?: StyleProp<TextStyle>;
    styleDescriptionError?: StyleProp<TextStyle>;
}
export declare class Typography extends Component<TypographyProps> {
    render(): JSX.Element;
}
