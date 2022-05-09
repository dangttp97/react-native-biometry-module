import { PureComponent } from 'react';
import { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface NumberCardProps {
    number: number | string;
    previousNumber: number | string;
    size: number;
    perspective: number;
    cardStyle?: StyleProp<ViewStyle>;
    flipCardStyle?: StyleProp<ViewStyle>;
    numberStyle?: StyleProp<TextStyle>;
    numberWrapperStyle?: StyleProp<ViewStyle>;
}
export declare class NumberCard extends PureComponent<NumberCardProps> {
    frontRef: any;
    backRef: any;
    rotateFront: Animated.Value;
    rotateBack: Animated.Value;
    static defaultProps: NumberCardProps;
    setFrontRef: (ref: any) => void;
    setBackRef: (ref: any) => void;
    animateTick(): void;
    transformRef(ref: any, deg: any, y: any): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
