<!-- The Script for the Inspirator -->
//<script>/*0*/// Global initial values
const repeat = 24;
const itemsPerPage = 6;
let found = 0;
let games = [];
let when = 0;

class programClass {
    constructor(name, location, type, date, special) {
        this.name = name;
        this.location = location;
        this.type = type;
        this.date = date;
        this.special = special;
    }
}

// get all programs given in the html
function getProgram() {
    let children = document.getElementById("source-table").children[0];
    let len = children.childElementCount;
    let programArray = [];

    for (let i = 1; i < len; i++) {
        let valueToPush = [];
        for (let j = 0; j <= 4; j++) {
            valueToPush[j] = children.children[i].children[j].innerHTML;
        }
        let program = new programClass(...valueToPush);
        programArray.push(program);
    }

    return programArray;
}

//<script>/*1*/// display the programs with their values
function showPrograms(games, found, page) {
    for (let i = 0; i < itemsPerPage; i++) {
        if (games[i + ((page - 1) * itemsPerPage)]['date'] === "Rood") {
            document.getElementById(i + 1 + "eName").innerHTML =
                "<i class='red'>" + ((i + 1) + ((page - 1) * itemsPerPage)) + ". " + games[i + ((page - 1) * itemsPerPage)]['name'] + "</i>";
        } else {
            document.getElementById(i + 1 + "eName").innerHTML =
                ((i + 1) + ((page - 1) * itemsPerPage)) + ". " + games[i + ((page - 1) * itemsPerPage)]['name'];
        }
        document.getElementById(i + 1 + "eType").innerHTML =
            (games[i + ((page - 1) * itemsPerPage)]['type'] === "Uitdagende Scoutingtechnieken") ? "Scoutingtechnieken" : games[i + ((page - 1) * itemsPerPage)]['type'];
        if (games[i + ((page - 1) * itemsPerPage)]['location'] !== "") {
            switch (games[i + ((page - 1) * itemsPerPage)]['location']) {
                case "Bos":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/bos.png' alt='' title='Bos' height='15' width='15'> " + games[i + ((page - 1) * itemsPerPage)]['location'];
                    break;
                case "Veld":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/veld.png' alt='' title='Veld' height='15' width='15'> " + games[i + ((page - 1) * itemsPerPage)]['location'];
                    break;
                case "Clubhuis":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/clubhuis.png' alt='' title='Clubhuis' height='15' width='15'> " + games[i + ((page - 1) * itemsPerPage)]['location'];
                    break;
                case "Binnenstad":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/binnenstad.png' alt='' title='Binnenstad' height='15' width='15'> " + games[i + ((page - 1) * itemsPerPage)]['location'];
                    break;
                default:
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/locatie.png' alt='' title='Locatie' height='15' width='20'> " + games[i + ((page - 1) * itemsPerPage)]['location'];
            }
        } else { // no program = empty
            document.getElementById(i + 1 + "eLoca").innerHTML = "";
        }

        let eWhen = "";
        if (games[i + ((page - 1) * itemsPerPage)][3]) {
            eWhen = "<img src='http://franciscus.pbworks.com/f/wanneer.png' alt='' title='Wanneer' height='15' width='15'> ";
            if (games[i + ((page - 1) * itemsPerPage)][3] === "0/0") {
                eWhen += "-- / ----";
            } else {
                eWhen += games[i + ((page - 1) * itemsPerPage)]['date'];
            }
        }
        document.getElementById(i + 1 + "eWhen").innerHTML = eWhen;
    }

    document.getElementById("found").innerHTML = found; // set #results found

    for (let j = 1; j <= 10; j++) { // max 10 page markers
        if (found - ((j - 1) * itemsPerPage) > 0) { // if that page has programs
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
    if (document.querySelector('input[value="creatief"]').checked) {
        selectedTypes.push("Creatief");
    }
    if (document.querySelector('input[value="sport"]').checked) {
        selectedTypes.push("Sport & Spel");
    }
    if (document.querySelector('input[value="strategisch"]').checked) {
        selectedTypes.push("Strategisch");
    }
    if (document.querySelector('input[value="toneel"]').checked) {
        selectedTypes.push("Toneel");
    }
    if (document.querySelector('input[value="scoutingtechinieken"]').checked) {
        selectedTypes.push("Uitdagende Scoutingtechnieken");
    }
    if (document.querySelector('input[value="veilig"]').checked) {
        selectedTypes.push("Veilig & Gezond");
    }
    if (document.querySelector('input[value="thema"]').checked) {
        selectedTypes.push("Thema");
    }
    if (document.querySelector('input[value="korte"]').checked) {
        selectedTypes.push("Korte spelletjes");
    }

    // new loca-input
    let selectedLocations = [];
    if (document.querySelector('input[value="bos"]').checked) {
        selectedLocations.push("Bos");
    }
    if (document.querySelector('input[value="veld"]').checked) {
        selectedLocations.push("Veld");
    }
    if (document.querySelector('input[value="clubhuis"]').checked) {
        selectedLocations.push("Clubhuis");
    }
    if (document.querySelector('input[value="binnenstad"]').checked) {
        selectedLocations.push("Binnenstad");
    }

    // new special option-input
    let ever = false;
    let never = false;
    let red = false;
    if (document.querySelector('input[value="ever"]').checked) {
        ever = true;
    }
    if (document.querySelector('input[value="never"]').checked) {
        never = true;
    }
    if (document.querySelector('input[value="red"]').checked) {
        red = true;
    }

    // algorithm to set values
    let rank = 1;
    found = 0;
    games = []; // reset game values

    // get programs
    let programs = getProgram();

    let programsLength = programs.length;
    for (let i = 0; i < programsLength; i++) { // cycle through all programs and only add those that match the search parameters
        if (!selectedTypes.includes(programs[i]['type'])) {
            continue;
        }
        if (!selectedLocations.includes(programs[i]['location'])) {
            continue;
        }

        if (never === true && ever === true) { // check if user wants to see ever&never done programs
            if (red === true) { // check if user wants to include red programs
                if (calculateDifference(programs[i]['date']) >= when) { // check if the program has right date
                    games.push(eval("programs[" + i + "]")); // all programs
                    rank++;
                    found++;
                }
            } else { // all not-red prog's and right date
                if ((programs[i]['date'] !== "Rood") && (calculateDifference(programs[i]['date']) >= when)) { // check if the program is not red and right date
                    games.push(eval("programs[" + i + "]"));
                    rank++;
                    found++;
                }
            }
        } else if (never === true) { // check if user wants to ONLY see never done programs
            if ((programs[i]['date'] === "0/0") && (programs[i]['date'] !== "Rood")) { // check if the program has never been done
                games.push(eval("programs[" + i + "]"));
                rank++;
                found++;
            }
            if (red === true) { // check if user wants to include red programs
                if ((programs[i]['date'] === "0/0") && (programs[i]['date'] === "Rood")) { // check if the program has never been done and is red
                    games.push(eval("programs[" + i + "]"));
                    rank++;
                    found++;
                }
            }
        } else if (ever === true) { // check if user wants to ONLY see ever done programs
            if ((programs[i]['date'] !== "0/0") && (calculateDifference(programs[i]['date']) >= when)) { // check if the program has ever been done and right date
                games.push(eval("programs[" + i + "]"));
                rank++;
                found++;
            } // no need to check for red here; assume done implies not red
        }
    }

    // sort the results on date
    games.sort(function (a, b) {
        return parseFloat(calculateDifference(b['date'])) - parseFloat(calculateDifference(a['date']))
    });

    // make sure there are empty results so there will be a correct output
    while (rank < programs.length) {
        games.push(eval("programs[0]"));
        rank++;
    }

    console.log(games);

    // show the result
    showPrograms(games, found, page);
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
