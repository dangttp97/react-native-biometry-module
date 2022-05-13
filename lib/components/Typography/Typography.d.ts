import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface TypographyProps {
    isError: boolean;
    title: string;
    description?: string;
    titleError?: string;
    descriptionError?: string;
    errorColor?: string;
    normalColor?: string;
    styleContainer?: StyleProp<ViewStyle>;
    styleTitle?: StyleProp<TextStyle>;
    styleDescription?: StyleProp<TextStyle>;
    styleTitleError?: StyleProp<TextStyle>;
    styleDescriptionError?: StyleProp<TextStyle>;
}
interface TypographyState {
    isError: boolean;
}
export declare class Typography extends React.PureComponent<TypographyProps, TypographyState> {
    constructor(props: TypographyProps);
    componentDidUpdate(prevProps: Readonly<TypographyProps>): void;
    render(): JSX.Element;
}
export {};
