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

import * as M from "./menu.js";

import * as F from "./fun.js";

import { validWordsObj } from "./validWords.js";
// --------------- imports ---------------

export let guessWord;
let guessWordLength;

const guessContainer = query(document, ".guesses");
export let guessRows;
export let activeRow;
export let activeRowSlots;

export function guessGenerator(PCH, GWO) {
    // guessWord = GWO[PCH][5][Math.round(Math.random() * GWO[PCH][5].length - 1)];
    guessWord = "مەلهە";
    guessWordLength = guessWord.length;

    console.log("guessWord:", guessWord);
    console.log("guessWordLength:", guessWordLength);

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
    activeRow = guessRows[0];
    activeRowSlots = Array.from(activeRow.children).reverse();

    F.rowActiveState(activeRow, "activate", true);

    addClass(activeRow, "activated");
}
