var tour = new Shepherd.Tour({
    defaultStepOptions: {
        cancelIcon: { enabled: true },
        classes: "shadow-md bg-purple-dark",
        scrollTo: { behavior: "smooth", block: "center" },
    },
    useModalOverlay: { enabled: true },
});

for (var i = 0; i < tourData.steps.length; i++) {
    var step = tourData.steps[i];
    var buttons = [
        { text: "Back", classes: "btn btn-light", action: tour.back }
    ];

    if (step.final) {
        buttons.push({
            text: step.button_text,
            classes: "btn btn-primary",
            action: tour.complete
        });
    } else {
        buttons.push({
            text: "Next",
            classes: "btn btn-secondary",
            action: tour.next
        });
    }

    tour.addStep({
        title: step.title,
        text: step.text,
        attachTo: { element: step.element, on: "bottom" },
        buttons: buttons
    });
}

tour.start();
