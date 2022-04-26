"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locked = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const assets_1 = require("../../assets");
const commons_1 = require("../../commons");
const native_1 = require("@react-spring/native");
const AnimatedView = (0, native_1.animated)(react_native_1.View);
class Locked extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.animations = new native_1.Controller({
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
            config: {
                duration: 700,
            },
            delay: 300,
        });
        this.state = {
            timeDifferent: 0,
        };
        this.isUnmounted = false;
        this.timeLocked = 0;
        this.timer = this.timer.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
    }
    componentDidMount() {
        async_storage_1.default.getItem(this.props.timePasscodeLockedAsyncStorageName).then((value) => {
            if (value !== null) {
                this.timeLocked = new Date(value).getTime() + this.props.timeToLock;
            }
            else {
                this.timeLocked = new Date().getTime() + this.props.timeToLock;
            }
            this.timer();
        });
    }
    async timer() {
        const timeLockedTimestamp = new Date(this.timeLocked).getTime();
        const currentTimestamp = new Date().getTime();
        const timeDiff = timeLockedTimestamp - currentTimestamp;
        this.setState({ timeDifferent: Math.max(0, timeDiff) });
        await (0, commons_1.delay)(1000);
        if (timeDiff < 1000) {
            this.props.changeStatus(commons_1.PasscodeResultStatus.initial);
            async_storage_1.default.multiRemove([
                this.props.timePasscodeLockedAsyncStorageName,
                this.props.passcodeAttemptsAsyncStorageName,
            ]);
        }
        if (!this.isUnmounted) {
            this.timer();
        }
    }
    componentWillUnmount() {
        this.isUnmounted = true;
    }
    renderTimer(minutes, seconds) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.timerContainer, this.props.styleTimerContainer] }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.timerText, this.props.styleTimerText] }, { children: `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}` })) })));
    }
    renderTitle() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.title, this.props.styleTitle] }, { children: this.props.title || 'Maximum attempts reached' })));
    }
    renderIcon() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.iconContainer, this.props.styleIconContainer] }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: assets_1.Icons.ic_locked, style: styles.icon, resizeMode: "contain" }) })));
    }
    renderLockedScreen() {
        this.animations.start();
        const minutes = Math.floor(this.state.timeDifferent / 1000 / 60);
        const seconds = Math.floor(this.state.timeDifferent / 1000) % 60;
        return ((0, jsx_runtime_1.jsxs)(AnimatedView, Object.assign({ style: this.animations.springs }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.textContainer, this.props.styleTextContainer] }, { children: [this.props.titleComponent
                            ? this.props.titleComponent
                            : this.renderTitle(), this.props.timerComponent
                            ? this.props.timerComponent(minutes, seconds)
                            : this.renderTimer(minutes, seconds), this.props.iconComponent
                            ? this.props.iconComponent
                            : this.renderIcon(), (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.description, this.props.styleSubtitle] }, { children: this.props.subtitle
                                ? this.props.subtitle
                                : `To protect your information, access has been locked for ${Math.ceil(this.props.timeToLock / 60000)} minutes. Come back later and try again.` }))] })), this.props.buttonComponent ? this.props.buttonComponent : undefined] })));
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.container, this.props.styleContainer] }, { children: this.renderLockedScreen() })));
    }
}
exports.Locked = Locked;
Locked.defaultProps = {
    timeToLock: 300000,
};
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commons_1.colors.white,
        paddingHorizontal: 65,
        paddingVertical: 100,
    },
    timerContainer: {
        borderRadius: 10,
        borderColor: commons_1.colors.primary,
        borderWidth: 2,
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginBottom: 30,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 70,
    },
    icon: {
        height: 180,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    timerText: {
        color: commons_1.colors.primary,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 20,
    },
    title: {
        fontSize: 22,
        color: commons_1.colors.title,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 30,
    },
    description: {
        fontSize: 15,
        fontWeight: '500',
        color: commons_1.colors.description,
        textAlign: 'center',
    },
});
