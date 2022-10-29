// --------------- imports ---------------
import {
    log,
    query,
    queryAll,
    addClass,
    removeClass,
    addEl,
    removeEl,
} from "./globalFun.js";

import { dataBase as DB } from "./dataBase.js";

import * as A from "./animations.js";

import * as GG from "./guessGenerator.js";

import * as K from "./keyboard.js";

// --------------- imports ---------------
// animation controls
export let showCardC;
export let cardTranslationC = [];
export let showDownArrowC;
export let showUpArrowC;

const cardsContainer = query(document, ".cards-container");
const cards = queryAll(cardsContainer, "div");

export const downArrow = query(document, ".down-arrow");
export const upArrow = query(document, ".up-arrow");

export let playersChoice;

// show cards
export function showCards() {
    // showCardC = cardsContainer.animate(A.showCardsP, A.showCardsTF);

    cards.forEach((card, index) => {
        // icon change
        const cardIcon = card.children[0];
        const randomNumber = Math.round(Math.random() * 32 + 1);
        const srcAttr = `./assets/icons/${card.getAttribute(
            "class"
        )}/i (${randomNumber}).png`;

        if (!card.classList.contains("random"))
            cardIcon.setAttribute("src", srcAttr);

        // card animation
        cardTranslationC.push(
            card.children[0].animate(
                [
                    {
                        transform: "translateY(0px)",
                    },
                    {
                        transform: "translateY(10px)",
                    },
                    {
                        transform: "translateY(0px)",
                    },
                ],
                {
                    duration: 1500,
                    delay: index * 200,
                    easing: "ease-in-out",
                    fill: "both",
                    iterations: Infinity,
                }
            )
        );

        addEl(card, "click", cardsEL);
    });
}

// hide cards
export function hideCards() {
    showCardC.reverse();

    for (const control of cardTranslationC) control.cancel();

    for (const card of cards) removeEl(card, "click", cardsEL);
}

// cards click event listener
function cardsEL(e) {
    const reassignedTarget = e.target.matches("div div")
        ? e.target
        : e.target.parentElement;
    const className = reassignedTarget.getAttribute("class");

    reassignedTarget.children[1].animate(A.selectedChoiceP, A.selectedChoiceTM);

    hideCards();

    showDownArrowC = downArrow.animate(A.showDownArrowP, A.showDownArrowTF);
    addEl(downArrow, "click", downArrowF);

    playersChoice = className === "random" ? "validWords" : className;
    console.log("playersChoice:", playersChoice);

    GG.guessGenerator(playersChoice);
}

// down arrow
export function downArrowF() {
    removeEl(downArrow, "click", downArrowF);
    showDownArrowC.reverse();

    showCards();

    showUpArrowC = upArrow.animate(A.showUpArrowP, A.showUpArrowTF);
    addEl(upArrow, "click", upArrowF);
}

// up arrow
export function upArrowF() {
    showUpArrowC.reverse();
    removeClass(upArrow, "show-up-arrow");

    hideCards();

    showDownArrowC.reverse();
    addEl(downArrow, "click", downArrowF);
}

// delete
playersChoice = "countries";

setTimeout(() => {
    GG.guessGenerator(playersChoice, DB);
    addClass(K.keyboard, "show-keyboard");
    addClass(GG.wordCover, "veil-word");
    addClass(GG.theNotch, "turn-the-notch");
}, 0);
