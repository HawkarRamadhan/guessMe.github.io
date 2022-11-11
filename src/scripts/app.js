import { guessGenerator } from "./modules/guessGenerator.js";

window.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("progress")) {
        import("./modules/menu.js").then(obj => {
            obj.showMenu(true);
        });
    } else {
        const { word, guesses, activeRowCounter, legend, GWL } = JSON.parse(
            sessionStorage.getItem("progress")
        );

        log("Lanya Hassan");
        guessGenerator();
    }
});
