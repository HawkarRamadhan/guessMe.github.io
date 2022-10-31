// animation controls
export let keyboardTogglerC;
export let veilWordC;
export let notchC;

// variables
export let randomNum;
export let guessWord;
let guessWordLength;

export const guessContainer = query(document, ".guesses");
export let guessRows;

export let activeRow;
export let activeRowSlots;

export const wordCover = query(document, ".word-cover");
export const theNotch = query(wordCover, "i");
export const word = query(document, ".word");

export function guessGenerator(playersChoice, letterLength) {
    M.fieldSet.style.opacity = 1;
    K.gameReset();

    randomNum = randomNumber();
    guessWord =
        DB.dataBase[playersChoice][letterLength][
            Math.round(
                Math.random() *
                    DB.dataBase[playersChoice][letterLength].length +
                    1
            )
        ];
    guessWordLength = guessWord.length;

    console.log("guessWord:", guessWord);
    console.log("guessWordLength:", guessWordLength);

    // guess clean up
    while (guessContainer.firstChild) {
        guessContainer.removeChild(guessContainer.firstChild);
    }

    // guess generation
    for (let rowIndex = 0; rowIndex < guessWordLength + 1; rowIndex++) {
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

        // animation
        Array.from(row.children)
            .reverse()
            .forEach((slot, index) => {
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
                            opacity: 0.05,
                            transform: "scale(0.9)",
                        },
                    ],
                    {
                        duration: 1200,
                        delay: index * 120,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                );
            });
    }

    // invisible row
    guessContainer.children[guessContainer.children.length - 1].style.display =
        "none";

    guessRows = Array.from(guessContainer.children);

    keyboardTogglerC = K.keyboard.animate(
        A.keyboardTogglerP,
        A.keyboardTogglerTF
    );
    veilWordC = wordCover.animate(A.veilWordP, A.veilWordTF);
    notchC = theNotch.animate(A.turnTheNotchP, A.turnTheNotchTF);

    setTimeout(() => {
        rowActiveState(guessRows[K.activeRowCounter], "active");
    }, 1000);
}

// --------------- functions ---------------
// random number
export function randomNumber() {
    const randomNumber = Math.round(Math.random() * 3);
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
export function rowActiveState(row, state) {
    activeRow = row;
    activeRowSlots = Array.from(row.children).reverse();

    if (state === "active") {
        addEl(row, "click", activeRowCBF);

        rowActivationA();

        addClass(activeRow, "activated");
    } else if (state === "deactive") {
        removeEl(row, "click", activeRowCBF);
        removeEl(K.keyboard, "click", K.keyboardMechanics);

        K.deactivateSlots();

        K.activeSlotC.fill("");
    }
}

// row activation anime
export function rowActivationA() {
    activeRowSlots.forEach((slot, index, array) => {
        slot.animate(A.rowActivationP, {
            duration: 700,
            delay: index * 120,
            easing: "ease-in-out",
            fill: "forwards",
        });
    });

    setTimeout(() => {
        addEl(K.keyboard, "click", K.keyboardMechanics);

        K.activeSlotC[0] = activeRowSlots[0].animate(
            A.activeSlotP,
            A.activeSlotTF
        );

        addClass(activeRowSlots[0], "active-slot");
    }, 500);
}

// active row call back
function activeRowCBF(e) {
    const target = e.target;

    if (target.matches("span")) {
        K.deactivateSlots();

        K.activeSlotC[target.getAttribute("id") - 1] = target.animate(
            A.activeSlotP,
            A.activeSlotTF
        );
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
