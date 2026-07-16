const expressionbox = document.getElementById("expression");
const answerbox = document.getElementById("answer");
let expression; let currentnumber; let lastoperator; let lastnumber; let flagDot;
let result = 0;
const clear = () => {
  expressionbox.textContent = "0";
  answerbox.textContent = "0";
  expression = "";
  currentnumber = "";
  lastoperator = "";
  lastnumber = "";
  flagDot = false;
  result = 0;
};
clear();
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", (event) => {
  event.stopPropagation();

  if (button.dataset.num) {
    if (currentnumber == "0") {
      currentnumber = "";
      backspace();
    }
    updateexpersion(button.dataset.num);
    currentnumber += button.dataset.num;
    calculate(lastoperator);
    return;
  }
  if (button.dataset.dot) {
    handledot(button.dataset.dot);
    return;
  }
  if (button.dataset.operator) {
    handleOperator(button.dataset.operator);
    return;
  }

  if (button.dataset.action) {
    handleaction(button.dataset.action);
    return;
  }


}))

const updateexpersion = (char) => {
  expression += char;
  display(expression);
};
const handleOperator = (operator) => {
  if (expression == "0") return;
  if (expression.at(-1) == '.') return;
  if(currentnumber=="-")return;
  if (operator == "-" && currentnumber == "") { 
    currentnumber="-";
    updateexpersion(operator);
    return;
  }
  if ("*,/,+,-".includes(expression.at(-1))) {
    backspace();
  }
  updateexpersion(operator);
  lastoperator = operator;
  lastnumber = result || currentnumber;
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
const handleaction = (action) => {
  switch (action) {
    case "calculate": calculate();
      break
    case "clear": clear();
      break
    /* case "backspace": backspace();
      break */
  }
};
const display = (str) => {
  expressionbox.textContent = str;
};

const calculate = (lastoperate) => {
  // try {
  switch (lastoperate) {
    case "*": result = parseFloat(lastnumber) * parseFloat(currentnumber);
      break
    case "/": result = parseFloat(lastnumber) / parseFloat(currentnumber);
      break
    case "+": result = parseFloat(lastnumber) + parseFloat(currentnumber);
      break
    case "-": result = parseFloat(lastnumber) - parseFloat(currentnumber);
      break
    default: lastnumber = currentnumber;
  }
  // } catch (error) {

  // }
  answerbox.textContent = result;
};
const backspace = () => {
  expression = expression.slice(0, -1);
  //calculate(lastoperator);
  display(expression)
};

const hasNumberCHAR = (str) => {
  for (const char of str) {
    if (char.codePointAt(0) >= 48 && char.codePointAt(0) <= 57)
      return true;
  }
}
document.addEventListener("keypress", (keyEvent) => {
  keyEvent.preventDefault();

  if (hasNumberCHAR(keyEvent.key)) {
    if (currentnumber == "0") {
      currentnumber = "";
      backspace();
    }
    updateexpersion(keyEvent.key);
    currentnumber += keyEvent.key;
    calculate(lastoperator);
    return;
  }
  if (keyEvent.key == '.') {
    handledot(keyEvent.key);
    return;
  }
  if (['*', '/', '+', '-'].includes(keyEvent.key)) {
    handleOperator(keyEvent.key);
  }

})

