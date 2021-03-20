<!-- The Script for the Inspirator -->
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
let programs = '';
let programIndex = new Map();

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

        // http://franciscus.pbworks.com/f/' + program.location[0].toString().toLowerCase() + '.png
        // http://franciscus.pbworks.com/f/wanneer.png
        let htmlString = `
            <div id="${this.id}" class="inspirator">
                <a ${classRed} href="http://franciscus.pbworks.com/w/page/${this.name}">
                    ${this.name} ${programSpecialText}
                </a>`;

                this.location.forEach(location => {
                    if (location) {
                        htmlString += `<img alt="${location}" title="${location}" src="src/${location.toString().toLowerCase()}.png" width="18" height="18"> ${location} `;
                    }
                });

                this.type.forEach(type => {
                    if (type) {
                        htmlString += `<img alt="${type}" title="${type}" src="src/${type.split(' ')[0].toString().toLowerCase()}.svg" width="18" height="18"> ${type} `;
                    }
                });

                htmlString += `<img alt="${this.location.join(', ')}" title="${this.location.join(', ')}" src="src/wanneer.png" width="18" height="18"> ${eWhen}
            </div>`;

        return htmlString;
    }
}

function show(id) {
    if (programIndex.has(id)) {
        programIndex.get(id).classList.remove('program__hidden');
    }
}

function hide(id) {
    if (programIndex.has(id)) {
        programIndex.get(id).classList.add('program__hidden');
    }
}

// get all programs given in the html
function getProgram() {
    let children = document.getElementById('source-table').children[0];
    let len = children.childElementCount;
    let programArray = [];

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
        programArray.push(program);
    }

    return programArray;
}

// to make sure some input transformations are correct
function sanitizeInput(input) {
    return input.trim().replace('&amp;', '&').replace('&nbsp;', '');
}

// search for the programs
function search() {
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
    foundPrograms = programs.filter((program) => {
        if (!selectedTypes.some(value => program.type.includes(value))) {
            return;
        }
        if (!selectedLocations.some(value => program.location.includes(value))) {
            return;
        }
        if (!ever && program.date[0] && program.date[0] !== '*') {
            return;
        }
        if (!never && !program.date[0] && program.date[0] !== '*') {
            return;
        }
        if (!always && program.date[0] === '*') {
            return;
        }
        if (!red && program.unfinished) {
            return;
        }
        if (calculateDifference(program.date[program.date.length - 1]) < when && program.date[0] !== '*') { // check if the program has right date
            return;
        }

        return true;
    });

    // sort the results by date
    foundPrograms.sort((a, b) => {
        return parseFloat(calculateDifference(b['date'][b['date'].length - 1])) - parseFloat(calculateDifference(a['date'][a['date'].length - 1]))
    });

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
    programs.forEach(e => {
        if (foundPrograms.includes(e)) {
            show(e.id);
        } else {
            hide(e.id);
        }
    });

    document.getElementById('found').innerHTML = resultsFound;
}

function buildPrograms(programs) {
    let htmlString = '';

    programs.forEach(e => {
        htmlString += e.html;
        // TODO fill map
    });

    document.getElementById('result-wrapper').innerHTML = htmlString;

    programs.forEach(e => {
        programIndex.set(e.id, document.getElementById(e.id));
    });
}

// show the correct value of the slider-range
function showSliderValue(newValue) {
    let monthText = newValue === '1' ? ' maand' : ' maanden';
    document.getElementById('range').innerHTML = newValue + monthText;
}

// select all checkboxes with the same name (type/location)
function checkboxToggle(e) {
    let checkboxes = document.getElementsByName(e.name);
    for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = e.checked;
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
    programs = getProgram();
    buildPrograms(programs);
    search(); // initial programs

    document.getElementById('search').addEventListener('click', () => {
        search()
    });

    let checkAll = document.getElementsByClassName('check-all');
    for (let i = 0; i < checkAll.length; i++) {
        checkAll[i].addEventListener('click', () => {
            checkboxToggle(this);
        });
    }
});
//</script>
