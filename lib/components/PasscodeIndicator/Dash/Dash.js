"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const commons_1 = require("../../../commons");
class DashIndicator extends react_1.default.PureComponent {
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
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: (0, lodash_1.range)(1, this.state.currentPasscode.length).map((index) => {
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.charWrapper }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                            styles.text,
                            {
                                color: this.state.isError
                                    ? this.props.errorColor
                                    : this.state.currentPasscode[index]
                                        ? commons_1.colors.primary
                                        : commons_1.colors.title,
                            },
                        ] }, { children: this.state.currentPasscode[index]
                            ? '-'
                            : this.state.currentPasscode[index] })) })));
            }) })));
    }
}
exports.DashIndicator = DashIndicator;
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    charWrapper: {
        padding: 5,
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
    },
});
