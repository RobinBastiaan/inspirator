<!-- The Script for the Inspirator -->
//<script>/*0*/// Global initial values
const repeat = 24;
const itemsPerPage = 6;
let foundPrograms = [];
let when = 0;
const types = {
    'creatief': 'Creatief',
    'sport': 'Sport & Spel',
    'strategisch': 'Strategisch',
    'toneel': 'Toneel',
    'scoutingtechinieken': 'Uitdagende Scoutingtechnieken',
    'veilig': 'Veilig & Gezond',
    'thema': 'Thema',
    'korte': 'Korte spelletjes',
};
const locations = {
    'bos': 'Bos',
    'veld': 'Veld',
    'clubhuis': 'Clubhuis',
    'binnenstad': 'Binnenstad',
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
                valueToPush[j] = children.children[i].children[j].innerHTML;
            } else {
                valueToPush[j] = children.children[i].children[j].innerHTML.split(',');
            }
        }
        let program = new programClass(...valueToPush);
        programArray.push(program);
    }

    return programArray;
}

//<script>/*1*/// display the programs with their values
function showPrograms(foundPrograms, page) {
    if (!foundPrograms) {
        return;
    }

    // show the programs on this page
    for (let i = 0; i < itemsPerPage; i++) {
        let program = foundPrograms[i + ((page - 1) * itemsPerPage)];
        if (!program) {
            return;
        }
        let name = ((i + 1) + ((page - 1) * itemsPerPage)) + '. ' + program.name;
        let unfinishedColor = (program.unfinished) ? 'class="red"' : '';
        name = '<a ' + unfinishedColor + ' href="http://franciscus.pbworks.com/w/page/' + program.name + '">' + name + '</a>';
        document.getElementById(i + 1 + 'eName').innerHTML = name;
        document.getElementById(i + 1 + 'eType').innerHTML = program.type;
        document.getElementById(i + 1 + 'eLoca').innerHTML = (!program.location) ? '' :
            //'<img src="http://franciscus.pbworks.com/f/' + program.location[0].toString().toLowerCase() + '.png" alt="" title="' + program.location + '" height="15" width="15"> ' + program.location;
            '<img src="src/' + program.location[0].toString().toLowerCase() + '.png" alt="" title="' + program.location + '" height="15" width="15"> ' + program.location;
        let eWhen = (program.date[0]) ? program.date : '-- / ----';
        document.getElementById(i + 1 + 'eWhen').innerHTML =
            // '<img src="http://franciscus.pbworks.com/f/wanneer.png" alt="" title="Wanneer" height="15" width="15"> ' + eWhen;
            '<img src="src/wanneer.png" alt="" title="Wanneer" height="15" width="15"> ' + eWhen;
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
    //years = Math.floor(newValue / 12);
    //months = newValue % 12;
    //document.getElementById("range").innerHTML = years + " jr, " + months + " mnd"; // output
    if (newValue === 1) {
        document.getElementById('range').innerHTML = newValue + ' maand'; // output single
    } else {
        document.getElementById('range').innerHTML = newValue + ' maanden'; // output
    }
}

// select all checkboxes with the same name (type/location)
function checkboxToggle(source, name) {
    let checkboxes = document.getElementsByName(name);
    for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}

//</script>

//<script>/*2*/// search for the programs
function search(page) {
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

    // new special option-input
    let ever = document.querySelector('input[value="ever"]').checked;
    let never = document.querySelector('input[value="never"]').checked;
    let red = document.querySelector('input[value="red"]').checked;

    // cycle through all programs and only add those that match the search parameters
    foundPrograms = []; // reset values
    let programs = getProgram();
    programs.forEach(function (program) {
        if (!selectedTypes.filter(value => program.type.includes(value))) {
            return;
        }
        if (!selectedLocations.filter(value => program.location.includes(value))) {
            return;
        }
        if (program.date[0] && !ever) {
            return;
        }
        if (!program.date[0] && !never) {
            return;
        }
        if (program.unfinished && !red) {
            return;
        }
        if (calculateDifference(program.date[program.date.length - 1]) >= when) { // check if the program has right date
        }

        foundPrograms.push(program);
    });

    // sort the results by date
    foundPrograms.sort(function (a, b) {
        return parseFloat(calculateDifference(b['date'][b['date'].length - 1])) - parseFloat(calculateDifference(a['date'][a['date'].length - 1]))
    });

    // show the result
    showPrograms(foundPrograms, page);
}

// calculate difference in months with current time
function calculateDifference(programDate) {
    if (programDate === '*') { // program can always be done
        return 0;
    }

    // get today value
    let today = new Date();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    let whenResult = programDate.split("/");
    return ((yyyy - whenResult[1]) * 12) + (mm - whenResult[0]); // calculate difference in months
}

// initial function calls
window.addEventListener("onload", showValue(repeat), false); // initial slider-range
window.addEventListener("onload", search(1), false); // initial programs
//</script>
