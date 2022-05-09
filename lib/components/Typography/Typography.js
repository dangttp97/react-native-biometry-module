"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typography = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
class Typography extends react_1.PureComponent {
    render() {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!this.props.showError && ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.title, this.props.styleTitle] }, { children: this.props.title })), (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.description, this.props.styleDescription] }, { children: this.props.description }))] }))), this.props.showError && ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.titleError, this.props.styleTitleError] }, { children: this.props.titleError })), (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                                styles.descriptionError,
                                this.props.styleDescriptionError,
                            ] }, { children: this.props.descriptionError }))] })))] }));
    }
}
exports.Typography = Typography;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    title: {},
    titleError: {},
    description: {},
    descriptionError: {},
});
