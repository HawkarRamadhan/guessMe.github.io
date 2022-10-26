// --------------- imports ---------------
// --------------- imports ---------------

//  menu
export const selectedChoice = [
    [
        {
            transform: "scale(1)",
        },
        {
            transform: "scale(2)",
        },
        {
            transform: "scale(1)",
        },
    ],
    {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
    },
];

//  guess generator

//  keyboard
export const emptySlot = [
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

export const registeredGuessAnime = [
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

export const correct = [
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

export const incorrect = [
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

export const notIncluded = [
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

export const winnerFlag = [
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

export const turnTheNotch = [
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

export const unveilWord = [
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

export const scaleShiftKeyIcon = [
    [
        {
            transform: "rotate(0deg) scale(1)",
            color: "white",
        },
        {
            transform: "rotate(180deg) scale(1.3)",
            color: "red",
        },
    ],
    {
        duration: 300,
        easing: "ease-in-out",
        fill: "both",
    },
];

export const unscaleShiftKeyIcon = [
    [
        {
            transform: "rotate(0deg) scale(1)",
            color: "white",
        },
    ],
    {
        duration: 300,
        easing: "ease-in-out",
        fill: "both",
    },
];