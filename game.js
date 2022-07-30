
var buttonArray=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keydown(function() {
  if(!started){
  started=true;
  $("#level-title").text("Level 0");
  nextSequence();
}
});
$(".btn").click(function(event){
var userChosenColor=event.target.id;
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor((Math.random()*4));
  randomChosenColor=buttonArray[randomNumber];
  gamePattern.push(randomChosenColor);
  var temp="#"+randomChosenColor;
  $(temp).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(url){
  var audio = new Audio("sounds/"+url+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
        setTimeout(function(){
          nextSequence()}
          ,1000);
    }
  }
  else{
    console.log("failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over!! Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
