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

import * as GG from "./guessGenerator.js";
// --------------- imports ---------------

export const keyboard = query(document, ".keyboard");
const accentedKeys = queryAll(keyboard, ".accented");
const shiftKey = query(keyboard, ".shift");
let shiftKeyPressed = false;

addEl(keyboard, "click", keyboardMechanics);

export function keyboardMechanics(e) {
    const target = e.target;

    // letters
    if (target.matches(":not(div, .fourth-row *, .shift, .shift-icon)")) {
        for (const slot of GG.activeRowSlots) {
            if (slot.classList.contains("active-slot")) {
                slot.innerText = target.innerText;
            }
        }

        changeActiveSlot(nextActiveSlot(), false);
    }

    // space
    if (target.matches(".space, .space-icon")) {
        changeActiveSlot(nextActiveSlot(true), true);
    }

    // shift
    if (target.matches(".shift, .shift-icon")) {
        accentShifter(shiftKeyPressed);
    }

    // back space
    if (target.matches(".back-space, .back-space-icon")) {
        changeActiveSlot(previousActiveSlot(), true);
    }

    // enter
    if (target.matches(".enter")) {
    }
}

// previous active slot
function previousActiveSlot() {
    let previousActiveSlot;

    GG.activeRowSlots.forEach((slot, index, array) => {
        if (slot.classList.contains("active-slot")) {
            previousActiveSlot = index === 0 ? index : index - 1;
        }
    });

    return previousActiveSlot;
}

// next active slot
function nextActiveSlot(loop) {
    let nextActiveSlot;

    GG.activeRowSlots.forEach((slot, index, array) => {
        if (slot.classList.contains("active-slot") && !loop) {
            nextActiveSlot = index === array.length - 1 ? index : index + 1;
        } else if (slot.classList.contains("active-slot") && loop) {
            nextActiveSlot = index === array.length - 1 ? 0 : index + 1;
        }
    });

    return nextActiveSlot;
}

function changeActiveSlot(activate, empty) {
    for (const slot of GG.activeRowSlots) {
        if (slot.classList.contains("active-slot") && empty) {
            slot.innerText = "";

            removeClass(slot, "active-slot");
        } else {
            removeClass(slot, "active-slot");
        }
    }

    // here!!!

    addClass(GG.activeRowSlots[activate], "active-slot");
}

// accent shifter
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
