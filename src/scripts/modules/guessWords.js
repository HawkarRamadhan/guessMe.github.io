// --------------- imports ---------------
import { catigirizer } from "./fun.js";
// --------------- imports ---------------

export const guessWordsObj = {
    occupations: { 5: [], 6: [], 7: [], 8: [] },
    fruitsAndVegtables: { 5: [], 6: [], 7: [], 8: [] },
    foods: {
        5: [],
        6: [],
        7: [],
        8: [],
    },
    countries: {
        5: ["عێراق", "سوریا", "ئێران", "کوەیت"],
        6: ["ئەمریکا", "کەنەدا", "تورکیا"],
        7: ["پاکستان", "کۆڵۆمبیا", "ئەفریقا", "جامایکا"],
        8: ["کەمبۆدیا", "ئەریتریا", "پورتوگال"],
    },
    capitals: { 5: [], 6: [], 7: [], 8: [] },
    randomChoice() {
        const randomNumber = randomNumber();

        let guessWordCounter = Math.round(
            Math.random() * validWordsObj[randomNumber].length
        );

        let guessWord = validWordsObj[randomNumber][guessWordCounter];
        let guessWordLength = guessWord.length;

        return {
            randomNumber,
            guessWordCounter,
            guessWordLength,
        };
    },
};
