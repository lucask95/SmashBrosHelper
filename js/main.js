class Player {
    constructor(tag, char, rank, prevRank) {
        this.tag = tag;
        this.character = "";
        this.rank = -1;
        this.prevRank = -1;
        this.change = this.prevRank - this.rank;
    }
}

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

/*
<select id="displayNumber">
    <option value="25">25</option>
    <option value="50">50</option>
    <option value="100">100</option>
    <option value="all">All</option>
</select>
*/


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
        var tempRow = "<div class=\"row\" id=\"row" + (i + 1) + "\"></div>"
        $("#inputForm").append(tempRow);
        var inputText = "<input type=\"text\" class=\"col form-control\" id=\"player" + (i + 1) + "\" placeholder=\"Rank #" + (i + 1) + "\"/>";
        var charSelectText = "<select class=\"col form-control\" id=\"char" + (i + 1) + "\">" + charSelect;
        $("#row" + (i + 1)).append(inputText);
        $("#row" + (i + 1)).append(charSelectText);
    }

    // create 1 column per 5 players on the pr
    /*
    for (var i = 0; i < nColumns; i++) {
        var colText = "<div class=\"col\" id=\"inputCol" + i + "\"></div>";
        $("#inputForm").append(colText);
    }

    // put 5 inputs into each column
    for (var i = 0; i < nPlayers; i++) {
        var col = Math.floor(i / 5);
        var inputText = "<input type=\"text\" id=\"player" + (i + 1) +
            "\" placeholder=\"Rank #" + (i + 1) + "\" class=\"form-control\" />";
        $("#inputCol" + col).append(inputText);
        var tempCharSelect = "<select id=\"char" + (i + 1) + "\" class=\"form-control\">" + charSelect;
        $("#inputCol" + col).append(tempCharSelect);
    }
    */
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
    // this is just to save time during testing
    var placeholders = ["Kevbot", "Kenji", "Luan", "PoeFire", "Smilotron", "ccdm",
    "Dana", "Mao", "Zhyrri", "Corporate", "Russian", "ZemCitrus", "Panic", "mjay",
    "Slim", "Nug", "Toxcic", "Raer", "Armada", "Hungrybox", "Mango", "Mew2King", "Plup",
    "Leffen", "ChuDat", "SFAT", "Axe", "Wizzrobe", "DizzKidBoogie"];

    var players = [];

    for (var i = 0; i < parseInt($("#numPlayers").val()); i++) {
        var tag = $("#player" + (i + 1)).val();
        if (tag.trim() == "") {
            tag = placeholders[Math.floor(Math.random() * placeholders.length)];
        }
        var char = "Fox";
        var tempPlayer = new Player(tag, char, (i + 1), 1);
        players.push(tempPlayer);
    }

    return players;
}


function drawText(players) {

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
        ctx.font = "1rem Roboto";
        ctx.fillStyle = "#FFF";
        ctx.fillText(String(i + 1) + ". " + tempPlayer.tag, x, y);

        /*
        var stockIcon = new Image();
        stockIcon.src = "./img/StockIcons/Fox.png";
        stockIcon.onload = function() {
            // calculate the proper x and y coordinates for a centered image
            var xcoord = (img.width - canvas.width) / -2;
            var ycoord = (img.height - canvas.height) / -2;
            ctx.drawImage(img, xcoord, ycoord);
        }
        */
    }
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
        ctx.globalAlpha = 0.35;
        ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.globalAlpha = 1.0;
    }

    // after boxes to go behind the text have been drawn, draw the text
    drawText(players);
}


function drawBgImage(players) {
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
    var players = [];
    for (var i = 0; i < parseInt($("#numPlayers").val()); i++)
        players.push(new Player());
    clearCanvas();
    // getTags()
    // calcRanks()
    drawBgImage(players);
}


$(document).ready(function() {
    drawInputs();
    $("#numPlayers").on("change", drawInputs);
    initCanvas();
    clearCanvas();
    $("#goBtn").on("click", generateImage);
});
