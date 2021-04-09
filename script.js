//<!-- The Script for the Inspirator -->
//<script>/*0*/// Global initial values
let foundPrograms = [];
const repeat = 24;
const types = {
    'creatief': 'Creatief',
    'sport': 'Sport & Spel',
    'strategisch': 'Strategisch',
    'toneel': 'Toneel',
    'scoutingtechnieken': 'Scoutingtechnieken',
    'veilig': 'Veilig & Gezond',
    'thema': 'Thema',
    'korte': 'Korte spelletjes',
};
const locations = {
    'bos': 'Bos',
    'veld': 'Veld',
    'clubhuis': 'Clubhuis',
    'stad': 'Stad',
    'online': 'Online',
    'anders': 'Anders',
};
let programLocations = {};
for (const property in locations) {
    programLocations[property] = [];
}
let programs = {};
for (const property in types) {
    programs[property] = []; //{...programLocations};
}

// let programIndex = new Map();

class programClass {
    constructor(id, name, location, type, date, special, unfinished) {
        this.id = 'prog' + id;
        this.name = name;
        this.location = location;
        this.type = type;
        this.date = date;
        this.special = special;
        this.unfinished = !!unfinished;
        this.html = this.buildHtml();
    }

    buildHtml() {
        let classRed = this.unfinished ? 'class="red"' : '';
        let programSpecialText = String(this.special) === '' ? '' : ' (' + this.special + ')';
        let eWhen = (this.date[0]) ? this.date : '-- / ----';
        let htmlString;

        htmlString = `<a id="${this.id}" class="program" href="http://franciscus.pbworks.com/w/page/${this.name}">`;
        htmlString += `<span ${classRed}><b>${this.name} ${programSpecialText}</b></span><br>`;
        htmlString += `<span class="lastRow">`;

        // location
        htmlString += `<span>`;
        this.location.forEach(location => {
            if (location) {
                htmlString += `<img alt="${location}" title="${location}" src="src/${location.toString().toLowerCase()}.png"> `;
            }
        });
        htmlString += `</span>`;

        // date
        htmlString += `<span><img alt="${this.location.join(', ')}" title="${this.location.join(', ')}" src="src/wanneer.png"> ${eWhen}</span>`;

        // type
        htmlString += `<span>`;
        this.type.forEach(type => {
            if (type) {
                htmlString += `<img alt="${type}" title="${type}" src="src/${type.split(' ')[0].toString().toLowerCase()}.svg"> `;
            }
        });
        htmlString += `</span>`;
        htmlString += `</span>`;
        htmlString += `</a>`;
        return htmlString;
    }
}

function show(id) {
    document.getElementById(id).classList.remove('program__hidden');
    document.getElementById(id).classList.add('programType');
}

function hide(id) {
    document.getElementById(id).classList.add('program__hidden');
}

// get all programs given in the html
function setPrograms() {
    let children = document.getElementById('source-table').children[0];
    let len = children.childElementCount;

    let containerData = [];
    for (const programType in programs) {
        containerData[programType] = '';
    }

    for (let i = 1; i < len; i++) {

        let valueToPush = [];
        for (let j = 0; j <= 5; j++) {
            if (j === 0 || j === 5) { // only columns 1 to 4 need to have the split separator
                valueToPush[j] = sanitizeInput(children.children[i].children[j].innerHTML);
            } else {
                valueToPush[j] = children.children[i].children[j].innerHTML.split(',').map(function (item) {
                    return sanitizeInput(item);
                });
            }
        }

        let program = new programClass(i, ...valueToPush);
        let programLocationKey = Object.keys(types).find(key => types[key] === program.type[0]);
        if (typeof programLocationKey !== 'undefined') {
            programs[programLocationKey].push(program);
            containerData[programLocationKey] += program.html;
        }
    }

    for (const programType in programs) {
        document.getElementById('container-' + programType).innerHTML += containerData[programType];
    }
}

// to make sure some input transformations are correct
function sanitizeInput(input) {
    return input.trim().replace('&amp;', '&').replace('&nbsp;', '');
}

// search for the programs
function search() {
    foundPrograms = [];

    // region new type-input
    let selectedTypes = [];
    for (let key in types) {
        if (document.querySelector('input[value="' + key + '"]').checked) {
            selectedTypes.push(types[key]);
        }
    }

    // new location-input
    let selectedLocations = [];
    for (let key in locations) {
        if (document.querySelector('input[value="' + key + '"]').checked) {
            selectedLocations.push(locations[key]);
        }
    }

    // new when-input
    let when = document.getElementById('date').value;

    // new additional option-input
    let ever = document.querySelector('input[value="ever"]').checked;
    let never = document.querySelector('input[value="never"]').checked;
    let always = document.querySelector('input[value="always"]').checked;
    let red = document.querySelector('input[value="red"]').checked;
    // endregion

    // cycle through all programs and only add those that match the search parameters
    for (const programType in programs) {
        for (const program of programs[programType]) {
            if (!selectedTypes.some(value => program.type.includes(value))) {
                continue;
            }
            if (!selectedLocations.some(value => program.location.includes(value))) {
                continue;
            }
            if (!ever && program.date[0] && program.date[0] !== '*') {
                continue;
            }
            if (!never && !program.date[0] && program.date[0] !== '*') {
                continue;
            }
            if (!always && program.date[0] === '*') {
                continue;
            }
            if (!red && program.unfinished) {
                continue;
            }
            if (calculateDifference(program.date[program.date.length - 1]) < when && program.date[0] !== '*') { // check if the program has right date
                continue;
            }

            foundPrograms.push(program);
        }
    }

    // show the result
    showPrograms(foundPrograms);
}

//</script>

//<script>/*1*/// display the programs with their values
function showPrograms(foundPrograms) {
    let resultsFound = foundPrograms.length;

    if (!foundPrograms) {
        return;
    }

    // show the programs on this page
    for (const programType in programs) {
        for (const program of programs[programType]) {
            if (foundPrograms.includes(program)) {
                show(program.id);
            } else {
                hide(program.id);
            }
        }
    }

    let foundElement = document.getElementById('found');
    foundElement.innerHTML = (resultsFound ?? 0).toString() + ' resultaten';
    foundElement.classList.remove('update-counter');
    void foundElement.offsetWidth; // trigger reflow to start the css animation
    foundElement.classList.add('update-counter');
}

// show the correct value of the slider-range
function showSliderValue(newValue) {
    let monthText = newValue === '1' ? ' maand' : ' maanden';
    document.getElementById('range').innerHTML = newValue + monthText;
}

// select all checkboxes with the same name (type/location)
function checkboxToggle(target) {
    let checkboxes = document.getElementsByName(target.name);
    for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = target.checked;
    }
}

// calculate difference in months with current time
function calculateDifference(programDate) {
    if (programDate === '*') { // program can always be done
        return 0;
    }

    // get today value
    let today = new Date();
    let mm = today.getMonth() + 1; // January is 0!
    let yyyy = today.getFullYear();

    let whenResult = programDate.split("/");
    return ((yyyy - whenResult[1]) * 12) + (mm - whenResult[0]); // calculate difference in months
}

// initial function calls and eventListeners
window.addEventListener('DOMContentLoaded', () => {
    showSliderValue(repeat); // initial slider-range
    setPrograms();
    search(); // initial programs

    // add checkboxToggle event listeners
    let checkAll = document.getElementsByClassName('check-all');
    for (let i = 0; i < checkAll.length; i++) {
        checkAll[i].addEventListener('click', (e) => {
            checkboxToggle(e.target);
        });
    }

    // add search event listeners
    let clickableSearchElements = document.querySelectorAll("input");
    for (let i = 0; i < clickableSearchElements.length; i++) {
        clickableSearchElements[i].addEventListener('click', (e) => {
            search();
        });
    }
});
//</script>
