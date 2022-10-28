export const EF = {
    easing: "ease-in-out",
    fill: "both",
};

// ----- menu -----
// menu toggler
export const showCardsP = {
    transform: "translateY(0)",
};
export const showCardsTF = {
    duration: 500,
    delay: 500,
    ...EF,
};

// selected choice
export const selectedChoiceP = [
    {
        transform: "scale(1)",
    },
    {
        transform: "scale(2)",
    },
    {
        transform: "scale(1)",
    },
];
export const selectedChoiceTM = {
    duration: 300,
    ...EF,
};

// down arrow
export const showDownArrowP = [
    {
        transform: "translateX(-50%) scale(0)",
    },
    {
        transform: "translateX(-50%) scale(2)",
    },
    {
        transform: "translateX(-50%) scale(1)",
    },
];
export const showDownArrowTF = {
    duration: 700,
    delay: 500,
    ...EF,
};

// up arrow
export const showUpArrowP = [
    {
        transform: "translateX(-50%) scale(0)",
    },
    {
        transform: "translateX(-50%) scale(2)",
    },
    {
        transform: "translateX(-50%) scale(1)",
    },
];
export const showUpArrowTF = {
    duration: 700,
    delay: 1000,
    ...EF,
};

// ----- guess generator -----
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
    delay: 2000,
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
    duration: 1500,
    delay: 2700,
    ...EF,
};

// ----- row activation -----
export const rowActivationP = [
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
        opacity: 1,
        transform: "scale(1)",
    },
];

// ----- guesses -----
// active slots
export const activeSlotP = [
    {
        transform: "scale(1)",
    },
    {
        transform: "scale(1.3)",
    },
    {
        transform: "scale(1.1)",
        border: "0.2px solid red",
    },
];
export const activeSlotTF = {
    duration: 500,
    ...EF,
};

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
// keyboard toggler
export const keyboardTogglerP = [
    {
        transform: "translateY(100%)",
    },
    {
        transform: "translateY(-2%)",
        offset: 0.8,
    },
    {
        transform: "translateY(0%)",
    },
];
export const keyboardTogglerTF = {
    duration: 500,
    delay: 2000,
    ...EF,
};

// shift up scale
export const shiftUpScaleP = [
    {
        transform: "rotate(0deg) scale(1)",
        color: "white",
    },
    {
        transform: "rotate(180deg) scale(1.3)",
        color: "red",
    },
];
export const shiftUpScaleTF = {
    duration: 300,
    ...EF,
};

// unregistered word
export const unregisteredWordP = [
    {
        transform: "translateY(-200%)",
    },
    {
        transform: "translateY(0%)",
        offset: 0.7,
    },
    {
        transform: "translateY(0%)",
    },
];
export const unregisteredWordTF = {
    duration: 800,
    ...EF,
};

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
    color: "#333333",
};
export const keyNotIncludedTF = {
    duration: 500,
    easing: "ease-in-out",
    fill: "both",
};

// keys reset
export const keyboardKeyResetP = {
    color: "white",
};
export const keyboardKeyResetTF = {
    duration: 0,
    ...EF,
};
