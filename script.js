let timeRemaining = 60;
let startBtn = document.querySelector('#start');
let timeInterval;
let pageTime = document.querySelector('#time');
let question = document.querySelector('#question');
let name = document.querySelector('#name');
let choices = document.querySelector('#choices');
let currentQuestion;
let counter = 0;

// Starting quiz
function startGame(){
    timeInterval = setInterval(timeRun, 1000);

    displayQuestion();
}

// Show questions in the browser
function displayQuestion() {
    currentQuestion = questions[counter];

    name.textContent = currentQuestion.name;

    currentQuestion.choices.forEach(function(choice){
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.addEventListener("click", answerClick);
        choiceBtn.textContent = choice;

        choices.appendChild(choiceBtn);
    });
}

// Upon answering the question
function answerClick(e){
    e.preventDefault();
    console.log(currentQuestion);
    if(e.target.value === currentQuestion.answer){
        console.log('correct');
    } else {
        console.log('false');
    }

    counter++
    choices.textContent = "";

    displayQuestion();
}

// Timer
function timeRun() {
    timeRemaining--;
    pageTime.textContent = timeRemaining;

    if (timeRemaining === 0) {
        clearInterval(timeInterval);
    }
}

startBtn.addEventListener('click', startGame);

