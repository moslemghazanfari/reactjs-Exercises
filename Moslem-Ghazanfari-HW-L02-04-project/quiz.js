function getlocalstorage() {
  if (localStorage.length != 0) {
    currentquestion = parseInt(localStorage.getItem("Currentquestion"));
    indexcorrectanswer = parseInt(localStorage.getItem("Indexcorrectanswer"));
    resultCurrectAnswer = parseInt(localStorage.getItem("ResultCurrectAnswer"));
    isshowanswer = (localStorage.getItem("Isshowanswer") == "true") ? true : false;
    questions.push(...JSON.parse(localStorage.getItem("Questions")));
    getquestions(false);
  }

}
window.addEventListener("load", getlocalstorage);

const getcategory = async () => {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    const categoryitems = data.trivia_categories;
    let selectoption;
    for (const categoryitem of categoryitems) {
      selectoption = document.createElement("option");
      selectoption.value = categoryitem.id;
      selectoption.textContent = categoryitem.name;
      selectCategory.appendChild(selectoption);
    }
  } catch (error) {


  }
}

const datajson = `{ "response_code": 0, 
  "results": [{ "type": "multiple", 
    "difficulty": "easy", 
    "category": "Entertainment: Books",
    "question": "What was the name of Captain Nemo&#039;s submarine in &quot;20,000 Leagues Under the Sea&quot;?", 
    "correct_answer": "The Nautilus",
     "incorrect_answers": ["The Neptune", "The Poseidon  ", "The Atlantis"] },
     { "type": "multiple",
       "difficulty": "easy",
        "category": "Entertainment: Books",
         "question": "What is the name of the protagonist of J.D. Salinger&#039;s novel Catcher in the Rye?",
          "correct_answer": "Holden Caulfield",
           "incorrect_answers": ["Fletcher Christian", "Jay Gatsby", "Randall Flagg"]
           }]
           }`;
const data = JSON.parse(datajson);

function displaynone(element) {
  document.getElementById(element).className = "display-none";
}
function displayelement(element, cssclass = "") {
  document.getElementById(element)
    .className = cssclass;
}


async function getquestions(newget = true) {

  try {
    if (newget) {
      const response = await fetch(`https://opentdb.com/api.php?amount=${countquestion.value}&category=${selectCategory.value}&difficulty=${selectDifficulty.value}&type=multiple`);
      if (!response.ok)
        throw new Error("اطلاعاتی از سرور دریافت نشد");

      const data = await response.json();
      if (data.response_code != 0 || data.results.length == 0)
        throw new Error("هیچ سوالی وجود ندارد");

      questions.push(...data.results);
      localStorage.setItem("Questions", JSON.stringify(questions));
    }

    displaynone("section1");
    displayelement("section2", "section2 borderbox");
    nextquestion();

  } catch (error) {
    alert(error.message);
  }
}
const showquestion = () => {
  pquestion[0].innerHTML = questions[currentquestion].question;

  let randomCorrectanswer = localStorage.getItem("RandomCorrectanswer") || Math.trunc(Math.random() * 4);
  localStorage.setItem("RandomCorrectanswer", randomCorrectanswer)
  labeloption[randomCorrectanswer].innerHTML = questions[currentquestion].correct_answer;
  indexcorrectanswer = randomCorrectanswer;
  let j = 2;
  for (let i = labeloption.length - 1; i >= 0; i--) {
    if (i == randomCorrectanswer) continue
    labeloption[i].innerHTML = questions[currentquestion].incorrect_answers[j];
    j--;
  }
  showscore();
  savestatus();
  //console.log(localStorage.getItem("Questions"));
}

const showanswer = () => {
  clearInterval(timer);
  let useranswer = localStorage.getItem("Useranswer");
  if (useranswer != null)
    inputansewer.item(useranswer).checked = true;

  inputansewer.forEach((value, key) => {
    if (value.checked && useranswer == null) {
      localStorage.setItem("Useranswer", key);
      if (key == indexcorrectanswer) {
        resultCurrectAnswer++
      }
    }
    if (key == indexcorrectanswer)
      labeloption.item(key).className = "show-answer";
    else if (value.checked)
      labeloption.item(key).className = "show-incorrect";

    value.disabled = true;
  })
  btnNext.disabled = false;
  btnNext.textContent = "سوال بعد"
  isshowanswer = true;
  savestatus();
  showscore();
  currentquestion++;
  if ((currentquestion == questions.length)) {
    btnNext.removeEventListener("click", nextquestion);
    btnNext.textContent = "نتیجه تست";
    btnNext.className = "btnresult";
    btnNext.addEventListener("click", handleresult);
  }
}

const nextquestion = () => {

  

  showquestion();
  if (isshowanswer) {
    showanswer();
    return;
  }
  inputansewer.forEach((value, key) => {
    value.disabled = false;
    value.checked = false;
    labeloption.item(key).className = "";
  })
  btnNext.disabled = true;
  localStorage.removeItem("Useranswer");
  let i = 15;
   timer=setInterval(() => {
    document.querySelector("#timer").textContent = `زمان پاسخ سوال ( ${ --i } )`;
    if (i == 0) {
      showanswer();
      clearInterval(timer);
    }
  }, 1000);
}

const handleresult = () => {
  displaynone("section2");
  displayelement("section3", "section3 borderbox");
  document.getElementById("result").innerHTML = `امتیاز: ${resultCurrectAnswer * 10}`;
  const listquestion = document.getElementById("list-question");
  let li;
  let p;
  for (const objquestion of questions) {
    li = document.createElement("li");
    p = document.createElement("p");
    li.innerHTML = `${objquestion.question}`;
    p.innerHTML = `${objquestion.correct_answer}`;
    li.appendChild(p);
    listquestion.appendChild(li);
  }
  localStorage.clear();
}
let currentquestion = 0;
let indexcorrectanswer = -1;
let resultCurrectAnswer = 0;
let isshowanswer = false;
let timer ;
const selectCategory = document.getElementById("category");
const selectDifficulty = document.getElementById("Difficulty");
const countquestion = document.querySelector("input");
const questions = [];
const btnStart = document.querySelector("button");
btnStart.addEventListener("click", getquestions);
getcategory();
const pquestion = document.getElementsByClassName("question");
const inputansewer = document.getElementsByName("option");
const labeloption = document.getElementsByTagName("label");

const currANDtotal = document.getElementById("currANDtotal");
const curresult = document.getElementById("curresult");
const btnNext = document.getElementById("btnnext");

inputansewer.forEach((option) => option.addEventListener("click", () =>
  btnNext.disabled = false
))

btnNext.addEventListener("click", () => {
  if (isshowanswer == false) { showanswer(); return; }

  isshowanswer = false;
  btnNext.textContent = "نمایش جواب"
  nextquestion()
})

function showscore() {
  currANDtotal.textContent = `سوال ${currentquestion + 1} از ${questions.length}`;
  curresult.textContent = `امتیاز ${resultCurrectAnswer * 10} از ${questions.length * 10}`;
}

function savestatus() {
  localStorage.setItem("Currentquestion", currentquestion);
  localStorage.setItem("Indexcorrectanswer", indexcorrectanswer);
  localStorage.setItem("ResultCurrectAnswer", resultCurrectAnswer);
  localStorage.setItem("Isshowanswer", isshowanswer);

}

document.querySelector("#reload").addEventListener("click", () => window.location.reload());







