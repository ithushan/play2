// store the color
var colors = ["green", "red", "yellow", "blue"];

// store the game plan
var gamePattern =[];

// store the user game pattern
var userSelectedPattern = [];

// store the gmae level
var gameLevel = 0;

// store the game state
var gameState = false;

// listen key press event
$(document).keypress(function(){
    if (gameState === false) {
        gameState = true;
        
        NextLevel();
        
    }

});

// listen for user click event

$(".btn").click(function () {
    // get the user selected color
    var SelectedColor = $(this).attr("id");
      
    userSelectedPattern.push(SelectedColor);

    playSound(SelectedColor);
    
    animatePressBtn(SelectedColor);

    // check game pattern
    var LastIndex = userSelectedPattern.length - 1;
    if(userSelectedPattern[LastIndex] === gamePattern[LastIndex]){
        if (userSelectedPattern.length === gamePattern.length) {
            userSelectedPattern = [];  // ???
            setTimeout(function () {
                NextLevel();    
            }, 800);
         }
    }
    else{
        // console.log("Game over");

        $("h1").text("Game Over, Press Any key To Restart,  your score is- " + gameLevel);
        $("body").addClass("game-over");

        playSound("wrong");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);

        // when i click next key then only restrat game
        
        gameLevel = 0;
        gameState = false;
        gamePattern = [];
        userSelectedPattern =[];
    }
});



// play sound
function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
};


//  animatePressBtn
function animatePressBtn(color) {
    $("#" + color).addClass("pressed");

    setTimeout( function(){
        $("#" + color).removeClass("pressed");
    } ,100);
};

// nextlevel

function NextLevel() {
    // generate randomBum
    var randomNum = Math.floor(Math.random() * colors.length);
    var randomColor = colors[randomNum];

    // store the random color in gamePattern
    gamePattern.push(randomColor);

    // increase game level
    gameLevel = gameLevel + 1;
    $("h1").text("Level " + gameLevel);

    // play sound for color
    playSound(randomColor);

    // animate the btn
    animatePressBtn(randomColor);
};