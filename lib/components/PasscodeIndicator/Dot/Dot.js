"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const PasscodeIndicator_1 = require("../PasscodeIndicator");
class DotIndicator extends PasscodeIndicator_1.PasscodeIndicator {
    constructor(props) {
        super(props);
    }
    render() {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, {});
    }
}
exports.DotIndicator = DotIndicator;
