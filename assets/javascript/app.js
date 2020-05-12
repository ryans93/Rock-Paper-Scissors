// config firebase
var config = {
    apiKey: "AIzaSyD__acBsqBMONtyV5wp4SAjI3i0R9Q8Gy8",
    authDomain: "rock-paper-scissors-6655c.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-6655c.firebaseio.com",
    projectId: "rock-paper-scissors-6655c",
    storageBucket: "rock-paper-scissors-6655c.appspot.com",
    messagingSenderId: "1007602444840",
    appId: "1:1007602444840:web:8b400907feef80103ae31d",
    measurementId: "G-PC91NYWTHT"
};

firebase.initializeApp(config);
var database = firebase.database();
var player = {
    choice: "",
    wins: 0,
    losses: 0,
    ties: 0
}
// hold player child's key
var playerID;
// player reference used to remove player when they dc
var playerRef;

$(document).ready(() => {

    database.ref("/Players").once("value", function (snapshot) {
        // if there are less than 2 players, push new player
        if (snapshot.val() === null || snapshot.numChildren() < 2) {
            playerRef = database.ref("/Players").push(player);
            playerID = playerRef.key;
            console.log(playerID)
            $("#welcome-text").html("<h3>Welcome Player " + playerID + "</h3>");
            // remove player if they dc
            playerRef.onDisconnect().remove().then(() => {
                console.log(playerRef);
            });
        }
        // if there are already 2 players, prevent user from joining game
        else {
            playerID = "Guest"
            $("#rpsSelect").hide();
            $("#welcome-text").html("<h3>Sorry, there are already 2 players. Please come back later.</h3>");
        }
        $("#welcome-modal").modal("show");
    }, function (errorObject) { //error handler function
        console.log("The read failed: " + errorObject.code);
    });

    // handle player selection
    $(".playerSelect").on("click", function () {
        $("#rpsSelect").hide();
        player.choice = $(this).attr("data");
        $("#playerChoicePic").html("<img src=assets/images/" + player.choice + ".jpeg>");
        database.ref(playerRef).set(player);
    });

    // check to see if both players are present and have chosen an option
    database.ref("/Players").on("value", function (snapshot) {
        // loop through all players
        snapshot.forEach((playerChild) => {
            // opponent is the player with a different key than the player
            if (playerChild.key !== playerID) {
                var opp = playerChild.val();
                if (opp.choice !== "" && player.choice !== "") {
                    play(opp);
                }
            }
        });
    });

    // game logic, show match results to players
    function play(opp) {
        // tie conditions
        if (player.choice === opp.choice) {
            $("h1").html("You tied!");
            $("#playerDisplay").html("You chose " + player.choice);
            $("#oppDisplay").html("Your opponent chose " + opp.choice);
            $("#oppChoicePic").html("<img src=assets/images/" + opp.choice + ".jpeg>");
            player.ties++;
            opp.ties++;
            setTimeout(function () {
                reset(opp)
            }, 5000);
        }
        // loss conditions 
        else if (player.choice == "rock" && opp.choice == "paper" || player.choice == "scissors" && opp.choice == "rock" || player.choice == "paper" && opp.choice == "scissors") {
            $("h1").html("You lost!");
            $("#playerDisplay").html("You chose " + player.choice);
            $("#oppDisplay").html("Your opponent chose " + opp.choice);
            $("#oppChoicePic").html("<img src=assets/images/" + opp.choice + ".jpeg>");
            player.losses++;
            opp.wins++;
            setTimeout(function () {
                reset(opp)
            }, 5000);
        }
        // win conditions 
        else {
            $("h1").html("You won!");
            $("#playerDisplay").html("You chose " + player.choice);
            $("#oppDisplay").html("Your opponent chose " + opp.choice);
            $("#oppChoicePic").html("<img src=assets/images/" + opp.choice + ".jpeg>");
            player.wins++;
            opp.losses++;
            setTimeout(function () {
                reset(opp)
            }, 5000);
        }
    }

    // reset player choices and display, update player data in database
    function reset(opp) {
        player.choice = "";
        playerRef.set(player);
        $("#rpsSelect").show();
        $("#oppChoicePic").html("");
        $("#playerChoicePic").html("");
        $("#playerDisplay").html("Select your choice");
        $("#oppDisplay").html("Waiting for Opponent");
        $("h1").html("Rock Paper Scissors!");
        append(opp);
    }

    // update scoreboard after a match
    function append(opp) {
        $("#wins").html("Wins: " + player.wins);
        $("#losses").html("Losses: " + player.losses);
        $("#ties").html("Ties: " + player.ties);
        $("#oppWins").html("Wins: " + opp.wins);
        $("#oppLosses").html("Losses: " + opp.losses);
        $("#oppTies").html("Ties: " + opp.ties);
    }

    // push chat entry to database
    $("#submit").on("click", function () {
        var string;
        if (playerID !== "Guest") {
            string = "<b>Player " + playerID + ":</b> ";
        }
        else {
            string = "<b>Guest:</b> "
        }
        string += $("#chat-entry").val() + "<br>";
        database.ref("/Chat").push(string);
        $("#chat-entry").val('');
    });

    // append new chat entry to display when added to database
    database.ref("/Chat").on("child_added", function (snapshot) {
        console.log(snapshot.val());
        $("#chatDisplay").append(snapshot.val());
    });
});