function drawInputs() {
    var nPlayers = parseInt($("#numPlayers").val());
    var nColumns = nPlayers / 5;

    $("#inputForm").html("");

    for (var i = 0; i < nColumns; i++) {
        var colText = "<div class=\"col\" id=\"inputCol" + i + "\"></div>";
        $("#inputForm").append(colText);
    }

    for (var i = 0; i < nPlayers; i++) {
        console.log("player " + (i + 1));
        var col = Math.floor(i / 5);
        var inputText = "<input type=\"text\" id=\"player" + (i + 1) +
            "\" placeholder=\"Rank #" + (i + 1) + "\" />";
        $("#inputCol" + col).append(inputText);
    }
}

$(document).ready(function() {
    drawInputs();
    $("#numPlayers").on("change", drawInputs);
});
