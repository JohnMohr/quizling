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
        questionDiv.style.display ="block";

        displayQuestion(questionNumber)

        displayTimerDiv.textContent = formatTime();

        quizLoop = setInterval(function() {
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


      
      const resultsContainer = document.getElementById('results');
      const submitButton = document.getElementById('submit');
      const previousButton = document.getElementById("previous");
      const nextButton = document.getElementById("next");
      const retryButton = document.getElementById("retry");
      const slides = document.querySelectorAll(".slide");

      ////EVENT LISTENERS
      submitButton.addEventListener('click', showResults);
      previousButton.addEventListener("click", showPreviousSlide);
      nextButton.addEventListener("click", showNextSlide);
      startButton.addEventListener("click", buildQuiz);
      retryButton.addEventListener("click", retryQuiz);

      const time = questions.length * 10;
      


      let timerId;
      const timerEl = document.getElementById('timer')
      var currentQuestionIndex = 0;


      
      let currentSlide = [];
      ////FUNCTIONS

      

      function clockTick() {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
          quizOver()
        }
      }
      //show high score last
       function quizOver () {
         quizContainer.setAttribute('class', 'show')
       }

      function showQuestions() {

        var currentQuestion = questions[currentQuestionIndex]
        var questionSpot = document.getElementbyId('questionSpot')   
        questionSpot.textContent = currentQuestion.question;

        
        currentQuestion.answer.forEach(function()


        )
        
          // variable to store the HTML output
        var output = [];
        // for each question...
        quizQuest.forEach(
          (currentQuestion, questionNumber) => {
            // variable to store the list of answers
            var answers = [];
            // and for each available answer...
            for (letter in currentQuestion.answers) {
              // ...add an HTML radio button
              answers.push(
                `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter} :
          ${currentQuestion.answers[letter]}
        </label>`
              );
            }
            // add this question and its answers to the output
            output.push(
              `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
            );
          }
        );
        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
      };
      
        
      function showResults() {
        // gather answer containers from our quiz.
        var answerContainers = quizContainer.querySelectorAll('.answers');
        // keep track of user's answers.
        numCorrect = 0;
        // for each question...
        quizQuest.forEach((currentQuestion, questionNumber) => {
          // find selected answer.
          var answerContainer = answerContainers[questionNumber];
          var selector = `input[name=question${questionNumber}]:checked`;
          var userAnswer = (answerContainer.querySelector(selector) || {}).value;
          // if correct add to correct answers.
          if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            // color the answers green.
            answerContainers[questionNumber].style.color = 'lightgreen';
          }
          // if answer is wrong or blank, color the answers red.
          else {
            answerContainers[questionNumber].style.color = 'red';
          }
        });
        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${quizQuest.length}`;
      };
      function showSlide(n) {
        //hide current slide by removing the active slide class
        slides[currentSlide].classList.remove('active-slide');
        //show the new slide by adding the active-slide class
        slides[n].classList.add('active-slide');
        //update the current sldie number
        currentSlide = n;
        //if we are on the first slide don't show the previous button
        if (currentSlide === 0) {
          previousButton.style.display = 'none';
        }
        // show the previous button if its past the first slide
        else {
          previousButton.style.display = 'inline-block';
        }
        //if its the last slide don't show the next button
        if (currentSlide === slides.length - 1) {
          nextButton.style.display = 'none';
          submitButton.style.display = 'inline-block';
        }
        else { //if its not the last slide show the next button. also only show submit if it is the last slide.
          nextButton.style.display = 'inline-block';
          submitButton.style.display = 'none';
        }
      }
      function showNextSlide() {
        showSlide(currentSlide + 1);
      }
      function showPreviousSlide() {
        showSlide(currentSlide - 1);
      }
      //const variable to grab element by id amd set attribute to hide startscreenhomepage.setAttribute('class', 'hide')

      function formatTime() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;

      }
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
      function saveUser() {

        // get previous scores from local storage and place in array or use empty array
        const scores = JSON.parse(localStorage.getItem("scores")) || [];

        // create score object
        const score = {
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
      function retryQuiz() {
        questionNumber = 0;
        timer = initialTime;
        displayTimerDiv.style.display = "block";
        timerContainer.style.backgroundColor = "black";
        buildQuiz();
      }
      
      
      //show the first slide
      showSlide(currentSlide);
      ////QUIZ
      buildQuiz();
      
  