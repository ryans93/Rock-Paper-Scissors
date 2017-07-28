var config = {
    apiKey: "AIzaSyCSCdkQH0zqSN5DksGq-fcesTHrzVYcjCM",
    authDomain: "project-1-6255c.firebaseapp.com",
    databaseURL: "https://project-1-6255c.firebaseio.com",
    projectId: "project-1-6255c",
    storageBucket: "project-1-6255c.appspot.com",
    messagingSenderId: "899461180848"
};
firebase.initializeApp(config);
var database = firebase.database();

var player = {
    choice: "",
    wins: 0,
    losses: 0,
    ties: 0
}

var playerID;
var choice;

database.ref("/Players").once("value", function (snapshot) { //initializing firebase
    if (snapshot.val() === null) {
        database.ref("/Players/Player1").set(player);
        playerID = 1;
    }
    else {
        database.ref("/Players/Player2").set(player);
        playerID = 2;
    }
}, function (errorObject) { //error handler function
    console.log("The read failed: " + errorObject.code);
});

$("#submit").on("click", function(){
    var string="Player "+playerID+": ";
    string+=$("#chat-entry").val();
    database.ref("/Chat").push(string);
});

database.ref("/Chat").on("value", function (snapshot) {
    $("#chatDisplay").html(snapshot.val());
});

$("#rock").on("click", function () {
    $("#rpsSelect").hide();
    $("#playerChoicePic").html("<img src=assets/images/rock.png>");
    choice = "rock";
    if (playerID === 1) {
        database.ref("/Players/Player1/choice").set(choice);
    }
    else {
        database.ref("/Players/Player2/choice").set(choice);
    }
    checkChoices();
});

$("#paper").on("click", function () {
    $("#rpsSelect").hide();
    $("#playerChoicePic").html("<img src=assets/images/paper.jpeg>");
    choice = "paper";
    if (playerID === 1) {
        database.ref("/Players/Player1/choice").set(choice);
    }
    else {
        database.ref("/Players/Player2/choice").set(choice);
    }
    checkChoices();
});

$("#scissors").on("click", function () {
    $("#rpsSelect").hide();
    $("#playerChoicePic").html("<img src=assets/images/scissors.jpeg>");
    choice = "scissors";
    if (playerID === 1) {
        database.ref("/Players/Player1/choice").set(choice);
    }
    else {
        database.ref("/Players/Player2/choice").set(choice);
    }
    checkChoices();
});

function checkChoices() {
    database.ref("/Players").on("value", function (snapshot) { //initializing firebase
        //console.log(snapshot.val());
        var players = snapshot.val();
        if (players.Player2 !== undefined) {
            if (players.Player1.choice != "" && players.Player2.choice != "") {
                play(players);
            }
        }
    }, function (errorObject) { //error handler function
        console.log("The read failed: " + errorObject.code);
    });
}

function play(players) {
    var oppChoice;
    var wins;
    var losses;
    var ties;
    if (playerID === 1) {
        oppChoice = players.Player2.choice;
    }
    else {
        oppChoice = players.Player1.choice;
    }

    if (choice == "rock" && oppChoice == "rock") {
        $("h1").html("You tied!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/rock.png>");

        if (playerID === 1) {
            ties = parseInt(database.ref("/Players/Player1/ties").get());
            ties++;
            database.ref("/Players/Player1/ties").set(ties);
        }
        else {
            ties = parseInt(database.ref("/Players/Player1/ties").get());
            ties++;
            database.ref("/Players/Player2/ties").set(ties);
        }

        setTimeout(function () {
            reset()
        }, 5000);

    }

    if (choice == "rock" && oppChoice == "paper") {
        $("h1").html("You lost!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/paper.jpeg>");

        if (playerID === 1) {
            losses = parseInt(database.ref("/Players/Player1/losses").get());
            losses++;
            database.ref("/Players/Player1/losses").set(losses);
        }
        else {
            losses = parseInt(database.ref("/Players/Player1/losses").get());
            losses++;
            database.ref("/Players/Player2/losses").set(losses);
        }

        setTimeout(function () {
            reset()
        }, 5000);
    }

    if (choice == "rock" && oppChoice == "scissors") {
        $("h1").html("You won!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/scissors.jpeg>");

        if (playerID === 1) {
            wins = parseInt(database.ref("/Players/Player1/wins").get());
            wins++;
            database.ref("/Players/Player1/wins").set(wins);
        }
        else {
            wins = parseInt(database.ref("/Players/Player1/wins").get());
            wins++;
            database.ref("/Players/Player2/wins").set(wins);
        }

        setTimeout(function () {
            reset()
        }, 5000);

    }

    if (choice == "paper" && oppChoice == "rock") {
        $("h1").html("You won!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/rock.png>");

        if (playerID === 1) {
            wins = parseInt(database.ref("/Players/Player1/wins").get());
            wins++;
            database.ref("/Players/Player1/wins").set(wins);
        }
        else {
            wins = parseInt(database.ref("/Players/Player1/wins").get());
            wins++;
            database.ref("/Players/Player2/wins").set(wins);
        }

        setTimeout(function () {
            reset()
        }, 5000);

    }

    if (choice == "paper" && oppChoice == "paper") {
        $("h1").html("You tied!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/paper.jpeg>");

        if (playerID === 1) {
            ties = parseInt(database.ref("/Players/Player1/ties").get());
            ties++;
            database.ref("/Players/Player1/ties").set(ties);
        }
        else {
            ties = parseInt(database.ref("/Players/Player1/ties").get());
            ties++;
            database.ref("/Players/Player2/ties").set(ties);
        }

        setTimeout(function () {
            reset()
        }, 5000);

    }

    if (choice == "paper" && oppChoice == "scissors") {
        $("h1").html("You lost!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/scissors.jpeg>");

        if (playerID === 1) {
            losses = parseInt(database.ref("/Players/Player1/losses").get());
            losses++;
            database.ref("/Players/Player1/losses").set(losses);
        }
        else {
            losses = parseInt(database.ref("/Players/Player1/losses").get());
            losses++;
            database.ref("/Players/Player2/losses").set(losses);
        }

        setTimeout(function () {
            reset()
        }, 5000);

    }

    if (choice == "scissors" && oppChoice == "rock") {
        $("h1").html("You lost!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/rock.png>");

        if (playerID === 1) {
            losses = parseInt(database.ref("/Players/Player1/losses").get());
            losses++;
            database.ref("/Players/Player1/losses").set(losses);
        }
        else {
            losses = parseInt(database.ref("/Players/Player1/losses").get());
            losses++;
            database.ref("/Players/Player2/losses").set(losses);
        }

        setTimeout(function () {
            reset()
        }, 5000);

    }

    if (choice == "scissors" && oppChoice == "paper") {
        $("h1").html("You won!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/paper.jpeg>");

        if (playerID === 1) {
            wins = parseInt(database.ref("/Players/Player1/wins").get());
            wins++;
            database.ref("/Players/Player1/wins").set(wins);
        }
        else {
            wins = parseInt(database.ref("/Players/Player1/wins").get());
            wins++;
            database.ref("/Players/Player2/wins").set(wins);
        }

        setTimeout(function () {
            reset()
        }, 5000);
    }

    if (choice == "scissors" && oppChoice == "scissors") {
        $("h1").html("You tied!");
        $("#playerDisplay").html("You chose " + choice);
        $("#oppDisplay").html("Your opponent chose " + oppChoice);
        $("#oppChoicePic").html("<img src=assets/images/scissors.jpeg>");

        if (playerID === 1) {
            ties = parseInt(database.ref("/Players/Player1/ties").get());
            ties++;
            database.ref("/Players/Player1/ties").set(ties);
        }
        else {
            ties = parseInt(database.ref("/Players/Player1/ties").get());
            ties++;
            database.ref("/Players/Player2/ties").set(ties);
        }

        setTimeout(function () {
            reset()
        }, 5000);

    }

}

function reset() {
    database.ref("/Players/Player1/choice").set("");
    database.ref("/Players/Player2/choice").set("");
    $("#rpsSelect").show();
    $("#oppChoicePic").html("");
    $("#playerChoicePic").html("");
    $("#playerDisplay").html("You");
    $("#oppDisplay").html("Opponent");
    $("h1").html("Rock Paper Scissors!");
}

