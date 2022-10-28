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

import * as M from "./menu.js";

import * as GG from "./guessGenerator.js";
// --------------- imports ---------------
// animation controls
let shiftKeyIconC;
let unregisteredC;
let wordRevealC;

export let activeSlotC = [];

//  variables
export let activeRowCounter = 0;
export let playersGuessTracker = [];

export const keyboard = query(document, ".keyboard");
const keys = queryAll(keyboard, "span");
const accentedKeys = queryAll(document, ".accented");
const shiftKeyIcon = query(document, ".shift-icon");

let shiftKeyPress = false;

const unregistered = query(document, ".unregistered");

export function keyboardMechanics(e) {
    const target = e.target;

    if (unregisteredC && unregisteredC.currentTime !== 0) {
        unregisteredC.cancel();
    }

    //  letters
    if (target.matches(":not(div, .fourth-row *, .shift, .shift-icon)")) {
        for (const slot of GG.activeRowSlots) {
            if (slot.classList.contains("active-slot")) {
                slot.innerText = target.innerText;

                accentShifter("unshift");
            }
        }

        changeActiveSlot(nextActiveSlot());
    }

    //  space
    if (target.matches(".space, .space-icon")) {
        changeActiveSlot(nextActiveSlot("loop"), true);
    }

    //  shift
    if (target.matches(".shift, .shift-icon")) {
        accentShifter("shift");
    }

    //  back space
    if (target.matches(".back-space, .back-space-icon")) {
        changeActiveSlot(previousActiveSlot(), true);
    }

    //  enter
    if (target.matches(".enter, .enter-icon")) {
        const guessWord = [...GG.guessWord];
        console.log("GW:", guessWord);
        let playersGuess = [];
        console.log("PG:", playersGuess);

        let greenSlotsTracker = 0;

        //  empty or not
        const hasEmptySlots = (() => {
            let emptySlotsIndex = [];

            GG.activeRowSlots.forEach((slot, index) => {
                const letter = slot.innerText;

                if (letter === "") {
                    slot.animate(A.emptySlotP, A.emptySlotTF);

                    emptySlotsIndex.push(index);

                    changeActiveSlot(emptySlotsIndex[0]);
                } else if (letter !== "") {
                    letter === "هـ"
                        ? playersGuess.push("ه")
                        : playersGuess.push(letter);
                }
            });

            !emptySlotsIndex.length
                ? (emptySlotsIndex = false)
                : (emptySlotsIndex = true);

            return emptySlotsIndex;
        })();

        //  valid or not
        const invalidGuess = (() => {
            let result;

            //  valid
            if (
                !hasEmptySlots &&
                DB.validWords[GG.randomNum].includes(playersGuess.join(""))
                // DB.validWords[6].includes(playersGuess.join(""))
            )
                // valid
                result = false;
            else if (!hasEmptySlots) {
                //  invalid
                unregistered.lastElementChild.innerText = `${playersGuess.join(
                    ""
                )}`;

                unregisteredC = unregistered.animate(
                    A.unregisteredWordP,
                    A.unregisteredWordTF
                );

                clearInvalidGuess();

                result = true;
            }

            //  duplicate guess
            if (!hasEmptySlots && activeRowCounter > 0) {
                playersGuessTracker.forEach(item => {
                    if (playersGuess.join("") === item[0]) {
                        GG.guessRows[item[1]].animate(
                            A.duplicateGuessP,
                            A.duplicateGuessTF
                        );

                        clearInvalidGuess();

                        result = true;
                    }
                });
            }

            return result;
        })();

        //  correct or not
        if (!hasEmptySlots && !invalidGuess) {
            const activatedRows = Array.from(queryAll(document, ".activated"));

            GG.activeRowSlots.forEach((slot, index, array) => {
                const letter = slot.innerText === "هـ" ? "ه" : slot.innerText;

                //  no letters included
                if (!guessWord.includes(letter)) {
                    slot.animate(A.SlotNotIncludedP, A.SlotNotIncludedTF);

                    for (const key of keys) {
                        if (key.innerText === letter) {
                            key.animate(A.keyNotIncludedP, A.keyNotIncludedTF);
                            addClass(key, "key-not-included");
                        }
                    }
                }

                //  incorrect
                if (
                    guessWord.includes(letter) &&
                    guessWord[index] !== playersGuess[index]
                ) {
                    slot.animate(A.incorrectSlotP, A.incorrectSlotTF);
                    addClass(slot, "incorrect-key");

                    for (const key of keys) {
                        if (
                            key.innerText === letter &&
                            !key.classList.contains("correct-key")
                        ) {
                            key.animate(A.incorrectKeyP, A.incorrectKeyTF);
                            addClass(key, "incorrect-key");
                        }
                    }

                    duplicateRemover(
                        activatedRows,
                        letter,
                        index,
                        "incorrect-key"
                    );
                }

                //  correct
                if (guessWord[index] === playersGuess[index]) {
                    slot.animate(A.correctSlotP, A.correctSlotTF);
                    addClass(slot, "correct-key");

                    for (const key of keys) {
                        if (key.innerText === letter) {
                            key.animate(A.correctKeyP, A.correctKeyTF);
                            addClass(key, "correct-key");
                        }
                    }

                    duplicateRemover(
                        activatedRows,
                        letter,
                        index,
                        "correct-key"
                    );

                    greenSlotsTracker++;
                }
            });

            playersGuessTracker.push([playersGuess.join(""), activeRowCounter]);

            GG.rowActiveState(GG.guessRows[activeRowCounter], "deactive");

            for (const slot of GG.activeRowSlots) slot.style.border = "none";
        }

        //  game won or not
        if (greenSlotsTracker === guessWord.length) {
            // game won
            removeEl(keyboard, "click", keyboardMechanics);

            GG.word.innerText = GG.guessWord;
            GG.word.style.opacity = 1;

            setTimeout(() => {
                GG.activeRowSlots.forEach((slot, index) => {
                    slot.animate(A.winningAnimeP, {
                        duration: 500,
                        delay: index * 120,
                    });
                });

                keyboard.animate(
                    [
                        {
                            transform: "translateY(-2%)",
                            offset: 0.8,
                        },
                        {
                            transform: "translateY(0%)",
                        },
                        {
                            transform: "translateY(100%)",
                        },
                    ],
                    {
                        duration: 1000,
                        delay: 500,
                        ...A.EF,
                    }
                );
            }, 1000);

            setTimeout(() => {
                wordRevealC = GG.theNotch
                    .animate(A.turnTheNotchP, {
                        duration: 1500,
                        ...A.EF,
                    })
                    .finished.then(() => {
                        GG.wordCover.animate(
                            [
                                {
                                    right: "100%",
                                },
                                {
                                    right: "-10%",
                                    offset: 0.8,
                                },
                                {
                                    right: "0%",
                                },
                            ].reverse(),
                            {
                                duration: 1500,
                                ...A.EF,
                            }
                        );
                    });
            }, 2500);
        } else if (
            !hasEmptySlots &&
            !invalidGuess &&
            activeRowCounter + 1 === guessWord.length
        ) {
            //  game lost
            setTimeout(() => {
                removeEl(keyboard, "click", keyboardMechanics);
                keyboard.animate(
                    [
                        {
                            transform: "translateY(-2%)",
                            offset: 0.8,
                        },
                        {
                            transform: "translateY(0%)",
                        },
                        {
                            transform: "translateY(100%)",
                        },
                    ],
                    {
                        duration: 1000,
                        delay: 500,
                        ...A.EF,
                    }
                );
            }, 1000);

            //  next guess
        } else if (
            !hasEmptySlots &&
            !invalidGuess &&
            activeRowCounter < GG.guessRows.length - 1
        ) {
            activeRowCounter++;

            GG.rowActiveState(GG.guessRows[activeRowCounter], "active");
        }
    }
}

// --------------- functions ---------------
// accent shifter
export function accentShifter(command) {
    if (command === "shift" && !shiftKeyPress) {
        shiftKeyIconC = shiftKeyIcon.animate(A.shiftUpScaleP, A.shiftUpScaleTF);

        for (const key of accentedKeys) {
            key.children[0].style.display = "none";
            key.children[1].style.display = "inline";
        }

        shiftKeyPress = true;
    } else if (command === "shift" && shiftKeyPress) {
        if (shiftKeyIconC && shiftKeyIconC.currentTime > 0)
            shiftKeyIconC.reverse();

        for (const key of accentedKeys) {
            key.children[0].style.display = "inline";
            key.children[1].style.display = "none";
        }

        shiftKeyPress = false;
    } else if (command === "unshift" && shiftKeyIconC) {
        if (shiftKeyIconC && shiftKeyIconC.currentTime > 0)
            shiftKeyIconC.reverse();

        for (const key of accentedKeys) {
            key.children[0].style.display = "inline";
            key.children[1].style.display = "none";
        }

        shiftKeyPress = false;
    }
}

// change active slot
function changeActiveSlot(activate, empty) {
    for (const slot of GG.activeRowSlots) {
        if (slot.classList.contains("active-slot")) {
            deactivateSlots();
            removeClass(slot, "active-slot");

            if (empty) slot.innerText = "";
        }
    }

    addClass(GG.activeRowSlots[activate], "active-slot");
    activeSlotC[activate] = GG.activeRowSlots[activate].animate(
        A.activeSlotP,
        A.activeSlotTF
    );
}

// deactivate slots
export function deactivateSlots() {
    for (const animation of activeSlotC) {
        if (animation) animation.cancel();

        for (const slot of GG.activeRowSlots) slot.style.border = "none";
    }
}

// previous row
export function previousActiveSlot() {
    let previousActiveSlot;

    GG.activeRowSlots.forEach((slot, index, array) => {
        if (slot.classList.contains("active-slot")) {
            previousActiveSlot = index === 0 ? index : index - 1;
        }
    });

    return previousActiveSlot;
}

// next row
export function nextActiveSlot(loop) {
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

// clear invalid guess
export function clearInvalidGuess() {
    GG.activeRowSlots.reverse().forEach((slot, index) => {
        slot.innerText = "";
    });

    GG.activeRowSlots.reverse();
    changeActiveSlot(0);
}

// dupllicate removal
export function duplicateRemover(rows, letter, index, className) {
    if (activeRowCounter > 0) {
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
                    slot.animate(A.SlotNotIncludedP, A.SlotNotIncludedTF);
                    removeClass(slot, className);
                }
            });
        });
    }
}

export function gameReset() {
    activeRowCounter = 0;
    playersGuessTracker = [];
    GG.word.innerText = "Your Guess";
    GG.word.style.opacity = 0;

    for (const key of keys) {
        removeClass(key, "key-not-included");
        removeClass(key, "incorrect-key");
        removeClass(key, "correct-key");

        key.animate(A.keyboardKeyResetP, A.keyboardKeyResetTF);
    }
}
