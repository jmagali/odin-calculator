// Create global variables
let numOne = "";
let numTwo = "";
let operation = null;
let containsNumber = false;
let containsOperator = false;

// Get all elements
const expression = document.getElementById("expression");
const result = document.getElementById("result");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const numbers = Array.from(document.getElementsByClassName("number"));
const operators = Array.from(document.getElementsByClassName("operator"));
const equalsBtn = document.getElementById("equals");

// Events
numbers.forEach( function (button) {
    button.addEventListener("click", () => appendNumber(button.textContent));
})
operators.forEach (function (button) {
    button.addEventListener("click", () => setOperator(button.textContent));
})

// Expression Functions

function setOperator (operator) {
    operation = operator;
    containsOperator = true;

    deactivateButtons(containsNumber, containsOperator);
}

function deactivateButtons(containsNumber, containsOperator) {
    if (containsNumber === false || containsOperator === false) {
        operators.forEach (function (button) {
            button.disabled = true;
            button.style.backgroundColor = "#9B9AAE";
        })
    }
}

function reactivateButtons(containsNumber, containsOperator) {
    if (containsNumber === true && containsOperator === false) {
        operators.forEach (function (button) {
            button.disabled = false;
            button.style.backgroundColor = "#918FBF";
        })
    }
}

function appendNumber(number) {
    if (containsOperator === false && numTwo === "") {
        numOne += number;
        containsNumber = true;
        reactivateButtons(containsNumber, containsOperator);
    }

    if (containsOperator === true && numOne !== "") {
        numTwo += number;
    }
}

// Mathematical Functions

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error! Cannot divide by 0!";
    }

    return a / b;
}

function modulus(a, b) {
    return a % b;
}

function operate (a, b, operator) {
    let answer;

    switch (operator) {
        case "+":
            answer = add(a, b);
            break;
        case "-":
            answer = subtract(a, b);
            break;
        case "x":
            answer = multiply(a,b);
            break;
        case "÷": 
            answer = divide(a, b);
            break;
        case "%":
            answer = modulus(a, b);
            break;
    }

    return answer;
}

// Beginning Function Calls
deactivateButtons(containsNumber, containsOperator)