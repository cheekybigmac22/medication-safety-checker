// Medication Safety Checker
// Educational prototype — not a medical diagnosis.

// --------------------------------------------------
// MEDICATION DATABASE
// --------------------------------------------------

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


// --------------------------------------------------
// INTERACTION INFORMATION
// --------------------------------------------------

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


// --------------------------------------------------
// APP STATE
// --------------------------------------------------

let selected = [];


// --------------------------------------------------
// HELPERS
// --------------------------------------------------

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


// --------------------------------------------------
// AUTOCOMPLETE
// --------------------------------------------------

function setupAutocomplete() {

    const input = document.getElementById("search");

    if (!input) return;

    const wrapper = input.parentElement;

    wrapper.style.position = "relative";

    const dropdown = document.createElement("div");

    dropdown.id = "autocomplete";

    dropdown.style.position = "absolute";
    dropdown.style.top = "100%";
    dropdown.style.left = "0";
    dropdown.style.right = "0";
    dropdown.style.background = "#ffffff";
    dropdown.style.border = "1px solid #ddd";
    dropdown.style.borderRadius = "10px";
    dropdown.style.marginTop = "6px";
    dropdown.style.overflow = "hidden";
    dropdown.style.zIndex = "1000";
    dropdown.style.display = "none";
    dropdown.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";

    wrapper.appendChild(dropdown);


    input.addEventListener("input", () => {

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

            const option =
                document.createElement("div");

            option.style.padding = "12px 14px";
            option.style.cursor = "pointer";
            option.style.borderBottom = "1px solid #eee";

            option.innerHTML = `
                <strong>${name}</strong>
                <div style="
                    font-size:12px;
                    color:#777;
                    margin-top:3px;
                ">
                    Active ingredient:
                    ${medications[name].join(", ")}
                </div>
            `;


            option.addEventListener("mouseenter", () => {
                option.style.background = "#f5f5f5";
            });

            option.addEventListener("mouseleave", () => {
                option.style.background = "#ffffff";
            });


            option.addEventListener("click", () => {

                input.value = name;

                dropdown.style.display = "none";

                addItem();

            });


            dropdown.appendChild(option);

        });


        dropdown.style.display = "block";

    });


    document.addEventListener("click", event => {

        if (
            event.target !== input &&
            !dropdown.contains(event.target)
        ) {
            dropdown.style.display = "none";
        }

    });

}


// --------------------------------------------------
// ADD / REMOVE
// --------------------------------------------------

function addItem() {

    const input = document.getElementById("search");

    const value = normalize(input.value);

    if (!value) return;


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

    update();

}


function removeItem(index) {

    selected.splice(index, 1);

    update();

}


function clearAll() {

    selected = [];

    update();

}


// --------------------------------------------------
// DISPLAY
// --------------------------------------------------

function update() {

    const chips =
        document.getElementById("chips");

    const ingredientsBox =
        document.getElementById("ingredients");

    const result =
        document.getElementById("result");

    const marker =
        document.getElementById("marker");


    chips.innerHTML = "";


    // Selected medication chips

    selected.forEach((item, index) => {

        const chip =
            document.createElement("div");

        chip.className = "chip";

        chip.innerHTML =
            item +
            ` <button onclick="removeItem(${index})">✕</button>`;

        chips.appendChild(chip);

    });


    // Active ingredients

    const ingredients =
        getIngredients();


    if (ingredients.length === 0) {

        ingredientsBox.innerHTML =
            "No items selected.";

    } else {

        ingredientsBox.innerHTML =
            ingredients.join(", ");

    }


    // Need at least two items

    if (selected.length < 2) {

        result.className =
            "result";

        result.innerHTML =
            "Add at least two medications to check for documented interaction warnings.";

        marker.style.left =
            "94%";

        return;

    }


    // --------------------------------------------------
    // FIND HIGHEST-CONCERN INTERACTION
    // --------------------------------------------------

    let highestLevel = 0;

    const messages = [];

    const checkedPairs = new Set();


    for (
        let i = 0;
        i < ingredients.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < ingredients.length;
            j++
        ) {

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


    // --------------------------------------------------
    // HIGH CONCERN
    // --------------------------------------------------

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
                .map(
                    message =>
                        `<p>${message}</p>`
                )
                .join("")}

            <p class="small">
                This checker is not a substitute for
                a doctor or pharmacist.
            </p>

        `;


        marker.style.left =
            "4%";

        return;

    }


    // --------------------------------------------------
    // CAUTION
    // --------------------------------------------------

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
                .map(
                    message =>
                        `<p>${message}</p>`
                )
                .join("")}

            <p class="small">
                Ask a pharmacist or healthcare
                professional about the combination.
            </p>

        `;


        marker.style.left =
            "43%";

        return;

    }


    // --------------------------------------------------
    // UNKNOWN
    // --------------------------------------------------

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


    marker.style.left =
        "65%";

}


// --------------------------------------------------
// START APP
// --------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const input =
            document.getElementById("search");


        setupAutocomplete();


        if (input) {

            input.addEventListener(
                "keydown",
                event => {

                    if (event.key === "Enter") {

                        addItem();

                    }

                }
            );

        }

    }
);
