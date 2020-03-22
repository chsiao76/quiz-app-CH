//question database
const STORE = [
    {
      question: 'How many games do you need to win in one set in Tennis?',
      answers: [
        '6',
        '1',
        '3',
        '6, sometimes 7'
      ],
      correctAnswer:
        '6, sometimes 7'
    },
    {
      question:
        'What is another way to say 0 in Tennis scoring lingo?',
      answers: [
        'Balls',
        'Yoob',
        'Love',
        'Zed'
      ],
      correctAnswer:
        'Love'
    },
    {
      question:
        'If a ball hits the line during play, what does that mean?',
      answers: [
        'Point must be replayed',
        'Ball is out and player loses the point',
        'Ball is considered in and play continues as normal',
        'Player must continue to play with non-dominant hand'
      ],
      correctAnswer: 'Ball is considered in and play continues as normal'
    },
    {
      question: 'What style of spin will make the ball dip faster toward the ground during its flight path?',
      answers: [
        'Back-spin',
        'No spin',
        'Top-spin',
        'Side-spin'
      ],
      correctAnswer: 'Top-spin'
    },
    {
      question:
        'Why do Tennis players wear white during Wimbledon?',
      answers: [
        'White looks good',
        'To avoid appearance of sweat stains',
        'To allow the audience to see players more clearly',
        'To reflect the harsh sun'
      ],
      correctAnswer: 'To avoid appearance of sweat stains'
    }
  ];
  
//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(5);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.tennisBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Correct!</h3>
    <img src="images/correct.jpg" alt="tennis player victory pose" class="images" width="200px">
      <p class="sizeMe">You aced it!</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>Wrong.</h3>
    <img src="images/wrong.jpg" alt="tennis player frustrated" class="images" width="200px">
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.tennisBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const array = [
    'Good match!',
    "Thanks for playing, you're a good sport!"
  ];

  return $('.final').html(
    `<h3>${array[0]}</h3>
        <h3>Your score is ${score} / 5</h3>
        <p class="sizeMe">${array[1]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.tennisBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);

 