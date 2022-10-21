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

import { validWordsObj, validWordsObj as VWO } from "./validWords.js";

import { guessWordsObj as GWO } from "./guessWords.js";

import * as GG from "./guessGenerator.js";
// --------------- imports ---------------

export const keyboard = query(document, ".keyboard");
const accentedKeys = queryAll(keyboard, ".accented");
const shiftKey = query(keyboard, ".shift");
let shiftKeyPressed = false;

const unregistered = query(document, ".unregistered");

addEl(keyboard, "click", keyboardMechanics);

export function keyboardMechanics(e) {
    const target = e.target;

    // letters
    if (target.matches(":not(div, .fourth-row *, .shift, .shift-icon)")) {
        for (const slot of GG.activeRowSlots) {
            if (slot.classList.contains("active-slot")) {
                slot.innerText = target.innerText;

                accentShifter(shiftKeyPressed, "unshift");
            }
        }

        changeActiveSlot(nextActiveSlot());
    }

    // space
    if (target.matches(".space, .space-icon")) {
        changeActiveSlot(nextActiveSlot("loop"), "empty");
    }

    // shift
    if (target.matches(".shift, .shift-icon")) {
        accentShifter(shiftKeyPressed);
    }

    // back space
    if (target.matches(".back-space, .back-space-icon")) {
        changeActiveSlot(previousActiveSlot(), "empty");
    }

    // enter
    if (target.matches(".enter, .enter-icon")) {
        let playersGuess = [];

        removeClass(unregistered, "show-unregistered");

        // empty or not
        const hasEmptySlots = (() => {
            let emptySlotsIndex = [];

            GG.activeRowSlots.forEach((slot, index) => {
                const letter = slot.innerText;

                if (letter === "") {
                    slot.animate(
                        [
                            {
                                backgroundColor: "red",
                            },
                            {
                                backgroundColor: "white",
                            },
                            {
                                backgroundColor: "red",
                            },
                        ],
                        {
                            duration: 500,
                            easing: "ease-in-out",
                        }
                    );

                    emptySlotsIndex.push(index);

                    changeActiveSlot(emptySlotsIndex[0]);
                } else if (letter !== "") {
                    if (letter === "هـ") {
                        playersGuess.push("ه");
                    } else {
                        playersGuess.push(letter);
                    }
                }
            });

            return (emptySlotsIndex = !emptySlotsIndex.length ? false : true);
        })();

        // valid or not
        const invalidGuess = (() => {
            let result;
            if (!hasEmptySlots) {
                // valid
                if (validWordsObj[5].includes(playersGuess.join(""))) {
                    result = false;
                } else {
                    // invalid
                    unregistered.lastElementChild.innerText = `${playersGuess.join(
                        ""
                    )}`;
                    addClass(unregistered, "show-unregistered");

                    GG.activeRowSlots.reverse().forEach((slot, index) => {
                        setTimeout(() => {
                            slot.innerText = "";
                        }, index * 120);

                        GG.activeRowSlots.reverse();

                        changeActiveSlot(0);
                    });

                    result = true;
                }
            }

            return result;
        })();

        // correct or not

        // game won or not
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
        } else if (slot.classList.contains("active-slot") && loop === "loop") {
            nextActiveSlot = index === array.length - 1 ? 0 : index + 1;
        }
    });

    return nextActiveSlot;
}

function changeActiveSlot(activate, empty) {
    for (const slot of GG.activeRowSlots) {
        if (slot.classList.contains("active-slot") && empty === "empty") {
            slot.innerText = "";

            removeClass(slot, "active-slot");
        } else {
            removeClass(slot, "active-slot");
        }
    }

    addClass(GG.activeRowSlots[activate], "active-slot");
}

// accent shifter
function accentShifter(pressed, unpress) {
    for (const key of accentedKeys) {
        if (unpress === "unshift") {
            key.children[0].style.display = "inline";
            key.children[1].style.display = "none";

            shiftKeyPressed = false;
        } else if (!pressed) {
            key.children[0].style.display = "none";
            key.children[1].style.display = "inline";

            shiftKeyPressed = true;
        } else if (pressed) {
            key.children[0].style.display = "inline";
            key.children[1].style.display = "none";

            shiftKeyPressed = false;
        }
    }
}
