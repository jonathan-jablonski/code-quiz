let timeRemaining = 60;
let startBtn = document.querySelector('#start');
let timeInterval;
let pageTime = document.querySelector('#time');
let question = document.querySelector('#question');
let questionName = document.querySelector('#name');
let choices = document.querySelector('#choices');
let currentQuestion;
let counter = 0;
let userName = document.querySelector('#userName');
let nameScore = document.querySelector('#score');
let scoreName = document.querySelector('#scoreName');
let scoreSubmit = document.querySelector('#scoreSubmit');
let greetingMsg = document.querySelector('#greetingMsg');
let rightAnswer = document.querySelector('#rightAnswer');
let wrongAnswer = document.querySelector('#wrongAnswer');
let highScores = [];

scoreSubmit.style.visibility = "hidden";
nameScore.style.visibility = "hidden";
userName.style.visibility = "hidden";

// Starting quiz
function startGame(){
    timeInterval = setInterval(timeRun, 1000);
    
    displayQuestion();
}

// Show questions in the browser
function displayQuestion() {
    currentQuestion = questions[counter];
    greetingMsg.style.visibility = "hidden";
    question.textContent = currentQuestion.name;

    currentQuestion.choices.forEach(function(choice){
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.addEventListener("click", answerClick);
        choiceBtn.textContent = choice;

        choices.appendChild(choiceBtn);
        
        startBtn.style.visibility = "hidden";
    });
}

// Upon answering the question
function answerClick(e){
    e.preventDefault();
    console.log(currentQuestion);
    if(e.target.value === currentQuestion.answer){
        console.log('true');
        
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

// End of the game
function endGame() {
    clearInterval(timeInterval);
    nameScore.removeAttribute('class');
    choices.style.visibility = "hidden";
    question.style.visibility = "hidden";
    scoreSubmit.style.visibility = "visible";
    nameScore.style.visibility = "visible";
    userName.style.visibility = "visible";
    

}

// Gathering scores and initials for high scores
scoreSubmit.addEventListener("click", function(event){
    event.preventDefault();
    highScores.push({
        name: userName.value,
        score: timeRemaining
    });
    localStorage.setItem('scores',JSON.stringify(highScores));
});

// Timer
function timeRun() {
    timeRemaining--;
    pageTime.textContent = `Time ${timeRemaining}`;

    if (timeRemaining <= 0) {
        clearInterval(timeInterval);
    }
    
}

// Appending high scores to an array for display
function renderScores() {
    const highScoreDiv = document.querySelector('#high-scores');
    if (localStorage.getItem('scores')) {
        highScores = JSON.parse(localStorage.getItem('scores'));
        if (highScores.length > 0) {
            for(let i = 0; i < highScores.length; i++) {
                const div = document.createElement('div');
                div.textContent = `${highScores[i].name} - ${highScores[i].score}`;
                highScoreDiv.appendChild(div);
            }
        }
    }
}
renderScores();
startBtn.addEventListener("click", startGame);