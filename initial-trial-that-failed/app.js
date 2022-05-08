const digits = document.getElementsByClassName("digit");
const signs = document.getElementsByClassName("sign");
const screen = document.getElementById("screen");
const clearButton = document.getElementById("clear");

const sequence = Array();
let number = "";
let currentSign = null;
let currentSignElement = null;
let doesScreenHaveCalculatedValue = false;
let previousSign = null;

clearButton.addEventListener("click", () => {
  currentSign = null;
  previousSign = null;

  if (currentSignElement) {
    currentSignElement.classList.remove("active-calculation");
    currentSignElement = null;
  }
  
  screen.innerHTML = "";
  sequence.splice(0, sequence.length);
});

Array.from(digits).forEach(digitElement => {
  digitElement.addEventListener("click", () => {
    if (doesScreenHaveCalculatedValue) {
      doesScreenHaveCalculatedValue = false;
      screen.innerHTML = "";
    }

    if (currentSignElement) {
      currentSignElement.classList.remove("active-calculation");
    }

    screen.innerHTML += digitElement.innerHTML;
  });
});

Array.from(signs).forEach(signElement => {
  if (signElement.id === "clear") {
    return;
  }

  signElement.addEventListener("click", () => {
    if (currentSignElement) {
      currentSignElement.classList.remove("active-calculation");
    }

    currentSignElement = signElement;
    const sign = signElement.innerHTML;

    if (sign !== "=") {
      signElement.classList.add("active-calculation");
      previousSign = sign;
    }

    const currentNumber = parseInt(screen.innerHTML);

    if (sequence.length === 0) {
      sequence.push(currentNumber);
      screen.innerHTML = "";
      return;
    }

    if (sign === "+") {
      sequence.push(sequence[sequence.length - 1] + currentNumber);
      screen.innerHTML = sequence[sequence.length - 1];
      doesScreenHaveCalculatedValue = true;
      return;
    } else if (sign === "÷") {
      sequence.push(sequence[sequence.length - 1] / currentNumber);
      screen.innerHTML = sequence[sequence.length - 1];
      doesScreenHaveCalculatedValue = true;
      return;
    } else if (sign === "×") {
      sequence.push(sequence[sequence.length - 1] * currentNumber);
      screen.innerHTML = sequence[sequence.length - 1];
      doesScreenHaveCalculatedValue = true;
      return;
    } else if (sign === "−") {
      sequence.push(sequence[sequence.length - 1] - currentNumber);
      screen.innerHTML = sequence[sequence.length - 1];
      doesScreenHaveCalculatedValue = true;
      return;
    }

    if (sign === "=") {
      if (previousSign === "+") {
        sequence.push(sequence[sequence.length - 1] + currentNumber);
        screen.innerHTML = sequence[sequence.length - 1];
        doesScreenHaveCalculatedValue = true;
      } else if (previousSign === "÷") {
        sequence.push(sequence[sequence.length - 1] / currentNumber);
        screen.innerHTML = sequence[sequence.length - 1];
        doesScreenHaveCalculatedValue = true;
      } else if (previousSign === "×") {
        sequence.push(sequence[sequence.length - 1] * currentNumber);
        screen.innerHTML = sequence[sequence.length - 1];
        doesScreenHaveCalculatedValue = true;
      } else if (previousSign === "−") {
        sequence.push(sequence[sequence.length - 1] - currentNumber);
        screen.innerHTML = sequence[sequence.length - 1];
        doesScreenHaveCalculatedValue = true;
      }

      previousSign = null;
      console.log(sequence);
      currentSignElement = null;
      screen.innerHTML = sequence[sequence.length - 1];
      doesScreenHaveCalculatedValue = true;
    }
  });
});

