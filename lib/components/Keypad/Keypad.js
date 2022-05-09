"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keypad = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const lodash_1 = require("lodash");
const assets_1 = require("../../assets");
const Column = (viewProps) => {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({}, viewProps, { style: [viewProps.style, { flexDirection: 'column' }] })));
};
const Row = (viewProps) => {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({}, viewProps, { style: [viewProps.style, { flexDirection: 'row' }] })));
};
class Keypad extends react_1.PureComponent {
    handleKeypadPress(number) {
        const currentPasscode = this.state.passcode + number;
        this.setState({ passcode: currentPasscode });
        if (this.props.onInputingPasscode) {
            this.props.onInputingPasscode(currentPasscode);
        }
        if (this.props.getCurrentLength) {
            this.props.getCurrentLength(currentPasscode.length);
        }
        if (currentPasscode.length === this.passcodeLength) {
            this.props.onEndPasscode(currentPasscode);
        }
    }
    renderSingleKey(number) {
        const alphabetMap = new Map([
            ['1', ' '],
            ['2', 'ABC'],
            ['3', 'DEF'],
            ['4', 'GHI'],
            ['5', 'JKL'],
            ['6', 'MNO'],
            ['7', 'PQRS'],
            ['8', 'TUV'],
            ['9', 'WXYZ'],
            ['0', ' '],
        ]);
        const disabled = this.state.passcode.length === this.passcodeLength || this.props.disabled;
        return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableHighlight, Object.assign({ underlayColor: this.props.keyHighlightColor, disabled: disabled, onShowUnderlay: () => {
                this.setState({
                    selectedButtonText: number,
                });
            }, onHideUnderlay: () => {
                this.setState({
                    selectedButtonText: '',
                });
            }, onPress: () => {
                this.handleKeypadPress(number);
            } }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: this.state.selectedButtonText === number
                            ? [
                                styles.keypadNumberHighlighted,
                                this.props.styleKeypadNumberHighlight,
                            ]
                            : [
                                styles.keypadNumberNormal,
                                this.props.styleKeypadNumberNormal,
                            ] }, { children: number })), this.props.alphabetCharsVisible && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: this.state.selectedButtonText === number
                            ? [
                                styles.keypadAlphabetHighlighted,
                                this.props.styleKeypadAlphabetHighlight,
                            ]
                            : [
                                styles.keypadAlphabetNormal,
                                this.props.styleKeypadAlphabetNormal,
                            ] }, { children: alphabetMap.get(number) })))] }) })));
    }
    renderDeleteKey() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableWithoutFeedback, Object.assign({ onPress: () => {
                if (this.state.passcode.length > 0) {
                    const newPass = this.state.passcode.slice(0, -1);
                    this.setState({ passcode: newPass });
                    if (this.props.getCurrentLength) {
                        this.props.getCurrentLength(newPass.length);
                    }
                }
            } }, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, { children: this.props.deleteButtonIcon ? (this.props.deleteButtonIcon) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!this.props.deleteButtonDisabled && ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: assets_1.Icons.ic_delete, resizeMode: "cover" })), this.props.deleteButtonText && ((0, jsx_runtime_1.jsx)(react_native_1.Text, { children: this.props.deleteButtonText }))] })) }) })));
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: (0, jsx_runtime_1.jsxs)(Column, Object.assign({ style: styles.col }, { children: [(0, jsx_runtime_1.jsx)(Row, Object.assign({ style: styles.row }, { children: (0, lodash_1.range)(1, 4).map((value) => {
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.key }, { children: this.props.keypadButton
                                    ? this.props.keypadButton(`${value}`, this.handleKeypadPress)
                                    : this.renderSingleKey(`${value}`) })));
                        }) })), (0, jsx_runtime_1.jsx)(Row, Object.assign({ style: styles.row }, { children: (0, lodash_1.range)(4, 7).map((value) => {
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.key }, { children: this.props.keypadButton
                                    ? this.props.keypadButton(`${value}`, this.handleKeypadPress)
                                    : this.renderSingleKey(`${value}`) })));
                        }) })), (0, jsx_runtime_1.jsx)(Row, Object.assign({ style: styles.row }, { children: (0, lodash_1.range)(7, 10).map((value) => {
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.key }, { children: this.props.keypadButton
                                    ? this.props.keypadButton(`${value}`, this.handleKeypadPress)
                                    : this.renderSingleKey(`${value}`) })));
                        }) })), (0, jsx_runtime_1.jsxs)(Row, Object.assign({ style: styles.row }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.key }, { children: this.props.bottomLeftButton })), (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.key }, { children: this.props.keypadButton
                                    ? this.props.keypadButton('0', this.handleKeypadPress)
                                    : this.renderSingleKey('0') })), (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.key }, { children: this.props.deleteButton
                                    ? this.props.deleteButton(() => {
                                        if (this.state.passcode.length > 0) {
                                            const newPass = this.state.passcode.slice(0, -1);
                                            this.setState({
                                                passcode: newPass,
                                            });
                                            if (this.props.getCurrentLength) {
                                                this.props.getCurrentLength(newPass.length);
                                            }
                                        }
                                    })
                                    : this.renderDeleteKey() }))] }))] })) }));
    }
}
exports.Keypad = Keypad;
const styles = react_native_1.StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    col: {
        width: '100%',
        flex: 1,
    },
    row: {
        flex: 1,
    },
    key: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keypadNumberHighlighted: {},
    keypadNumberNormal: {},
    keypadAlphabetHighlighted: {},
    keypadAlphabetNormal: {},
});
