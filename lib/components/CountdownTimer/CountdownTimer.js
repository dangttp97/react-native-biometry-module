"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountdownTimer = exports.ICountdownTimer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const commons_1 = require("../../commons");
const Fade_1 = require("./Fade");
const Flip_1 = require("./Flip");
class ICountdownTimer extends react_1.PureComponent {
    componentDidMount() {
        async_storage_1.default.getItem(this.props.timePasscodeLockedAsyncStorageName).then((value) => {
            if (value !== null) {
                this.lockedTime = new Date(value).getTime() + this.props.lockedTime;
            }
            else {
                this.lockedTime = new Date().getTime() + this.props.lockedTime;
            }
            this.timer();
        });
    }
    componentWillUnmount() {
        this.unmounted = true;
    }
    async timer() {
        const timeLockedTimestamp = new Date(this.lockedTime).getTime();
        const currentTimestamp = new Date().getTime();
        const timeDiff = timeLockedTimestamp - currentTimestamp;
        this.setState({ timeDifferent: Math.max(0, timeDiff) });
        await (0, commons_1.delay)(1000);
        if (timeDiff < 1000) {
            if (this.props.onEndCountdown) {
                this.props.onEndCountdown();
            }
            async_storage_1.default.multiRemove([
                this.props.passcodeAttemptsAsyncStorageName,
                this.props.timePasscodeLockedAsyncStorageName,
            ]);
        }
    }
}
exports.ICountdownTimer = ICountdownTimer;
class CountdownTimer extends ICountdownTimer {
    constructor(props) {
        super(props);
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
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.timerContainer, this.props.styleContainer] }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.timerText, this.props.styleTimerText] }, { children: `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}` })) })));
    }
}
exports.CountdownTimer = CountdownTimer;
CountdownTimer.Fade = Fade_1.FadeTimer;
CountdownTimer.Flip = Flip_1.FlipTimer;
CountdownTimer.defaultProps = {
    lockedTime: 300000,
};
const styles = react_native_1.StyleSheet.create({
    timerContainer: {
        borderRadius: 10,
        borderColor: commons_1.colors.primary,
        borderWidth: 2,
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginBottom: 30,
    },
    timerText: {
        color: commons_1.colors.primary,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 20,
    },
});
