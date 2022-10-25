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

import * as F from "./fun.js";

import { validWordsObj } from "./validWords.js";

import { cardsToggler } from "./menu.js";
// --------------- imports ---------------

export let activeRowCounter = 0;

//  guess tracker
let playersGuessTracker = [];

//  variables
export const keyboard = query(document, ".keyboard");
const unregistered = query(document, ".unregistered");

export function keyboardMechanics(e) {
    removeClass(unregistered, "show-unregistered");

    const target = e.target;

    //  letters
    if (target.matches(":not(div, .fourth-row *, .shift, .shift-icon)")) {
        for (const slot of F.activeRowSlots) {
            if (slot.classList.contains("active-slot")) {
                slot.innerText = target.innerText;

                F.accentShifter(F.shiftKeyPressed, "unshift");
            }
        }

        F.changeActiveSlot(F.nextActiveSlot());
    }

    //  space
    if (target.matches(".space, .space-icon")) {
        F.changeActiveSlot(F.nextActiveSlot("loop"), "empty");
    }

    //  shift
    if (target.matches(".shift, .shift-icon")) {
        F.accentShifter(F.shiftKeyPressed);
    }

    //  back space
    if (target.matches(".back-space, .back-space-icon")) {
        F.changeActiveSlot(F.previousActiveSlot(), "empty");
    }

    //  enter
    if (target.matches(".enter, .enter-icon")) {
        let playersGuess = [];
        const guessWord = [...GG.guessWord];

        let gameWon = 0;

        //  empty or not
        const hasEmptySlots = (() => {
            let emptySlotsIndex = [];

            F.activeRowSlots.forEach((slot, index) => {
                const letter = slot.innerText;

                if (letter === "") {
                    slot.animate(...A.emptySlot);

                    emptySlotsIndex.push(index);

                    F.changeActiveSlot(emptySlotsIndex[0]);
                } else if (letter !== "") {
                    if (letter === "هـ") playersGuess.push("ه");
                    else playersGuess.push(letter);
                }
            });

            if (!emptySlotsIndex.length) emptySlotsIndex = false;
            else emptySlotsIndex = true;

            return emptySlotsIndex;
        })();

        //  valid or not
        const invalidGuess = (() => {
            let result;

            //  valid
            if (
                !hasEmptySlots &&
                validWordsObj[5].includes(playersGuess.join(""))
            ) {
                result = false;
            } else if (!hasEmptySlots) {
                //  invalid
                unregistered.lastElementChild.innerText = `${playersGuess.join(
                    ""
                )}`;

                addClass(unregistered, "show-unregistered");

                F.clearInvalidGuess();

                result = true;
            }

            //  duplicate guess
            if (!hasEmptySlots && activeRowCounter > 0) {
                playersGuessTracker.forEach(item => {
                    if (playersGuess.join("") === item[0]) {
                        GG.guessRows[item[1]].animate(
                            ...A.registeredGuessAnime
                        );

                        F.clearInvalidGuess();

                        result = true;
                    }
                });
            }

            return result;
        })();

        //  correct or not
        if (!hasEmptySlots && !invalidGuess) {
            const activatedRows = Array.from(queryAll(document, ".activated"));

            F.activeRowSlots.forEach((slot, index, array) => {
                const letter = slot.innerText === "هـ" ? "ه" : slot.innerText;

                //  no letters included
                if (!guessWord.includes(letter)) {
                    setTimeout(() => {
                        slot.animate(...A.notIncluded);
                    }, index * 80);
                }

                //  incorrect
                if (
                    guessWord.includes(letter) &&
                    guessWord.indexOf(letter) !== index
                ) {
                    slot.animate(...A.incorrect);
                    addClass(slot, "incorrect");

                    F.duplicateRemover(
                        activeRowCounter,
                        activatedRows,
                        letter,
                        index,
                        "incorrect"
                    );
                }

                //  correct
                if (guessWord.indexOf(letter) === index) {
                    slot.animate(...A.correct);
                    addClass(slot, "correct");

                    F.duplicateRemover(
                        activeRowCounter,
                        activatedRows,
                        letter,
                        index,
                        "correct"
                    );

                    guessWord[index] = "";

                    gameWon++;
                }
            });

            playersGuessTracker.push([playersGuess.join(""), activeRowCounter]);

            F.rowActiveState(GG.guessRows[activeRowCounter], "deactive");
        }

        //  game won or not
        if (gameWon === guessWord.length) {
            // game won
            removeEl(keyboard, "click", keyboardMechanics);
            removeClass(keyboard, "show-keyboard");

            F.word.innerText = GG.guessWord;
            F.word.style.opacity = 1;

            setTimeout(() => {
                F.activeRowSlots.forEach((slot, index) => {
                    setTimeout(() => {
                        slot.animate(...A.winnerFlag);
                    }, index * 120);
                });

                F.theNotch.animate(...A.turnTheNotch);
                F.wordCover.animate(...A.unveilWord);
            }, 800);

            log("Game Won");
            //  game lost
        } else if (activeRowCounter === GG.guessRows.length - 2) {
            removeEl(keyboard, "click", keyboardMechanics);
            removeClass(keyboard, "show-keyboard");

            cardsToggler("on");

            log("Game Over");
            //  next guess
        } else if (
            !hasEmptySlots &&
            !invalidGuess &&
            activeRowCounter < GG.guessRows.length - 1
        ) {
            activeRowCounter++;

            F.rowActiveState(GG.guessRows[activeRowCounter], "active");
        }
    }
}
