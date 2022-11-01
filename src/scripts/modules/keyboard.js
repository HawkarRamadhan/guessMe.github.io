// animation controls
let shiftKeyIconAC;
let unregisteredAC;
let wordRevealAC;

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

const pinCodeKeys = queryAll(keyboard, ".pin-code button");
const reveal = query(document, ".reveal");
let pin = [];
export function keyboardMechanics(e) {
    const target = e.target;

    if (unregisteredAC && unregisteredAC.currentTime !== 0) {
        unregisteredAC.cancel();
    }

    if (target.matches(".pin-code button") && pin.length < 4) {
        pin.push(target.innerText);

        if (pin.length === 4 && Number(pin.join("")) === 1776) {
            reveal.innerText = GG.guessWord;
            pin = [];

            setTimeout(() => {
                reveal.innerText = "";
            }, 50);
        } else if (pin.length === 4 && Number(pin.join("")) !== 1776) {
            query(document, ".space-icon").animate(
                [
                    {
                        transform: "translate(0, -2px)",
                    },
                ],
                {
                    duration: 300,
                    easing: "ease-in-out",
                }
            );
            pin = [];
        }
    }

    //  letters
    if (
        target.matches(
            ":not(div, .pin-code button, .fourth-row *, .shift, .shift-icon)"
        )
    ) {
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
        let playersGuess = [];

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
                DB.dataBase.validWords[M.letterLength].includes(
                    playersGuess.join("")
                )
                // DB.validWords[5].includes(playersGuess.join(""))
            )
                // valid
                result = false;
            else if (!hasEmptySlots) {
                //  invalid
                unregistered.lastElementChild.innerText = `${playersGuess.join(
                    ""
                )}`;

                unregisteredAC = unregistered.animate(
                    A.unregisteredWordP,
                    A.unregisteredWordTF
                );

                unregistered.animate(
                    [
                        {
                            transform: "translateY(-500%)",
                        },
                    ],
                    {
                        duration: 500,
                        delay: 5000,
                        easing: "ease-in-out",
                        fill: "both",
                    }
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
                wordRevealAC = GG.theNotch
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
        shiftKeyIconAC = shiftKeyIcon.animate(
            A.shiftUpScaleP,
            A.shiftUpScaleTF
        );

        for (const key of accentedKeys) {
            key.children[0].style.display = "none";
            key.children[1].style.display = "inline";
        }

        shiftKeyPress = true;
    } else if (command === "shift" && shiftKeyPress) {
        if (shiftKeyIconAC && shiftKeyIconAC.currentTime > 0)
            shiftKeyIconAC.reverse();

        for (const key of accentedKeys) {
            key.children[0].style.display = "inline";
            key.children[1].style.display = "none";
        }

        shiftKeyPress = false;
    } else if (command === "unshift" && shiftKeyIconAC) {
        if (shiftKeyIconAC && shiftKeyIconAC.currentTime > 0)
            shiftKeyIconAC.reverse();

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

    fieldSet.style.opacity = 0;

    for (const key of keys) {
        removeClass(key, "key-not-included");
        removeClass(key, "incorrect-key");
        removeClass(key, "correct-key");

        key.animate(A.keyboardKeyResetP, A.keyboardKeyResetTF);
    }

    if (shiftKeyIconAC) {
        shiftKeyIconAC.cancel();
        shiftKeyIconAC;
        shiftKeyPress = false;
    }
}

// --------------- imports ---------------
import {
    log,
    query,
    queryAll,
    addClass,
    removeClass,
    addEl,
    removeEl,
    A,
    DB,
    M,
    GG,
    K,
} from "./aggregator.js";
import { fieldSet } from "./menu.js";
