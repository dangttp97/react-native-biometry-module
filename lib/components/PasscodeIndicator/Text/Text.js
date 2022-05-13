"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
class TextIndicator extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentPasscode: '',
            isError: false,
        };
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.isError && this.props.isError) {
            this.setState({ isError: this.props.isError });
        }
        this.setState({
            currentPasscode: this.props.currentPasscode,
        });
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: (0, lodash_1.range)(this.props.passcodeLength).map((index) => {
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                                styles.text,
                                this.props.styleText,
                                {
                                    color: this.state.isError
                                        ? this.props.errorColor
                                        : this.props.currentPasscode[index]
                                            ? this.props.highlightColor
                                            : this.props.normalColor,
                                },
                            ] }, { children: this.props.currentPasscode[index] })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                                styles.underline,
                                this.props.styleUnderline,
                                {
                                    backgroundColor: this.state.isError
                                        ? this.props.errorColor
                                        : this.props.currentPasscode[index]
                                            ? this.props.highlightColor
                                            : this.props.normalColor,
                                },
                            ] })] }));
            }) })));
    }
}
exports.TextIndicator = TextIndicator;
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
    },
    underline: {
        height: 1,
        borderRadius: 0.5,
        marginTop: 15,
    },
    charWrapper: {},
});
