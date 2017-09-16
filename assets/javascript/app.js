$(document).ready(function(){

    var questions = [
        {
            question: "How old was Harry when he was invited to attend Hogwarts?",
            answers: [{answer: "11 years old", correct: true}, {answer:"12 years old", correct: false},
                {answer: "9 years old", correct: false}, {answer: "9 3/4 years old", correct:false}],
            image: "assets/images/owl.gif"
        },
        {
            question: "What kind of animal does Sirius turn in to?",
            answers: [{answer: "Phoenix", correct: false}, {answer:"Dog", correct: true},
                {answer: "Cat", correct: false}, {answer: "Stag", correct: false}],
            image: "https://media.giphy.com/media/KSTBnWW2ULD4A/giphy.gif"
        },
        {
            question: "What kind of animal was Buckbeak?",
            answers: [{answer: "Stag", correct: false}, {answer:"Rat", correct: false},
                {answer: "Hippogriff", correct: true}, {answer: "Werewolf", correct: false}],
            image: "https://media.giphy.com/media/S7Cp4cbWMiseY/giphy.gif"
        },
        {
            question: "What bank vault at Gringotts holds the Sorcerer's Stone?",
            answers: [{answer: "666", correct: false}, {answer:"13", correct: false},
                {answer: "713", correct: true }, {answer: "687", correct: false}],
            image: "https://media.giphy.com/media/DCdpWSrAIOuti/giphy.gif"
        },
        {
            question: "Who is Hogwart's school Nurse?",
            answers: [{answer: "Madame Pince", correct: false}, {answer:"Madam Hooch", correct: false},
                {answer: "Argus Filch", correct: false}, {answer: "Madam Pomfrey", correct: true}],
            image: "https://68.media.tumblr.com/0653c74dd1042be8e2fbf3b8206e7f10/tumblr_inline_oqqjjgT6th1ulks8a_540.gif"
        },
        {
            question: "Which professor is an Animagus capable of turning into a cat?",
            answers: [{answer: "McGonagall", correct: true}, {answer:"Flitwick", correct: false},
                {answer: "Sprout", correct: false}, {answer: "Snape", correct:false}],
            image: "https://media.giphy.com/media/uyCcy9I9IRqpi/giphy.gif"
        },
        {
            question: "What did Rita Skeeter turn into to obtain information?",
            answers: [{answer: "Beetle", correct: true}, {answer:"Tree", correct: false},
                {answer: "Cat", correct: false}, {answer: "Mouse", correct:false}],
            image: "https://68.media.tumblr.com/5eec6e382817e640e48c5182ba79f820/tumblr_okouhxRuv01qmrhc9o1_500.gif"
        },
        {
            question: "Which Defense against the Dark Arts teacher was a follower of Voldemort?",
            answers: [{answer: "Moody", correct: false}, {answer:"Lupin", correct: false},
                {answer: "Lockhart", correct: false}, {answer: "Quirrell", correct: true}],
            image: "https://media.giphy.com/media/BnhIfw9hBDlLi/giphy.gif"
        },
        {
            question: "Where was the entrance to the Chamber of Secrets?",
            answers: [{answer: "The Great Hall", correct: false}, {answer:"The Slytherin Common Room", correct: false},
                {answer: "The Astronomy Tower", correct: false}, {answer: "Myrtle's Bathroom", correct: true }],
            image: "https://media.giphy.com/media/1CtJUjxxgA5Pi/giphy.gif"
        },
        {
            question: "Who is the oldest Weasley child?",
            answers: [{answer: "Arthur", correct: false}, {answer:"Bill", correct: true},
                {answer: "Roger", correct: false}, {answer: "Charlie", correct:false}],
            image: "https://media.giphy.com/media/rnyV7YxcOTUcg/giphy.gif"
        }
    ];

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var gameStarted = false;
    var timer = 10;
    var questionCount = 0;
    var runTimer;
    var imageDiv = $("#main-image");
    var mainDialogue = $("#main-dialogue");
    var timerDialogue = $("#timer-dialogue");
    var qDiv = $("#questions");


    function createQuestion(){

        mainDialogue.text(null);
        timer = 10;
        timerDialogue.text('You have ' + timer + " Seconds");
        imageDiv.attr('src', 'assets/images/parchment.jpg');


        var currentQuestion = questions[questionCount];
        questionCount++;

        $("#question-image").attr("src", currentQuestion.image);
        $("#current-question").text(currentQuestion.question);

        for (var i = 0; i < 4; i++) {
            var answer = currentQuestion.answers[i].answer;
            $("#" + i).html('<h1>' + answer);
            $("#" + i).data(currentQuestion.answers[i]);
        };
    }

    function countdown() {
            timerDialogue.text('You have ' + timer + " Seconds");
            timer--;
        if (timer === 0) {
            if (questionCount === questions.length) {
                results();
            }
            else {
                unanswered++;
                createQuestion();
            }
        }
    }


    function qTimer() {
        createQuestion();
        runTimer = setInterval(countdown, 1000);
    }

    function clearTimer() {
        clearInterval(runTimer)
    }


    function setUp(){
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        gameStarted = false;
        timer = 10;
        questionCount = 0;
        qDiv.show();
        $("#results").hide();
        qTimer();

    }

    function results() {
        clearInterval(runTimer);
        qDiv.hide();
        $("#results").show();
        $("#correct").text(correctAnswers);
        $("#incorrect").text(incorrectAnswers);
        $("#unanswered").text(unanswered);
        $("#timer-dialogue").text("You got " + correctAnswers / questions.length * 100 + "% right! Click on Voldemort to try again.");
    }

    imageDiv.click(function() {
        if (!gameStarted) {
            gameStarted = true;
            qDiv.show();
            qTimer();
        }

    });

    $(".answer").click(function() {
        clearTimer();
        var isCorrect = $(this).data().correct;

        if (isCorrect) {
            correctAnswers++;
            console.log(correctAnswers);
        }
        else {
            incorrectAnswers++
        }

        if (questionCount === questions.length) {
            results();
        }
        else {
            qTimer();
        }

    });

    $("#results-image").click(function () {
        setUp()
    })

});


