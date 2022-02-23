"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API_CARDS = "https://api.magicthegathering.io/v1/cards";
var PARAM_RANDOM = "random=true";

var SET_NEO = "neo";
var SET_VOW = "vow";
var SET_MID = "mid";
var SET_AFR = "afr";
var SET_STX = "stx";
var SET_KHM = "khm";
var SET_ZNR = "znr";
var SET_ARENA_BASIC_A = "ana";
var SET_ARENA_BASIC_B = "anb";

var KEY_FOREIGN_NAMES = "foreignNames";

var CARD_LIST_VIEW_ID = "cardListView";

function main() {
    requestRandomCards();
}

function requestRandomCards() {
    var targetSets = [SET_NEO, SET_VOW, SET_MID, SET_AFR, SET_STX, SET_KHM, SET_ZNR, SET_ARENA_BASIC_A, SET_ARENA_BASIC_B];
    var paramTargetSets = "set=" + targetSets.join("|");

    var requestCardNum = 10;
    var paramRequestCardNum = "pageSize=" + String(requestCardNum);

    var params = [PARAM_RANDOM, paramTargetSets, paramRequestCardNum];

    var requestUrl = API_CARDS + "?" + params.join("&");

    fetch(requestUrl).then(function (response) {
        if (!response.ok) {
            throw new Error(response.status + " " + response.statusText);
        }
        return response.json();
    }).then(function (cardInfoList) {
        updateView(cardInfoList);
    }).catch(function (e) {
        console.log(e);
    });
}

var CardView = function (_React$Component) {
    _inherits(CardView, _React$Component);

    function CardView() {
        _classCallCheck(this, CardView);

        return _possibleConstructorReturn(this, (CardView.__proto__ || Object.getPrototypeOf(CardView)).apply(this, arguments));
    }

    _createClass(CardView, [{
        key: "render",
        value: function render() {
            var cardInfo = this.props.cardInfo;
            return React.createElement(
                "div",
                { "class": "cardView" },
                cardInfo.name
            );
        }
    }]);

    return CardView;
}(React.Component);

var CardListView = function (_React$Component2) {
    _inherits(CardListView, _React$Component2);

    function CardListView() {
        _classCallCheck(this, CardListView);

        return _possibleConstructorReturn(this, (CardListView.__proto__ || Object.getPrototypeOf(CardListView)).apply(this, arguments));
    }

    _createClass(CardListView, [{
        key: "render",
        value: function render() {
            var cardInfoList = this.props.cardInfoList;
            var cardViews = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = cardInfoList.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cardInfo = _step.value;

                    var cardName = "";
                    if (KEY_FOREIGN_NAMES in cardInfo) {
                        var foreignNames = cardInfo[KEY_FOREIGN_NAMES];
                        cardName = cardInfo.name;
                    } else {
                        cardName = cardInfo.name;
                    }
                    cardViews.push(React.createElement(CardView, { cardName: "{cardName}" }));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return cardInfoList.cards.map(function (cardInfo) {
                return React.createElement(CardView, { cardInfo: cardInfo });
            });
        }
    }]);

    return CardListView;
}(React.Component);

function updateView(cardInfoList) {
    var cardListView = document.getElementById(CARD_LIST_VIEW_ID);
    ReactDOM.render(React.createElement(CardListView, { cardInfoList: cardInfoList }), cardListView);
}

main();