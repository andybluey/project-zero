// Focus on creating the board - the framework
var rows = 3;
var columns = 3;
var squares = rows*columns;

// Create board 'border' with lines only on certain sides
// Create 9 black tiles
for (var i = 0; i< squares; i++) {
  var tileNo = i+1;
  $(".board").append('<div class=' + tileNo + '></div>');
}

// Icon for each player
var $iconOne = ("X");
var $iconTwo = ("O");

    // Scoring

var winCounter = {
playerOne: [],
playerTwo: [],
computer: [],
};

var scoreboard = $("<div class = scoreboard>");
var displayWinsOne = winCounter.playerOne.length;
var displayWinsTwo = winCounter.playerTwo.length;
scoreboard.html("Player One Score: " + displayWinsOne + "<br>" + "Player Two Score: " + displayWinsTwo);
$(".columnOne").appendTo(scoreboard);


// Reset board and add total score
var reset = function() {
  console.log("reset");
  $(".board div").empty();
  clickCount = 0;
  for (var property in playerMoves) {
    playerMoves[property] = [];
  }
};

  // Hover setting - need to find just one cell
  $(".board div").mouseover(function(){
      $(".board div").css("background-color", "blue");
    });
  $(".board div").mouseout(function(){
      $(".board div").css("background-color", "black");
    });

//Look to set reset function from here
  var playerMoves = {
    playerOne: [],
    playerTwo: [],
    computer: [],
  };

  // Identify mouse clicks and count
  var clickCount = -1;
    $(".board div").on("click", function(event) {

    // Stop clicking twice
    if (!($(this).is(':empty'))){
      console.log("You've already clicked here");
      alert("you've clicked this already...");
      return;
    }
    // Click counter - continues to run on new games
    clickCount +=1;
    var tileNumber = $(this).attr("class");

    // Add player to tile and push/record tile no.
      if (clickCount%2 === 0) {
        $(this).html($iconOne);
        playerMoves.playerTwo.push(tileNumber);
    } else if (clickCount%2 === 1){ // Odd counter
        $(this).html($iconTwo);
        playerMoves.playerOne.push(tileNumber);
    } if (clickCount === squares) { // Check for total scores
        console.log("game over");
        alert("Game Over");
        reset();

        // User is a computer
        var computerStats = {
            corner: ["1", "3", "7", "9"],
            center: ["5"], // the rest are edges
        };
          // Need to not only map players moves but figure out the computers best next option
        var computerCalc = function() {
                // Add a counter
          var moveNo = playerMoves.playerOne.length;
          if ( moveNo === 1) {
              if (tileNumber === computerStats.corner) {
              }
            } else if ( moveNo === 2 ) {
            }
          };
    }

   // Checking if player has three in a row with "winning" object
    for (var property in winning) {
      var combo = winning[property];
      var matchesOne = 0;
      var matchesTwo = 0;
      for (var i = 0; i < combo.length; i++) {
       if (playerMoves.playerOne.includes(combo[i])) {
       matchesOne += 1;

      } else if (playerMoves.playerTwo.includes(combo[i])) {
        matchesTwo +=1;
        } if (matchesOne === 3) {
         console.log("Player One wins - Game over");
          winCounter.playerOne.push(1);
          console.log(winCounter);
          alert("Player One wins - Game over");
          reset();

         // Push +1 to tally
        } if (matchesTwo === 3) {
          console.log("Player Two wins - Game over");
          winCounter.playerTwo.push(1);
          console.log(winCounter);
          alert("Player Two wins - Game over");
          reset();
        }
      }
    }
  });


// Winning combinations - Could be looked at further
  var winning = {
    combOne : ["1", "2", "3"],
    combTwo : ["4", "5", "6"],
    combThree : ["7", "8", "9"],
    combFour : ["1", "4", "7"],
    combFive : ["2", "5", "8"],
    combSix : ["3", "6", "9"],
    combSeven : ["1", "5", "9"],
    combEight : ["3", "5", "7"],
  };

  // Reset - remove playerMoves, reset click count
  // Reset should be prompted with game over or winning - Create button

  // Find the middle of the tile - for images
  //   var midY = $(this).position().top += ( $(this).width()/2);
  //   var midX = $(this).position().left += ( $(this).width()/2);

$('button.reset').on('click',reset);
