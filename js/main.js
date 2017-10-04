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

function drawText() {
    var nPlayers = parseInt($("#numPlayers").val());
    var tags = [];

    // this is just to save time during testing
    var placeHolders = ["Kevbot", "Kenji", "Luan", "PoeFire", "Smilotron", "ccdm",
    "Dana", "Mao", "Zhyrri", "Corporate", "Russian", "ZemCitrus", "Panic",
    "Toxcic", "Raer", "Armada", "Hungrybox", "Mango", "Mew2King", "Plup",
    "Leffen", "ChuDat", "SFAT", "Axe", "Wizzrobe"];

    for (var i = 0; i < nPlayers; i++) {
        var tag = $("#player" + (i + 1)).val();
        if (tag.trim() == "") {
            tag = placeHolders[Math.floor(Math.random() * placeHolders.length)];
        }

        // calculate x and y position of text
        var x = (Math.floor(i / 5) * 100) + 20;
        var y = ((i % 5) * 10) + 10 + ((i % 5) * 20);

        // draw text on the canvas
        ctx.font = "1rem Roboto";
        ctx.fillStyle = "#000";
        ctx.fillText(tag, x, y);
    }
}

function generateImage() {
    clearCanvas();
    drawText();
}

$(document).ready(function() {
    drawInputs();
    $("#numPlayers").on("change", drawInputs);
    initCanvas();
    clearCanvas();
    $("#goBtn").on("click", generateImage);
});
