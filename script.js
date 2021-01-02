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
            valueToPush[j] = children.children[i].children[j].innerHTML;
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

    for (let i = 0; i < itemsPerPage; i++) {
        if (foundPrograms[i + ((page - 1) * itemsPerPage)]['date'] === "Rood") {
            document.getElementById(i + 1 + "eName").innerHTML =
                "<i class='red'>" + ((i + 1) + ((page - 1) * itemsPerPage)) + ". " + foundPrograms[i + ((page - 1) * itemsPerPage)]['name'] + "</i>";
        } else {
            document.getElementById(i + 1 + "eName").innerHTML =
                ((i + 1) + ((page - 1) * itemsPerPage)) + ". " + foundPrograms[i + ((page - 1) * itemsPerPage)]['name'];
        }
        document.getElementById(i + 1 + "eType").innerHTML =
            (foundPrograms[i + ((page - 1) * itemsPerPage)]['type'] === "Uitdagende Scoutingtechnieken") ? "Scoutingtechnieken" : foundPrograms[i + ((page - 1) * itemsPerPage)]['type'];
        if (foundPrograms[i + ((page - 1) * itemsPerPage)]['location'] !== "") {
            switch (foundPrograms[i + ((page - 1) * itemsPerPage)]['location']) {
                case "Bos":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/bos.png' alt='' title='Bos' height='15' width='15'> " + foundPrograms[i + ((page - 1) * itemsPerPage)]['location'];
                    break;
                case "Veld":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/veld.png' alt='' title='Veld' height='15' width='15'> " + foundPrograms[i + ((page - 1) * itemsPerPage)]['location'];
                    break;
                case "Clubhuis":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/clubhuis.png' alt='' title='Clubhuis' height='15' width='15'> " + foundPrograms[i + ((page - 1) * itemsPerPage)]['location'];
                    break;
                case "Binnenstad":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/binnenstad.png' alt='' title='Binnenstad' height='15' width='15'> " + foundPrograms[i + ((page - 1) * itemsPerPage)]['location'];
                    break;
                default:
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/locatie.png' alt='' title='Locatie' height='15' width='20'> " + foundPrograms[i + ((page - 1) * itemsPerPage)]['location'];
            }
        } else { // no program = empty
            document.getElementById(i + 1 + "eLoca").innerHTML = "";
        }

        let eWhen = "";
        if (foundPrograms[i + ((page - 1) * itemsPerPage)][3]) {
            eWhen = "<img src='http://franciscus.pbworks.com/f/wanneer.png' alt='' title='Wanneer' height='15' width='15'> ";
            if (foundPrograms[i + ((page - 1) * itemsPerPage)][3] === "0/0") {
                eWhen += "-- / ----";
            } else {
                eWhen += foundPrograms[i + ((page - 1) * itemsPerPage)]['date'];
            }
        }
        document.getElementById(i + 1 + "eWhen").innerHTML = eWhen;
    }

    document.getElementById("found").innerHTML = foundPrograms.length; // set #results found

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
        document.getElementById("range").innerHTML = newValue + " maand"; // output single
    } else {
        document.getElementById("range").innerHTML = newValue + " maanden"; // output
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
        if (!selectedTypes.includes(program.type)) {
            return;
        }
        if (!selectedLocations.includes(program.location)) {
            return;
        }
        if (program.date !== '' && !ever) {
            return;
        }
        if (program.date === '' && !never) {
            return;
        }
        if (program.unfinished === red) {
            return;
        }
        if (calculateDifference(program.date) >= when) { // check if the program has right date
        }

        foundPrograms.push(program);
    });

    // sort the results by date
    foundPrograms.sort(function (a, b) {
        return parseFloat(calculateDifference(b['date'])) - parseFloat(calculateDifference(a['date']))
    });

    console.log('foundPrograms', foundPrograms);
    // show the result
    showPrograms(foundPrograms, page);
}

//</script>

//<script>/*3*/// check if a values is in an array

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
