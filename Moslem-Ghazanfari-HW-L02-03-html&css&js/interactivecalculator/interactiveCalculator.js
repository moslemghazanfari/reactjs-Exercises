const expressionbox = document.getElementById("expression");
const answerbox = document.getElementById("answer");
const buttons = document.querySelectorAll("button");
let expression;
let flagDot;
let currentnumber;
let result = 0;

const clear = () => {
  expressionbox.textContent = "0";
  answerbox.textContent = "0";
  expression = "";
  currentnumber = "";
  flagDot = false;
  result = 0;
};
clear();

const keyhandeler = (key) => {
  if (expression.at(-1) == "=") {
    clear();
  }
 // console.log(key, key.codePointAt(0));

  if (hasNumberCHAR(key.at(0))) {
    if (currentnumber == "0") {
      currentnumber = "";
      backspace();
    }
    updateexpersion(key);
    currentnumber += key;
    calculate();
    return;
  }

  switch (key) {
    case '.': handledot('.')
      break;
    case "*": case "/": case "+": case "-": handleOperator(key);
      break
    case '=': case "Enter":
    case "calculate": if (expression != "") {
      calculate();
      updateexpersion("=");
    }
      break
    case "clear": clear();
      break
    case "Backspace": backspace();
      //restore currentnumber
      let strarray = Array.from(expression);
      currentnumber = expression.substring(strarray.findLastIndex((value) => "*/-+".includes(value)) + 1, expression.length);
      flagDot = currentnumber.includes('.') ? true : false;
      if (currentnumber == "0") currentnumber = "";
      (expression != "") ? calculate() : clear();
      break
  }
}

buttons.forEach((button) => button.addEventListener("click", (event) => {

  event.stopPropagation();
  if (button.dataset.num) keyhandeler(button.dataset.num);
  if (button.dataset.dot) keyhandeler(button.dataset.dot);
  if (button.dataset.operator) keyhandeler(button.dataset.operator)
  if (button.dataset.action) keyhandeler(button.dataset.action)

}))

const updateexpersion = (char) => {
  expression += char;
  display(expression);
};

const handleOperator = (operator) => {
  if (expression == "0" || expression == "") return;
  if (operator == expression.at(-1)) return;
  if (expression.at(-1) == '.') {
    updateexpersion(`0${operator}`);
    return;
  }
  if (operator == "-" && currentnumber == "") {
    updateexpersion(operator);
    return;
  }
  if ("*/+-".includes(expression.at(-1))) {
    backspace();
  }
  updateexpersion(operator);
  currentnumber = "";
  flagDot = false;
}

const handledot = (dot) => {
  if (currentnumber == "") {
    currentnumber = `0${dot}`;
    updateexpersion(currentnumber);
    flagDot = true;
  }
  if (!flagDot) {
    currentnumber += dot;
    updateexpersion(dot);
    flagDot = true;
  }
}

const display = (str) => {
  expressionbox.textContent = str;
};

const calculate = () => {

  if ("*/+-".includes(expression.at(-1))) {
    answerbox.textContent = 0;
    return;
  }
  try {
    result = eval(expression);
    //sample expression= "9-0/0"=>NaN
    if (isNaN(result) || result === null)
      throw new Error("NoN or null");

  } catch (error) {
    result = "incorect expression!!"
  }
  finally {
    answerbox.textContent = result;
  }

};

const backspace = () => {
  expression = expression.slice(0, -1);
  display(expression)
};

const hasNumberCHAR = (str) => {

  for (const char of str) {
    if (char.codePointAt(0) >= 48 && char.codePointAt(0) <= 57)
      return true;
  }
}

document.addEventListener("keydown", (keyEvent) => {
  keyEvent.preventDefault();
  //console.log(keyEvent.key, keyEvent.key.codePointAt(0));
   keyhandeler(keyEvent.key);

})