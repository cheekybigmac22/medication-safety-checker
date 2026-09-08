// Medication Safety Checker
// Educational prototype — not a medical diagnosis.

// ==================================================
// MEDICATION DATABASE
// ==================================================

const medications = {

    // =========================
    // PAIN / FEVER
    // =========================

    "acetaminophen": ["acetaminophen"],
    "tylenol": ["acetaminophen"],
    "panadol": ["acetaminophen"],
    "paracetamol": ["acetaminophen"],

    "ibuprofen": ["ibuprofen"],
    "advil": ["ibuprofen"],
    "motrin": ["ibuprofen"],
    "midol": ["ibuprofen"],

    "naproxen": ["naproxen"],
    "aleve": ["naproxen"],

    "aspirin": ["aspirin"],
    "bayer aspirin": ["aspirin"],
    "ecotrin": ["aspirin"],

    // =========================
    // ALLERGY / ANTIHISTAMINES
    // =========================

    "diphenhydramine": ["diphenhydramine"],
    "benadryl": ["diphenhydramine"],
    "unisom sleepgels": ["diphenhydramine"],

    "doxylamine": ["doxylamine"],
    "unisom": ["doxylamine"],

    "loratadine": ["loratadine"],
    "claritin": ["loratadine"],
    "alavert": ["loratadine"],

    "cetirizine": ["cetirizine"],
    "zyrtec": ["cetirizine"],

    "levocetirizine": ["levocetirizine"],
    "xyzal": ["levocetirizine"],

    "fexofenadine": ["fexofenadine"],
    "allegra": ["fexofenadine"],

    "chlorpheniramine": ["chlorpheniramine"],

    "hydroxyzine": ["hydroxyzine"],
    "vistaril": ["hydroxyzine"],
    "atarax": ["hydroxyzine"],

    // =========================
    // COUGH / COLD
    // =========================

    "dextromethorphan": ["dextromethorphan"],
    "delsym": ["dextromethorphan"],
    "robitussin dm": ["dextromethorphan", "guaifenesin"],

    "guaifenesin": ["guaifenesin"],
    "mucinex": ["guaifenesin"],

    "pseudoephedrine": ["pseudoephedrine"],
    "sudafed": ["pseudoephedrine"],

    "phenylephrine": ["phenylephrine"],
    "sudafed pe": ["phenylephrine"],

    "nyquil": [
        "acetaminophen",
        "dextromethorphan",
        "doxylamine"
    ],

    "dayquil": [
        "acetaminophen",
        "dextromethorphan",
        "phenylephrine"
    ],

    // =========================
    // STOMACH / DIGESTIVE
    // =========================

    "calcium carbonate": ["calcium carbonate"],
    "tums": ["calcium carbonate"],

    "famotidine": ["famotidine"],
    "pepcid": ["famotidine"],

    "omeprazole": ["omeprazole"],
    "prilosec": ["omeprazole"],

    "esomeprazole": ["esomeprazole"],
    "nexium": ["esomeprazole"],

    "lansoprazole": ["lansoprazole"],
    "prevacid": ["lansoprazole"],

    "pantoprazole": ["pantoprazole"],
    "protonix": ["pantoprazole"],

    "cimetidine": ["cimetidine"],
    "tagamet": ["cimetidine"],

    "bismuth subsalicylate": ["bismuth subsalicylate"],
    "pepto bismol": ["bismuth subsalicylate"],

    "loperamide": ["loperamide"],
    "imodium": ["loperamide"],

    "polyethylene glycol": ["polyethylene glycol"],
    "miralax": ["polyethylene glycol"],

    "docusate": ["docusate"],
    "colace": ["docusate"],

    // =========================
    // ANTIBIOTICS
    // =========================

    "amoxicillin": ["amoxicillin"],
    "amoxil": ["amoxicillin"],

    "amoxicillin clavulanate": [
        "amoxicillin",
        "clavulanate"
    ],
    "augmentin": [
        "amoxicillin",
        "clavulanate"
    ],

    "azithromycin": ["azithromycin"],
    "zithromax": ["azithromycin"],
    "z pak": ["azithromycin"],

    "cephalexin": ["cephalexin"],
    "keflex": ["cephalexin"],

    "doxycycline": ["doxycycline"],
    "vibramycin": ["doxycycline"],

    "ciprofloxacin": ["ciprofloxacin"],
    "cipro": ["ciprofloxacin"],

    "clindamycin": ["clindamycin"],
    "cleocin": ["clindamycin"],

    "metronidazole": ["metronidazole"],
    "flagyl": ["metronidazole"],

    "penicillin": ["penicillin"],
    "penicillin v": ["penicillin"],

    "trimethoprim sulfamethoxazole": [
        "trimethoprim",
        "sulfamethoxazole"
    ],
    "bactrim": [
        "trimethoprim",
        "sulfamethoxazole"
    ],

    // =========================
    // BLOOD PRESSURE / HEART
    // =========================

    "lisinopril": ["lisinopril"],
    "zestril": ["lisinopril"],
    "prinivil": ["lisinopril"],

    "losartan": ["losartan"],
    "cozaar": ["losartan"],

    "valsartan": ["valsartan"],
    "diovan": ["valsartan"],

    "irbesartan": ["irbesartan"],
    "avapro": ["irbesartan"],

    "amlodipine": ["amlodipine"],
    "norvasc": ["amlodipine"],

    "diltiazem": ["diltiazem"],
    "cardizem": ["diltiazem"],

    "verapamil": ["verapamil"],
    "calan": ["verapamil"],

    "metoprolol": ["metoprolol"],
    "lopressor": ["metoprolol"],
    "toprol xl": ["metoprolol"],

    "atenolol": ["atenolol"],
    "tenormin": ["atenolol"],

    "propranolol": ["propranolol"],
    "inderal": ["propranolol"],

    "hydrochlorothiazide": ["hydrochlorothiazide"],
    "microzide": ["hydrochlorothiazide"],

    "furosemide": ["furosemide"],
    "lasix": ["furosemide"],

    // =========================
    // CHOLESTEROL
    // =========================

    "atorvastatin": ["atorvastatin"],
    "lipitor": ["atorvastatin"],

    "simvastatin": ["simvastatin"],
    "zocor": ["simvastatin"],

    "rosuvastatin": ["rosuvastatin"],
    "crestor": ["rosuvastatin"],

    "pravastatin": ["pravastatin"],
    "pravachol": ["pravastatin"],

    // =========================
    // BLOOD THINNERS
    // =========================

    "warfarin": ["warfarin"],
    "coumadin": ["warfarin"],
    "jantoven": ["warfarin"],

    "apixaban": ["apixaban"],
    "eliquis": ["apixaban"],

    "rivaroxaban": ["rivaroxaban"],
    "xarelto": ["rivaroxaban"],

    "dabigatran": ["dabigatran"],
    "pradaxa": ["dabigatran"],

    "clopidogrel": ["clopidogrel"],
    "plavix": ["clopidogrel"],

    // =========================
    // DIABETES
    // =========================

    "metformin": ["metformin"],
    "glucophage": ["metformin"],

    "glipizide": ["glipizide"],
    "glucotrol": ["glipizide"],

    "glyburide": ["glyburide"],
    "diabeta": ["glyburide"],

    "sitagliptin": ["sitagliptin"],
    "januvia": ["sitagliptin"],

    "empagliflozin": ["empagliflozin"],
    "jardiance": ["empagliflozin"],

    // =========================
    // THYROID
    // =========================

    "levothyroxine": ["levothyroxine"],
    "synthroid": ["levothyroxine"],
    "levoxyl": ["levothyroxine"],

    "liothyronine": ["liothyronine"],
    "cytomel": ["liothyronine"],

    // =========================
    // ANTIDEPRESSANTS
    // =========================

    "sertraline": ["sertraline"],
    "zoloft": ["sertraline"],

    "fluoxetine": ["fluoxetine"],
    "prozac": ["fluoxetine"],

    "escitalopram": ["escitalopram"],
    "lexapro": ["escitalopram"],

    "citalopram": ["citalopram"],
    "celexa": ["citalopram"],

    "paroxetine": ["paroxetine"],
    "paxil": ["paroxetine"],

    "venlafaxine": ["venlafaxine"],
    "effexor": ["venlafaxine"],

    "duloxetine": ["duloxetine"],
    "cymbalta": ["duloxetine"],

    "bupropion": ["bupropion"],
    "wellbutrin": ["bupropion"],

    "trazodone": ["trazodone"],
    "desyrel": ["trazodone"],

    // =========================
    // PAIN / NERVE MEDICATIONS
    // =========================

    "tramadol": ["tramadol"],
    "ultram": ["tramadol"],

    "gabapentin": ["gabapentin"],
    "neurontin": ["gabapentin"],

    "pregabalin": ["pregabalin"],
    "lyrica": ["pregabalin"],

    "cyclobenzaprine": ["cyclobenzaprine"],
    "flexeril": ["cyclobenzaprine"],

    "tizanidine": ["tizanidine"],
    "zanaflex": ["tizanidine"],

    "baclofen": ["baclofen"],
    "lioresal": ["baclofen"],

    // =========================
    // ASTHMA / ALLERGIES
    // =========================

    "albuterol": ["albuterol"],
    "ventolin": ["albuterol"],
    "proair": ["albuterol"],

    "fluticasone": ["fluticasone"],
    "flonase": ["fluticasone"],

    "budesonide": ["budesonide"],
    "pulmicort": ["budesonide"],

    "montelukast": ["montelukast"],
    "singulair": ["montelukast"],

    // =========================
    // STEROIDS / ANTI-INFLAMMATORY
    // =========================

    "prednisone": ["prednisone"],
    "rayos": ["prednisone"],

    "prednisolone": ["prednisolone"],
    "orapred": ["prednisolone"],

    "methylprednisolone": ["methylprednisolone"],
    "medrol": ["methylprednisolone"],

    "dexamethasone": ["dexamethasone"],
    "decadron": ["dexamethasone"],

    // =========================
    // COMMON SKIN MEDICATIONS
    // =========================

    "hydrocortisone": ["hydrocortisone"],
    "clotrimazole": ["clotrimazole"],
    "lotrimin": ["clotrimazole"],

    "terbinafine": ["terbinafine"],
    "lamisil": ["terbinafine"],

    // =========================
    // COMMON OTHER MEDICATIONS
    // =========================

    "ondansetron": ["ondansetron"],
    "zofran": ["ondansetron"],

    "tamsulosin": ["tamsulosin"],
    "flomax": ["tamsulosin"],

    "finasteride": ["finasteride"],
    "propecia": ["finasteride"],
    "proscar": ["finasteride"],

    "sildenafil": ["sildenafil"],
    "viagra": ["sildenafil"],

    "tadalafil": ["tadalafil"],
    "cialis": ["tadalafil"]
};
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
