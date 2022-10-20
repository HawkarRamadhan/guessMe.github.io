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

import { validWordsObj as VWO } from "./validWords.js";
import { guessWordsObj as GWO } from "./guessWords.js";
// --------------- imports ---------------

export const keyboard = query(document, ".keyboard");
const accentedKeys = queryAll(keyboard, ".accented");
const shiftKey = query(keyboard, ".shift");
let shiftKeyPressed = false;

addEl(keyboard, "click", keyboardMechanics);

export function keyboardMechanics(e) {
    const target = e.target;

    // letters
    if (target.matches(".enter")) {
    }

    // shift
    if (target.matches(".shift, .shift-icon")) {
        accentShifter(shiftKeyPressed);
    }

    // back space
    if (target.matches(".back-space")) {
    }

    // enter
    if (target.matches(".enter")) {
    }
}

function accentShifter(pressed) {
    if (shiftKeyPressed === false) {
        for (const key of accentedKeys) {
            key.children[0].style.display = "none";
            key.children[1].style.display = "inline";
        }

        shiftKeyPressed = true;
    } else if (shiftKeyPressed === true) {
        for (const key of accentedKeys) {
            key.children[0].style.display = "inline";
            key.children[1].style.display = "none";
        }

        shiftKeyPressed = false;
    }
}
