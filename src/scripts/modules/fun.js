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
// --------------- imports ---------------

export const wordCover = query(document, ".word-cover");
export const theNotch = query(wordCover, "i");

// game mechanics
export default function gameMechanics(appLaunch) {
    if (appLaunch) {
        setTimeout(() => {
            M.cardsToggler("on");
        }, 100);
    } else if (!appLaunch) {
    }
}

function activeRowCBF(e) {
    const target = e.target;

    if (target.matches("span")) {
        for (const slot of GG.activeRowSlots) {
            removeClass(slot, "active-slot");
        }

        addClass(target, "active-slot");
    }
}

// active row click event
export function activeRowCE(activeRow) {
    addEl(activeRow, "click", activeRowCBF);
}

// game reset
export function gameReset() {}
