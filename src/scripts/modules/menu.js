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
export let choicesC = [];
let letterLengthC = [];

const cardsContainer = query(document, ".cards-container");
const cards = queryAll(cardsContainer, ".choice-container > div");

export const downArrow = query(document, ".down-arrow");
export const upArrow = query(document, ".up-arrow");

const button = query(cardsContainer, "button");
const letLenSpan = query(cardsContainer, ".letter-length-span");
const categorySpan = query(cardsContainer, ".category");
let letLen = "...";
let PCH = "...";

let className;
export let letterLength;
export let playersChoice;

// show cards
export function showCards() {
    showCardC = cardsContainer.animate(A.showCardsP, A.showCardsTF);

    cards.forEach((card, index) => {
        // icon change
        const cardIcon = card.children[0];
        const randomNumber = Math.round(Math.random() * 32 + 1);
        const srcAttr = `./assets/icons/${card.getAttribute(
            "class"
        )}/i (${randomNumber}).png`;

        if (!card.classList.contains("random"))
            cardIcon.setAttribute("src", srcAttr);

        addEl(cardsContainer, "click", cardsEL);
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
    let target = e.target;

    // random
    if (target.parentElement.matches(".random")) {
    }
    // letter length
    if (target.matches(".letter-length span")) {
        button.animate(
            [
                {
                    transform: "scale(0)",
                    opacity: 0,
                },
                {
                    transform: "scale(1.3)",
                    opacity: 1,
                },
                {
                    transform: "scale(1)",
                    opacity: 1,
                },
            ],
            {
                duration: 1000,
                easing: "ease-in-out",
                fill: "both",
            }
        );

        // cancel animations
        letterLengthC.forEach(anime => {
            if (anime) anime.cancel();
        });

        // animate
        letterLengthC.push(target.animate(A.letterLengthP, A.letterLengthTF));

        letterLength = (() => {
            switch (target.innerText) {
                case "پێنج":
                    return 5;
                    break;
                case "شەش":
                    return 6;
                    break;
                case "حەوت":
                    return 7;
                    break;
                case "هەشت":
                    return 8;
                    break;
            }
        })();

        letLen = `${target.innerText}پیتی`;

        letLenSpan.innerText = letLen;
        categorySpan.innerText = PCH !== "..." ? PCH : "...";
        // choices
    } else if (target.matches(".cards img, .cards h3")) {
        const target = e.target.parentElement;
        let KC = target.children[1].innerText;

        button.animate(
            [
                {
                    transform: "scale(0)",
                    opacity: 0,
                },
                {
                    transform: "scale(1.3)",
                    opacity: 1,
                },
                {
                    transform: "scale(1)",
                    opacity: 1,
                },
            ],
            {
                duration: 1000,
                easing: "ease-in-out",
                fill: "both",
            }
        );

        // play and cancel animation
        choicesC.push([
            target.children[0].animate(A.choiceIconP, A.choiceIconTF),
            target.children[1].animate(A.choiceTextP, A.choiceIconTF),

            choicesC.forEach(element => {
                element.forEach(anime => {
                    for (const child of target.children) {
                        if (anime && anime !== child) anime.cancel();
                    }
                });
            }),
        ]);

        if (target.children[1].innerText === "هەڕەمەکی") {
            PCH = "وشەیەکی";
        } else {
            PCH =
                target.children[1].innerText === "پیشە"
                    ? (PCH = `${target.children[1].innerText}یەکی`)
                    : (PCH = `${target.children[1].innerText}ێکی`);
        }

        letLenSpan.innerText = letLen;
        categorySpan.innerText = PCH;

        className = target.getAttribute("class");
        playersChoice = className === "random" ? "validWords" : className;
    }

    console.log("letterLength:", letterLength);
    console.log("className:", className);

    console.log("playersChoice:", playersChoice);

    if (
        target.matches(".cards button, .cards button span") &&
        letterLength &&
        playersChoice
    ) {
        GG.guessGenerator(playersChoice, letterLength);
        showDownArrowC = downArrow.animate(A.showDownArrowP, A.showDownArrowTF);
        addEl(downArrow, "click", downArrowF);
        hideCards();
    }
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
// playersChoice = "countries";
//
// setTimeout(() => {
//     GG.guessGenerator(playersChoice, DB);
//     addClass(K.keyboard, "show-keyboard");
//     addClass(GG.wordCover, "veil-word");
//     addClass(GG.theNotch, "turn-the-notch");
// }, 0);
