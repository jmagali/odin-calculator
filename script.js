// Create global variables
let numOne = "";
let numTwo = "";
let operation = null;
let containsNumber = false;
let containsOperator = false;
let expressionText = "";

// Get all elements
const expression = document.getElementById("expression");
const result = document.getElementById("result");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const numbers = Array.from(document.getElementsByClassName("number"));
const operators = Array.from(document.getElementsByClassName("operator"));
const equalsBtn = document.getElementById("equals");
const switchBtn = document.getElementById("switch");
const dotBtn = document.getElementById("dot");

// Events
numbers.forEach( function (button) {
    button.addEventListener("click", () => appendNumber(button.textContent));
})
operators.forEach (function (button) {
    button.addEventListener("click", () => setOperator(button.textContent));
})
switchBtn.addEventListener("click", function () {
    if (numTwo === "")
        numOne = switchSign(numOne).toString();
    else
        numTwo = switchSign(numTwo).toString();
});
clearBtn.addEventListener("click", () => clear());

// Expression Functions

function clear () {
    numOne = "";
    numTwo = "";
    operation = null;
}

function setOperator (operator) {
    operation = operator;
    containsOperator = true;

    deactivateButtons(containsNumber, containsOperator);
}

function deactivateButtons(containsNumber, containsOperator) {

    if (containsOperator === true || containsNumber === false) {
        switchBtn.disabled = true;
        switchBtn.classList.add("disabled-btn");

        operators.forEach (function (button) {
            button.disabled = true;
            button.classList.add("disabled-btn");
        })
    }

    if (numOne !== "" && numTwo !== "" && containsOperator === true) {
        operators.forEach (function (button) {
            button.disabled = true;
            button.classList.add("disabled-btn");
        });
    }

    if ((numOne.includes(".") && containsOperator === false)
        || (numTwo.includes(".") && containsOperator === true)
        || numOne === ""
        || (numOne !== "" && containsOperator === true && numTwo === "")
    ) {
        dotBtn.disabled = true;
        dotBtn.classList.add("disabled-btn");
    }
}

function reactivateButtons(containsNumber, containsOperator) {
    if (containsNumber === true && containsOperator === false) {
        if (!numOne.includes(".") && numOne !== "") {
            dotBtn.disabled = false;
            dotBtn.classList.remove("disabled-btn");
        }

        switchBtn.disabled = false;
        switchBtn.classList.remove("disabled-btn");

        operators.forEach (function (button) {
            button.disabled = false;
            button.classList.remove("disabled-btn");
        })
    }

    if (containsOperator === true 
        && (!numTwo.includes(".")) 
        && numTwo !== "") {
        switchBtn.disabled = false;
        switchBtn.classList.remove("disabled-btn");
    }
}

function appendNumber(number) {

    deactivateButtons(containsNumber, containsOperator)

    if (containsOperator === false && numTwo === "") {
        numOne += number;
        containsNumber = true;
        reactivateButtons(containsNumber, containsOperator);
    }

    if (containsOperator === true && numOne !== "") {
        numTwo += number;
        reactivateButtons(containsNumber, containsOperator);
    }

    if (number === ".") {
        deactivateButtons(containsNumber, containsOperator)
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

function switchSign(num) {
    return num * -1;
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
    }

    return answer;
}

// Beginning Function Calls
deactivateButtons(containsNumber, containsOperator)