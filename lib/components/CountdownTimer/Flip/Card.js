"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.CardType = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
var CardType;
(function (CardType) {
    CardType[CardType["upper"] = 0] = "upper";
    CardType[CardType["lower"] = 1] = "lower";
})(CardType = exports.CardType || (exports.CardType = {}));
class Card extends react_1.PureComponent {
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [
                styles.card,
                this.props.type === CardType.upper
                    ? { borderBottomWidth: 0.5 }
                    : { borderTopWidth: 0.5 },
                this.props.cardStyle,
            ] }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                    styles.number,
                    {
                        transform: [
                            this.props.type === CardType.upper
                                ? { translateY: this.props.size * 0.3 }
                                : { translateY: -this.props.size * 0.3 },
                        ],
                        fontSize: this.props.size / 1.5,
                        lineHeight: this.props.size / 1.5,
                    },
                    this.props.numberStyle,
                ] }, { children: this.props.number })) })));
    }
}
exports.Card = Card;
const styles = react_native_1.StyleSheet.create({
    card: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1f1f1f',
        overflow: 'hidden',
    },
    number: {
        fontWeight: '700',
        color: '#cccccc',
    },
});
