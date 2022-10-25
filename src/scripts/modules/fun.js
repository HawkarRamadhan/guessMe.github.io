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

import * as GG from "./guessGenerator.js";

import * as K from "./keyboard.js";
// --------------- imports ---------------

export const wordCover = query(document, ".word-cover");
export const theNotch = query(wordCover, "i");
export const word = query(document, ".word");

const accentedKeys = queryAll(document, ".accented");
const shiftKeyIcon = query(document, ".shift-icon");
let shiftKeyPressed = false;

export let activeRow;
export let activeRowSlots;

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

// clear invalid guess
export function clearInvalidGuess() {
    activeRowSlots.reverse().forEach((slot, index) => {
        setTimeout(() => {
            slot.innerText = "";
        }, index * 120);

        activeRowSlots.reverse();

        changeActiveSlot(0);
    });
}

// --------------- keyboard ---------------
// previous row
export function previousActiveSlot() {
    let previousActiveSlot;

    activeRowSlots.forEach((slot, index, array) => {
        if (slot.classList.contains("active-slot")) {
            previousActiveSlot = index === 0 ? index : index - 1;
        }
    });

    return previousActiveSlot;
}

// next row
export function nextActiveSlot(loop) {
    let nextActiveSlot;

    activeRowSlots.forEach((slot, index, array) => {
        if (slot.classList.contains("active-slot") && !loop) {
            nextActiveSlot = index === array.length - 1 ? index : index + 1;
        } else if (slot.classList.contains("active-slot") && loop === "loop") {
            nextActiveSlot = index === array.length - 1 ? 0 : index + 1;
        }
    });

    return nextActiveSlot;
}

// change active slot
export function changeActiveSlot(activate, empty) {
    for (const slot of activeRowSlots) {
        if (slot.classList.contains("active-slot") && empty === "empty") {
            slot.innerText = "";

            removeClass(slot, "active-slot");
        } else {
            removeClass(slot, "active-slot");
        }
    }

    addClass(activeRowSlots[activate], "active-slot");
}

// accent shifter
// come back to this!!!
export function accentShifter(pressed, unpress) {
    for (const key of accentedKeys) {
        if (unpress === "unshift") {
            // shiftKeyIcon.animate(...unscaledShiftKeyIcon);

            key.children[0].style.display = "inline";
            key.children[1].style.display = "none";

            shiftKeyPressed = false;
        } else if (!pressed) {
            shiftKeyIcon.animate(...A.scaledShiftKeyIcon);

            key.children[0].style.display = "none";
            key.children[1].style.display = "inline";

            shiftKeyPressed = true;
        } else if (pressed) {
            shiftKeyIcon.animate(...A.unscaledShiftKeyIcon);

            key.children[0].style.display = "inline";
            key.children[1].style.display = "none";

            shiftKeyPressed = false;
        }
    }
}

// dupllicate removal
export function duplicateRemover(ARC, rows, letter, index, className) {
    if (ARC > 0) {
        rows.forEach((row, rowIndex) => {
            const rowSlots = Array.from(row.children).reverse();

            rowSlots.forEach((slot, slotIndex) => {
                const slotletter =
                    slot.innerText === "هـ" ? "ه" : slot.innerText;

                if (
                    rowIndex !== rows.length - 1 &&
                    slotletter === letter &&
                    slotIndex === index &&
                    slot.classList.contains(className)
                ) {
                    slot.animate(...A.notIncluded);
                    removeClass(slot, className);
                }
            });
        });
    }
}
