var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0; 
var started = false;

//Keydown to Start

$(document).keydown(function (){ 
    if(!started){
        setTimeout(function (){
            nextSequence();
            $("#level-title").text("Level " + level);
            started = true;
        }, 200);
    }
});

//Game  Pattern Sequence

function nextSequence(){
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // for(var i = 0; i < gamePattern.length; i++){
    //     $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
    //     playSound(gamePattern[i]);
    // }

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//User Colour Clicked Pattern

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//Button Sound

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Button Effect

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//User Pattern Check

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}