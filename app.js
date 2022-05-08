const buttons = document.getElementsByClassName("button");
const screen = document.getElementById("screen");
const memorySection = document.getElementById("memory");
const backButtonText = "Back";
const clearButtonText = "Clear";

const numberSequence = Array();
const signSequence = Array();
let currentNumber = "";

Array.from(buttons).forEach(button => {
  button.addEventListener("click", () => {
    const buttonText = button.innerHTML;
    
    if (isButtonADigit(buttonText)) {
      currentNumber += buttonText;
    } else if (buttonText === backButtonText) {
      currentNumber = currentNumber.slice(0, -1);
    } else if (buttonText === clearButtonText) {
      currentNumber = "";
      numberSequence.splice(0, numberSequence.length);
      signSequence.splice(0, signSequence.length);
      clearMemory();
    } else {
      if (!currentNumber) {
        // No number inputted by the user.
        return;
      }

      numberSequence.push(parseInt(currentNumber));
      signSequence.push(buttonText);
      updateMemory(currentNumber, buttonText);
      currentNumber = "";

      if (buttonText === "=") {
        calculation = performCalculation(numberSequence, signSequence);
        updateMemory(calculation, "");
      }
    }

    screen.innerHTML = currentNumber;
  });
});

function isButtonADigit(text) {
  const nonDigits = ["+", "-", "/", "*", "=", backButtonText, clearButtonText];
  if (nonDigits.includes(text)) {
    return false;
  }
  return true;
}

function updateMemory(number, sign) {
  memorySection.innerHTML += `<ul>${number} ${sign}</ul>`;
}

function clearMemory() {
  memorySection.innerHTML = "";
}

function performCalculation(numberArray, signArray) {
  if (numberArray.length !== signArray.length) {
    // Ideally, this should never be reached.
    console.error("Arrays don't match.");
    console.log("numberArray", numberArray);
    console.log("signArray", signArray);
  }

  let calculation = numberArray[0];

  for (let i = 0; i < numberArray.length - 1; i ++) {
    if (signArray[i] === "+") {
      calculation += numberArray[i + 1];
    } else if (signArray[i] === "-") {
      calculation -= numberArray[i + 1];
    } else if (signArray[i] === "*") {
      calculation *= numberArray[i + 1];
    } else if (signArray[i] === "/") {
      calculation /= numberArray[i + 1];
    } 
  }
  return calculation;
}