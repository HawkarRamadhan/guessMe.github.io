function guessRenerator(guessWordLength) {
    for (let rowIndex = 0; rowIndex < guessWordLength + 1; rowIndex++) {
        const row = document.createElement("div");
        row.setAttribute("class", "guess-row-c");
        row.id = `row-${rowIndex}`;

        const h3 = document.createElement("h3");
        h3.setAttribute("class", "h3");
        h3.innerText = rowIndex + 1;

        for (let slotIndex = 0; slotIndex < guessWordLength; slotIndex++) {
            const slot = document.createElement("span");
            slot.id = `slot-${slotIndex}`;

            row.append(slot);
        }

        guessesContainer.append(row);
        row.append(h3);

        const guessSlots = Array.from(queryAll(row, "span")).reverse();

        setTimeout(() => {
            // slots animation
            guessSlots.forEach((guessRowSlot, index, array) => {
                guessRowSlot.animate(
                    [
                        {
                            transform: "scale(0)",
                        },
                        {
                            transform: "scale(1.05)",
                        },
                        {
                            transform: "scale(1.1)",
                        },
                        {
                            transform: "scale(1.05)",
                        },
                        {
                            opacity: 0.1,
                            transform: "scale(1)",
                        },
                    ],
                    {
                        duration: 800,
                        delay: index * 80,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                );
            });

            // h3 animation
            h3.animate(
                [
                    {
                        opacity: 0,
                        transform: "scale(0)",
                    },
                    {
                        opacity: 0.5,
                        transform: "scale(4)",
                    },
                    {
                        opacity: 1,
                        transform: "scale(4)",
                    },
                    {
                        opacity: 1,
                        transform: "scale(1)",
                    },
                ],
                {
                    duration: 800,
                    delay: rowIndex * 120,
                    easing: "ease-in-out",
                    fill: "forwards",
                }
            );
        }, 1000);
    }
}
