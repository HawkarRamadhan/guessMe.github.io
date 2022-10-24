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

import { guessWordsObj } from "./guessWords.js";

import * as F from "./fun.js";

import { guessGenerator } from "./guessGenerator.js";

import { keyboard } from "./keyboard.js";

// --------------- animations ---------------
const selectedChoice = [
    [
        {
            transform: "scale(1)",
        },
        {
            transform: "scale(2)",
        },
        {
            transform: "scale(1)",
        },
    ],
    {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
    },
];

const downArrow = query(document, ".down-arrow");
const upArrow = query(document, ".up-arrow");
const cardsContainer = query(document, ".cards-container");
const cards = queryAll(cardsContainer, "div");

export let playersChoice;

// card translation
export function cardsToggler(state) {
    // on
    if (state === "on") {
        addClass(cardsContainer, "show-cards");

        cards.forEach((card, index) => {
            setTimeout(() => {
                addClass(card.children[0], "card-translation");
            }, index * 380);

            addEl(card, "click", cardsEL);
        });
    }

    // off
    if (state === "off") {
        removeClass(cardsContainer, "show-cards");

        for (const card of cards) {
            removeClass(cardsContainer, "show-cards");

            setTimeout(() => {
                removeClass(card.children[0], "card-translation");

                removeEl(card, "click", cardsEL);
            }, 1000);
        }
    }
}

// cards click event listener
function cardsEL(e) {
    const reassignedTarget = e.target.matches("div div")
        ? e.target
        : e.target.parentElement;

    reassignedTarget.children[1].animate(...selectedChoice);

    //     playersChoice = reassignedTarget.getAttribute("class");
    //
    //     setTimeout(() => {
    //         guessGenerator(playersChoice, guessWordsObj);
    //         addClass(keyboard, "show-keyboard");
    //         addClass(F.wordCover, "veil-word");
    //         addClass(F.theNotch, "turn-the-notch");
    //     }, 1200);

    setTimeout(() => {
        removeClass(cardsContainer, "show-cards");
        cardsToggler("off");
    }, 300);
}

// down arrow
function downArrowF() {
    removeEl(downArrow, "click", downArrowF);
    removeClass(downArrow, "show-down-arrow");

    addClass(cardsContainer, "show-cards");
    cardsToggler("on");

    addClass(upArrow, "show-up-arrow");
    addEl(upArrow, "click", upArrowF);
}

// up arrow
function upArrowF() {
    removeEl(upArrow, "click", upArrowF);
    removeClass(upArrow, "show-up-arrow");

    removeClass(cardsContainer, "show-card");
    cardsToggler("off");

    addClass(downArrow, "show-down-arrow");
    addEl(downArrow, "click", downArrowF);
}

// delete
playersChoice = "countries";

setTimeout(() => {
    guessGenerator(playersChoice, guessWordsObj);
    addClass(keyboard, "show-keyboard");
    addClass(F.wordCover, "veil-word");
    addClass(F.theNotch, "turn-the-notch");
}, 0);
