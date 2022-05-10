"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typography = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const commons_1 = require("../../commons");
class Typography extends react_1.Component {
    render() {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!this.props.showError && ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.title, this.props.styleTitle] }, { children: this.props.title })), this.props.description && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.description, this.props.styleDescription] }, { children: this.props.description })))] }))), this.props.showError && ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.titleError, this.props.styleTitleError] }, { children: this.props.titleError })), this.props.descriptionError && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                                styles.descriptionError,
                                this.props.styleDescriptionError,
                            ] }, { children: this.props.descriptionError })))] })))] }));
    }
}
exports.Typography = Typography;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        color: commons_1.colors.title,
        marginBottom: 20,
    },
    titleError: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        color: commons_1.colors.title,
        marginBottom: 20,
    },
    description: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: commons_1.colors.description,
        marginBottom: 'auto',
    },
    descriptionError: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: commons_1.colors.fail,
        marginBottom: 'auto',
    },
});
