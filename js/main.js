function drawInputs() {
    var nPlayers = parseInt($("#numPlayers").val());
    var nColumns = nPlayers % 5;

    $("inputForm").html("");

    for (var i = 0; i < nColumns; i++) {
        var colText = "<div class=\"col\" id=\"inputCol" + i + "\"></div>";
        $("inputForm").append("");
    }

    for (var i = 0; i < nPlayers; i++) {
        var col = Math.floor(i % 5);
        var labelText = "<label for=\"player" + (i + 1) + "\">" + (i + 1) + "</label>\n";
        var inputText = "<input type=\"text\" id=\"player" + (i + 1) + "\">";
    }
}

$(document).ready(function() {

});
