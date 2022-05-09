"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_1 = require("lodash");
const react_native_1 = require("react-native");
const PasscodeIndicator_1 = require("../PasscodeIndicator");
class TextIndicator extends PasscodeIndicator_1.PasscodeIndicator {
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: (0, lodash_1.range)(this.props.passcodeLength).map((index) => {
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.text, this.props.styleText] }, { children: this.props.currentPasscode[index] })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                                styles.underline,
                                this.props.styleUnderline,
                                {
                                    backgroundColor: (0, lodash_1.isEmpty)(this.props.currentPasscode[index])
                                        ? this.props.normalColor
                                        : this.props.highlightColor,
                                },
                            ] })] }));
            }) })));
    }
}
exports.TextIndicator = TextIndicator;
const styles = react_native_1.StyleSheet.create({
    container: {},
    text: {},
    underline: {
        height: 1,
        borderRadius: 0.5,
    },
    charWrapper: {},
});
