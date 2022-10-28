window.addEventListener("DOMContentLoaded", () => {
    import("./modules/menu.js").then(obj => {
        obj.showCards();
    });
});
