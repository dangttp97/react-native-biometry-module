"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlipTimer = exports.FlipNumber = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const CountdownTimer_1 = require("../CountdownTimer");
const NumberCard_1 = require("./NumberCard");
const Separator_1 = require("./Separator");
class FlipNumber extends react_1.PureComponent {
    constructor(props) {
        super(props);
        let number = parseInt(`${this.props.number}`);
        let previousNumber = number - 1;
        if (this.props.unit !== 'hours') {
            previousNumber = previousNumber === -1 ? 59 : previousNumber;
        }
        else {
            previousNumber = previousNumber === -1 ? 23 : previousNumber;
        }
        this.number = number < 10 ? `0${number}` : number;
        this.previousNumber =
            previousNumber < 10 ? `0${previousNumber}` : previousNumber;
        this.numberSplit = this.props.number.toString().split('');
        this.previousNumberSplit = this.previousNumber.toString().split('');
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.wrapper }, { children: [(0, jsx_runtime_1.jsx)(NumberCard_1.NumberCard, { number: this.numberSplit[0], previousNumber: this.previousNumberSplit[0], size: this.props.size, perspective: this.props.perspective, numberWrapperStyle: this.props.numberWrapperStyle, cardStyle: this.props.cardStyle, flipCardStyle: this.props.flipCardStyle, numberStyle: this.props.numberStyle }), (0, jsx_runtime_1.jsx)(NumberCard_1.NumberCard, { number: this.numberSplit[1], previousNumber: this.previousNumberSplit[1], size: this.props.size, perspective: this.props.perspective, numberWrapperStyle: this.props.numberWrapperStyle, cardStyle: this.props.cardStyle, flipCardStyle: this.props.flipCardStyle, numberStyle: this.props.numberStyle })] })));
    }
}
exports.FlipNumber = FlipNumber;
class FlipTimer extends CountdownTimer_1.ICountdownTimer {
    constructor(props) {
        super(props);
    }
    render() {
        const minutes = Math.floor(this.state.timeDifferent / 1000 / 60);
        const seconds = Math.floor(this.state.timeDifferent / 1000) % 60;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.wrapper, this.props.wrapperStyle] }, { children: [!!minutes && ((0, jsx_runtime_1.jsx)(FlipNumber, Object.assign({ number: minutes, unit: "minutes" }, this.props.flipNumberProps))), (0, jsx_runtime_1.jsx)(Separator_1.Separator, {}), !!seconds && ((0, jsx_runtime_1.jsx)(FlipNumber, Object.assign({ number: seconds, unit: "seconds" }, this.props.flipNumberProps)))] })));
    }
}
exports.FlipTimer = FlipTimer;
const styles = react_native_1.StyleSheet.create({
    wrapper: { flexDirection: 'row' },
});
