$(document).ready(function(){
  $('#answer-form').on('submit' ,function(e){
    e.preventDefault();
    checkAnswer();
  });

  $('#start-timer').on('click', function(e){
    e.preventDefault();
    startTimer();    
    createAndShowMathEquation();
    $(this).remove();
  });

});

var timeLeft;
var score = 0;
var highScore;
var num1, num2;
var answer;

var updateTimeLeft = function(amount){
  timeLeft += amount;
  $('#timer').empty();
  $('#timer').append('<p>' + timeLeft + ' Seconds Left</p');
}

var startTimer = function () {
  timeLeft = 10;
  var timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameEnd();
    }
    updateTimeLeft(-1);
  }, 1000);
}

var createAndShowMathEquation = function(){
  //use this place to add the max variable for the bonus section
  num1 = Math.floor(Math.random() * 9);
  num2 = Math.floor(Math.random() * 9); 
  var operator;
  operator = '+';
  var strEq = num1 + ' + ' + num2;
  $('#equation-container').empty();
  $('#equation-container').append('<p>' + strEq + '</p>');
  return num1 + num2;
};

var checkAnswer = function(){
  answer = num1 + num2; 
  var playerInput = parseInt($('#answer-input').val());
  if(answer === playerInput){
    score ++;
    updateTimeLeft(1);
    console.log(timeLeft)
    $('#current-score').empty();
    $('#current-score').append('<p>Player Score: ' + score + '</p>');
    createAndShowMathEquation();
    $('#answer-input').val('');
  }
  else{
    console.log('wrong');
  }
};

var gameEnd = function(){
  $("#answer-input").attr('disabled', 'disabled');
  $('#timer').empty();
};