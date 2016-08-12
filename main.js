// List variables to ues through the game
var rows = 3;
var columns = 3;
var squares = rows * columns;
var playerOneWins = 0;
var playerTwoWins = 0;
var clickCount = 0;
var gameCount = 0;
var $iconOne = ( "X" ); // Icon for each player
var $iconTwo = ( "O" );

// Create board 'border' with lines only on certain sides
// Create 9 black tiles using a for loop and apply a number class

for ( var i = 0; i < squares; i++ ) {
  var tileNo = i + 1;
  $( ".board" ).append( "<div class = " + tileNo + "></div>" );
}

// Scoring - setting up the initial scoreboard for a new game

var createScoreBoard = function() {
  var scoring = $( "<div class = scoreboard></div>" ).appendTo( ".columnOne" );
};
createScoreBoard();

// Setting up a scoreboard for tracking player wins
var updateScoreboard = function() {
  $( ".scoreboard" )
  .html( "Player One (X) Score: " + playerOneWins + "<br>" +
  "Player Two (O) Score: " + playerTwoWins );
};
updateScoreboard();

// Reset function to clear board and add total score
var reset = function() {
  console.log( "reset" );
  $( ".board div" ).empty();
  clickCount = 0;
  gameCount++;
  for ( var property in playerMoves ) {
    playerMoves [ property ] = [];
  }
};

// Hover setting to see the cell being selected
$( ".board div" ).mouseover( function() {
  $( this ).css( "background-color", "lightblue" );
});
$( ".board div" ).mouseout( function() {
  $( this ).css( "background-color", "lightslategray" );
});

// Player moves are recorded within an array for the game, cleared at the end of each game with reset function.
var playerMoves = {
  playerOne: [],
  playerTwo: [],
  computer: [],
};

// A tracker to identify mouse clicks and count
$( ".board div" ).on( "click", function( event ) {

  // Stop people from clicking the same cell twice
  if ( !( $( this ).is( ":empty" ))) {
    console.log( "You've already clicked here" );
    alert( "you've clicked this already..." );
    return;
  }
  // Click counter runs if new tile is clicked with tile number (class) recorded
  clickCount += 1;
  var tileNumber = $( this ).attr( "class" );

  // Add player to tile and push/record tile no.
  if ( clickCount % 2 === 0 ) {
    $( this ).html( $iconOne );
    playerMoves.playerTwo.push( tileNumber );
  } else if ( clickCount % 2 === 1 ) { // Odd counter
    $( this ).html( $iconTwo );
    playerMoves.playerOne.push( tileNumber );
  }

  // Checking if player has three in a row with "winning" object
  for ( var property in winning ) {
    var combo = winning[ property ];
    var matchesOne = 0;
    var matchesTwo = 0;

  for ( var i = 0; i < combo.length; i++ ) {
    if ( playerMoves.playerOne.includes( combo[i] )) {
      matchesOne += 1;
    } else if ( playerMoves.playerTwo.includes( combo[i] )) {
      matchesTwo += 1;
    }
    if ( matchesOne === 3 ) {
      console.log( "Player One wins - Game over" );
      playerOneWins += 1;
      alert( "Player One wins - Game over" );
      reset();
      updateScoreboard();

      // Push +1 to tally
    } else if ( matchesTwo === 3 ) {
      console.log( "Player Two wins - Game over" );
      playerTwoWins += 1;
      alert( "Player Two wins - Game over" );
      reset();
      updateScoreboard();

    } else if ( clickCount === squares ) {
      console.log( "game over" );
      alert( "It's a tie - Game Over" );
      reset();
    }
  }
}
});

// Winning combinations - Could be looked at further
var winning = {
  combOne: [ "1", "2", "3" ],
  combTwo: [ "4", "5", "6" ],
  combThree: [ "7", "8", "9" ],
  combFour: [ "1", "4", "7" ],
  combFive: [ "2", "5", "8" ],
  combSix: [ "3", "6", "9" ],
  combSeven: [ "1", "5", "9" ],
  combEight: [ "3", "5", "7" ],
};

$( "button.reset" ).on( "click", reset );

// Find the middle of the tile - for images
//   var midY = $(this).position().top += ( $(this).width()/2);
//   var midX = $(this).position().left += ( $(this).width()/2);

// Change the tile color to pastel green from gray
function animate( idx ) {
  $( $( ".board div" ) [idx] ).animate({
    backgroundColor: "lightslategray"
  }, 200, function() {
    var idx2 = idx;
    $( $( ".board div" )[idx2] ).animate({
      backgroundColor: "#AECFC8"
    }, 200, function() {});
    if ( idx >= $( ".board div" ).length - 1 ) {
      setTimeout( animate( 0 ), 200 );
    } else setTimeout( animate( idx + 1 ), 200 );
  });
}

$( document ).ready( function () {
  animate( 0 );
});

function toggle_color( color1, color2, cycle_time, wait_time ) {
  setInterval( function first_color() {
    $( "body" ).animate({
      backgroundColor: color1
    }, 1000, function() {
      setTimeout( change_color, wait_time );
    });
  }, cycle_time );

  function change_color() {
    $( "body" ).animate({
      backgroundColor: color2
    }, 1000, function() {
      setTimeout( function() {}, wait_time );
    });
  }
}
toggle_color( "#61beb3", "#FF8C69", 8000, 3000 );


// User is a computer
// var computerStats = {
//   corner: [ "1", "3", "7", "9" ],
//   center: [ "5" ], // Assumes the rest are edges
// };
// Need to not only map players moves but figure out the computers best next option
// var computerCalc = function() {
//   // Map the array above so that it can be used to subtract the players entry from the array
//   var watchingGame = computerStats.map();
//   console.log(watchingGame);
//   var moveNo = playerMoves.playerOne.length;
//   if ( moveNo === 1) {
//     if (tileNumber === computerStats.corner) {
//     playerMoves.playerTwo.push(tileNumber);
//     }
//     } else if ( moveNo === 2 ) {
//     }
//   };
//   computerCalc();
