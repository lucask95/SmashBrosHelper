class Player {
    constructor(tag, char, secondary, rank, prevRank) {
        this.tag = tag;
        this.character = char;
        this.secondary = secondary;
        this.rank = rank;
        this.prevRank = prevRank;
        this.change = this.prevRank - this.rank;
    }
}

var secondarySelect = "<option value=\"\">Secondary (If Applicable)</option>" +
     "<option value=\"\">None</option>";
var charSelect = "<option value=\"Fox\">Fox</option>" +
    "<option value=\"Falco\">Falco</option>" +
    "<option value=\"Marth\">Marth</option>" +
    "<option value=\"Sheik\">Sheik</option>" +
    "<option value=\"Peach\">Peach</option>" +
    "<option value=\"Jigglypuff\">Jigglypuff</option>" +
    "<option value=\"CaptainFalcon\">Captain Falcon</option>" +
    "<option value=\"IceClimbers\">Ice Climbers</option>" +
    "<option value=\"Pikachu\">Pikachu</option>" +
    "<option value=\"Samus\">Samus</option>" +
    "<option value=\"Luigi\">Luigi</option>" +
    "<option value=\"DrMario\">DrMario</option>" +
    "<option value=\"Yoshi\">Yoshi</option>" +
    "<option value=\"Ganondorf\">Ganondorf</option>" +
    "<option value=\"Mario\">Mario</option>" +
    "<option value=\"YoungLink\">Young Link</option>" +
    "<option value=\"DonkeyKong\">Donkey Kong</option>" +
    "<option value=\"Link\">Link</option>" +
    "<option value=\"GameWatch\">Game & Watch</option>" +
    "<option value=\"Roy\">Roy</option>" +
    "<option value=\"Mewtwo\">Mewtwo</option>" +
    "<option value=\"Zelda\">Zelda</option>" +
    "<option value=\"Ness\">Ness</option>" +
    "<option value=\"Pichu\">Pichu</option>" +
    "<option value=\"Bowser\">Bowser</option>" +
    "<option value=\"Kirby\">Kirby</option>" +
    "</select>";


// used for drawing nametags
const COVER_IMAGE_HEIGHT = 470;
const COVER_IMAGE_WIDTH = 820;
const VISIBLE_COVER_IMAGE_HEIGHT = 320;
const X_OFFSET = 40;
const Y_OFFSET = 75;
const LINE_WIDTH = 200;
const LINE_HEIGHT = 10;
const Y_SPACE = LINE_HEIGHT + 20;
const PLAYERS_PER_COLUMN = 5;
const TEXT_X_OFFSET = 7;
const TEXT_Y_OFFSET = 23;

var boxWidth = 170;
var boxHeight = 35;

// canvas and context
var canvas;
var ctx;


function drawInputs() {
    var nPlayers = parseInt($("#numPlayers").val());
    var nColumns = nPlayers / 5;

    // empty input area
    $("#inputForm").html("");

    for (var i = 0; i < nPlayers; i++)
    {
        // create a row for each set of inputs
        var tempRow = "<div class=\"row\" id=\"row" + (i + 1) + "\"></div>"
        $("#inputForm").append(tempRow);

        // text input and select dropdown for character
        var inputText = "<input type=\"text\" class=\"col form-control\" id=\"player" + (i + 1) + "\" placeholder=\"Rank #" + (i + 1) + "\"/>";
        var charSelectText = "<select class=\"col form-control\" id=\"char" + (i + 1) + "\">" + charSelect;
        var secondarySelectText = "<select class=\"col form-control\" id=\"secondary" + (i + 1) + "\">" + secondarySelect + charSelect;

        // put the text input and select dropdown into the form
        $("#row" + (i + 1)).append(inputText);
        $("#row" + (i + 1)).append(charSelectText);
        $("#row" + (i + 1)).append(secondarySelectText);
    }
}


function initCanvas() {
    canvas = document.getElementById('prCanvas');
    ctx = canvas.getContext('2d');
}


function clearCanvas() {
    ctx.fillStyle = "#e3e3e3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function getPlayers() {
    // these lists are just to save time during testing
    var placeholders = ["Kevbot", "Kenji", "Luan", "PoeFire", "Smilotron", "ccdm",
    "Dana", "Mao", "Zhyrri", "Corporate", "Russian", "ZemCitrus", "Panic", "mjay",
    "Slim", "Nug", "Toxcic", "Raer", "Armada", "Hungrybox", "Mango", "Mew2King", "Plup",
    "Leffen", "ChuDat", "SFAT", "Axe", "Wizzrobe", "DizzKidBoogie"];

    var characterList = ["Fox", "Falco", "Marth", "Sheik", "Peach", "Jigglypuff",
        "CaptainFalcon", "IceClimbers", "Pikachu", "Samus", "Luigi", "DrMario",
        "Yoshi", "Ganondorf", "Mario", "YoungLink", "DonkeyKong", "Link",
        "GameWatch", "Roy", "Mewtwo", "Zelda", "Ness", "Pichu", "Bowser", "Kirby"];

    var players = [];

    for (var i = 0; i < parseInt($("#numPlayers").val()); i++) {
        var tag = $("#player" + (i + 1)).val();
        var char = $("#char" + (i + 1)).val();
        var second = $("#secondary" + (i + 1)).val();

        // if a tag has not been entered, randomize the tag and character
        // (mainly for testing)
        if (tag.trim() == "") {
            tag = placeholders[Math.floor(Math.random() * placeholders.length)];
            char = characterList[Math.floor(Math.random() * characterList.length)];
            if (Math.random() <= .25)
                second = characterList[Math.floor(Math.random() * characterList.length)];
            else
                second = "";
        }

        var tempPlayer = new Player(tag, char, second, (i + 1), 1);
        players.push(tempPlayer);
    }

    return players;
}


function drawIcon(k, players) {
    var stockIcon = new Image();
    stockIcon.src = "./img/StockIcons/" + String(players[k - 1].character) + ".png";
    stockIcon.onload = function() {
        var i = k - 1;

        var x = (xSpace * (Math.floor(i / 5) + 1)) +
                (boxWidth * Math.floor(i / 5)) +
                boxWidth - stockIcon.width - TEXT_X_OFFSET;

        var y = yHeadroom +
                (ySpace * ((i % 5) + 1)) +
                (boxHeight * Math.floor(i % 5)) +
                (boxHeight - stockIcon.height) / 2;

        ctx.drawImage(stockIcon, x, y);

        // if have not drawn stock icon for each player, draw next icon
        if (k < players.length) {
            drawIcon((k + 1), players);
        }
    }
}


function drawSecondaries(k, players) {
    var stockIcon = new Image();

    if (players[k - 1].secondary == "") {
        if (k < players.length) {
            drawSecondaries((k + 1), players);
        }
        else {
            drawIcon(1, players);
        }
    }
    else {
        stockIcon.src = "./img/StockIcons/" + String(players[k - 1].secondary) + ".png";
        stockIcon.onload = function() {
            var i = k - 1;

            var x = (xSpace * (Math.floor(i / 5) + 1)) +
                    (boxWidth * Math.floor(i / 5)) +
                    boxWidth - stockIcon.width - (3 * TEXT_X_OFFSET);

            var y = yHeadroom +
                    (ySpace * ((i % 5) + 1)) +
                    (boxHeight * Math.floor(i % 5)) +
                    (boxHeight - stockIcon.height) / 2;

            ctx.drawImage(stockIcon, x, y);

            // if have not drawn stock icon for each player, draw next icon
            if (k < players.length) {
                drawSecondaries((k + 1), players);
            }
            else {
                drawIcon(1, players);
            }
        }
    }
}


function drawText(players) {

    var titleText = $("#prTitle").val();
    var subtitleText = $("#prSubtitle").val();
    if (titleText.trim() == "") {
        titleText = "Davis Melee"
        subtitleText = "Winter 2018 Rankings"
    }
    ctx.font = "1.5rem Roboto";
    ctx.fillStyle = "#000";
    ctx.textAlign="center";
    ctx.fillText(titleText, COVER_IMAGE_WIDTH / 2, 50);
    ctx.font = "1rem Roboto";
    ctx.fillText(subtitleText, COVER_IMAGE_WIDTH / 2, 70);

    for (var i = 0; i < players.length; i++) {
        // get tag for player i, if empty, use placeholder
        var tempPlayer = players[i];

        // calculate x and y position of text, line breaks for readability
        var x = TEXT_X_OFFSET +
                (xSpace * (Math.floor(i / 5) + 1)) +
                (boxWidth * Math.floor(i / 5));

        var y = TEXT_Y_OFFSET +
                yHeadroom +
                (ySpace * ((i % 5) + 1)) +
                (boxHeight * Math.floor(i % 5));

        // draw text on the canvas
        ctx.textAlign="start";
        ctx.font = "1rem Roboto";
        ctx.fillStyle = "#FFF";
        ctx.fillText(String(i + 1) + ". " + tempPlayer.tag, x, y);
    }

    drawSecondaries(1, players);
}


// draws boxes that go behind tags
function drawNametags() {
    var players = getPlayers();
    var n = players.length;

    yHeadroom = (COVER_IMAGE_HEIGHT - VISIBLE_COVER_IMAGE_HEIGHT) / 2;
    xSpace = (COVER_IMAGE_WIDTH - (boxWidth * Math.floor(n / 5))) / ((n / 5) + 1);
    ySpace = (VISIBLE_COVER_IMAGE_HEIGHT - (boxHeight * PLAYERS_PER_COLUMN)) / (PLAYERS_PER_COLUMN + 1);

    for (var i = 0; i < n; i++) {
        // calculate x and y position of each nametag
        var x = (xSpace * (Math.floor(i / 5) + 1)) +
                (boxWidth * Math.floor(i / 5));

        var y = yHeadroom +
                (ySpace * ((i % 5) + 1)) +
                (boxHeight * Math.floor(i % 5));

        // fill nametag with translucent black
        ctx.fillStyle = "#000";
        ctx.globalAlpha = 0.45;
        ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.globalAlpha = 1.0;
    }

    // after boxes to go behind the text have been drawn, draw the text
    drawText(players);
}


function drawBgImage() {
    var file = document.getElementById("bgImageInput").files[0];
    var reader = new FileReader();

    // callback function for when the image is loaded
    reader.onload = function(event) {
        var img = new Image();

        img.onload = function() {
            // calculate the proper x and y coordinates for a centered image
            var xcoord = (img.width - canvas.width) / -2;
            var ycoord = (img.height - canvas.height) / -2;
            ctx.drawImage(img, xcoord, ycoord);

            // draw nametags on top of the image
            drawNametags();
        }

        img.src = event.target.result;
    }

    if (file)
        reader.readAsDataURL(file);
    else {
        // if no image specified, pick a random color for the background and
        // then draw the name tags
        drawNametags();
    }
}


function generateImage() {
    // clear canvas of previous content then draw the pieces of the image
    clearCanvas();
    drawBgImage();
}


$(document).ready(function() {
    drawInputs();
    $("#numPlayers").on("change", drawInputs);
    initCanvas();
    clearCanvas();
    $("#goBtn").on("click", generateImage);
});
