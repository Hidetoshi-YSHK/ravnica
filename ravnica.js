const API_CARDS = "https://api.magicthegathering.io/v1/cards";
const PARAM_RANDOM = "random=true";

const SET_NEO = "neo";
const SET_VOW = "vow";
const SET_MID = "mid";
const SET_AFR = "afr";
const SET_STX = "stx";
const SET_KHM = "khm";
const SET_ZNR = "znr";
const SET_ARENA_BASIC_A = "ana";
const SET_ARENA_BASIC_B = "anb";

const KEY_FOREIGN_NAMES = "foreignNames"
const JAPANESE_INDEX = 4

const CARD_LIST_VIEW_ID = "cardListView"

function main() {
    requestRandomCards()
}

function requestRandomCards() {
    let targetSets = [
        SET_NEO,
        SET_VOW,
        SET_MID,
        SET_AFR,
        SET_STX,
        SET_KHM,
        SET_ZNR,
        SET_ARENA_BASIC_A,
        SET_ARENA_BASIC_B
    ];
    let paramTargetSets = "set=" + targetSets.join("|");

    let requestCardNum = 10;
    let paramRequestCardNum = "pageSize=" + String(requestCardNum);

    let params = [
        PARAM_RANDOM,
        paramTargetSets,
        paramRequestCardNum
    ];

    let requestUrl = API_CARDS + "?" + params.join("&");

    fetch(requestUrl).then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json()
    })
    .then((responseJson) => {
        alert(responseJson)
    })
    .catch((e) => {
        console.log(e);
    });
}

class CardView extends React.Component {
    render() {
        const cardName = this.props.cardName;
        return (
        <div class="cardView">
            {cardName}
        </div>
        );
    }
}

class CardListView extends React.Component {
    render() {
        const cardInfoList = this.props.cardInfoList;
        let cardViews = [];
        for (const cardInfo of cardInfoList.cards) {
            let cardName = ""
            if (KEY_FOREIGN_NAMES in cardInfo) {
                const foreignNames = cardInfo[KEY_FOREIGN_NAMES];
                cardName = foreignNames[JAPANESE_INDEX].name
            } else {
                cardName = cardInfo.name
            }
            cardViews.push(<CardView cardName={cardName}/>)
        }
        return ({cardViews});
    }
}

function updateView(cardInfoList) {
    const cardListView = document.getElementById(CARD_LIST_VIEW_ID);
    ReactDOM.render(<CardListView cardInfoList={cardInfoList} />, cardListView);
}

main();