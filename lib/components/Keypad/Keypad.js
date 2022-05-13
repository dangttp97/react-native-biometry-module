"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keypad = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const lodash_1 = require("lodash");
const assets_1 = require("../../assets");
const commons_1 = require("../../commons");
class Column extends react_native_1.View {
    constructor(props) {
        super(props);
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({}, this.props, { style: [this.props.style, { flexDirection: 'column' }] })));
    }
}
class Row extends react_native_1.View {
    constructor(props) {
        super(props);
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({}, this.props, { style: [this.props.style, { flexDirection: 'row' }] })));
    }
}
class Keypad extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentPasscode: '',
            isError: false,
            selectedButtonText: '',
        };
        this.handleKeypadPress.bind(this);
        this.renderDeleteKey.bind(this);
        this.renderSingleKey.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.isError && this.props.isError) {
            this.setState({ isError: this.props.isError });
        }
    }
    async handleKeypadPress(number) {
        const currentPasscode = this.state.currentPasscode + number;
        this.setState({ currentPasscode: currentPasscode });
        if (this.props.onInputingPasscode) {
            this.props.onInputingPasscode(currentPasscode);
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
        const disabled = this.state.currentPasscode.length === this.passcodeLength ||
            this.props.disabled;
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
            }, style: styles.key }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: this.state.selectedButtonText === number
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
                if (this.state.currentPasscode.length > 0) {
                    const newPass = this.state.currentPasscode.slice(0, -1);
                    this.setState({ currentPasscode: newPass });
                    if (this.props.onInputingPasscode) {
                        this.props.onInputingPasscode(newPass);
                    }
                }
            } }, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, { children: this.props.deleteButtonIcon ? (this.props.deleteButtonIcon) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!this.props.deleteButtonDisabled && ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: assets_1.Icons.ic_delete, resizeMode: "cover" })), this.props.deleteButtonText && ((0, jsx_runtime_1.jsx)(react_native_1.Text, { children: this.props.deleteButtonText }))] })) }) })));
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: (0, jsx_runtime_1.jsxs)(Column, Object.assign({ style: styles.col }, { children: [(0, jsx_runtime_1.jsx)(Row, Object.assign({ style: styles.row }, { children: (0, lodash_1.range)(1, 4).map((value) => {
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
                                        if (this.state.currentPasscode.length > 0) {
                                            const newPass = this.state.currentPasscode.slice(0, -1);
                                            this.setState({
                                                currentPasscode: newPass,
                                            });
                                            if (this.props.onInputingPasscode) {
                                                this.props.onInputingPasscode(newPass);
                                            }
                                        }
                                    })
                                    : this.renderDeleteKey() }))] }))] })) })));
    }
}
exports.Keypad = Keypad;
Keypad.defaultProps = {
    alphabetCharsVisible: false,
};
const styles = react_native_1.StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commons_1.colors.white,
    },
    col: {
        marginLeft: commons_1.grid.unit / 2,
        marginRight: commons_1.grid.unit / 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: commons_1.grid.unit * 6,
        height: commons_1.grid.unit * 6,
        flex: 0,
    },
    row: {
        flex: 0,
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: commons_1.grid.unit * 7,
    },
    key: {
        backgroundColor: commons_1.colors.keypadBackground,
        alignItems: 'center',
        justifyContent: 'center',
        width: commons_1.grid.unit * 5,
        height: commons_1.grid.unit * 5,
        borderRadius: commons_1.grid.unit * 3,
    },
    keypadNumberHighlighted: {
        color: commons_1.colors.white,
        fontSize: 27,
        textAlign: 'center',
    },
    keypadNumberNormal: {
        color: commons_1.colors.primary,
        fontSize: 27,
        textAlign: 'center',
    },
    keypadAlphabetHighlighted: {
        color: commons_1.colors.white,
        fontSize: 13,
        textAlign: 'center',
    },
    keypadAlphabetNormal: {
        color: commons_1.colors.primary,
        fontSize: 13,
        textAlign: 'center',
    },
});
