// Medication Safety Checker
// Educational prototype — not a medical diagnosis.

// ==================================================
// MEDICATION DATABASE
// ==================================================

const medications = {
    "tylenol": ["acetaminophen"],
    "acetaminophen": ["acetaminophen"],

    "advil": ["ibuprofen"],
    "motrin": ["ibuprofen"],
    "ibuprofen": ["ibuprofen"],

    "aleve": ["naproxen"],
    "naproxen": ["naproxen"],

    "aspirin": ["aspirin"],
    "bayer aspirin": ["aspirin"],

    "benadryl": ["diphenhydramine"],
    "diphenhydramine": ["diphenhydramine"],

    "unisom": ["doxylamine"],
    "doxylamine": ["doxylamine"],

    "delsym": ["dextromethorphan"],
    "dextromethorphan": ["dextromethorphan"],

    "nyquil": [
        "acetaminophen",
        "dextromethorphan",
        "doxylamine"
    ],

    "mucinex": ["guaifenesin"],
    "guaifenesin": ["guaifenesin"],

    "claritin": ["loratadine"],
    "loratadine": ["loratadine"],

    "zyrtec": ["cetirizine"],
    "cetirizine": ["cetirizine"],

    "sudafed": ["pseudoephedrine"],
    "pseudoephedrine": ["pseudoephedrine"],

    "sudafed pe": ["phenylephrine"],
    "phenylephrine": ["phenylephrine"],

    "pepcid": ["famotidine"],
    "famotidine": ["famotidine"],

    "prilosec": ["omeprazole"],
    "omeprazole": ["omeprazole"],

    "tums": ["calcium carbonate"],
    "calcium carbonate": ["calcium carbonate"],

    "amoxicillin": ["amoxicillin"],
    "amoxil": ["amoxicillin"],

    "azithromycin": ["azithromycin"],
    "zithromax": ["azithromycin"],

    "metformin": ["metformin"],
    "glucophage": ["metformin"],

    "lisinopril": ["lisinopril"],
    "zestril": ["lisinopril"],
    "prinivil": ["lisinopril"],

    "losartan": ["losartan"],
    "cozaar": ["losartan"],

    "amlodipine": ["amlodipine"],
    "norvasc": ["amlodipine"],

    "atorvastatin": ["atorvastatin"],
    "lipitor": ["atorvastatin"],

    "levothyroxine": ["levothyroxine"],
    "synthroid": ["levothyroxine"],

    "sertraline": ["sertraline"],
    "zoloft": ["sertraline"],

    "fluoxetine": ["fluoxetine"],
    "prozac": ["fluoxetine"],

    "escitalopram": ["escitalopram"],
    "lexapro": ["escitalopram"],

    "bupropion": ["bupropion"],
    "wellbutrin": ["bupropion"],

    "warfarin": ["warfarin"],
    "coumadin": ["warfarin"],
    "jantoven": ["warfarin"],

    "clopidogrel": ["clopidogrel"],
    "plavix": ["clopidogrel"],

    "tramadol": ["tramadol"],
    "ultram": ["tramadol"],

    "cyclobenzaprine": ["cyclobenzaprine"],
    "flexeril": ["cyclobenzaprine"],

    "gabapentin": ["gabapentin"],
    "neurontin": ["gabapentin"],

    "hydroxyzine": ["hydroxyzine"],
    "vistaril": ["hydroxyzine"],
    "atarax": ["hydroxyzine"],

    "albuterol": ["albuterol"],
    "ventolin": ["albuterol"],

    "fluticasone": ["fluticasone"],
    "flonase": ["fluticasone"],

    "montelukast": ["montelukast"],
    "singulair": ["montelukast"],

    "prednisone": ["prednisone"],
    "rayos": ["prednisone"]
};


// ==================================================
// INTERACTIONS
// ==================================================

const interactions = {

    "acetaminophen|warfarin": {
        level: 2,
        message:
            "Acetaminophen can affect the anticoagulant effect of warfarin, particularly with repeated or higher use."
    },

    "aspirin|warfarin": {
        level: 4,
        message:
            "Aspirin and warfarin can increase bleeding concerns when used together."
    },

    "ibuprofen|warfarin": {
        level: 4,
        message:
            "Ibuprofen can increase bleeding concerns when used with warfarin."
    },

    "ibuprofen|lisinopril": {
        level: 2,
        message:
            "Ibuprofen can interfere with blood-pressure treatment and may affect kidney function."
    },

    "naproxen|lisinopril": {
        level: 2,
        message:
            "Naproxen can interfere with blood-pressure treatment and may affect kidney function."
    },

    "calcium carbonate|levothyroxine": {
        level: 2,
        message:
            "Calcium can reduce levothyroxine absorption when the medicines are taken too closely together."
    },

    "omeprazole|clopidogrel": {
        level: 2,
        message:
            "Omeprazole can interfere with the activation of clopidogrel."
    },

    "fluoxetine|tramadol": {
        level: 4,
        message:
            "This combination can increase the risk of serious serotonin-related effects."
    },

    "sertraline|tramadol": {
        level: 4,
        message:
            "This combination can increase the risk of serious serotonin-related effects."
    },

    "escitalopram|tramadol": {
        level: 4,
        message:
            "This combination can increase the risk of serious serotonin-related effects."
    },

    "diphenhydramine|doxylamine": {
        level: 4,
        message:
            "These medicines can have additive effects such as increased drowsiness and impairment."
    }
};


// ==================================================
// APP STATE
// ==================================================

let selected = [];


// ==================================================
// HELPER FUNCTIONS
// ==================================================

function normalize(text) {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}


function getKey(a, b) {
    return [a, b].sort().join("|");
}


function getIngredients() {

    const ingredients = [];

    selected.forEach(item => {

        const itemIngredients = medications[item] || [];

        itemIngredients.forEach(ingredient => {

            if (!ingredients.includes(ingredient)) {
                ingredients.push(ingredient);
            }

        });

    });

    return ingredients;
}


// ==================================================
// AUTOCOMPLETE
// ==================================================

function setupAutocomplete() {

    const input = document.getElementById("search");
    const dropdown = document.getElementById("autocomplete");

    if (!input || !dropdown) {
        return;
    }

    input.addEventListener("input", function () {

        const value = normalize(input.value);

        dropdown.innerHTML = "";

        if (!value) {
            dropdown.style.display = "none";
            return;
        }

        const matches = Object.keys(medications)
            .filter(name => name.includes(value))
            .slice(0, 8);

        if (matches.length === 0) {
            dropdown.style.display = "none";
            return;
        }

        matches.forEach(name => {

            const option = document.createElement("div");

            option.className = "autocomplete-item";

            const ingredientText =
                medications[name].join(", ");

            option.innerHTML = `
                <div class="autocomplete-name">
                    ${name}
                </div>

                <div class="autocomplete-ingredient">
                    Active ingredient: ${ingredientText}
                </div>
            `;

            option.addEventListener("click", function () {

                input.value = name;

                dropdown.style.display = "none";

                addItem();

            });

            dropdown.appendChild(option);

        });

        dropdown.style.display = "block";

    });


    document.addEventListener("click", function (event) {

        if (
            event.target !== input &&
            !dropdown.contains(event.target)
        ) {
            dropdown.style.display = "none";
        }

    });

}


// ==================================================
// ADD MEDICATION
// ==================================================

function addItem() {

    const input = document.getElementById("search");

    if (!input) {
        return;
    }

    const value = normalize(input.value);

    if (!value) {
        return;
    }

    if (!medications[value]) {

        alert(
            "This medication isn't in the current database yet.\n\n" +
            "This does NOT mean it is safe or that it has no interactions."
        );

        input.value = "";

        return;
    }

    if (selected.includes(value)) {

        input.value = "";

        return;
    }

    selected.push(value);

    input.value = "";

    const dropdown = document.getElementById("autocomplete");

    if (dropdown) {
        dropdown.style.display = "none";
    }

    update();

}


// ==================================================
// REMOVE MEDICATION
// ==================================================

function removeItem(index) {

    selected.splice(index, 1);

    update();

}


// ==================================================
// CLEAR EVERYTHING
// ==================================================

function clearAll() {

    selected = [];

    update();

}


// ==================================================
// UPDATE WEBSITE
// ==================================================

function update() {

    const chips = document.getElementById("chips");
    const ingredientsBox =
        document.getElementById("ingredients");
    const result =
        document.getElementById("result");
    const marker =
        document.getElementById("marker");

    if (!chips || !ingredientsBox || !result || !marker) {
        return;
    }

    chips.innerHTML = "";


    // --------------------------------------------------
    // MEDICATION CHIPS
    // --------------------------------------------------

    selected.forEach((item, index) => {

        const chip = document.createElement("div");

        chip.className = "chip";

        chip.innerHTML =
            item +
            ` <button onclick="removeItem(${index})">✕</button>`;

        chips.appendChild(chip);

    });


    // --------------------------------------------------
    // ACTIVE INGREDIENTS
    // --------------------------------------------------

    const ingredients = getIngredients();

    if (ingredients.length === 0) {

        ingredientsBox.innerHTML =
            "No medications selected.";

    } else {

        ingredientsBox.innerHTML =
            ingredients.join(", ");

    }


    // --------------------------------------------------
    // NOT ENOUGH MEDICATIONS
    // --------------------------------------------------

    if (selected.length < 2) {

        result.className = "result";

        result.innerHTML = `
            <h3>Ready to check</h3>

            <p>
                Add two or more medications to check
                for documented interaction warnings.
            </p>
        `;

        marker.style.left = "94%";

        return;
    }


    // ==================================================
    // CHECK INTERACTIONS
    // ==================================================

    let highestLevel = 0;

    const messages = [];

    const checkedPairs = new Set();


    for (let i = 0; i < ingredients.length; i++) {

        for (let j = i + 1; j < ingredients.length; j++) {

            const key =
                getKey(
                    ingredients[i],
                    ingredients[j]
                );

            if (checkedPairs.has(key)) {
                continue;
            }

            checkedPairs.add(key);

            if (interactions[key]) {

                const interaction =
                    interactions[key];

                if (
                    interaction.level >
                    highestLevel
                ) {

                    highestLevel =
                        interaction.level;

                }

                if (
                    !messages.includes(
                        interaction.message
                    )
                ) {

                    messages.push(
                        interaction.message
                    );

                }

            }

        }

    }


    // ==================================================
    // HIGH CONCERN
    // ==================================================

    if (highestLevel === 4) {

        result.className =
            "result high";

        result.innerHTML = `

            <div class="warning">
                ⚠️ HIGH CONCERN
            </div>

            <p>
                A documented interaction warning
                was found for this combination.
            </p>

            ${messages
                .map(message => `<p>${message}</p>`)
                .join("")}

            <p class="small">
                This checker is not a substitute for
                a doctor or pharmacist.
            </p>

        `;

        marker.style.left = "4%";

        return;
    }


    // ==================================================
    // CAUTION
    // ==================================================

    if (highestLevel === 2) {

        result.className =
            "result caution";

        result.innerHTML = `

            <h2>⚠️ CAUTION</h2>

            <p>
                A documented interaction warning
                was found.
            </p>

            ${messages
                .map(message => `<p>${message}</p>`)
                .join("")}

            <p class="small">
                Ask a pharmacist or healthcare
                professional about the combination.
            </p>

        `;

        marker.style.left = "43%";

        return;
    }


    // ==================================================
    // INSUFFICIENT DATA
    // ==================================================

    result.className =
        "result unknown";

    result.innerHTML = `

        <h2>❓ INSUFFICIENT DATA</h2>

        <p>
            No interaction warning was found in
            this prototype's database.
        </p>

        <p>
            <strong>
                This does NOT mean the combination is safe.
            </strong>
        </p>

        <p class="small">
            The database does not contain enough
            information to make a reliable determination.
        </p>

    `;

    marker.style.left = "65%";

}


// ==================================================
// START APP
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupAutocomplete();

        const input =
            document.getElementById("search");

        if (input) {

            input.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {
                        addItem();
                    }

                }
            );

        }

        update();

    }
);
