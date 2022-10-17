const $downArrow = $(".down-arrow");
const $upArrow = $(".up-arrow");
const $cardsContainer = $(".cards-container");
const $cards = $(".cards-container div");

function gameOpener() {
    $($downArrow).click(e => {
        // slide up
        $downArrow.hide("normal", e => {
            $($upArrow).show("normal");
        });
        $cardsContainer.addClass("show-cards");

        // slide down
        $upArrow.click(e => {
            $upArrow.hide("normal", e => {
                $downArrow.show("normal");
            });
            $cardsContainer.removeClass("show-cards");
        });

        $cards.each((index, val) => {
            setTimeout(() => {
                $(val).addClass("card-scaling");
            }, index * 80);
        });
    });
}

gameOpener();
