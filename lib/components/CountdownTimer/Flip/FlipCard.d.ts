import { PureComponent, Ref } from 'react';
import { Animated, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
export declare enum FlipCardType {
    front = 0,
    back = 1
}
export interface FlipCardProps {
    ref: Ref<View | Animated.LegacyRef<View>>;
    type: FlipCardType;
    size: number;
    number: number | string;
    flipCardStyle?: StyleProp<ViewStyle>;
    numberStyle?: StyleProp<TextStyle>;
}
export declare class FlipCard extends PureComponent<FlipCardProps> {
    render(): JSX.Element;
}
