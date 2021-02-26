//// QUIZ CONTENT
let questions = [
    {
        question: "Which of the following is a 'keystone species' in the Pacific Northwest?",
        answers: {
            a: "Liger",
            b: "Boreal Toad",
            c: "Salmon",
            d: "Hipster"
        },
        correctAnswer: "c"
    },
    {
        question: "Farm-raised '_______' are fed carotenoids astaxanthin and canthaxanthin to match their flesh colour to wild '________'.",
        answers: {
            a: "Chickens",
            b: "Salmons",
            c: "Chameleons",
            d: "Snakes"
        },
        correctAnswer: "b"
    },
    {
        question: "Within the Haida nation, Salmon are referred to as '______'.",
        answers: {
            a: "Hadouken",
            b: "Shoryuken",
            c: "Lachs",
            d: "Tsiin"
        },
        correctAnswer: "d"
    },
    {
        question: "In Norse mythology, after Loki tricked the blind god Höðr into killing his brother Baldr, Loki jumped into a river and transformed himself into a '_______' to escape punishment from the other gods. When they held out a net to trap him he attempted to leap over it but was caught by Thor who grabbed him by the tail with his hand, and this is why the '_______'s' tail is tapered",
        answers: {
            a: "Salmon",
            b: "Beaver",
            c: "Armadillo",
            d: "Mastodon"
        },
        correctAnswer: "a"
    }
];


let quizLoop;
////VARIABLES
const timerContainer = document.querySelector('#timer')
const welcomeDiv = document.querySelector("#welcomeDiv");
const displayTimerDiv = document.querySelector("#timerText");
const questionDiv = document.querySelector("#question");
const scoreDiv = document.querySelector("#scoreDiv");
const startBtn = document.querySelector("#startBtn");
const pathRemaining = document.querySelector("#pathRemaining");
const retryBtn = document.querySelector("#retryBtn");
const scoreList = document.querySelector('#scoreList')
const welcomeTimeMessage = document.querySelector("#welcomeTimeMessage")
const quizLengthMessage = document.querySelector("#quizLengthMessage")



startBtn.addEventListener("click", buildQuiz);
retryBtn.addEventListener("click", retryQuiz)
const initialTime = quizQuest.length * 10;
const timer = initialTime;

welcomeTimeMessage.textContent = formatTime();
quizLengthMessage.textContent = questions.length;

let questionNumber = 0;


function buildQuiz() {

    welcomeDiv.style.display = "none";
    scoreDiv.style.display = "none";

    timerContainer.style.display = "block";
    questionDiv.style.display = "block";

    displayQuestion(questionNumber)

    displayTimerDiv.textContent = formatTime();

    quizLoop = setInterval(function () {
        timer--;

        pathRemaining.style.stroke = getColor()

        displayTimerDiv.textContent = formatTime();
        timerContainer.style.backgroundColor = "black";

        setCircleDashArray();
        if (timer < 0) {
            clearInterval(quizLoop);
            showScoreScreen();
        }

    }, 1000)

};

function displayQuestion(questionNumber) {


    questionDiv.innerHTML = "";

    if (questionNumber < questions.length && timer > 0) {

        const newQuestion = document.createElement
        newQuestion.textContent = questions[questionNumber].text;
        newQuestion.setAttribute("class", "question-text");
        questionDiv.appendChild(newQuestion);

        //loop through possible responses and display a button for each
        for (var i = 0; i < questions[questionNumber].responses.length; i++) {
            var newButton = document.createElement("div");
            newButton.textContent = questions[questionNumber].responses[i];
            newButton.setAttribute("class", "answerBtn")

            //button will send response number as argument to answerQuestion()
            newButton.setAttribute("onclick", "answerQuestion(" + i + ")");
            questionDiv.appendChild(newButton);
        }

    }
    else {
        //questions have all been asked go to score screen
        clearInterval(quizLoop);
        showScoreScreen();
    }

}

// accept answer from user
function answerQuestion(answerNumber) {
    console.log(`answerQuestion(${answerNumber}) fires`);

    //convert string argument to int for comparison
    answerNumber = parseInt(answerNumber);

    //compare user answer to correct answer
    if (answerNumber !== questions[questionNumber].correctResponse) {
        //answer is incorrect - deduct 10s from timer
        if (timer >= 10) {
            timer -= 10;
        } else {
            timer = 0;
        }
        // make timing circle flash red
        pathRemaining.style.stroke = "red";
        timerContainer.style.backgroundColor = "red";
    }
    else {
        timerContainer.style.backgroundColor = "rgb(0, 255, 0)";
    }

    //move to next question
    questionNumber++;

    //put next question on screen
    displayQuestion(questionNumber);
}

// display a final score screen to the user after the quiz is over
function showScoreScreen() {
    console.log("showScoreScreen() fires");

    timerContainer.style.display = "none";

    // ensure no negative times
    if (timer < 0) {
        timer = 0;
    }

    // ensure timer/ score screen is correc at end;
    setCircleDashArray();

    //hide question and timer div
    questionDiv.style.display = "none";
    displayTimerDiv.style.display = "none";

    // show score div
    scoreDiv.style.display = "block";

    //create score element and display
    var scoreDisplay = document.createElement("h1");
    scoreDisplay.textContent = "You scored " + timer + "!";
    questionDiv.appendChild(scoreDisplay);

    saveUser();
}

// save score to local storage
function saveUser() {

    // get previous scores from local storage and place in array or use empty array
    var scores = JSON.parse(localStorage.getItem("scores")) || [];

    // create score object
    var score = {
        "score": timer,
        "date": Date()
    }

    if ((scores.length >= 10 && score.score > scores[9].score) || (scores.length < 10)) {

        // prompt user for name
        score.initials = prompt("You earned a high score! Enter your initials!");

        // add current score to score array
        scores.push(score);

        // sort score array by score value 
        scores.sort((a, b) => {
            if (a.score < b.score) {
                return 1
            } else if (a.score > b.score) {
                return -1
            }
            return 0;

        })

        if (scores.length > 10) {
            scores.splice(10, 1);
        }

        console.log(scores);

        // save latest score to local storage for special styling
        localStorage.setItem("latestScore", JSON.stringify(score));
        // save score list to local storage
        localStorage.setItem("scores", JSON.stringify(scores));

    }
    else {
        alert("you didn't make the high score list. Try harder next time!");
    }
    displayScores(score);
}

// display score list after quiz
function displayScores(testScore) {

    console.log(`displayScores(${testScore}) fires`)
    // console.log("testScore: ", testScore);

    scoreList.innerHTML = "";

    // get score list from local storage
    var scores = JSON.parse(localStorage.getItem("scores"));

    // loop through scores and place in ol    
    for (var i = 0; i < scores.length; i++) {
        var score = document.createElement("div");
        score.setAttribute("Class", "highScore");

        // console.log(`testScore.date: ${testScore.date} ?= scores[${i}].date: ${scores[i].date}`);

        // set text to score
        score.textContent = `${i + 1}. ${scores[i].initials}  ${scores[i].score}`;

        // test if score is from quiz just taken then add class and message if so
        if (scores[i].date === testScore.date) {
            score.setAttribute("class", "highScore yourScore");
            score.textContent += " - your score!";
        }
        scoreList.appendChild(score);
    }

}

// reset variables to initial values and call functions to begin quiz
function retryQuiz() {
    questionNumber = 0;
    timer = initialTime;
    displayTimerDiv.style.display = "block";
    setCircleDashArray();
    pathRemaining.style.stroke = getColor();
    timerContainer.style.backgroundColor = "black";
    runQuiz();
}

//==================================================================
// timer animation functions
// =================================================================

// format seconds int to  MM:SS string
function formatTime() {

    // get whole minutes
    var minutes = Math.floor(timer / 60);

    // get remaining seconds
    var seconds = timer % 60;

    // add leading "0"s
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

// sets length of timing circle
function setCircleDashArray() {
    // set stroke-dasharray equal to the ration of time remaining/initial time

    // circumference of circle = 2* pi * r(45px) = 283
    var circleDasharray = `${((timer / initialTime) * 283).toFixed(0)} 283`;
    document.getElementById("pathRemaining").setAttribute("stroke-dasharray", circleDasharray);
}

// makes timing circle fade from green to red through yellow
function getColor() {
    // set initial color values
    var red = 0;
    var green = 255;

    // set formulas for later
    var ratioTimeLeft = timer / initialTime;
    var ratioTimeElapsed = 1 - ratioTimeLeft;

    // if time elapsed is < 50% increase red 
    if (ratioTimeElapsed <= 0.5) {
        red = ratioTimeElapsed * 2 * 255;
    }
    // reduce green
    else {
        red = 255;
        green = (ratioTimeLeft * 2) * 255
    }

    return `rgba(${red}, ${green}, 0)`;
}