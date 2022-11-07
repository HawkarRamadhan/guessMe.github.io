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
export function showMenu(gameOpening) {
    // randomize icons
    categories.forEach(card => {
        chooseRandomIcon(card);
    });

    menuAC = menu.animate(A.showMenuP, A.showMenuTF);
    addEl(menu, "click", menuEL);

    choiceTitleAC = choiceTitle.animate(A.choiceTitleP, A.choiceTitleTF);

    addEl(startBtn, "click", gameStarter);
}

// hide categories
export function hideMenu() {
    choiceTitleAC.reverse();
    choiceTitleAC;

    menuAC.reverse();
    removeEl(menu, "click", menuEL);

    menuReset();
}

// categories click event listener
function menuEL(e) {
    let target = e.target;

    if (target.matches(".categories > div img, .categories > div h3")) {
        menuReset();

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
        for (const choice of target.parentElement.children) {
            choice.style.color = "white";
        }

        target.style.color = "#ffbf00";

        letterLength = textToNumber(target);

        if (!startBtnAC) {
            startBtnAC = startBtn.animate(A.startBtnP, A.startBtnTF);
        }

        choiceTitle.children[1].innerText = `${target.innerText} پیتی`;
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

    hideMenu();

    downArrowAC.reverse();
    addEl(downArrow, "click", downArrowF);
}

// delete
// GG.guessGenerator("occupations", 5);
// addClass(K.keyboard, "show-keyboard");
// addClass(GG.wordCover, "veil-word");
// addClass(GG.theNotch, "turn-the-notch");

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
function menuReset() {
    if (startBtnAC && startBtnAC.currentTime !== 0) {
        startBtnAC.reverse();
        startBtnAC = undefined;
    }

    choiceTitle.children[0].innerText = "وشەیەکی";
    choiceTitle.children[1].innerText = "چەند پیتی؟";

    for (const item of iconAndTextAC) {
        item.forEach(anime => {
            if (anime) anime.cancel();

            for (const h3 of queryAll(document, ".categories h3"))
                h3.style.color = "white";
            for (const h3 of queryAll(document, "h3 + div > span"))
                h3.style.color = "white";
        });
    }
}

// game starter
function gameStarter(e) {
    setTimeout(() => {
        playersChoice = className === "random" ? "validWords" : className;

        GG.guessGenerator(playersChoice, letterLength);
        legend.innerText = choiceTitle.innerText;

        menuReset();
        hideMenu();

        downArrowAC = downArrow.animate(A.showDownArrowP, A.showDownArrowTF);
        addEl(downArrow, "click", downArrowF);
    }, 500);
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
