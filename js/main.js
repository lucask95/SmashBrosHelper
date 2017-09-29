var canvas;
var ctx;

function drawInputs() {
    var nPlayers = parseInt($("#numPlayers").val());
    var nColumns = nPlayers / 5;

    $("#inputForm").html("");

    for (var i = 0; i < nColumns; i++) {
        var colText = "<div class=\"col\" id=\"inputCol" + i + "\"></div>";
        $("#inputForm").append(colText);
    }

    for (var i = 0; i < nPlayers; i++) {
        var col = Math.floor(i / 5);
        var inputText = "<input type=\"text\" id=\"player" + (i + 1) +
            "\" placeholder=\"Rank #" + (i + 1) + "\" />";
        $("#inputCol" + col).append(inputText);
    }
}

function initCanvas() {
    canvas = document.getElementById('prCanvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "#e3e3e3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function generateImage() {
    var nPlayers = parseInt($("#numPlayers").val());
    var tags = [];

    for (var i = 0; i < nPlayers; i++) {
        var tag = $("#player" + (i + 1)).val();
        ctx.font = "1rem Roboto";
        ctx.fillStyle = "#000";
        ctx.fillText(tag, 10, i * 10 + 10 + (i * 20));
    }

}

$(document).ready(function() {
    drawInputs();
    $("#numPlayers").on("change", drawInputs);
    initCanvas();
    $("#goBtn").on("click", generateImage);
});
