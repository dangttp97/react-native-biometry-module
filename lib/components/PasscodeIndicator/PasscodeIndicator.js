"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasscodeIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const commons_1 = require("../../commons");
const Dash_1 = require("./Dash");
const Text_1 = require("./Text");
class PasscodeIndicator extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.animationProps = new react_native_1.Animated.Value(0);
        this.state = {
            currentPasscode: '',
            isError: false,
        };
    }
    componentDidUpdate(prevProps) {
        this.setState({ currentPasscode: this.props.currentPasscode });
        if (!prevProps.isError && this.props.isError) {
            this.setState({ isError: this.props.isError });
        }
        if (this.props.currentPasscode.length === this.props.passcodeLength) {
            if (!prevProps.isError && this.props.isError) {
                this.shake();
            }
        }
    }
    async shake() {
        const length = react_native_1.Dimensions.get('window').width / 3;
        react_native_1.Animated.sequence([
            react_native_1.Animated.timing(this.animationProps, {
                toValue: length,
                duration: 50,
                useNativeDriver: true,
                easing: (value) => react_native_1.Easing.bounce(value),
            }),
            react_native_1.Animated.timing(this.animationProps, {
                toValue: -length,
                duration: 50,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(this.animationProps, {
                toValue: length / 2,
                duration: 50,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(this.animationProps, {
                toValue: -length / 2,
                duration: 50,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(this.animationProps, {
                toValue: length / 4,
                duration: 50,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(this.animationProps, {
                toValue: -length / 4,
                duration: 50,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(this.animationProps, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, Object.assign({ style: {
                transform: [
                    {
                        translateX: this.animationProps,
                    },
                ],
            } }, { children: (0, lodash_1.range)(1, this.state.currentPasscode.length).map((index) => {
                var _a, _b;
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                        styles.dot,
                        {
                            backgroundColor: this.state.currentPasscode[index]
                                ? (_a = this.props.highlightColor) !== null && _a !== void 0 ? _a : commons_1.colors.primary
                                : (_b = this.props.normalColor) !== null && _b !== void 0 ? _b : commons_1.colors.description,
                        },
                    ] }));
            }) })));
    }
}
exports.PasscodeIndicator = PasscodeIndicator;
PasscodeIndicator.Dash = Dash_1.DashIndicator;
PasscodeIndicator.Text = Text_1.TextIndicator;
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 20,
        width: 20,
        borderRadius: 12.5,
        borderWidth: 1,
        padding: 2.5,
    },
});
