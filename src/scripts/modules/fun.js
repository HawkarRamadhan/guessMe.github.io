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
// --------------- imports ---------------

// variables
const downArrow = query(document, ".down-arrow");
const upArrow = query(document, ".up-arrow");
const cardsContainer = query(document, ".cards-container");
const cards = queryAll(cardsContainer, "div");

let playersChoice;

let guessWord;
let guessWordLength;

const guessesC = query(document, ".guesses");

// card translation
function cardsToggler(state) {
    // on
    if (state === "on") {
        addClass(cardsContainer, "show-cards");

        cards.forEach((card, index) => {
            setTimeout(() => {
                addClass(card.children[0], "card-translation");
            }, index * 120);

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

    reassignedTarget.children[1].animate(
        [
            {
                transform: "scale(1)",
            },
            {
                transform: "scale(1.5)",
            },
            {
                transform: "scale(1)",
            },
        ],
        {
            duration: 500,
            easing: "ease-in-out",
            fill: "forwards",
        }
    );

    playersChoice = reassignedTarget.getAttribute("class");
    setTimeout(guessGenerator, 1200);

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

// game mechanics
export function gameMechanics(gameStart) {
    if (gameStart) {
        setTimeout(() => {
            cardsToggler("on");
        }, 1000);
    } else if (!gameStart) {
    }
}

// guess generator
export function guessGenerator() {
    guessWord =
        guessWordsObj.countries[5][
            Math.round(Math.random() * guessWordsObj.countries[5].length)
        ];
    guessWordLength = guessWord.length;

    for (let rowIndex = guessWordLength; rowIndex > 0; rowIndex--) {
        // row
        const row = document.createElement("div");
        row.setAttribute("class", "guess-row");
        row.setAttribute("id", `row-${rowIndex}`);

        guessesC.append(row);

        for (let slotIndex = guessWordLength; slotIndex > 0; slotIndex--) {
            const slot = document.createElement("span");
            row.append(slot);
        }

        Array.from(row.children)
            .reverse()
            .forEach((slot, index) => {
                slot.animate(
                    [
                        {
                            opacity: 0.2,
                            transform: "scale(1.1)",
                        },
                        {
                            opacity: 1,
                            transform: "scale(1.1)",
                        },
                        {
                            opacity: 1,
                            transform: "scale(1.1)",
                        },
                        {
                            opacity: 0.05,
                            transform: "scale(0.9)",
                        },
                    ],
                    {
                        duration: 800,
                        delay: index * 120,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                );
            });
    }
}

// game reset
export function gameReset() {}
