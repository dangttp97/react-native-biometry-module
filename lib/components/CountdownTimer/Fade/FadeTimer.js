"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FadeTimer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const CountdownTimer_1 = require("../CountdownTimer");
class FadeTimer extends CountdownTimer_1.ICountdownTimer {
    constructor(props) {
        super(props);
        this.moveY = new react_native_1.Animated.Value(0);
        this.fade = new react_native_1.Animated.Value(1);
        this.state = {
            timeDifferent: 0,
        };
        this.unmounted = false;
        this.lockedTime = 0;
        this.timer.bind(this);
    }
    render() {
        const minutes = Math.floor(this.state.timeDifferent / 1000 / 60);
        const seconds = Math.floor(this.state.timeDifferent / 1000) % 60;
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(this.moveY, {
                toValue: 10,
                duration: 800,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(this.fade, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.Text, Object.assign({ style: [styles.timerText, this.props.styleTimerText] }, { children: minutes < 10 ? '0' + minutes : minutes })), (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.timerText, this.props.styleTimerText] }, { children: ":" })), (0, jsx_runtime_1.jsx)(react_native_1.Animated.Text, Object.assign({ style: [styles.timerText, this.props.styleTimerText] }, { children: seconds < 10 ? '0' + seconds : seconds }))] }));
    }
}
exports.FadeTimer = FadeTimer;
FadeTimer.defaultProps = {
    lockedTime: 300000,
};
const styles = react_native_1.StyleSheet.create({
    timerText: {},
});
