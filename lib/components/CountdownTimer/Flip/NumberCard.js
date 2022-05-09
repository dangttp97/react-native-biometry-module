"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const Card_1 = require("./Card");
const FlipCard_1 = require("./FlipCard");
const MatrixMath_1 = __importDefault(require("react-native/Libraries/Utilities/MatrixMath"));
const { createIdentityMatrix, multiplyInto, reusePerspectiveCommand, reuseTranslate3dCommand, } = MatrixMath_1.default;
const rotateXMatrix = (matrix, deg) => {
    const rad = (Math.PI / 180) * deg;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const rotate = [1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1];
    multiplyInto(matrix, matrix, rotate);
};
const perspectiveMatrix = (matrix, value) => {
    const perspective = createIdentityMatrix();
    MatrixMath_1.default.reusePerspectiveCommand(perspective, value);
    multiplyInto(matrix, matrix, perspective);
};
const translateMatrix = (matrix, origin) => {
    const { x, y, z } = origin;
    const translate = createIdentityMatrix();
    reuseTranslate3dCommand(translate, x, y, z);
    multiplyInto(matrix, translate, matrix);
};
const untranslateMatrix = (matrix, origin) => {
    const { x, y, z } = origin;
    const untranslate = createIdentityMatrix();
    reuseTranslate3dCommand(untranslate, -x, -y, -z);
    multiplyInto(matrix, matrix, untranslate);
};
const { width } = react_native_1.Dimensions.get('window');
class NumberCard extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.frontRef = null;
        this.backRef = null;
        this.rotateFront = new react_native_1.Animated.Value(0);
        this.rotateBack = new react_native_1.Animated.Value(-180);
        this.setFrontRef = (ref) => {
            this.frontRef = ref;
        };
        this.setBackRef = (ref) => {
            this.backRef = ref;
        };
    }
    animateTick() {
        this.rotateFront.setValue(0);
        this.rotateBack.setValue(-180);
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(this.rotateFront, {
                toValue: 180,
                duration: 800,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(this.rotateBack, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }
    transformRef(ref, deg, y) {
        const matrix = createIdentityMatrix();
        translateMatrix(matrix, { x: 0, y, z: 0 });
        perspectiveMatrix(matrix, this.props.perspective);
        rotateXMatrix(matrix, deg);
        untranslateMatrix(matrix, { x: 0, y, z: 0 });
        if (ref) {
            ref.setNativeProps({ style: { transform: [{ matrix }] } });
        }
    }
    componentDidMount() {
        this.animateTick();
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [
                styles.numberWrapper,
                {
                    width: this.props.size * 0.8,
                    height: this.props.size * 1.2,
                    borderRadius: this.props.size / 10,
                },
                this.props.numberWrapperStyle,
            ] }, { children: [(0, jsx_runtime_1.jsx)(Card_1.Card, { type: Card_1.CardType.upper, size: this.props.size, number: this.props.number, cardStyle: this.props.cardStyle, numberStyle: this.props.numberStyle }), (0, jsx_runtime_1.jsx)(Card_1.Card, { type: Card_1.CardType.lower, size: this.props.size, number: this.props.number, cardStyle: this.props.cardStyle, numberStyle: this.props.numberStyle }), (0, jsx_runtime_1.jsx)(FlipCard_1.FlipCard, { ref: this.frontRef, type: FlipCard_1.FlipCardType.front, size: this.props.size, number: this.props.previousNumber, flipCardStyle: this.props.flipCardStyle, numberStyle: this.props.numberStyle }), (0, jsx_runtime_1.jsx)(FlipCard_1.FlipCard, { ref: this.backRef, type: FlipCard_1.FlipCardType.front, size: this.props.size, number: this.props.number, flipCardStyle: this.props.flipCardStyle, numberStyle: this.props.numberStyle })] })));
    }
}
exports.NumberCard = NumberCard;
NumberCard.defaultProps = {
    size: width / 6,
    perspective: 250,
    number: '',
    previousNumber: '',
};
const styles = react_native_1.StyleSheet.create({
    numberWrapper: {
        backgroundColor: '#333333',
        margin: 3,
        shadowColor: '#1f1f1f',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        elevation: 5,
    },
});
