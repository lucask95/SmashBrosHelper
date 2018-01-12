class Player {
    constructor(tag, char, rank, prevRank) {
        this.tag = "";
        this.character = "";
        this.rank = -1;
        this.prevRank = -1;
        this.change = this.prevRank - this.rank;
    }
}

// used for drawing nametags

const X_OFFSET = 40;
const Y_OFFSET = 75;
const LINE_WIDTH = 200;
const LINE_HEIGHT = 10;
const Y_SPACE = LINE_HEIGHT + 20;
const PLAYERS_PER_COL = 5;

var topOffset = 75;
var leftOffset = 40;
var lineHeight = 10;
var lineWidth = 200;
var ySpace = lineHeight + 20;
var playersPerCol = 5;

// canvas and context
var canvas;
var ctx;

function drawInputs() {
    var nPlayers = parseInt($("#numPlayers").val());
    var nColumns = nPlayers / 5;

    // empty input area
    $("#inputForm").html("");

    // create 1 column per 5 players on the pr
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
    var players = [];
    for (var i = 0; i < parseInt($("#numPlayers").val()); i++) {
        var tag = $("player" + (i + 1)).val();
        //var tempChar = $("char" + (i + 1)).val();
        var char = "Fox";
        var tempPlayer = new Player(tag, char, (i + 1), 1);
        players.push(tempPlayer);
    }
    return players;
}

function drawText(players) {
    // this is just to save time during testing
    var placeHolders = ["Kevbot", "Kenji", "Luan", "PoeFire", "Smilotron", "ccdm",
    "Dana", "Mao", "Zhyrri", "Corporate", "Russian", "ZemCitrus", "Panic", "mjay",
    "Slim", "Nug", "Toxcic", "Raer", "Armada", "Hungrybox", "Mango", "Mew2King", "Plup",
    "Leffen", "ChuDat", "SFAT", "Axe", "Wizzrobe"];

    for (var i = 0; i < players.length; i++) {
        // get tag for player i, if empty, use placeholder
        var tempPlayer = players[i];
        if (tempPlayer.tag.trim() == "") {
            tempPlayer.tag = placeHolders[Math.floor(Math.random() * placeHolders.length)];
        }

        // calculate x and y position of text, line breaks for readability
        var x = leftOffset +
                (Math.floor(i / playersPerCol) * lineWidth);

        var y = topOffset +
                ((i % playersPerCol) * lineHeight) +
                ((i % playersPerCol) * ySpace);

        // draw text on the canvas
        ctx.font = "1rem Roboto";
        ctx.fillStyle = "#FFF";
        ctx.fillText(String(i + 1) + ". " + tempPlayer.tag, x, y);
    }
}

function drawNametags(players) {
    // draws boxes that go behind tags
    var boxWidth = lineWidth - 50;
    var boxHeight = lineHeight + 20;
    var n = players.length;

    for (var i = 0; i < n; i++) {
        var x = leftOffset +
                (Math.floor(i / playersPerCol) * lineWidth) -
                10;

        var y = topOffset +
                ((i % playersPerCol) * lineHeight) +
                ((i % playersPerCol) * ySpace) -
                20;

        ctx.fillStyle = "#000";
        ctx.globalAlpha = 0.4;
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
            drawNametags(players);
        }

        img.src = event.target.result;
    }

    if (file)
        reader.readAsDataURL(file);
    else {
        // if no image specified, pick a random color for the background and
        // then draw the name tags
        drawNametags(players);
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
