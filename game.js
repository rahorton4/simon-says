// color array
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// creates random sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  // creates random number btwn 0-4 and adds it to array
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // creates flash for chosen color
  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
  // calls play sound function
  playSound(randomChosenColor);
  $('#level-title').text("Level " + level);  
}

// retrieves id from button user clicks
$('.btn').click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    // calls play sound function
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

// plays sound for nextSequence and when user clicks button
function playSound(name){
  // plays audio for chosen color
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play(); 
}

// creates button animation (turns it grey and adds shadow)
function animatePress(currentColor) {
  // user clicked button turns grey  
  $("#" + currentColor).addClass("pressed");

  // removes grey color from button 100ms after clicked
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// starting the game
$(document).one("keypress", function(event){
  if (event.key == 'a') {
    nextSequence();
  }
})

function checkAnswer(lastColor) {
  if (gamePattern[lastColor] == userClickedPattern[lastColor]){
    if (userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $(document).one("keypress", function(){
      startOver();
  })
  }
}

function startOver(){
    level = 0;
    gamePattern = [];  
    nextSequence();
}