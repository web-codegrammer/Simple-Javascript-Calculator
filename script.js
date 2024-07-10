// Function to get the history element
function getHistoryElement() {
  return document.getElementById("history-value");
}

// Function to print history to the UI
function printHistory(num) {
  getHistoryElement().innerText = num;
}

// Function to get the output element's text
function getOutputText() {
  return document.getElementById("output-value").innerText;
}

// Function to print output to the UI
function printOutput(num) {
  document.getElementById("output-value").innerText = num;
}

// Array of valid operators
const operators = ["%", "/", "+", "-", "*"];

// Flag to track calculation state
let calculationPerformed = false;

// Get all elements with class "number"
const numberButtons = document.getElementsByClassName("number");

// Add event listeners to all number buttons
for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", function () {
    const buttonId = this.id;
    let output = getOutputText();

    // Handling clear button
    if (buttonId === "clear") {
      printHistory("");
      printOutput("");
    } 
    // Handling backspace button
    else if (buttonId === "backspace") {
      if (output) {
        output = output.substring(0, output.length - 1);
        printOutput(output);
      }
    } 
    // Handling equals button
    else if (buttonId === "=") {
      try {
        if (output === "NaN" || output === "" || calculationPerformed) {
          calculationPerformed = false;
          printOutput("");
          printHistory("");
        } else {
          let result = eval(output);
          if (result === undefined) {
            result = "NaN";
            output = "";
          }
          calculationPerformed = true;
          printOutput(result);
          printHistory(output);
        }
      } catch (error) {
        result = "NaN";
        output = "";
        calculationPerformed = true;
        printOutput(result);
        printHistory(output);
      }
    } 
    // Handling operator buttons and numbers
    else {
      if (output.length === 0 && operators.includes(buttonId)) {
        printOutput("");
        printHistory("");
        calculationPerformed = false;
      } else {
        if (calculationPerformed || output === "NaN") {
          if (!operators.includes(buttonId)) {
            output = buttonId;
            printHistory("");
          } else {
            output += buttonId;
          }
          calculationPerformed = false;
        } else {
          output += buttonId;
        }
        printOutput(output);
      }
    }
  });
}
