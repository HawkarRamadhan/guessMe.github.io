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

import * as K from "./keyboard.js";

import * as F from "./fun.js";
// --------------- imports ---------------

export let guessWord;
let guessWordLength;

export const guessContainer = query(document, ".guesses");
export let guessRows;

export function guessGenerator(PCH, GWO) {
    guessWord = GWO[PCH][5][Math.round(Math.random() * GWO[PCH][5].length - 1)];
    guessWordLength = guessWord.length;

    console.log("guessWord:", guessWord);
    console.log("guessWordLength:", guessWordLength);

    // row clean up
    for (let index = 0; index < guessContainer.children.length; index++) {
        guessContainer.removeChild(guessContainer.firstElementChild);
    }

    for (let rowIndex = 0; rowIndex < guessWordLength + 1; rowIndex++) {
        // row
        const row = document.createElement("div");
        row.setAttribute("class", "guess-row");
        row.setAttribute("id", `row-${rowIndex + 1}`);

        guessContainer.append(row);

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
                            opacity: 0.05,
                            transform: "scale(0.9)",
                        },
                    ],
                    {
                        duration: 1200,
                        delay: index * 120,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                );
            });
    }

    // invisible row
    guessContainer.children[guessContainer.children.length - 1].style.display =
        "none";

    guessRows = Array.from(guessContainer.children);
    F.rowActiveState(guessRows[K.activeRowCounter], "active", true);
    addEl(K.keyboard, "click", K.keyboardMechanics);
}
