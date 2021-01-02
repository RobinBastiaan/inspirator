<!-- The Script for the Inspirator -->
//<script>/*0*/// Global initial values
const repeat = 24;
const itemsPerPage = 6;
let found = 0;
let games = [];
let when = 0;

class programClass {
    constructor(name, type, location, date, special) {
        this.name = name;
        this.type = type;
        this.location = location;
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

    // TODO randomize result

    return programArray;
}

//<script>/*1*/// display the programs with their values
function showPrograms(games, found, page) {
    for (let i = 0; i < itemsPerPage; i++) {
        if (games[i + ((page - 1) * itemsPerPage)][4] === "Rood") {
            document.getElementById(i + 1 + "eName").innerHTML =
                "<i class='red'>" + ((i + 1) + ((page - 1) * itemsPerPage)) + ". " + games[i + ((page - 1) * itemsPerPage)][0] + "</i>";
        } else {
            document.getElementById(i + 1 + "eName").innerHTML =
                ((i + 1) + ((page - 1) * itemsPerPage)) + ". " + games[i + ((page - 1) * itemsPerPage)][0];
        }
        document.getElementById(i + 1 + "eType").innerHTML =
            (games[i + ((page - 1) * itemsPerPage)][1] === "Uitdagende Scoutingtechnieken") ? "Scoutingtechnieken" : games[i + ((page - 1) * itemsPerPage)][1];
        if (games[i + ((page - 1) * itemsPerPage)][2] !== "") {
            switch (games[i + ((page - 1) * itemsPerPage)][2]) {
                case "Bos":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/bos.png' alt='' title='Bos' height='15' width='15'> " + games[i + ((page - 1) * itemsPerPage)][2];
                    break;
                case "Veld":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/veld.png' alt='' title='Veld' height='15' width='15'> " + games[i + ((page - 1) * itemsPerPage)][2];
                    break;
                case "Clubhuis":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/clubhuis.png' alt='' title='Clubhuis' height='15' width='15'> " + games[i + ((page - 1) * itemsPerPage)][2];
                    break;
                case "Binnenstad":
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/binnenstad.png' alt='' title='Binnenstad' height='15' width='15'> " + games[i + ((page - 1) * itemsPerPage)][2];
                    break;
                default:
                    document.getElementById(i + 1 + "eLoca").innerHTML =
                        "<img src='http://franciscus.pbworks.com/f/locatie.png' alt='' title='Locatie' height='15' width='20'> " + games[i + ((page - 1) * itemsPerPage)][2];
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
                eWhen += games[i + ((page - 1) * itemsPerPage)][3];
            }
        }
        document.getElementById(i + 1 + "eWhen").innerHTML = eWhen;
    }

    document.getElementById("found").innerHTML = found; // set #results found

    for (let j = 1; j <= 10; j++) { // max 10 pagemarkers
        if (found - ((j - 1) * itemsPerPage) > 0) { // if that page has programs
            if (j === page) { // to set and reset the boldness of the current page
                document.getElementById(j.toString()).innerHTML = "<b><u>[" + j + "]</u></b>";
            } else {
                document.getElementById(j.toString()).innerHTML = "<span>[" + j + "]</span>";
            }
        } else { // hide the pagemarker if the page is empty
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

// select all checkboxes with the same name (type/loca)
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
    let type = [];
    if (document.querySelector('input[value="creatief"]').checked) {
        type.push("Creatief");
    }
    if (document.querySelector('input[value="sport"]').checked) {
        type.push("Sport & Spel");
    }
    if (document.querySelector('input[value="strategisch"]').checked) {
        type.push("Strategisch");
    }
    if (document.querySelector('input[value="toneel"]').checked) {
        type.push("Toneel");
    }
    if (document.querySelector('input[value="scoutingtechinieken"]').checked) {
        type.push("Uitdagende Scoutingtechnieken");
    }
    if (document.querySelector('input[value="veilig"]').checked) {
        type.push("Veilig & Gezond");
    }
    if (document.querySelector('input[value="thema"]').checked) {
        type.push("Thema");
    }
    if (document.querySelector('input[value="korte"]').checked) {
        type.push("Korte spelletjes");
    }

    // new loca-input
    let loca = [];
    if (document.querySelector('input[value="bos"]').checked) {
        loca.push("Bos");
    }
    if (document.querySelector('input[value="veld"]').checked) {
        loca.push("Veld");
    }
    if (document.querySelector('input[value="clubhuis"]').checked) {
        loca.push("Clubhuis");
    }
    if (document.querySelector('input[value="binnenstad"]').checked) {
        loca.push("Binnenstad");
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
    let programArray = getProgram();

    for (let i = 0; i < programs.length; i++) { // cycle through all prog
        for (let j = 0; j < type.length; j++) { // cycle through prog-type checked
            for (let k = 0; k < loca.length; k++) { // cycle through prog-loca checked
                if (valueInArray(programs[i][1], type[j])) { // check if the prog has the right type
                    if (valueInArray(programs[i][2], loca[k])) { // check if the prog has the right loca
                        if (never === true && ever === true) { // check if user wants to see ever&never done prog's
                            if (red === true) { // check if user wants to include red prog's
                                if (calculateDifference(programs[i][3]) >= when) { // check if the prog has right date
                                    games.push(eval("programs[" + i + "]")); // all prog's
                                    rank++;
                                    found++;
                                }
                            } else { // all not-red prog's and right date
                                if ((programs[i][4] !== "Rood") && (calculateDifference(programs[i][3]) >= when)) { // check if the prog is not red and right date
                                    games.push(eval("programs[" + i + "]"));
                                    rank++;
                                    found++;
                                }
                            }
                        } else if (never === true) { // check if user wants to ONLY see never done prog's
                            if ((programs[i][3] === "0/0") && (programs[i][4] !== "Rood")) { // check if the prog has never been done
                                games.push(eval("programs[" + i + "]"));
                                rank++;
                                found++;
                            }
                            if (red === true) { // check if user wants to include red prog's
                                if ((programs[i][3] === "0/0") && (programs[i][4] === "Rood")) { // check if the prog has never been done and is red
                                    games.push(eval("programs[" + i + "]"));
                                    rank++;
                                    found++;
                                }
                            }
                        } else if (ever === true) { // check if user wants to ONLY see ever done prog's
                            if ((programs[i][3] !== "0/0") && (calculateDifference(programs[i][3]) >= when)) { // check if the prog has ever been done and right date
                                games.push(eval("programs[" + i + "]"));
                                rank++;
                                found++;
                            } // no need to check for red here; asume done implies not red
                        }
                    }
                }
            }
        }
    }

    // sort the results on date
    games.sort(function (a, b) {
        return parseFloat(calculateDifference(b[3])) - parseFloat(calculateDifference(a[3]))
    });

    // make sure there are empty results so there will be a correct output
    while (rank < programs.length) {
        games.push(eval("programs[0]"));
        rank++;
    }

    // show the result
    showPrograms(games, found, page);
}

//</script>

//<script>/*3*/// check if a values is in an array
function valueInArray(arr, obj) {
    return (arr.indexOf(obj) !== -1);
}

// calculate difference in months with current time
function calculateDifference(program_date) {
    // get today value
    let today = new Date();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    let when_res = program_date.split("/");
    return ((yyyy - when_res[1]) * 12) + (mm - when_res[0]); // calculate difference in months
}

// initial function calls
window.addEventListener("onload", showValue(repeat), false); // initial slider-range
window.addEventListener("onload", search(1), false); // initial programs
//</script>
