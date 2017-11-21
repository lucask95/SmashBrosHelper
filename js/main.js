class Player {
    constructor() {
        this.tag = "";
        this.character = "";
        this.rank = -1;
        this.prevRank = -1;
        this.change = "";
    }
}

// used for drawing nametags
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

function drawText(players) {
    // this is just to save time during testing
    var placeHolders = ["Kevbot", "Kenji", "Luan", "PoeFire", "Smilotron", "ccdm",
    "Dana", "Mao", "Zhyrri", "Corporate", "Russian", "ZemCitrus", "Panic",
    "Toxcic", "Raer", "Armada", "Hungrybox", "Mango", "Mew2King", "Plup",
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

function drawNametags(n) {
    // draws boxes that go behind tags
    var boxWidth = lineWidth - 50;
    var boxHeight = lineHeight + 20;

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
}

function drawBgImage(players) {
    var file = document.getElementById("bgImageInput").files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();

        img.onload = function() {
            var xcoord = (img.width - canvas.width) / -2;
            var ycoord = (img.height - canvas.height) / -2;
            console.log(xcoord, ycoord)
            ctx.drawImage(img, xcoord, ycoord);
            drawNametags(players.length);
            drawText(players);
        }

        img.src = event.target.result;
    }

    if (file)
        reader.readAsDataURL(file);
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
