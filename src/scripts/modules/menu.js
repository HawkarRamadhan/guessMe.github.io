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

import * as A from "./animations.js";

import { guessWordsObj } from "./guessWords.js";

import { guessGenerator } from "./guessGenerator.js";

import * as K from "./keyboard.js";

import * as F from "./fun.js";
// --------------- imports ---------------

export const downArrow = query(document, ".down-arrow");
export const upArrow = query(document, ".up-arrow");
const cardsContainer = query(document, ".cards-container");
const cards = queryAll(cardsContainer, "div");

export let playersChoice;

// card translation
export default function cardsToggler(state) {
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

    reassignedTarget.children[1].animate(...A.selectedChoice);

    playersChoice = reassignedTarget.getAttribute("class");

    setTimeout(() => {
        guessGenerator(playersChoice, guessWordsObj);
        addClass(K.keyboard, "show-keyboard");
        addClass(F.wordCover, "veil-word");
        addClass(F.theNotch, "turn-the-notch");
    }, 1200);

    setTimeout(() => {
        removeClass(cardsContainer, "show-cards");
        cardsToggler("off");
    }, 300);
}

// down arrow
export function downArrowF() {
    removeEl(downArrow, "click", downArrowF);
    removeClass(downArrow, "show-down-arrow");

    cardsToggler("on");

    addClass(upArrow, "show-up-arrow");
    addEl(upArrow, "click", upArrowF);
}

// up arrow
export function upArrowF() {
    removeEl(upArrow, "click", upArrowF);
    removeClass(upArrow, "show-up-arrow");

    cardsToggler("off");

    addClass(downArrow, "show-down-arrow");
    addEl(downArrow, "click", downArrowF);
}

// delete
// playersChoice = "countries";
//
// setTimeout(() => {
//     guessGenerator(playersChoice, guessWordsObj);
//     addClass(K.keyboard, "show-keyboard");
//     addClass(F.wordCover, "veil-word");
//     addClass(F.theNotch, "turn-the-notch");
// }, 0);
