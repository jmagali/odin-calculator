// Create global variables
let numOne = "";
let numTwo = "";
let operation = null;
let containsNumber = false;
let containsOperator = false;
let expressionText = "";
let answerText = "";

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
    if (numTwo === "") {
        expressionText = "";
        numOne = switchSign(numOne).toString();
        expressionText += numOne;
    }
    else {
        expressionText = expressionText.slice(0, numOne.length + 3);
        numTwo = switchSign(numTwo).toString();
        if (numTwo > 0)
            expressionText += numTwo;
        else 
            expressionText += `(${numTwo}`;
    }
});

clearBtn.addEventListener("click", () => clear());

deleteBtn.addEventListener("click", () => deleteText());

// Expression Functions

function deleteText() {

    if (numTwo.startsWith(`-`)) {
        if (numTwo.length === 2) {
            expressionText = expressionText.slice(0, -3);
            numTwo = "";
            deactivateButtons();
            return;
        }

        expressionText = expressionText.slice(0, -1);
        numTwo = numTwo.slice(0, -1);
        reactivateButtons();
        return;
    }

    if (containsOperator && numTwo.length > 0) {
        expressionText = expressionText.slice(0, -1);
        numTwo = numTwo.slice(0, -1);
        reactivateButtons();
        return;
    }

    if (containsOperator && numTwo === "") {
        expressionText = expressionText.slice(0, -3); 
        operation = null;
        containsOperator = false;
        reactivateButtons();
        return;
    }

    if (!containsOperator && numOne.length > 0) {
        expressionText = expressionText.slice(0, -1);
        numOne = numOne.slice(0, -1);
        if (numOne === "") containsNumber = false;
        reactivateButtons();
        deactivateButtons();
        return;
    }

    return;
}

function clear () {
    numOne = "";
    numTwo = "";
    operation = null;
}

function setOperator (operator) {
    operation = operator;
    containsOperator = true;
    expressionText += ` ${operation} `;

    reactivateButtons();
    deactivateButtons();
}

function deactivateButtons() {

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

    if (expressionText === "") {
        deleteBtn.disabled = true;
        deleteBtn.classList.add("disabled-btn");
    }

    if (containsNumber === false 
        || containsOperator === false
        || numTwo === "") {       
        equalsBtn.disabled = true;
        equalsBtn.classList.add("disabled-btn");
    }
}

function reactivateButtons() {
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
        && numTwo.includes(".") === false
        && numTwo !== "") {
        dotBtn.disabled = false;
        dotBtn.classList.remove("disabled-btn");
    }

    if (expressionText !== "") {
        deleteBtn.disabled = false;
        deleteBtn.classList.remove("disabled-btn");
    }

    if (containsNumber === true 
        && containsOperator === true
        && numTwo !== "") {
            equalsBtn.disabled = false;
            equalsBtn.classList.remove("disabled-btn");    
        }
}

function appendNumber(number) {

    if (containsOperator === false && numTwo === "") {
        numOne += number;
        expressionText += number;
        containsNumber = true;
        reactivateButtons();
    }

    if (containsOperator === true && numOne !== "") {
        numTwo += number;
        expressionText += number;
        containsNumber = true;
        reactivateButtons();
    }

    deactivateButtons()

    if (number === ".") {
        deactivateButtons()
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
deactivateButtons()