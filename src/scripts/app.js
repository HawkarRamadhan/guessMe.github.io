function log(...content) {
    console.log(...content);
}

// variables
const downArrow = document.querySelector(".down-arrow");
const upArrow = document.querySelector(".up-arrow");
const cardsContainer = document.querySelector(".cards-container");
const cards = cardsContainer.querySelectorAll("div");
let playersChoice;

// card translation function
function cardTranslation(state) {
    // on
    if (state === "on") {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.children[0].classList.add("card-translation");
            }, index * 200);

            card.addEventListener("click", cardsEL);
        });
    }

    // off
    if (state === "off") {
        for (const card of cards) {
            cardsContainer.classList.remove("show-cards");

            setTimeout(() => {
                card.children[0].classList.remove("card-translation");

                card.removeEventListener("click", cardsEL);
            }, 1000);
        }
    }
}

// cards click event listener
function cardsEL(e) {
    const reassignedTarget = e.target.matches("div div")
        ? e.target
        : e.target.parentElement;

    reassignedTarget.children[1].animate(
        [
            {
                transform: "scale(1)",
            },
            {
                transform: "scale(1.3)",
            },
            {
                transform: "scale(1)",
            },
        ],
        {
            duration: 500,
            easing: "ease-in-out",
            fill: "forwards",
        }
    );

    playersChoice = reassignedTarget.getAttribute("class");

    cardsContainer.classList.remove("show-cards");
    cardTranslation("off");
    upArrow.classList.remove("show-up-arrow");

    downArrow.classList.add("show-down-arrow");
    downArrow.addEventListener("click", downArrowF);
}

// down arrow function
function downArrowF() {
    downArrow.removeEventListener("click", downArrowF);
    downArrow.classList.remove("show-down-arrow");

    cardsContainer.classList.add("show-cards");
    cardTranslation("on");

    upArrow.classList.add("show-up-arrow");
    upArrow.addEventListener("click", upArrowF);
}

// up arrow function
function upArrowF() {
    upArrow.removeEventListener("click", upArrowF);
    upArrow.classList.remove("show-up-arrow");

    cardsContainer.classList.remove("show-card");
    cardTranslation("off");

    downArrow.classList.add("show-down-arrow");
    downArrow.addEventListener("click", downArrowF);
}

// menu toggler
function showMenu(gameStart) {
    if (gameStart) {
        cardsContainer.classList.add("show-cards");
        setTimeout(() => {
            cardTranslation("on");
        }, 800);
    } else if (!gameStart) {
    }
}

showMenu(true);
