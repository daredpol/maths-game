var playing = false;
var timeremaining;
var action;
var score;
var ansBoxNumber;
var correctAns;
var showCorrect;
var tablevalue;
var radios;
var duration;

radios = document.getElementsByName('mathtype');
for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
        // Get the value of the selected radio button
        var selectedValue = radios[i].value;
        // Do something with the selected value
        // Exit the loop once a selected radio button is found
        break;
    }
    
}
// ansBoxNumber = 1 + Math.round((Math.random() * 3));
//If we click in the start/reset, to initiate the game.
document.getElementById("activatestop").onclick = function () {
    if (playing == true) {
        location.reload();

    } else if (playing == false && (document.getElementById("duration").value == "" && document.getElementById("tableselect").value == "")) {
        document.getElementById("valuecheck").innerHTML = "Range and Time cannot be empty!";
        visible("valuecheck");
        setTimeout (function(){
            nVisible("valuecheck");
        },1000);

    } else if (playing == false && document.getElementById("duration").value == "") {
        document.getElementById("valuecheck").innerHTML = "Time cannot be empty";
        visible("valuecheck");
        setTimeout (function(){
            nVisible("valuecheck");
        },1000);

    }else if (playing == false && document.getElementById("tableselect").value == "") {
        document.getElementById("valuecheck").innerHTML = "Range cannot be empty!";
        visible("valuecheck");
        setTimeout(function () {
            nVisible("valuecheck");
        }, 1000);
    }
    else {
        playing = true;
        score = 0;
        hide("modeselect");
        hide("tabletype");
        show("timelapse");
        hide("homepager");
        if(window.innerWidth <= 500){
            document.getElementById("gamecontainer").style.marginTop = "30%";
            document.getElementById("marq").style.display = "none";

        }else if (window.innerWidth >= 501 && window.innerWidth <= 768){
            document.getElementById("gamecontainer").style.marginTop = "20%";
        }
        document.getElementById("score").innerHTML = 0;
        duration = document.getElementById("duration").value
        timeremaining = duration * 60;
        //--document.getElementById("time").innerHTML = timeremaining;
        hide("gameover");
        document.getElementById("activatestop").innerHTML = "Stop Game";
        //start countdown
        startCountdown();

        //generate new Q&A
        generateQA();
    };
};

//Clicking a box to select an answer
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAns) {
                score++;
                document.getElementById("score").innerHTML = score;
                show("correct");
                hide("tryagain");
                setTimeout(function () { hide("correct") }, 1000);
                //Generate new QA after selecting the correct answer
                generateQA();

            } else {
                hide("correct");
                show("tryagain");
                setTimeout(function () {
                    hide("tryagain");
                }, 1000);
                generateQA();
            }
        }
    }
}

//--- FUNCTIONS

// Loop through the radio buttons to find the selected one


//Validate input

//show ID
function show(Id) {
    document.getElementById(Id).style.display = "block";
}
function showGrid(Id) {
    document.getElementById(Id).style.display = "grid";
}

//visibility
function visible(Id) {
    document.getElementById(Id).style.visibility = "visible";
}

//non-visible
function nVisible(Id) {
    document.getElementById(Id).style.visibility = "hidden";
}
//hide ID 
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//getElementById

function getElement(Id) {
    this.Id = Id;
    Id = document.getElementById(Id);
}

//startCountdown fx

function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("time").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            // gameOver();
            showGrid("gameover");
            hide("timelapse");
            hide("correct");
            hide("tryagain");
            // timeremaining = 10;
            playing = false;
            document.getElementById("time").innerHTML = timeremaining;
            document.getElementById("activatestop").innerHTML = "Start Game";
            document.getElementById("result").innerHTML = score + ".";
        }
    }, 1000);

}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

//gameover
function gameOver() {

}

//clear all answers upon gameover.
function clearedBoxes() {
    for (i = 1; i < 5; i++) {
        document.getElementById("box" + i).innerHTML = "";
    }
}

//generate new QA

function generateQA() {
    tablevalue = document.getElementById("tableselect").value;

    //Looping through the game mode buttons
    radios = document.getElementsByName('mathtype');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // Get the value of the selected radio button
            var selectedValue = radios[i].value;
            break;
        }
    }
    if (selectedValue == "multiply") {
        //let's generate a random number between 1 and 4 that we will use to send the correct answers to one of the boxes
        document.getElementById("moder").innerHTML = "Multiplication";
        var x = 1 + Math.round((tablevalue - 1) * Math.random());
        var y = 1 + Math.round((tablevalue - 1) * Math.random());
        correctAns = x * y;
        var ansBoxNumber = 1 + Math.round((Math.random() * 3));
        document.getElementById("questionBox").innerHTML = x + " X " + y;
        document.getElementById("box" + ansBoxNumber).innerHTML = correctAns;

        // fill other other boxes with wrong answers;

        var answers = [correctAns];
        for (i = 1; i < 5; i++) {
            if (i != ansBoxNumber) {
                var wrongAnswer;

                //To ensure that each wrong answer generated is not equal to the right answer:
                do {
                    wrongAnswer = (1 + Math.round((tablevalue - 1) * Math.random())) * (1 + Math.round((tablevalue - 1) * Math.random())); //a wrong answer
                    document.getElementById("box" + i).innerHTML = wrongAnswer;
                } while (answers.indexOf(wrongAnswer) > -1); //To verify if whether the generated wrong answer is in the array of answers already. If it is, then another wrong answer is generated.
                answers.push(wrongAnswer); //To add the generated wrong answer to the answers array such that it is not repeated.
            }
        }
    } else if (selectedValue == "add") {
        //let's generate a random number between 1 and 4 that we will use to send the correct answers to one of the boxes
        document.getElementById("moder").innerHTML = "Addition";
        var x = 1 + Math.round((tablevalue - 1) * Math.random());
        var y = 1 + Math.round((tablevalue - 1) * Math.random());
        correctAns = x + y;
        var ansBoxNumber = 1 + Math.round((Math.random() * 3));
        document.getElementById("questionBox").innerHTML = x + " + " + y;
        document.getElementById("box" + ansBoxNumber).innerHTML = correctAns;

        // fill other other boxes with wrong answers;

        var answers = [correctAns];
        for (i = 1; i < 5; i++) {
            if (i != ansBoxNumber) {
                var wrongAnswer;

                //To ensure that each wrong answer generated is not equal to the right answer:
                do {
                    wrongAnswer = (1 + Math.round((tablevalue - 1) * Math.random())) * (1 + Math.round((tablevalue - 1) * Math.random())); //a wrong answer
                    document.getElementById("box" + i).innerHTML = wrongAnswer;
                } while (answers.indexOf(wrongAnswer) > -1); //To verify if whether the generated wrong answer is in the array of answers already. If it is, then another wrong answer is generated.
                answers.push(wrongAnswer); //To add the generated wrong answer to the answers array such that it is not repeated.
            }
        }
    } else if(selectedValue == "divide") {
        //let's generate a random number between 1 and 4 that we will use to send the correct answers to one of the boxes
        document.getElementById("moder").innerHTML = "Division";
        var x = 1 + Math.round((tablevalue - 1) * Math.random());
        var y = 1 + Math.round((tablevalue - 1) * Math.random());
        correctAns = x / y;
        var ansBoxNumber = 1 + Math.round((Math.random() * 3));
        document.getElementById("questionBox").innerHTML = x + " ÷ " + y;
        document.getElementById("box" + ansBoxNumber).innerHTML = correctAns.toFixed(2);

        // fill other other boxes with wrong answers;

        var answers = [correctAns];
        for (i = 1; i < 5; i++) {
            if (i != ansBoxNumber) {
                var wrongAnswer;

                //To ensure that each wrong answer generated is not equal to the right answer:
                do {
                    wrongAnswer = (1 + Math.round((tablevalue - 1) * Math.random())) / (1 + Math.round((tablevalue - 1) * Math.random())); //a wrong answer
                    document.getElementById("box" + i).innerHTML = wrongAnswer.toFixed(2);
                } while (answers.indexOf(wrongAnswer) > -1); //To verify if whether the generated wrong answer is in the array of answers already. If it is, then another wrong answer is generated.
                answers.push(wrongAnswer); //To add the generated wrong answer to the answers array such that it is not repeated.
            }
        }
    } else if (selectedValue == "subtract") {
        //let's generate a random number between 1 and 4 that we will use to send the correct answers to one of the boxes
        document.getElementById("moder").innerHTML = "Subtraction";
        var x = 1 + Math.round((tablevalue - 1) * Math.random());
        var y = 1 + Math.round((tablevalue - 1) * Math.random());
        correctAns = x - y;
        var ansBoxNumber = 1 + Math.round((Math.random() * 3));
        document.getElementById("questionBox").innerHTML = x + " - " + y;
        document.getElementById("box" + ansBoxNumber).innerHTML = correctAns;

        // fill other other boxes with wrong answers;

        var answers = [correctAns];
        for (i = 1; i < 5; i++) {
            if (i != ansBoxNumber) {
                var wrongAnswer;

                //To ensure that each wrong answer generated is not equal to the right answer:
                do {
                    wrongAnswer = (1 + Math.round((tablevalue - 1) * Math.random())) - (1 + Math.round((tablevalue - 1) * Math.random())); //a wrong answer
                    document.getElementById("box" + i).innerHTML = wrongAnswer;
                } while (answers.indexOf(wrongAnswer) > -1); //To verify if whether the generated wrong answer is in the array of answers already. If it is, then another wrong answer is generated.
                answers.push(wrongAnswer); //To add the generated wrong answer to the answers array such that it is not repeated.
            }
        }
    } else if (selectedValue == "square") {
        //let's generate a random number between 1 and 4 that we will use to send the correct answers to one of the boxes
        var x = 1 + Math.round((tablevalue - 1) * Math.random());
        // var y = 1 + Math.round((tablevalue - 1) * Math.random());
        correctAns = x * x;
        var ansBoxNumber = 1 + Math.round((Math.random() * 3));
        document.getElementById("questionBox").innerHTML = x + "<span style='font-size:0.4em; position:absolute; top: 45px;'><sup>2</sup></span> ";
        document.getElementById("box" + ansBoxNumber).innerHTML = correctAns;

        // fill other other boxes with wrong answers;

        var answers = [correctAns];
        for (i = 1; i < 5; i++) {
            if (i != ansBoxNumber) {
                var wrongAnswer;
                //To ensure that each wrong answer generated is not equal to the right answer:
                do {
                    wrongAnswer = (1 + Math.round((tablevalue - 1) * Math.random())); //a wrong answer
                    wrongAnswer = wrongAnswer * wrongAnswer
                    document.getElementById("box" + i).innerHTML = wrongAnswer;
                } while (answers.indexOf(wrongAnswer) > -1); //To verify if whether the generated wrong answer is in the array of answers already. If it is, then another wrong answer is generated.
                answers.push(wrongAnswer); //To add the generated wrong answer to the answers array such that it is not repeated.
            }
        }
    }
}
