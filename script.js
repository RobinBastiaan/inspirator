<!-- The Script for the Inspirator -->
//<script>/*0*/// Global initial values
let foundPrograms = [];
const repeat = 24;
const itemsPerPage = 6;
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

class programClass {
    constructor(name, location, type, date, special, unfinished) {
        this.name = name;
        this.location = location;
        this.type = type;
        this.date = date;
        this.special = special;
        this.unfinished = !!unfinished;
    }
}

// get all programs given in the html
function getProgram() {
    let children = document.getElementById("source-table").children[0];
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
        let program = new programClass(...valueToPush);
        programArray.push(program);
    }

    return programArray;
}

// to make sure some input transformations are correct
function sanitizeInput(input) {
    return input.trim().replace('&amp;', '&').replace('&nbsp;', '');
}

// search for the programs
function search(page = 1) {
    // new type-input
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

    // cycle through all programs and only add those that match the search parameters
    let programs = getProgram();
    foundPrograms = programs.filter(function (program) {
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
    foundPrograms.sort(function (a, b) {
        return parseFloat(calculateDifference(b['date'][b['date'].length - 1])) - parseFloat(calculateDifference(a['date'][a['date'].length - 1]))
    });

    // show the result
    showPrograms(foundPrograms, page);
}
//</script>

//<script>/*1*/// display the programs with their values
function showPrograms(foundPrograms, page) {
    if (!foundPrograms) {
        return;
    }

    // show the programs on this page
    for (let i = 0; i < itemsPerPage; i++) {
        let program = foundPrograms[i + ((page - 1) * itemsPerPage)];

        if (!program) { // reset this entry
            document.getElementById(i + 1 + 'eName').innerHTML = ((i + 1) + ((page - 1) * itemsPerPage)) + '. Geen resultaat.<br><br>';
            document.getElementById(i + 1 + 'eType').innerHTML = '';
            document.getElementById(i + 1 + 'eLoca').innerHTML = '';
            document.getElementById(i + 1 + 'eWhen').innerHTML = '';
            continue;
        }

        let name = ((i + 1) + ((page - 1) * itemsPerPage)) + '. ' + program.name;
        let unfinishedColor = program.unfinished ? 'class="red"' : '';
        let specialText = String(program.special) === '' ? '' : ' (' + program.special + ')';
        name = '<a ' + unfinishedColor + ' href="http://franciscus.pbworks.com/w/page/' + program.name + '">' + name + '</a>';
        document.getElementById(i + 1 + 'eName').innerHTML = name + specialText;
        document.getElementById(i + 1 + 'eType').innerHTML = program.type.join(', ');
        document.getElementById(i + 1 + 'eLoca').innerHTML = (!program.location) ? '' :
            //'<img src="http://franciscus.pbworks.com/f/' + program.location[0].toString().toLowerCase() + '.png" alt="" title="' + program.location + '" height="18" width="18"> ' + program.location;
            '<img src="src/' + program.location[0].toString().toLowerCase() + '.png" alt="" title="' + program.location.join(', ') + '" height="18" width="18"> ' + program.location.join(', ');
        let eWhen = (program.date[0]) ? program.date : '-- / ----';
        document.getElementById(i + 1 + 'eWhen').innerHTML =
            // '<img src="http://franciscus.pbworks.com/f/wanneer.png" alt="" title="Wanneer" height="18" width="18"> ' + eWhen;
            '<img src="src/wanneer.png" alt="" title="Wanneer" height="18" width="18"> ' + eWhen;
    }

    document.getElementById('found').innerHTML = foundPrograms.length; // set #results found

    // show page markers
    for (let j = 1; j <= 10; j++) { // max 10 page markers
        if (foundPrograms.length - ((j - 1) * itemsPerPage) > 0) { // if that page has programs
            if (j === page) { // to set and reset the boldness of the current page
                document.getElementById(j.toString()).innerHTML = "<b><u>[" + j + "]</u></b>";
            } else {
                document.getElementById(j.toString()).innerHTML = "<span>[" + j + "]</span>";
            }
        } else { // hide the page marker if the page is empty
            document.getElementById(j.toString()).innerHTML = " "; // invisible char for vertical spacing(alt+255)
        }
    }
}

// show the correct value of the slider-range
function showValue(newValue) {
    if (newValue === 1) {
        document.getElementById('range').innerHTML = newValue + ' maand';
    } else {
        document.getElementById('range').innerHTML = newValue + ' maanden';
    }
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
window.addEventListener("DOMContentLoaded", function () {
    showValue(repeat); // initial slider-range
    search(1); // initial programs

    document.getElementById('search').addEventListener('click', function () {
        search(1)
    });

    let checkAll = document.getElementsByClassName('check-all');
    for (let i = 0; i < checkAll.length; i++) {
        checkAll[i].addEventListener('click', function () {
            checkboxToggle(this);
        });
    }

    let pages = document.getElementsByClassName('pages');
    for (let i = 0; i < pages.length; i++) {
        pages[i].addEventListener('click', function () {
            showPrograms(foundPrograms, this.id);
        });
    }
});
//</script>
