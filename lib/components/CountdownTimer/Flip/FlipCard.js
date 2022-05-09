"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlipCard = exports.FlipCardType = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
var FlipCardType;
(function (FlipCardType) {
    FlipCardType[FlipCardType["front"] = 0] = "front";
    FlipCardType[FlipCardType["back"] = 1] = "back";
})(FlipCardType = exports.FlipCardType || (exports.FlipCardType = {}));
class FlipCard extends react_1.PureComponent {
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, Object.assign({ ref: this.props.ref, style: [
                styles.flipCard,
                this.props.type === FlipCardType.front
                    ? {
                        top: 0,
                        borderTopLeftRadius: this.props.size / 10,
                        borderTopRightRadius: this.props.size / 10,
                        borderBottomWidth: 0.5,
                    }
                    : {
                        top: '50%',
                        borderBottomLeftRadius: this.props.size / 10,
                        borderBottomRightRadius: this.props.size / 10,
                        borderTopWidth: 0.5,
                    },
                this.props.flipCardStyle,
            ] }, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.overflowContainer }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                        styles.number,
                        {
                            transform: [
                                this.props.type === FlipCardType.front
                                    ? { translateY: this.props.size * 0.3 }
                                    : { translateY: -this.props.size * 0.3 },
                            ],
                            fontSize: this.props.size / 1.5,
                            lineHeight: this.props.size / 1.5,
                        },
                        this.props.numberStyle,
                    ] }, { children: this.props.number })) })) })));
    }
}
exports.FlipCard = FlipCard;
const styles = react_native_1.StyleSheet.create({
    flipCard: {
        position: 'absolute',
        left: 0,
        height: '50%',
        width: '100%',
        backgroundColor: '#333333',
        borderColor: '#1f1f1f',
        backfaceVisibility: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overflowContainer: { overflow: 'hidden' },
    number: {
        fontWeight: '700',
        color: '#cccccc',
    },
});
