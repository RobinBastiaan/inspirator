<!-- The Script for the Inspirator -->
//<script>/*0*/// Global initial values
const repeat = 24;
const itemsPerPage = 6;
let found = 0;
let games = [];
let when = 0;

class program {
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
        let program = new program(...valueToPush);
        programArray.push(program);
    }

    // TODO randomize result

    return programArray;
}

// program arrays  // 0 = name,  1 = loca(tion),  2 = type,  3 = when
let programs = [
    ["Geen resultaat.", "<br>", "", ""],
    // Creatief // 20
    ["<a href='http://franciscus.pbworks.com/w/page/Domino%20extra'>Domino extra</a>", "Creatief", "Clubhuis", "11/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Zeep%20maken'>Zeep maken</a>", "Creatief", "Clubhuis", "12/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Maskers'>Maskers</a>", "Creatief", "Clubhuis", "09/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Knikkerdoolhof'>Knikkerdoolhof</a>", "Creatief", "Clubhuis", "01/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Taptoe%20creatief'>Taptoe creatief</a>", "Creatief", "Clubhuis", "10/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Moss%20Graffiti'>Moss Graffiti</a>", "Creatief", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kettingreactie'>Kettingreactie</a>", "Creatief", "Clubhuis", "02/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Fluitkoord%20vlechten'>Fluitkoord vlechten</a>", "Creatief", "Clubhuis", "11/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Pompoenen'>Pompoenen</a>", "Creatief", "Clubhuis", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Knikkerbaan'>Knikkerbaan</a>", "Creatief", "Clubhuis", "09/2010"],
    ["<a href='http://franciscus.pbworks.com/w/page/Papieren%20maskers'>Papieren maskers</a>", "Creatief", "Clubhuis", "10/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Papier%20Maché%20Kasteel'>Papier Maché Kasteel</a>", "Creatief", "Clubhuis", "09/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Piñata%27s'>Piñata's</a>", "Creatief", "Clubhuis", "11/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Raket%20bouwen'>Raket bouwen</a>", "Creatief", "Clubhuis", "11/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Verf%20en%20traditie'>Verf en traditie</a>", "Creatief", "Clubhuis", "10/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kermis%20ballon%20schieten'>Kermis ballon schieten</a>", "Creatief", "Clubhuis", "04/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Slingshot'>Slingshot</a>", "Creatief", "Clubhuis", "06/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Fotopuzzelkubus'>Fotopuzzelkubus</a>", "Creatief", "Clubhuis", "03/2018"],
    ["<a href='http://franciscus.pbworks.com/w/page/Draad%20kunst'>Draad kunst</a>", "Creatief", "Clubhuis", "01/2004"],
    ["<a href='http://franciscus.pbworks.com/w/page/Bestektas%20maken'>Bestektas maken</a>", "Creatief", "Clubhuis", "0/0", "Rood"] // Red
];
//</script>

//<script>/*1*/// Sport & Spel // 33
programs.push(
    ["<a href='http://franciscus.pbworks.com/w/page/(S)tikkertje'>(S)tikkertje</a>", "Sport & Spel", "Bos", "09/2013", "", "Kennismaking"],
    ["<a href='http://franciscus.pbworks.com/w/page/Ken%20de%20Scouts'>Ken de Scouts</a>", "Sport & Spel", "Clubhuis", "09/2015", "", "Kennismaking"],
    ["<a href='http://franciscus.pbworks.com/w/page/Wie%20is%20de%20patrouille'>Wie is de patrouille</a>", "Sport & Spel", "Veld", "09/2014", "", "Patrouille indeling"],
    ["<a href='http://franciscus.pbworks.com/w/page/Tik%20je%20compleet'>Tik je compleet</a>", "Sport & Spel", "Bos", "09/2010", "", "Patrouille indeling"],
    ["<a href='http://franciscus.pbworks.com/w/page/The%20linking%20game'>The linking game</a>", "Sport & Spel", "Bos", "0/0", "Rood", "Patrouille indeling"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Melkpakken%20race'>Melkpakken race</a>", "Sport & Spel", "Clubhuis", "06/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Ja%20en%20nee%20spel'>Ja en nee spel</a>", "Sport & Spel", "Clubhuis", "10/2010"],
    ["<a href='http://franciscus.pbworks.com/w/page/Waterpret'>Waterpret</a>", "Sport & Spel", "Veld", "05/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Patrouille%20olympic'>Patrouille olympic</a>", "Sport & Spel", "Bos", "09/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Scheepsroof%20–%20De%20Piratenslag'>Scheepsroof – De Piratenslag</a>", "Sport & Spel", "Veld", "02/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/War%20of%20the%20patrouilles'>War of the patrouilles</a>", "Sport & Spel", "Bos", "03/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Voorwerpen-zoeken'>Voorwerpen zoeken</a>", "Sport & Spel", "Binnenstad", "10/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/ScoutsOlympics'>ScoutsOlympics</a>", "Sport & Spel", "Clubhuis", "02/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Chaos'>Chaos</a>", "Sport & Spel", "Clubhuis", "03/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Franciscus%20Book%20of%20Records'>Franciscus Book of Records</a>", "Sport & Spel", "Clubhuis", "04/2018"],
    ["<a href='http://franciscus.pbworks.com/w/page/Wedden%20dat'>Wedden dat</a>", "Sport & Spel", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Schaatsen'>Schaatsen</a>", "Sport & Spel", "Binnenstad", "03/2017"]
);
programs.push(
    ["<a href='http://franciscus.pbworks.com/w/page/Witte%20SokkenSpel'>Witte SokkenSpel</a>", "Sport & Spel", "Bos", "10/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Wet%20%27n%20Wild'>Wet 'n Wild</a>", "Sport & Spel", "Veld", "06/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Duinrell'>Duinrell</a>", "Sport & Spel", "Veld", "09/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Chaos%20is%20a%20ladder'>Chaos is a ladder</a>", "Sport & Spel", "Clubhuis", "01/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Hyves%20Live'>Hyves Live</a>", "Sport & Spel", "Bos", "09/2010"],
    ["<a href='http://franciscus.pbworks.com/w/page/Elektronische%20spellenmarathon'>Elektronische spellenmarathon</a>", "Sport & Spel", "Clubhuis", "11/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/De%20vloer%20is%20lava'>De vloer is lava</a>", "Sport & Spel", "Clubhuis", "03/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Vlottenrace'>Vlottenrace</a>", "Sport & Spel", "Veld", "04/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kermis%20games'>Kermis games</a>", "Sport & Spel", "Clubhuis", "10/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Paasgedicht'>Paasgedicht</a>", "Sport & Spel", "Binnenstad", "03/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Minigame%20mania'>Minigame mania</a>", "Sport & Spel", "Clubhuis", "01/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Culturen%20Clash'>Culturen Clash</a>", "Sport & Spel", "Clubhuis", "10/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Eggfest'>Eggfest</a>", "Sport & Spel", "Clubhuis", "02/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Game%20wars'>Game wars</a>", "Sport & Spel", "Clubhuis", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Verloren%20bagage'>Verloren bagage</a>", "Sport & Spel", "Bos", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/mini-3-Luik%20Levend%20bordspel'>mini-3-Luik Levend bordspel</a>", "Sport & Spel", "Clubhuis", "0/0", "Rood"] // Red
);
//</script>

//<script>/*2*/// Strategisch // 64
programs.push(
    ["<a href='http://franciscus.pbworks.com/w/page/Vriendenboek'>Vriendenboek</a>", "Strategisch", "Bos", "09/2016", "", "Kennismaking"],
    ["<a href='http://franciscus.pbworks.com/w/page/PatrouillePuzzelSpel'>PatrouillePuzzelSpel</a>", "Strategisch", "Bos", "09/2013", "", "Patrouille indeling"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kinderfoto%20puzzel'>Kinderfoto puzzel</a>", "Strategisch", "Bos", "09/2016", "", "Patrouille indeling"],
    ["<a href='http://franciscus.pbworks.com/w/page/Patrouille%20Memory'>Patrouille Memory</a>", "Strategisch", "Bos", "09/2011", "", "Patrouille indeling"],
    ["<a href='http://franciscus.pbworks.com/w/page/De%20oude%20voorouders'>De oude voorouders</a>", "Strategisch", "Bos", "09/2017", "", "Patrouille indeling"],
    ["<a href='http://franciscus.pbworks.com/w/page/SPS-Game'>SPS Game</a>", "Strategisch", "Bos", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Blauw-bloed'>Blauw bloed</a>", "Strategisch", "Bos", "04/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Schoolspel'>Schoolspel</a>", "Strategisch", "Bos", "09/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Levend%20stratego%20variant'>Levend stratego variant</a>", "Strategisch", "Bos", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Counter%20Strike'>Counter Strike</a>", "Strategisch", "Binnenstad", "04/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Het-Oliespel'>Het Oliespel</a>", "Strategisch", "Bos", "03/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Overleven%3A%20roofdier%20en%20prooi'>Overleven: roofdier en prooi</a>", "Strategisch", "Bos", "03/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Huis%20van%20kaarten'>Huis van kaarten</a>", "Strategisch", "Binnenstad", "06/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Warcraft'>Warcraft</a>", "Strategisch", "Bos", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Levend%20Kolonisten%20van%20Catan'>Levend Kolonisten van Catan</a>", "Strategisch", "Bos", "06/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Grand-Prestige'>Grand Prestige</a>", "Strategisch", "Clubhuis", "11/2010"],
    ["<a href='http://franciscus.pbworks.com/w/page/Dorpshandelsspel'>Dorpshandelsspel</a>", "Strategisch", "Clubhuis", "05/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Spygame'>Spygame</a>", "Strategisch", "Clubhuis", "06/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Vakantiespel'>Vakantiespel</a>", "Strategisch", "Bos", "08/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Levend%20Wereldhandelsspel'>Levend Wereldhandelsspel</a>", "Strategisch", "Bos", "03/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Levend%20Bang%21'>Levend Bang!</a>", "Strategisch", "Bos", "04/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kolonisten%20van%20Scouting'>Kolonisten van Scouting</a>", "Strategisch", "Clubhuis", "11/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Bevrijdingsspel'>Bevrijdingsspel</a>", "Strategisch", "Bos", "05/2005"],
    ["<a href='http://franciscus.pbworks.com/w/page/Smokkel'>Smokkel</a>", "Strategisch", "Bos", "01/2000"],
    ["<a href='http://franciscus.pbworks.com/w/page/Levend%20Scotland%20Yard'>Levend Scotland Yard</a>", "Strategisch", "Binnenstad", "12/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Bestorm%20het%20fort%21'>Bestorm het fort!</a>", "Strategisch", "Bos", "04/2018"]
);
//</script>

//<script>/*3*/// vervolg Strategisch
programs.push(
    ["<a href='http://franciscus.pbworks.com/w/page/Koningsdag'>Koningsdag</a>", "Strategisch", "Bos", "04/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Humans%20vs%20Zombies'>Humans vs Zombies</a>", "Strategisch", "Binnenstad", "11/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kwartetten%20in%20het%20donker'>Kwartetten in het donker</a>", "Strategisch", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Monumenten%20Mayhem'>Monumenten Mayhem</a>", "Strategisch", "Binnenstad", "03/2018"],
    ["<a href='http://franciscus.pbworks.com/w/page/Zeeschuimers'>Zeeschuimers</a>", "Strategisch", "Bos", "06/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Commando%20Strike%20Force'>Commando Strike Force</a>", "Strategisch", "Binnenstad", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Rome%20Total%20War'>Rome Total War</a>", "Strategisch", "Bos", "06/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Hagedissen'>Hagedissen</a>", "Strategisch", "Bos", "06/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Wereldhandelsspel'>Wereldhandelsspel</a>", "Strategisch", "Clubhuis", "02/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Levend%20Steen%20Papier%20Schaar'>Levend Steen Papier Schaar</a>", "Strategisch", "Bos", "04/2018"],
    ["<a href='http://franciscus.pbworks.com/w/page/War%20of%20the%20Worlds'>War of the Worlds</a>", "Strategisch", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Het%20leenstelsel'>Het leenstelsel</a>", "Strategisch", "Bos", "09/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Puerto%20Rico'>Puerto Rico</a>", "Strategisch", "Bos", "10/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Claimed'>Claimed</a>", "Strategisch", "Bos", "03/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/De%20Bancaire%20corrupte%20wereld'>De Bancaire corrupte wereld</a>", "Strategisch", "Veld", "09/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Pokémon%20go'>Pokémon go</a>", "Strategisch", "Bos", "09/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/De%20Stad'>De Stad</a>", "Strategisch", "Bos", "02/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Post-apocalyptische%20patrouille%20puzzelstrijd'>Post-apocalyptische patrouille puzzelstrijd</a>", "Strategisch", "Clubhuis", "10/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Krachten%20van%20duistere%20wezens'>Krachten van duistere wezens</a>", "Strategisch", "Bos", "10/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Amusement%20op%20TV'>Amusement op TV</a>", "Strategisch", "Veld", "05/2018"],
    ["<a href='http://franciscus.pbworks.com/w/page/Evolutiespel'>Evolutiespel</a>", "Strategisch", "Bos", "05/2018"]
);
//</script>

//<script>/*33*/// vervolg vervolg Strategisch
programs.push(
    ["<a href='http://franciscus.pbworks.com/w/page/Jurassic%20Park%20builder'>Jurassic Park builder</a>", "Strategisch", "Clubhuis", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Medieval%20total%20war'>Medieval total war</a>", "Strategisch", "Clubhuis", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/De%20voedselketen'>De voedselketen</a>", "Strategisch", "Bos", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Het%20rijke%20stinkerd%20spel'>Het rijke stinkerd spel</a>", "Strategisch", "Bos", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Antiekroof'>Antiekroof</a>", "Strategisch", "Bos", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Goedendoelenspel'>Goedendoelenspel</a>", "Strategisch", "Clubhuis", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Le%20Havre'>Le Havre</a>", "Strategisch", "Bos", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/De%20Karamojo'>De Karamojo</a>", "Strategisch", "Clubhuis", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/MisterX'>MisterX</a>", "Strategisch", "Binnenstad", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Kingpin%20of%20Utopia'>Kingpin of Utopia</a>", "Strategisch", "Clubhuis", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/The%20battle'>The battle</a>", "Strategisch", "Clubhuis", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Ebola%20virus'>Ebola virus</a>", "Strategisch", "Bos", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Pandora'>Pandora</a>", "Strategisch", "Bos", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Level%20Up%20Your%20Patrouille'>Level Up Your Patrouille</a>", "Strategisch", "Veld", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Pionnenrace'>Pionnenrace</a>", "Strategisch", "Binnenstad", "05/2015", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Elementary'>Elementary</a>", "Strategisch", "Bos", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/Overleving%20van%20de%20slimste'>Overleving van de slimste</a>", "Strategisch", "Bos", "0/0", "Rood"] // Red
);
//</script>

//<script>/*4*/// Toneel // 14
programs.push(
    ["<a href='http://franciscus.pbworks.com/w/page/Uw-stemt-telt!'>Uw stemt telt!</a>", "Toneel", "Clubhuis", "03/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Stop%20motion'>Stop motion</a>", "Toneel", "Clubhuis", "01/2018"],
    ["<a href='http://franciscus.pbworks.com/w/page/Culturenspel'>Culturenspel</a>", "Toneel", "Clubhuis", "11/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Spelshows'>Spelshows</a>", "Toneel", "Clubhuis", "11/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Carnaval'>Carnaval</a>", "Toneel", "Clubhuis", "03/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Levend%20Koninklijk%20Cluedo'>Levend Koninklijk Cluedo</a>", "Toneel", "Clubhuis", "04/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Blacklight%20voorstelling%20raadsel'>Blacklight voorstelling raadsel</a>", "Toneel", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Muziekclip'>Muziekclip</a>", "Toneel", "Clubhuis", "12/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Lupdib'>Lupdib</a>", "Toneel", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Halloween'>Halloween</a>", "Toneel", "Clubhuis", "10/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Ouder%20worden'>Ouder worden</a>", "Toneel", "Clubhuis", "01/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Diashow'>Diashow</a>", "Toneel", "Clubhuis", "05/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Law%20and%20Order'>Law and Order</a>", "Toneel", "Clubhuis", "11/2010"],
    ["<a href='http://franciscus.pbworks.com/w/page/Dierendag'>Dierendag</a>", "Toneel", "Clubhuis", "10/2016"]
);
//</script>

//<script>/*5*/// Uitdagende Scoutingtechnieken // 21
programs.push(
    ["<a href='http://franciscus.pbworks.com/w/page/3-Luik%20KokenCreatiefInstructie'>3-Luik KokenCreatiefInstructie</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "01/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/3-Luik%20KokenCreatiefBordspel'>3-Luik KokenCreatiefBordspel</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "01/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/3-Luik%20KokenKnopenInstructie'>3-Luik KokenKnopenInstructie</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "02/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/4-Luik%20KokenKnopenKaartCommunicatie'>4-Luik KokenKnopenKaartCommunicatie</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "02/2018"],
    ["<a href='http://franciscus.pbworks.com/w/page/mini-3-Luik%20Instructies'>mini-3-Luik Instructies</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "04/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/mini-3-Luik%20Pionieren'>mini-3-Luik Pionieren</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "10/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Easter%20Eggs'>Easter Eggs</a>", "Uitdagende Scoutingtechnieken", "Veld", "04/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Clubhuiswerkdag'>Clubhuiswerkdag</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "11/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Fietsreparatie'>Fietsreparatie</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "11/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kaartinstructie'>Kaartinstructie</a>", "Uitdagende Scoutingtechnieken", "Binnenstad", "11/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Vuur%20Maken'>Vuur Maken</a>", "Uitdagende Scoutingtechnieken", "Bos", "05/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Light%20my%20Fire!'>Light my Fire!</a>", "Uitdagende Scoutingtechnieken", "Bos", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/PL%20instructie'>PL instructie</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "02/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Leidsehout'>Leidsehout</a>", "Uitdagende Scoutingtechnieken", "Bos", "03/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kookinstructie'>Kookinstructie</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "02/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kompastocht%20oefenbijeenkomst'>Kompastocht oefenbijeenkomst</a>", "Uitdagende Scoutingtechnieken", "Binnenstad", "01/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Hindernis-Kubus'>Hindernis Kubus</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "10/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Recycle'>Recycle</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "11/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Pionier%20competitie'>Pionier competitie</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Winterschoonmaak'>Winterschoonmaak</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "12/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Insigne%20dag'>Insigne dag</a>", "Uitdagende Scoutingtechnieken", "Clubhuis", "0/0", "Rood"] // Red
);

programs.push(
    // Veilig & Gezond // 8
    ["<a href='http://franciscus.pbworks.com/w/page/Iron%20Chef'>Iron Chef</a>", "Veilig & Gezond", "Clubhuis", "02/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Wereldkeuken'>Wereldkeuken</a>", "Veilig & Gezond", "Clubhuis", "06/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Dobbel%20kookspel'>Dobbel kookspel</a>", "Veilig & Gezond", "Clubhuis", "06/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Meerdere%20gangen%20menu'>Meerdere gangen menu</a>", "Veilig & Gezond", "Clubhuis", "04/2016"],
    ["<a href='http://franciscus.pbworks.com/w/page/Luilekkerland'>Luilekkerland</a>", "Veilig & Gezond", "Clubhuis", "12/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Noodpakket-spel'>Noodpakket spel</a>", "Veilig & Gezond", "Clubhuis", "09/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kisten%20controleren%20en%20koken'>Kisten controleren en koken</a>", "Veilig & Gezond", "Clubhuis", "06/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Burendag'>Burendag</a>", "Veilig & Gezond", "Clubhuis", "09/2012", "Rood"] // Red
);
//</script>

//<script>/*6*/// Thema // 14
programs.push(
    ["<a href='http://franciscus.pbworks.com/w/page/Rijmen%20en%20Dichten'>Rijmen en Dichten</a>", "Thema", "Binnenstad", "04/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Morpheus%20vs%20Helios'>Morpheus vs Helios</a>", "Thema", "Clubhuis", "04/2013"],  // Link fix
    ["<a href='http://franciscus.pbworks.com/w/page/Quiz%20gameshow'>Quiz gameshow</a>", "Thema", "Clubhuis", "03/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/The%20Resistance'>The Resistance</a>", "Thema", "Bos", "10/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Illuminati'>Illuminati</a>", "Thema", "Binnenstad", "12/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/Indianen%20cultuur'>Indianen cultuur</a>", "Thema", "Bos", "05/2015"],
    ["<a href='http://franciscus.pbworks.com/w/page/Open%20monumentendag'>Open monumentendag</a>", "Thema", "Binnenstad", "09/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Afpersing'>Afpersing</a>", "Thema", "Bos", "09/2011"],
    ["<a href='http://franciscus.pbworks.com/w/page/Vaardigheden'>Vaardigheden</a>", "Thema", "Clubhuis", "11/2012"],
    ["<a href='http://franciscus.pbworks.com/w/page/Kennismaken%20(met%20Leiden)'>Kennismaken (met Leiden)</a>", "Thema", "Binnenstad", "09/2017"],
    ["<a href='http://franciscus.pbworks.com/w/page/Hortus'>Hortus</a>", "Thema", "Binnenstad", "10/2014"],
    ["<a href='http://franciscus.pbworks.com/w/page/PL%20Pans%20Slechte%20Plan'>PL Pans Slechte Plan</a>", "Thema", "Veld", "06/2018"],
    ["<a href='http://franciscus.pbworks.com/w/page/Skype%20thuis%20opkomst'>Skype thuis opkomst</a>", "Thema", "Clubhuis", "0/0", "Rood"], // Red
    ["<a href='http://franciscus.pbworks.com/w/page/D%20and%20D%20(Dungeons%20and%20Diablo)'>D and D (Dungeons and Diablo)</a>", "Thema", "Clubhuis", "0/0", "Rood"], // Red

    // Korte spelletjes // 14
    ["<a href='http://franciscus.pbworks.com/w/page/Who%27s%20the%20man'>Who's the man</a>", "Korte spelletjes", "Clubhuis", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Knuppels%20en%20Knurften'>Knuppels en Knurften</a>", "Korte spelletjes", "Clubhuis", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Duikboot'>Duikboot</a>", "Korte spelletjes", "Veld", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Vlaggenroof'>Vlaggenroof</a>", "Korte spelletjes", "Veld", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/OudHollandsEstafette'>OudHollandsEstafette</a>", "Korte spelletjes", "Veld", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Mini%20pionieren'>Mini pionieren</a>", "Korte spelletjes", "Veld", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Ninja'>Ninja</a>", "Korte spelletjes", "Clubhuis", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Levend%20kegelen'>Levend kegelen</a>", "Korte spelletjes", "Clubhuis", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Maffia'>Maffia</a>", "Korte spelletjes", "Clubhuis", "10/2013"],
    ["<a href='http://franciscus.pbworks.com/w/page/Weerwolven%20van%20Wakkerdam'>Weerwolven van Wakkerdam</a>", "Korte spelletjes", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Eilandje%20veroveren'>Eilandje veroveren</a>", "Korte spelletjes", "Binnenstad", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Het%20tijdspel'>Het tijdspel</a>", "Korte spelletjes", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Dobbelobbedobbenkrentenkreeften'>Dobbelobbedobbenkrentenkreeften</a>", "Korte spelletjes", "Clubhuis", "0/0"],
    ["<a href='http://franciscus.pbworks.com/w/page/Burning%20steel'>Burning steel</a>", "Korte spelletjes", "Clubhuis", "0/0"]
);
//;</script>

//<script>/*7*/// display the programs with their values
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

//<script>/*8*/// search for the programs
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

//<script>/*9*/// check if a values is in an array
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
