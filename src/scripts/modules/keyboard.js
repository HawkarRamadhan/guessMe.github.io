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

import * as F from "./fun.js";

import * as GG from "./guessGenerator.js";

// --------------- animations ---------------
const emptySlot = [
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
    },
];

const registeredGuessAnime = [
    [
        {
            opacity: 1,
        },
        {
            opacity: 0,
        },
        {
            opacity: 0,
        },
        {
            opacity: 1,
        },
    ],
    {
        duration: 500,
        easing: "ease-in-out",
        iterations: 3,
    },
];

const correct = [
    [
        {
            transform: "rotate(0deg",
        },
        {
            transform: "rotate(360deg",
        },
        {
            transform: "rotate(360deg",
            backgroundColor: "#339900",
            color: "white",
        },
    ],
    {
        duration: 1000,
        easing: "ease-in-out",
        fill: "forwards",
    },
];

const incorrect = [
    [
        {
            transform: "rotate(0deg",
        },
        {
            transform: "rotate(-360deg",
        },
        {
            transform: "rotate(-360deg",
            backgroundColor: "	#fdc010",
        },
    ],
    {
        duration: 1000,
        easing: "ease-in-out",
        fill: "forwards",
    },
];

const notIncluded = [
    [
        {
            transform: "scale(1)",
        },
        {
            transform: "scale(0)",
        },
        {
            transform: "scale(1.1)",
        },
        {
            transform: "scale(1)",
            backgroundColor: "#252522",
            color: "#6a6a6a",
        },
    ],
    {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards",
    },
];

const winnerFlag = [
    [
        {
            transform: "scale(1)",
        },
        {
            transform: "scale(1.2)",
        },
        {
            transform: "scale(1.2)",
        },
        {
            transform: "scale(1)",
        },
    ],
    {
        duration: 500,
        easing: "ease-in-out",
    },
];

const turnTheNotch = [
    [
        {
            transform: "rotate(0deg)",
        },
        {
            transform: "rotate(360deg)",
        },
        {
            transform: "rotate(420deg)",
        },
        {
            transform: "rotate(360deg)",
        },
    ],
    {
        duration: 1000,
        delay: 1000,
        easing: "ease-in-out",
        fill: "forwards",
    },
];

const unveilWord = [
    [
        {
            right: "0%",
        },
        {
            right: "-15%",
        },
        {
            right: "-15%",
        },
        {
            right: "100%",
        },
    ],
    {
        duration: 1000,
        delay: 2000,
        easing: "ease-in-out",
        fill: "forwards",
    },
];

export let activeRowCounter = 0;

let redTracker = [];
let yellowTracker = [];
let playersGuessTracker = [];

export const keyboard = query(document, ".keyboard");
const accentedKeys = queryAll(keyboard, ".accented");
const shiftKey = query(keyboard, ".shift");
let shiftKeyPressed = false;

const unregistered = query(document, ".unregistered");

addEl(keyboard, "click", keyboardMechanics);

export function keyboardMechanics(e) {
    removeClass(unregistered, "show-unregistered");

    const target = e.target;

    // ----- letters -----
    if (target.matches(":not(div, .fourth-row *, .shift, .shift-icon)")) {
        for (const slot of F.activeRowSlots) {
            if (slot.classList.contains("active-slot")) {
                slot.innerText = target.innerText;

                accentShifter(shiftKeyPressed, "unshift");
            }
        }

        changeActiveSlot(nextActiveSlot());
    }

    // ----- space -----
    if (target.matches(".space, .space-icon")) {
        changeActiveSlot(nextActiveSlot("loop"), "empty");
    }

    // ----- shift -----
    if (target.matches(".shift, .shift-icon")) {
        accentShifter(shiftKeyPressed);
    }

    // ----- back space -----
    if (target.matches(".back-space, .back-space-icon")) {
        changeActiveSlot(previousActiveSlot(), "empty");
    }

    // ----- enter -----
    if (target.matches(".enter, .enter-icon")) {
        let playersGuess = [];
        const guessWord = [...GG.guessWord];

        let gameWon = 0;

        // ----- empty or not -----
        const hasEmptySlots = (() => {
            let emptySlotsIndex = [];

            F.activeRowSlots.forEach((slot, index) => {
                const letter = slot.innerText;

                if (letter === "") {
                    slot.animate(...emptySlot);

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

        // ----- valid or not -----
        const invalidGuess = (() => {
            let result;

            // ----- valid -----
            if (
                !hasEmptySlots &&
                validWordsObj[5].includes(playersGuess.join(""))
            ) {
                result = false;
            } else {
                // ----- invalid -----
                unregistered.lastElementChild.innerText = `${playersGuess.join(
                    ""
                )}`;
                addClass(unregistered, "show-unregistered");

                F.clearInvalidGuess();

                result = true;
            }

            return result;
        })();

        const registeredGuess = (() => {
            let result = false;

            if (activeRowCounter > 0 && !hasEmptySlots && !invalidGuess) {
                playersGuessTracker.forEach(item => {
                    if (playersGuess.join("") === item[0]) {
                        GG.guessRows[item[1]].animate(...registeredGuessAnime);
                        console.log(
                            "GG.guessRows[item[1]]:",
                            GG.guessRows[item[1]]
                        );

                        F.clearInvalidGuess();

                        result = true;

                        console.log("item:", item);
                    }
                });
            }

            return result;
        })();
        console.log("registeredGuess:", registeredGuess);

        // console.log("guessWord:", guessWord);
        // console.log("playersGuess:", playersGuess);

        // ----- correct or not -----
        if (!hasEmptySlots && !invalidGuess && !registeredGuess) {
            F.activeRowSlots.forEach((slot, index, array) => {
                const letter = slot.innerText === "هـ" ? "ه" : slot.innerText;

                // ----- no letters included -----
                if (!guessWord.includes(letter)) {
                    setTimeout(() => {
                        slot.animate(...notIncluded);
                    }, index * 80);
                }

                // ----- incorrect -----
                if (
                    guessWord.includes(letter) &&
                    guessWord.indexOf(letter) !== index
                ) {
                    slot.animate(...incorrect);
                }

                // ----- correct -----
                if (guessWord.indexOf(letter) === index) {
                    slot.animate(...correct);

                    guessWord[index] = "";

                    gameWon++;
                }
            });

            playersGuessTracker.push([playersGuess.join(""), activeRowCounter]);

            F.rowActiveState(GG.guessRows[activeRowCounter], "deactive");
        }
        // console.log("playersGuessTracker:", playersGuessTracker);

        // ----- game won or not -----
        if (gameWon === guessWord.length) {
            F.word.innerText = GG.guessWord;
            F.word.style.opacity = 1;

            setTimeout(() => {
                removeEl(keyboard, "click", keyboardMechanics);

                F.activeRowSlots.forEach((slot, index) => {
                    setTimeout(() => {
                        slot.animate(...winnerFlag);
                    }, index * 120);
                });

                F.theNotch.animate(...turnTheNotch);
                F.wordCover.animate(...unveilWord);
            }, 800);

            log("Game Won");
            // ----- game lost -----
        } else if (activeRowCounter === GG.guessRows.length - 1) {
            removeEl(keyboard, "click", keyboardMechanics);

            log("Game Over");
            // ----- next guess -----
        } else if (
            !hasEmptySlots &&
            !invalidGuess &&
            !registeredGuess &&
            activeRowCounter < GG.guessRows.length - 1
        ) {
            activeRowCounter++;

            F.rowActiveState(GG.guessRows[activeRowCounter], "active");
        }
    }
}

// --------------- functions ---------------
function previousActiveSlot() {
    let previousActiveSlot;

    F.activeRowSlots.forEach((slot, index, array) => {
        if (slot.classList.contains("active-slot")) {
            previousActiveSlot = index === 0 ? index : index - 1;
        }
    });

    return previousActiveSlot;
}

function nextActiveSlot(loop) {
    let nextActiveSlot;

    F.activeRowSlots.forEach((slot, index, array) => {
        if (slot.classList.contains("active-slot") && !loop) {
            nextActiveSlot = index === array.length - 1 ? index : index + 1;
        } else if (slot.classList.contains("active-slot") && loop === "loop") {
            nextActiveSlot = index === array.length - 1 ? 0 : index + 1;
        }
    });

    return nextActiveSlot;
}

export function changeActiveSlot(activate, empty) {
    for (const slot of F.activeRowSlots) {
        if (slot.classList.contains("active-slot") && empty === "empty") {
            slot.innerText = "";

            removeClass(slot, "active-slot");
        } else {
            removeClass(slot, "active-slot");
        }
    }

    addClass(F.activeRowSlots[activate], "active-slot");
}

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
