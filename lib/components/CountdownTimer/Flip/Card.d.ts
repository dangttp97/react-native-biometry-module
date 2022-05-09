import { PureComponent } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export declare enum CardType {
    upper = 0,
    lower = 1
}
export interface CardProps {
    type: CardType;
    size: number;
    number: number | string;
    cardStyle?: StyleProp<ViewStyle>;
    numberStyle?: StyleProp<TextStyle>;
}
export declare class Card extends PureComponent<CardProps> {
    render(): JSX.Element;
}
