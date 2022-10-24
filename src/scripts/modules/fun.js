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

import { guessGenerator } from "./guessGenerator.js";

import { guessWordsObj } from "./guessWords.js";

import * as GG from "./guessGenerator.js";

import * as M from "./menu.js";

import * as K from "./keyboard.js";
// --------------- imports ---------------

export const wordCover = query(document, ".word-cover");
export const theNotch = query(wordCover, "i");
export const word = query(document, ".word");

// catigorizer
export function catigirizer(rawStuff, destination) {
    rawStuff.forEach(word => {
        switch (word.length) {
            case 5:
                destination[5].push(word);
                break;
            case 6:
                destination[6].push(word);
                break;
            case 7:
                destination[7].push(word);
                break;
            case 8:
                destination[8].push(word);
                break;
        }
    });
}

// game mechanics
export default function gameMechanics(appLaunch) {
    if (appLaunch) {
        setTimeout(() => {
            M.cardsToggler("on");
        }, 100);
    } else if (!appLaunch) {
    }
}

// active row call back
function activeRowCBF(e) {
    const target = e.target;

    if (target.matches("span")) {
        for (const slot of activeRowSlots) {
            removeClass(slot, "active-slot");
        }

        addClass(target, "active-slot");
    }
}

// active row click event
export let activeRow;
export let activeRowSlots;
export function rowActiveState(row, state, gameOpening) {
    activeRow = row;
    activeRowSlots = Array.from(row.children).reverse();

    if (state === "active") {
        addEl(row, "click", activeRowCBF);

        rowActivationAnime(gameOpening);
    } else if (state === "deactive") {
        removeEl(row, "click", activeRowCBF);

        for (const slot of activeRowSlots) {
            removeClass(slot, "active-slot");
        }
    }

    addClass(activeRow, "activated");
}

// row activation anime
function rowActivationAnime(gameOpening) {
    // row activation
    if (gameOpening) {
        setTimeout(() => {
            activeRowSlots.forEach((slot, index, array) => {
                slot.animate(
                    [
                        {
                            opacity: 0.2,
                            transform: "scale(0)",
                        },
                        {
                            opacity: 1,
                            transform: "scale(0)",
                        },
                        {
                            opacity: 1,
                            transform: "scale(1.1)",
                        },
                        {
                            opacity: 1,
                            transform: "scale(1)",
                        },
                    ],
                    {
                        duration: 700,
                        delay: index * 120,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                );
            });

            addClass(activeRowSlots[0], "active-slot");
        }, 1200);
    } else {
        setTimeout(() => {
            activeRowSlots.forEach((slot, index, array) => {
                slot.animate(
                    [
                        {
                            opacity: 0.2,
                            transform: "scale(0)",
                        },
                        {
                            opacity: 1,
                            transform: "scale(0)",
                        },
                        {
                            opacity: 1,
                            transform: "scale(1.1)",
                        },
                        {
                            opacity: 1,
                            transform: "scale(1)",
                        },
                    ],
                    {
                        duration: 700,
                        delay: index * 120,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                );
            });

            addClass(activeRowSlots[0], "active-slot");
        }, 500);
    }
}

export function clearInvalidGuess() {
    activeRowSlots.reverse().forEach((slot, index) => {
        setTimeout(() => {
            slot.innerText = "";
        }, index * 120);

        activeRowSlots.reverse();

        K.changeActiveSlot(0);
    });
}

// game reset
export function gameReset() {}
