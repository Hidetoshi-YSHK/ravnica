import React from 'react';
import ReactDOM from 'react-dom';

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

const CARD_LIST_VIEW_ID = "cardListView"

const CARD_VIEW_WIDTH = "360px"
const CARD_IMAGE_WIDTH = "320px"

const LANG_JP = "Japanese"

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

    let requestCardNum = 20;
    let paramRequestCardNum = "pageSize=" + String(requestCardNum);

    let params = [
        PARAM_RANDOM,
        paramTargetSets,
        paramRequestCardNum
    ];

    let requestUrl = API_CARDS + "?" + params.join("&");
    console.log(requestUrl)

    fetch(requestUrl).then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json()
    })
    .then((cardInfoList) => {
        updateView(cardInfoList)
    })
    .catch((e) => {
        console.log(e);
    });
}

class CardView extends React.Component {
    render() {
        const cardInfo = this.props.cardInfo;
        console.log(cardInfo)
        let cardName = cardInfo.name || "";
        let manaCost = cardInfo.manaCost || "";
        manaCost = manaCost.replace(/\{W\}/g, "⚪")
        manaCost = manaCost.replace(/\{B\}/g, "⚫")
        manaCost = manaCost.replace(/\{U\}/g, "🔵")
        manaCost = manaCost.replace(/\{R\}/g, "🔴")
        manaCost = manaCost.replace(/\{G\}/g, "🟢")
        manaCost = manaCost.replace(/\{X\}/g, "(X)")
        manaCost = manaCost.replace(/\{0\}/g, "(0)")
        manaCost = manaCost.replace(/\{1\}/g, "(1)")
        manaCost = manaCost.replace(/\{2\}/g, "(2)")
        manaCost = manaCost.replace(/\{3\}/g, "(3)")
        manaCost = manaCost.replace(/\{4\}/g, "(4)")
        manaCost = manaCost.replace(/\{5\}/g, "(5)")
        manaCost = manaCost.replace(/\{6\}/g, "(6)")
        manaCost = manaCost.replace(/\{7\}/g, "(7)")
        manaCost = manaCost.replace(/\{8\}/g, "(8)")
        manaCost = manaCost.replace(/\{9\}/g, "(9)")
        manaCost = manaCost.replace(/\{10\}/g, "(10)")
        manaCost = manaCost.replace(/\{11\}/g, "(11)")
        manaCost = manaCost.replace(/\{12\}/g, "(12)")
        manaCost = manaCost.replace(/\{/g, "(")
        manaCost = manaCost.replace(/\}/g, ")")
        let imageUrl = cardInfo.imageUrl || "";
        let cardType = cardInfo.type || "";
        let cardText = cardInfo.text || "";

        if (KEY_FOREIGN_NAMES in cardInfo) {
            for (const freignInfo of cardInfo[KEY_FOREIGN_NAMES]) {
                if (freignInfo.language != LANG_JP) {
                    continue;
                }
                cardName = freignInfo.name || cardName
                imageUrl = freignInfo.imageUrl || imageUrl
                cardType = freignInfo.type || cardType
                cardText = freignInfo.text || cardText
            }
        }

        return (
        <div className="cardView" style={{
                "width": CARD_VIEW_WIDTH,
                "border": "solid 3px",
                "marginLeft": "10px",
                "marginRight": "10px",
                "marginBottom": "20px"}}>
            <div className="cardNameAndManaCost" style={{
                "padding": "5px"}}>
                <span>{cardName}</span>
                <span style={{"float": "right"}}>{manaCost}</span>
            </div>
            <div className="cardImage" style={{
                "textAlign": "center"}}>
                <img src={imageUrl} style={{
                    "width": CARD_IMAGE_WIDTH}}></img>
            </div>
            <div className="cardType" style={{
                "padding": "5px"}}>
                <b><span>{cardType}</span></b>
            </div>
            <div className="cardText" style={{
                "whiteSpace": "pre-wrap",
                "padding": "5px"}}>
                <span>{cardText}</span>
            </div>
        </div>
        );
    }
}

class CardListView extends React.Component {
    renderCardViews(cardInfoList) {
        return cardInfoList.cards.map(
            (cardInfo, index) => 
            <CardView key={"cardView" + index} cardInfo={cardInfo} />);
    }

    render() {
        const cardInfoList = this.props.cardInfoList;
        return (<div style={{
            "display": "flex",
            "flexDirection": "row",
            "flexWrap": "wrap"}}>
            {this.renderCardViews(cardInfoList)}
        </div>);
    }
}

function updateView(cardInfoList) {
    const cardListView = document.getElementById(CARD_LIST_VIEW_ID);
    ReactDOM.render(<CardListView cardInfoList={cardInfoList} />, cardListView);
}

main();