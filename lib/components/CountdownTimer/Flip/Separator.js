"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
class Separator extends react_1.PureComponent {
    render() {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.separator }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.circle }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.circle })] })));
    }
}
exports.Separator = Separator;
const styles = react_native_1.StyleSheet.create({
    separator: {
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    circle: { height: 5, width: 5, borderRadius: 5, backgroundColor: '#333333' },
});
