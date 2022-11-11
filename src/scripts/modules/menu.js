const menu = query(document, ".menu");
const categories = queryAll(menu, ".categories > div");

export const downArrow = query(document, ".down-arrow");
export const upArrow = query(menu, ".up-arrow");

const choiceTitle = query(document, ".choice-title");
const startBtn = query(menu, ".start-btn");

let className;
export let letterLength;
export let playersChoice;

export const fieldSet = query(document, "fieldset");
export const legend = query(document, "legend");
export let legendText;

// show categories
export function showMenu(gameOpening) {
    addClass(menu, "open-menu");
    addEl(menu, "transitionend", function menuTransitionEnd() {
        addEl(menu, "click", menuEL);

        removeEl(menu, "transitionend", menuTransitionEnd);
    });

    addClass(choiceTitle, "show-choice-title");

    if (!gameOpening) {
        addClass(upArrow, "show-up-arrow");
        addEl(upArrow, "click", upArrowF);
    }
}

// categories click event listener
function menuEL(e) {
    let target = e.target;

    if (target.matches("div > div img,h3")) {
        clearCategories();

        addClass(target.parentElement.children[0], "translate-scale-icon");

        addClass(target.parentElement.children[1], "select-category");

        target.parentElement.classList[0] === "random"
            ? (playersChoice = "validWords")
            : (playersChoice = target.parentElement.classList[0]);

        // choice title
        switch (target.parentElement.classList[0]) {
            case "occupations":
                choiceTitle.children[0].innerText =
                    target.parentElement.children[1].innerText + "یەکی";
                break;
            case "random":
                choiceTitle.children[0].innerText = "وشەیەکی";
                break;

            default:
                choiceTitle.children[0].innerText =
                    target.parentElement.children[1].innerText + "ێکی";
        }

        // choice length
        addClass(target.parentElement.children[2], "show-lengths");
        addEl(target.parentElement.children[2], "click", selectLength);
    }
}

// down arrow
export function downArrowF() {
    removeClass(K.keyboard, "show-keyboard");

    removeClass(downArrow, "show-down-arrow");
    removeEl(downArrow, "click", downArrowF);

    addEl(downArrow, "transitionend", function downArrowTransitionEnd() {
        showMenu(false);

        removeEl(downArrow, "transitionend", downArrowTransitionEnd);
    });
}

// up arrow
export function upArrowF() {
    clearCategories();

    removeClass(upArrow, "show-up-arrow");
    removeEl(upArrow, "click", upArrowF);

    removeClass(choiceTitle, "show-choice-title");
    addEl(choiceTitle, "transitionend", function choiceTitleTranEnd() {
        removeClass(menu, "open-menu");

        addEl(menu, "transitionend", function menuTranEnd() {
            addClass(downArrow, "show-down-arrow");
            addEl(downArrow, "click", downArrowF);
            if (
                !guessRows[guessRows.length - 1].classList.contains("activated")
            ) {
                addClass(K.keyboard, "show-keyboard");
            }

            // randomize icons
            categories.forEach(card => {
                chooseRandomIcon(card);
            });

            removeEl(menu, "transitionend", menuTranEnd);
        });

        removeEl(choiceTitle, "transitionend", choiceTitleTranEnd);
    });
}

// --------------- helper functions ---------------
// icon randomizer
function chooseRandomIcon(card) {
    const cardIcon = card.children[0];
    const randomNumber = Math.round(Math.random() * 32 + 1);
    const srcAttr = `/src/assets/icons/${card.getAttribute(
        "class"
    )}/i-(${randomNumber}).png`;

    if (!card.classList.contains("random"))
        cardIcon.setAttribute("src", srcAttr);
}

// select length
function selectLength(e) {
    for (const length of e.target.parentElement.children) {
        if (length !== e.target) removeClass(length, "select-length");
    }

    letterLength = textToNumber(e.target);
    choiceTitle.children[1].innerText = e.target.innerText + "پیتی";

    addClass(e.target, "select-length");

    addClass(startBtn, "show-start-btn");
    addEl(startBtn, "click", startBtnF);
}

// choice translator
function textToNumber(length) {
    switch (length.innerText) {
        case "پێنج":
            return 5;
            break;
        case "شەش":
            return 6;
            break;
        case "حەوت":
            return 7;
            break;
        case "هەشت":
            return 8;
            break;
    }
}

// clear choices
function clearCategories() {
    for (const category of categories) {
        for (const child of category.children) {
            removeClass(child, "translate-scale-icon");

            removeClass(child, "select-category");

            removeClass(child, "show-lengths");

            for (const length of child.children) {
                removeClass(length, "select-length");

                removeEl(length, "click", selectLength);
            }
        }
    }

    choiceTitle.children[0].innerText = "وشەیەکی";
    choiceTitle.children[1].innerText = "چەند پیتی؟";

    removeClass(startBtn, "show-start-btn");
    removeEl(startBtn, "click", startBtnF);
}

// start button
function startBtnF() {
    legendText = choiceTitle.innerText;
    removeClass(startBtn, "show-start-btn");

    addEl(startBtn, "transitionend", function startBtnTranEnd() {
        clearCategories();

        removeClass(choiceTitle, "show-choice-title");

        addEl(choiceTitle, "transitionend", function choiceTitleTransEnd() {
            removeClass(menu, "open-menu");

            removeClass(upArrow, "show-up-arrow");
            removeEl(upArrow, "click", upArrowF);

            addEl(menu, "transitionend", function menuTranEnd() {
                GG.guessGenerator(playersChoice, letterLength);

                addClass(downArrow, "show-down-arrow");
                addEl(downArrow, "click", downArrowF);

                // randomize icons
                categories.forEach(card => {
                    chooseRandomIcon(card);
                });

                removeEl(menu, "transitionend", menuTranEnd);
            });

            removeEl(choiceTitle, "transitionend", choiceTitleTransEnd);
        });

        removeEl(startBtn, "transitionend", startBtnTranEnd);
    });
}

// delete
// GG.guessGenerator("occupations", 5);
// addClass(GG.wordCover, "veil-word");
// addClass(GG.theNotch, "turn-the-notch");

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
import { guessRows } from "./guessGenerator.js";
import { activeRowCounter } from "./keyboard.js";
