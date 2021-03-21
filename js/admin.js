let questions = [];
const xhttp = new XMLHttpRequest();

class Question {
  constructor(
    question,
    a_answer,
    b_answer,
    c_answer,
    d_answer,
    correct_answer
  ) {
    this.question = question;
    this.answer1 = a_answer;
    this.answer2 = b_answer;
    this.answer3 = c_answer;
    this.answer4 = d_answer;
    this.correct_answer = correct_answer;
  }
};

// Get form data, turn into Question object, push into questions array.
function addQuestion() {
  let question = document.getElementById("question").value;
  let a_answer = document.getElementById("a_answer").value;
  let b_answer = document.getElementById("b_answer").value;
  let c_answer = document.getElementById("c_answer").value;
  let d_answer = document.getElementById("d_answer").value;
  let correct_answer;
  let choices = document.getElementsByName("choices");
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      console.log(choices[i].value)
      correct_answer = choices[i].value;
    }
  }

  if (checkIfQuestionExists(question)) {
    xhttp.open(
      "PUT",
      `https://evening-brook-54204.herokuapp.com/questions/?a1=${a_answer}&a2=${b_answer}&a3=${c_answer}&a4=${d_answer}&question=${question}&correct_answer=${correct_answer}`,
      true);
      xhttp.send();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

          let quizQuestion = new Question(
            question,
            a_answer,
            b_answer,
            c_answer,
            d_answer,
            correct_answer
          );
          updateQuestionsArray(quizQuestion);
          document.getElementById("response").innerHTML = "Question added!";
          document.getElementById("question").value = "";
          document.getElementById("a_answer").value = "";
          document.getElementById("b_answer").value = "";
          document.getElementById("c_answer").value = "";
          document.getElementById("d_answer").value = "";
          document.getElementById("response").innerHTML = "Questions saved!";
        } else {
          document.getElementById("response").innerHTML = "Try again!";
        }
      }
  }
  else {
    xhttp.open(
      "POST",
      `https://evening-brook-54204.herokuapp.com/questions/?a1=${a_answer}&a2=${b_answer}&a3=${c_answer}&a4=${d_answer}&question=${question}&correct_answer=${correct_answer}`,
      true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        let quizQuestion = new Question(
          question,
          a_answer,
          b_answer,
          c_answer,
          d_answer,
          correct_answer
        );
        questions.push(JSON.stringify(quizQuestion));
        document.getElementById("response").innerHTML = "Question added!";
        document.getElementById("question").value = "";
        document.getElementById("a_answer").value = "";
        document.getElementById("b_answer").value = "";
        document.getElementById("c_answer").value = "";
        document.getElementById("d_answer").value = "";
        document.getElementById("response").innerHTML = "Questions saved!";
      } else {
        document.getElementById("response").innerHTML = "Try Again";
      }
    }
  }
}

function checkIfQuestionExists(question) {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].question === question) {
      return true;
    }
  }
  return false;
}

function updateQuestionsArray(question) {
  new_arr = [];
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].question === question.question) {
      new_arr.push(JSON.stringify(questions));
    }
    else {
      new_arr.push(questions[i]);
    }
  }
  questions = new_arr;
}
