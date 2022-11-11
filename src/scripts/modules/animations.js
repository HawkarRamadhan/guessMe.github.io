export const EF = {
    easing: "ease-in-out",
    fill: "both",
};

// ----- guess generator -----
// show fieldset
export const showFieldSetP = [
    {
        opacity: 0,
        transform: "scale(0)",
    },
    {
        opacity: 0.5,
        transform: "scale(1.1)",
    },
    {
        opacity: 1,
        transform: "scale(1)",
    },
];
export const showFieldSetTF = {
    duration: 1000,
    easing: "ease-in-out",
    fill: "both",
};

// show fieldset
export const inicialRowAnimationP = [
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
];

// veil word
export const veilWordP = [
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
];
export const veilWordTF = {
    duration: 700,
    // delay: 500,
    ...EF,
};

// turn the notch
export const turnTheNotchP = [
    {
        transform: "rotate(0deg)",
    },
    {
        transform: "rotate(400deg)",
        offset: 0.5,
    },
    {
        transform: "rotate(360deg)",
    },
];
export const turnTheNotchTF = {
    duration: 1000,
    ...EF,
};

// ----- guesses -----
// empty slots warning
export const emptySlotP = [
    {
        backgroundColor: "red",
    },
    {
        backgroundColor: "white",
    },
    {
        backgroundColor: "red",
    },
];
export const emptySlotTF = {
    duration: 500,
    easing: "ease-in-out",
    iteraions: 3,
};

// correct
export const correctSlotP = [
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
];
export const correctSlotTF = {
    duration: 1000,
    ...EF,
};

// incorrect
export const incorrectSlotP = [
    {
        transform: "rotate(0deg",
    },
    {
        transform: "rotate(-360deg",
    },
    {
        transform: "rotate(-360deg",
        backgroundColor: "#fdc010",
    },
];
export const incorrectSlotTF = {
    duration: 1000,
    ...EF,
};

// not included
export const SlotNotIncludedP = [
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
];
export const SlotNotIncludedTF = {
    duration: 800,
    ...EF,
};

// winning
export const winningAnimeP = [
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
];
export const winningAnimeTF = {
    duration: 500,
    ...EF,
};

// ----- keyboard -----
// duplicate guess
export const duplicateGuessP = [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }];
export const duplicateGuessTF = {
    duration: 700,
    iterations: 3,
    ...EF,
};

// key not included
export const correctKeyP = [
    {
        transform: "scale(1)",
        color: "white",
    },
    {
        transform: "scale(0)",
        color: "#339900",
    },
    {
        transform: "scale(1)",
        color: "#339900",
    },
];
export const correctKeyTF = {
    duration: 500,
    easing: "ease-in-out",
    fill: "both",
};

// incorrect key
export const incorrectKeyP = [
    {
        transform: "scale(1)",
        color: "white",
    },
    {
        transform: "scale(0)",
        color: "#fdc010",
    },
    {
        transform: "scale(1)",
        color: "#fdc010",
    },
];
export const incorrectKeyTF = {
    duration: 500,
    easing: "ease-in-out",
    fill: "both",
};

// key not included
export const keyNotIncludedP = {
    backgroundColor: "rgb(20, 20, 20)",

    color: "white",
};
export const keyNotIncludedTF = {
    duration: 500,
    easing: "ease-in-out",
    fill: "both",
};

// winning flag
export const hideKeyboardP = [
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
];
export const hideKeyboardTF = {
    duration: 1000,
    delay: 500,
    ...A.EF,
};

// scaling down arrow
export const scalingDownArrowP = [
    {
        transform: "translateX(-50%) scale(1)",
    },
    {
        transform: "translateX(-50%) scale(1.3)",
    },
    {
        transform: "translateX(-50%) scale(1)",
    },
];
export const scalingDownArrowTF = {
    duration: 1000,
    delay: 2000,
    iterations: Infinity,
};

// keys reset
export const keyboardKeyResetP = {
    color: "white",
};
export const keyboardKeyResetTF = {
    duration: 0,
    ...EF,
};

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
