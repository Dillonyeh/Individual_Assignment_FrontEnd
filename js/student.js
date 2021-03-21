const xhttp = new XMLHttpRequest();
let quizQuestions;

getQuizQuestions()

function getQuizQuestions() {
    xhttp.open("GET", "https://evening-brook-54204.herokuapp.com/questions", true)
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (JSON.parse(xhttp.responseText) === null) {
                document.getElementById("error").innerHTML("No quiz exists");
            } else {
                quizQuestions = JSON.parse(xhttp.responseText);
                loadQuiz();
            }
        }
    }
}

function loadQuiz() {
    for (let i = 0; i < quizQuestions.length; i++) {
        // Get and parse JSON
        let quizQuestion = quizQuestions[i];
        console.log(quizQuestion);

        // Get and create question element
        let question = document.createElement("p");
        question.innerHTML = quizQuestion.question;
        document.getElementById("quiz").appendChild(question);

        // Get and create answer elements
        // Should prob use another loop here, but we'll have to change our JSON schema to make it easy to loop (i.e. array or answers {1: answer1, 2: answer2, etc...})
        let break1 = document.createElement("br");
        let break2 = document.createElement("br");
        let break3 = document.createElement("br");
        let break4 = document.createElement("br");

        if (quizQuestion.a1 != "") {
            let a_span = document.createElement("span");
            a_span.id = "a_answer" + i.toString();
            a_span.className = "quizChoice";
            let a_answer = document.createElement("input");
            a_answer.type = "radio";
            a_answer.name = i.toString();
            a_answer.value = "a_answer"
            let answer_a_label = document.createElement("label");
            answer_a_label.innerHTML = quizQuestion.a1;
            a_span.appendChild(a_answer);
            a_span.appendChild(answer_a_label);
            document.getElementById("quiz").appendChild(a_span);
            document.getElementById("quiz").appendChild(break1);
        }

        if (quizQuestion.a2 != "") {
            let b_span = document.createElement("span");
            b_span.id = "b_answer" + i.toString();
            b_span.className = "quizChoice";
            let b_answer = document.createElement("input");
            b_answer.type = "radio";
            b_answer.name = i.toString();
            b_answer.value = "b_answer"
            let answer_b_label = document.createElement("label");
            answer_b_label.innerHTML = quizQuestion.a2;
            b_span.appendChild(b_answer);
            b_span.appendChild(answer_b_label);
            document.getElementById("quiz").appendChild(b_span);
            document.getElementById("quiz").appendChild(break2);
        }

        if (quizQuestion.a3 != "") {
            let c_span = document.createElement("span");
            c_span.id = "c_answer" + i.toString();
            c_span.className = "quizChoice";
            let c_answer = document.createElement("input");
            c_answer.type = "radio";
            c_answer.name = i.toString();
            c_answer.value = "c_answer"
            let answer_c_label = document.createElement("label");
            answer_c_label.innerHTML = quizQuestion.a3;
            c_span.appendChild(c_answer);
            c_span.appendChild(answer_c_label);
            document.getElementById("quiz").appendChild(c_span);
            document.getElementById("quiz").appendChild(break3);
        }

        if (quizQuestion.a4 != "") {
            let d_span = document.createElement("span");
            d_span.id = "d_answer" + + i.toString();
            d_span.className = "quizChoice";
            let d_answer = document.createElement("input");
            d_answer.type = "radio";
            d_answer.name = i.toString();
            d_answer.value = "d_answer"
            let answer_d_label = document.createElement("label");
            answer_d_label.innerHTML = quizQuestion.a4;
            d_span.appendChild(d_answer);
            d_span.appendChild(answer_d_label);
            document.getElementById("quiz").appendChild(d_span);
            document.getElementById("quiz").appendChild(break4);
        }
    }
}

function submit() {
    let answers;
    let correctAnswer;
    let score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        answers = document.getElementsByName(i.toString());
        correctAnswer = quizQuestions[i].correct_answer;
        for (let j = 0; j < answers.length; j++) {
            if (answers[j].checked && answers[j].value == correctAnswer) {
                score++;
            }
        }
        document.getElementById(correctAnswer + i.toString()).style.backgroundColor = "green";
        console.log(correctAnswer + i.toString());
    }
    document.getElementById("score").innerHTML = "Your results: " + score + " / " + quizQuestions.length;
}