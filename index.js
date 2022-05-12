$(document).ready(function () {
  $('#answer-form').on('submit', function (e) {
    e.preventDefault();
    checkAnswer();
  });

  $(document).on('click', '.start-timer', function (e) {
    e.preventDefault();
    score = 0;
    var operatorChoice = $("input[name='choice']:checked").val();
    checkOperator(operatorChoice);
    maxNum = $('#max-number').val();
    $('#current-score').empty();
    $('#current-score').append('<p>Player Score: ' + score + '</p>');
    $("#answer-input").removeAttr('disabled');
    startTimer();
    createAndShowMathEquation();
    $(this).remove();
  });

});

var timeLeft;
var score = 0;
var highScore = 0;
var num1, num2;
var answer;
var operator;
var strEq;
var maxNum;

var checkOperator = function (choice) {
  switch (choice) {
    case 'Addition':
      operator = '+';
      break;
    case 'Subtraction':
      operator = '-';
      break;
    case 'Multiplication':
      operator = '*';
      break;
    case 'Division':
      operator = '/';
      break;
  }
}

var updateTimeLeft = function (amount) {
  timeLeft += amount;
  $('#timer').empty();
  $('#timer').append('<p>' + timeLeft + ' Seconds Left</p');
}

var startTimer = function () {
  timeLeft = 10;
  var timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      $('#timer').empty();
      gameEnd();
      return;
    }
    updateTimeLeft(-1);
  }, 1000);
}

var createAndShowMathEquation = function () {
  num1 = Math.floor(Math.random() * maxNum);
  num2 = Math.floor(Math.random() * maxNum);
  if(num1 < num2){
    var temp = num1;
    num1 = num2;
    num2 = temp;
  }
  switch (operator) {
    case '+':
      answer = num1 + num2;
      break;

    case '-':
      answer = num1 - num2;
      break;

    case '*':
      answer = num1 * num2;
      break;

    case '/':
      if(num1 == 0){
        createAndShowMathEquation();
        return;
      }
      else if (num1 % num2 != 0) {
        createAndShowMathEquation();
        return;
      }
      else {
        answer = num1 / num2;
      }
      break;
  }
    strEq = num1 + ' ' + operator + ' ' + num2;
  $('#equation-container').empty();
  $('#equation-container').append('<p>' + strEq + '</p>');
};

var checkAnswer = function () {
  var playerInput = parseInt($('#answer-input').val());
  if (answer === playerInput) {
    score++;
    updateTimeLeft(1);
    $('#current-score').empty();
    $('#current-score').append('<p>Player Score: ' + score + '</p>');
    createAndShowMathEquation();
    $('#answer-input').val('');
  }
  else {
    console.log('wrong');
  }
};

var gameEnd = function () {
  $("#answer-input").attr('disabled', 'disabled');
  if (score > highScore) {
    highScore = score;
    $('#high-score').empty();
    $('#high-score').append('<p>High Score: ' + score + '</p>');
  }
  $('#max-number').empty();
  $('#timer-div').empty();
  $('#timer-div').append('<button class="start-timer">Start Game</button>');
};