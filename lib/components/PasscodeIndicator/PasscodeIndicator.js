"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasscodeIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Dash_1 = require("./Dash");
const Dot_1 = require("./Dot");
const Text_1 = require("./Text");
class PasscodeIndicator extends react_1.PureComponent {
    render() {
        return (0, jsx_runtime_1.jsx)(Dot_1.DotIndicator, Object.assign({}, this.props));
    }
}
exports.PasscodeIndicator = PasscodeIndicator;
PasscodeIndicator.Dash = Dash_1.DashIndicator;
PasscodeIndicator.Text = Text_1.TextIndicator;
