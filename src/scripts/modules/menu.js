// animation controls
export let menuAC;
export let downArrowAC;
export let upArrowAC;
export let iconAndTextAC = [];
let choiceTitleAC;
let startBtnAC;

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

// show categories
export function showMenu() {
    menuAC = menu.animate(A.showMenuP, A.showMenuTF);
    addEl(menu, "click", menuEL);

    choiceTitleAC = choiceTitle.animate(A.choiceTitleP, A.choiceTitleTF);

    categories.forEach((card, index) => {
        chooseRandomIcon(card);
    });
}

// hide categories
export function hideMenu() {
    menuAC.reverse();
    removeEl(menu, "click", menuEL);

    choiceTitleAC.reverse();
}

// categories click event listener
function menuEL(e) {
    let target = e.target;

    if (target.matches(".categories > div img, .categories > div h3")) {
        menuReset(target);

        iconAndTextAC.push([
            target.parentElement.children[0].animate(
                A.categoryIconP,
                A.categoryIconTF
            ),
            target.parentElement.children[2].animate(
                A.choiceLengthP,
                A.choiceLengthTF
            ),
        ]);

        target.parentElement.children[1].style.color = "#ffbf00";

        if (target.parentElement.classList.contains("occupations")) {
            choiceTitle.children[0].innerText =
                target.parentElement.children[1].innerText + "یەکی";
        } else if (target.parentElement.classList.contains("random")) {
            choiceTitle.children[0].innerText = "وشەیەکی";
        } else {
            choiceTitle.children[0].innerText =
                target.parentElement.children[1].innerText + "ێکی";
        }

        className = target.parentElement.getAttribute("class");
    }

    if (target.matches("h3 + div > span")) {
        choiceTitle.children[1].innerText = `${target.innerText} پیتی`;

        for (const choice of target.parentElement.children) {
            choice.style.color = "white";
        }

        target.style.color = "#ffbf00";

        letterLength = textToNumber(target);

        startBtnAC = startBtn.animate(A.startBtnP, A.startBtnTF);

        addEl(startBtn, "click", gameStarter);
    }
}

// down arrow
export function downArrowF() {
    removeEl(downArrow, "click", downArrowF);
    downArrowAC.reverse();

    showMenu();

    upArrowAC = upArrow.animate(A.showUpArrowP, A.showUpArrowTF);
    addEl(upArrow, "click", upArrowF);
}

// up arrow
export function upArrowF() {
    upArrowAC.reverse();
    removeClass(upArrow, "show-up-arrow");

    hideMenu();
    menuReset();

    downArrowAC.reverse();
    addEl(downArrow, "click", downArrowF);
}

// delete
// GG.guessGenerator("occupations", 8);
// addClass(K.keyboard, "show-keyboard");
// addClass(GG.wordCover, "veil-word");
// addClass(GG.theNotch, "turn-the-notch");

// --------------- helper functions ---------------
// icon randomizer
function chooseRandomIcon(card) {
    const cardIcon = card.children[0];
    const randomNumber = Math.round(Math.random() * 32 + 1);
    const srcAttr = `./assets/icons/${card.getAttribute(
        "class"
    )}/i (${randomNumber}).png`;

    if (!card.classList.contains("random"))
        cardIcon.setAttribute("src", srcAttr);
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

// menu reseter
function menuReset(target) {
    if (
        target &&
        !target.parentElement.classList.contains("active-category") &&
        startBtnAC
    ) {
        startBtnAC.reverse();
        startBtnAC = [];
    }

    for (const item of iconAndTextAC) {
        item.forEach(anime => {
            if (anime) anime.cancel();

            for (const h3 of queryAll(document, ".categories h3"))
                h3.style.color = "white";
            for (const h3 of queryAll(document, "h3 + div > span"))
                h3.style.color = "white";
        });

        choiceTitle.children[0].innerText = "وشەیەکی";
        choiceTitle.children[1].innerText = "چەند پیتی؟";
    }

    removeEl(startBtn, "click", gameStarter);
}

// game starter
function gameStarter(e) {
    setTimeout(() => {
        playersChoice = className === "random" ? "validWords" : className;
        downArrowAC = downArrow.animate(A.showDownArrowP, A.showDownArrowTF);
        addEl(downArrow, "click", downArrowF);
        hideMenu();
        GG.guessGenerator(playersChoice, letterLength);
    }, 500);

    startBtnAC.reverse();
    legend.innerText = choiceTitle.innerText;
    startBtnAC = [];

    menuReset();
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
