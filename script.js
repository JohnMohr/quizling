//// QUIZ CONTENT
const quiz = [
    {
        question: "Which of the following is a 'keystone species' in the Pacific Northwest?",
        answers: ["Liger","Boreal Toad","Salmon","Hipster"],
        correctAnswer: "Salmon"
    },
    {
        question: "Farm-raised '_______' are fed carotenoids astaxanthin and canthaxanthin to match their flesh colour to wild '________'.",
        answers: ["Chickens","Salmons","Chameleons","Snakes"],
        correctAnswer: "Salmons"
    },
    {
        question: "Within the Haida nation, Salmon are referred to as '______'.?",
        answers: ["Hadouken","Shoryuken","Lachs","Tsiin"],
        correctAnswer: "Tsiin"
    },
    {
        question: "In Norse mythology, after Loki tricked the blind god Höðr into killing his brother Baldr, Loki jumped into a river and transformed himself into a '_______' to escape punishment from the other gods. When they held out a net to trap him he attempted to leap over it but was caught by Thor who grabbed him by the tail with his hand, and this is why the '_______'s' tail is tapered",
        answers: ["Salmon","Beaver","Armadillo","Mastodon"],
        correctAnswer: "Salmon"
    },
    {
        question: "Salmon have a strong sense of '______'.",
        answers: ["Taste","Self","Purpose","Smell"],
        correctAnswer: "Smell"
    },
    {
        question: "What is the average pace of a salmon in the Saltwater phase of their life?",
        answers: ["12 miles per day","100 miles per day","18 miles per day","3.14159 miles per day"],
        correctAnswer: "18 miles per day"
    }
];




// declare html element variables
var timeLeft = document.querySelector("#timer");
var startButton = document.querySelector("#start");
var introText = document.querySelector("#intro");
var titleText = document.querySelector("#big-text")
var questionText = document.querySelector("#question-text")
var chocieList = document.querySelector("#choices");
var userStats = document.querySelector("#user-stats")
var userScore = document.querySelector("#score-display")
var userInitials = document.querySelector("#initials-input");
var submitButton = document.querySelector("#submit");
var userResults = document.querySelector("#results");
var highScores = document.querySelector("#highscores");
var startTime = 60;
var score = 0;
var index = 0;

var user = {
    initials: userInitials.value,
    userScore: userScore.value
};

userStats.style.display = "none";


function countDown() {
    var timeInterval = setInterval(function () {
        startTime--;
        timeLeft.textContent = "Salmon Seconds: " + startTime;
        if (startTime === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}

function renderQuiz() {
    chocieList.textContent = "";
    questionText.textContent = quiz[index].question;
    for (i = 0; i < quiz[index].answers.length; i++) {
        var answerList = document.createElement("li");
        answerList.textContent = quiz[index].answers[i];
        chocieList.appendChild(answerList);
    }

    // When time runs out or we run out of questions, display the user's stats
    if (startTime <= 0 || index === 9) {
        chocieList.style.display = "none";
        timeLeft.style.display = "none";
        questionText.textContent = "";
        userStats.style.display = "block";
        userScore.value = score;

        // Scorecard message changes based on user's score
        if (score >= 5) {
            userResults.textContent = "You really know your Salmon!"
        }
        else {
            userResults.textContent = "It's okay, buddy. The Salmon aren't real. They can't hurt you."
        }

        // When user submits their data, it will be collected and stored in local storage
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();
            if (userInitials.value === "") {
                userResults.textContent = "Please enter your initials!"
            }
            else {
                userResults.textContent = "Success! You will be remembered in the Salmon halls"
                // Send user data to local storage
                localStorage.setItem("user", JSON.stringify(user));
            }
            userInitials.value = "";
            userScore.value = "";
        })
    }
}

startButton.addEventListener("click", function () {
    countDown();
    introText.textContent = "";
    titleText.textContent = "";
    startButton.style.display = "none";
    renderQuiz();
})

document.querySelector("#choices").addEventListener("click", function (event) {
    if (event.target.textContent === quiz[index].correctAnswer) {
        score++;
        console.log(score);
    }
    else {
        startTime = startTime - 10;
    }
    // Repeat the function for the next index in the quiz array
    index++;
    renderQuiz();
})

highScores.addEventListener("click", function () {
    questionText.textContent = "";
    userStats.style.display = "block";
    introText.textContent = "";
    titleText.textContent = "";
    startButton.style.display = "none";
    userResults.textContent = "Here ya go, nosy!";
    userInitials.value = lastHighScore.initials;
    userScore.value = lastHighScore.score;
    
})


console.log(lastHighScore);