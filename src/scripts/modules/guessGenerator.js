// animation controls
export let veilWordAC;
export let notchAC;
export let fieldSetAC;

// variables
export let randomNum;
export let guessWord;
export let guessWordLength;

export const guessContainer = query(document, ".guesses");
export let guessRows;
export let extraRows;

export let activeRow;
export let activeRowSlots;

export const wordCover = query(document, ".word-cover");
export const theNotch = query(wordCover, "i");
export const word = query(document, ".word");

export function guessGenerator(playersChoice, letterLength) {
    K.gameReset();

    randomNum = randomNumber();
    guessWord =
        DB.dataBase[playersChoice][letterLength][
            Math.round(
                Math.random() * DB.dataBase[playersChoice][letterLength].length
            )
        ];

    if (!guessWord) {
        // recursive
        guessGenerator(playersChoice, letterLength);
    } else {
        guessWordLength = guessWord.length;

        console.log("guessWord:", guessWord);
        console.log("guessWordLength:", guessWordLength);

        fieldSetAC = M.fieldSet.animate(A.showFieldSetP, A.showFieldSetTF);

        // guess clean up
        while (guessContainer.firstChild) {
            guessContainer.removeChild(guessContainer.firstChild);
        }

        // guess generation
        for (let rowIndex = 0; rowIndex < guessWordLength + 3; rowIndex++) {
            // rows
            const row = document.createElement("div");
            row.setAttribute("class", "guess-row");
            row.setAttribute("id", `row-${rowIndex}`);

            // slots
            for (let slotIndex = guessWordLength; slotIndex > 0; slotIndex--) {
                const slot = document.createElement("span");
                slot.setAttribute("id", `${slotIndex}`);

                row.append(slot);
            }

            guessContainer.append(row);

            const rowSlots = Array.from(row.children);

            // animation
            rowSlots.reverse().forEach((slot, index) => {
                const slotCapture = slot.animate(inicialRowAnimationP, {
                    duration: 1500,
                    // delay based
                    delay: index * 120,
                    easing: "ease-in-out",
                    fill: "forwards",
                });

                if (
                    rowIndex === guessWordLength + 2 &&
                    index === rowSlots.length - 1
                ) {
                    slotCapture.finished.then(() => {
                        veilWordAC = wordCover.animate(
                            A.veilWordP,
                            A.veilWordTF
                        );

                        veilWordAC.finished.then(() => {
                            notchAC = theNotch.animate(
                                A.turnTheNotchP,
                                A.turnTheNotchTF
                            );

                            notchAC.finished.then(() => {
                                rowActiveState(
                                    guessRows[K.activeRowCounter],
                                    "active",
                                    true
                                );

                                M.legend.innerText = M.legendText || "";

                                addClass(M.legend, "show-legend");
                            });
                        });
                    });
                }
            });
        }

        guessRows = Array.from(guessContainer.children);
        extraRows = guessRows.splice(guessRows.length - 3);

        // invisible row
        extraRows.forEach(row => {
            row.style.display = "none";
        });
    }
}

// --------------- functions ---------------
// random number
export function randomNumber() {
    const randomNumber = Math.round(Math.random() * 3);

    // reassignment
    switch (randomNumber) {
        case 0:
            return 5;
            break;

        case 1:
            return 6;
            break;

        case 2:
            return 7;
            break;
        case 3:
            return 8;
            break;
    }
}

// row activator
export function rowActiveState(row, state, keyboardTog) {
    activeRow = row;
    activeRowSlots = Array.from(activeRow.children).reverse();

    // activate
    if (state === "active") {
        addEl(activeRow, "click", activeRowCBF);

        rowActivationA(keyboardTog);

        addClass(activeRow, "activated");
    } else if (state === "deactive") {
        // deactivate
        removeEl(activeRow, "click", activeRowCBF);
        removeEl(K.keyboard, "click", K.keyboardMechanics);

        K.deactivateSlots();
    }
}

// row activation anime
export function rowActivationA(keyboardTog) {
    // slot animation
    activeRowSlots.forEach((slot, index) => {
        const slotAnime = slot.animate(
            [
                {
                    opacity: 0.2,
                },
                {
                    opacity: 1,
                },
            ],
            {
                duration: 500,
                // delay based
                delay: index * 80,
                ...A.EF,
            }
        );

        if (index === activeRowSlots.length - 1) {
            slotAnime.finished.then(() => {
                addClass(activeRowSlots[0], "active-slot");

                addEl(K.keyboard, "click", K.keyboardMechanics);
            });
        }
    });

    if (keyboardTog) addClass(K.keyboard, "show-keyboard");
}

// active row call back
function activeRowCBF(e) {
    const target = e.target;

    if (target.matches("span")) {
        K.deactivateSlots();

        addClass(target, "active-slot");
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
import { inicialRowAnimationP } from "./animations.js";
