function generateElements(count, useRandomClass) {
    console.log("Generating a grid of " + count + " elements!")
    var containerElement = document.getElementsByClassName("gallery-container")[0];
    containerElement.innerHTML = "";
    for (let i = 0; i < count; i++) {
        var tag = document.createElement("div");
        tag.classList.add("gallery-element");
        if (useRandomClass) {
            var randN = Math.random() * (100 - 1) + 1;
            if (randN > 66) {
                tag.classList.add("grow-element");
            } else if (randN < 33) {
                tag.classList.add("shrink-element");
            }
        }
        tag.textContent = i + 1;
        containerElement.append(tag);
    }
    document.getElementById("spacing-slider").disabled = false;
    document.getElementById("spacing-slider-label").removeAttribute("disabled");
    document.getElementById("spacing-value").removeAttribute("disabled");
    addOnClicks();
}


function onGalleryElementClick(element) {
    element.classList.toggle("selected");
    alert("Hey you clicked " + element.textContent);
}

function addOnClicks() {
    var containerElements = document.getElementsByClassName("gallery-element");
    for (const element of containerElements) {
        element.addEventListener("click", function() {
            onGalleryElementClick(this);
        });
    }
}

function onSubmitForm() {
    console.log("Submitting form and generating grid!")
    var form = document.getElementById("generate-grid-form");
    var value = document.getElementById("generate-grid-value");
    var button = document.getElementById("generate-grid-button");
    var checkbox = document.getElementById("generate-grid-checkbox");
    generateElements(value.value, checkbox.checked);
    return false; // <-- This is to avoid reloading the page when submitting a form!
}

function initSliders() {
    console.log("Initializing sliders!");
    var slider = document.getElementById("spacing-slider");
    var output = document.getElementById("spacing-value");
    output.innerHTML = slider.value + "rem"; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = slider.value + "rem";
        var containerElement = document.getElementsByClassName("gallery-container")[0];
        containerElement.style.gap = slider.value + "rem";
    }
}