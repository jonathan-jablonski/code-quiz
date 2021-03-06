let timeRemaining = 60;
let startBtn = document.querySelector('#start');
let timeInterval;
let pageTime = document.querySelector('#time');
let question = document.querySelector('#question');
let questionName = document.querySelector('#name');
let choices = document.querySelector('#choices');
let currentQuestion;
let counter = 0;
let nameScore = document.querySelector('#score');
let scoreName = document.querySelector('#scoreName');
let scoreSubmit = document.querySelector('#scoreSubmit');
let greetingMsg = document.querySelector('#greetingMsg');
let rightAnswer = document.querySelector('#rightAnswer');
let wrongAnswer = document.querySelector('#wrongAnswer');

// Starting quiz
function startGame(){
    timeInterval = setInterval(timeRun, 1000);

    displayQuestion();
}

// Show questions in the browser
function displayQuestion() {
    currentQuestion = questions[counter];

    question.textContent = currentQuestion.name;

    currentQuestion.choices.forEach(function(choice){
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.addEventListener("click", answerClick);
        choiceBtn.textContent = choice;

        choices.appendChild(choiceBtn);
        // choicesBtn.className = "my-choices-btn";
        console.log(choices)
        console.log(choiceBtn)
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

    if(counter < questions.length){
        choices.innerHTML = '';
        displayQuestion();
    } else{
        alert('Game Over');
        endGame();
    }

    
}

function endGame() {
    clearTimeout(counter);
    nameScore.removeAttribute('class');
    choices.style.visibility = "hidden";
    question.style.visibility = "hidden";
}

scoreSubmit.addEventListener("click", function(){
     let userName = scoreName.counter;

     localStorage.setItem(userName, counter);
});

// // // Timer
function timeRun() {
    timeRemaining--;
    pageTime.textContent = `Time ${timeRemaining}`;

    if (timeRemaining <= 0) {
        clearInterval(timeRemaining);
    }
    
}

startBtn.addEventListener("click", startGame);