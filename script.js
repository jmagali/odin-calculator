// Create global variables
let numOne = "";
let numTwo = "";
let operation = null;
let containsNumber = false;
let containsOperator = false;
let expressionText = "";
let answerText = "";
let prevNumOne = "";
let prevNumTwo = "";
let prevOperation = null;
let prevExpressionText = "";

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

        if (answerText !== "") {
            answerText = numOne;
            updateResult();
        }
    }
    else {
        expressionText = expressionText.slice(0, numOne.length + 3);
        numTwo = switchSign(numTwo).toString();
        if (numTwo > 0)
            expressionText += numTwo;
        else 
            expressionText += `(${numTwo}`;
    }

    updateExpression ();
});

clearBtn.addEventListener("click", () => clear());

deleteBtn.addEventListener("click", () => deleteText());

equalsBtn.addEventListener("click", () => operate(numOne, numTwo));

window.addEventListener('keydown', takeKeyInputs);

// Expression Functions

function takeKeyInputs(e) {
    if (e.key >= 0 && e.key <= e || e.key === ".") {
        if (dotBtn.classList.contains("disabled-btn") && e.key === "." ) {
            return;
        }

        appendNumber(e.key);
    }
    if (e.key === "=" || e.key === "Enter") {
        if (equalsBtn.classList.contains("disabled-btn")) {
            return;
        }
        operate(numOne, numTwo);
    }
    if (e.key === "Backspace") {
        if (deleteBtn.classList.contains("disabled-btn")) {
            return;
        }
        deleteText();
    }
    if (e.key === "Escape") {
        clear();
    }
    if (e.key === "+" 
        || e.key === "-" 
        || e.key === "*"
        || e.key === "/") {
        
        if (!containsOperator && numOne !== "") {
            setOperator(e.key);
        }
    }
}

function updateExpression () {
    expression.innerText = expressionText;
}

function updateResult () {
    result.innerText = answerText;
}

function deleteText() {

    if (answerText !== "" && !containsOperator && prevExpressionText !== "") {
        numOne = prevNumOne;
        numTwo = prevNumTwo;
        operation = prevOperation;
        expressionText = prevExpressionText;
        answerText = "";

        containsOperator = operation !== null;
        containsNumber = numOne !== "";

        updateExpression();
        updateResult();
        reactivateButtons();
        deactivateButtons();
    }

    if (expressionText === "" && numOne !== "") {
        expressionText = numOne;
        containsNumber = true;
        updateExpression();
    }

    if (numTwo.startsWith(`-`)) {
        if (numTwo.length === 2) {
            expressionText = expressionText.slice(0, -3);
            numTwo = "";
            deactivateButtons();
            updateExpression ();
            return;
        }

        expressionText = expressionText.slice(0, -1);
        numTwo = numTwo.slice(0, -1);
        reactivateButtons();
        updateExpression ();
        return;
    }

    if (numOne.startsWith(`-`)) {
        if (numOne.length === 2) {
            expressionText = "";
            numTwo = "";
            deactivateButtons();
            updateExpression ();
            return;
        }

        expressionText = expressionText.slice(0, -1);
        numOne = numOne.slice(0, -1);
        reactivateButtons();
        deactivateButtons();
        updateExpression ();
        return;
    }

    if (containsOperator && numTwo.length > 0) {
        expressionText = expressionText.slice(0, -1);
        numTwo = numTwo.slice(0, -1);
        reactivateButtons();
        deactivateButtons();
        updateExpression ();
        return;
    }

    if (containsOperator && numTwo === "") {
        expressionText = expressionText.slice(0, -3); 
        operation = null;
        containsOperator = false;
        reactivateButtons();
        updateExpression ();
        return;
    }

    if (!containsOperator && numOne.length > 0) {
        expressionText = expressionText.slice(0, -1);
        numOne = numOne.slice(0, -1);
        if (numOne === "") containsNumber = false;
        reactivateButtons();
        deactivateButtons();
        updateExpression ();
        return;
    }
}

function clear () {
    numOne = "";
    numTwo = "";
    operation = null;
    expressionText = "";
    containsNumber = false;
    containsOperator = false;
    answerText = "";

    updateExpression ();
    updateResult ();

    reactivateButtons();
    deactivateButtons();
}

function setOperator (operator) {
    if (answerText !== "" && operation === null) {
        expressionText = answerText;
        numOne = answerText.toString();
        answerText = "";
        updateResult();
    }

    operation = operator;
    containsOperator = true;
    expressionText += ` ${operation} `;

    updateExpression ();

    reactivateButtons();
    deactivateButtons();
}

function deactivateButtons() {

    if ((containsOperator === true && numTwo === "") || containsNumber === false) {
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
        || numTwo === ""
        || answerText !== "") {       
        equalsBtn.disabled = true;
        equalsBtn.classList.add("disabled-btn");
    }

    updateResult();
}

function reactivateButtons() {
    if (containsNumber === true && containsOperator === false && numOne !== "") {
        if (!numOne.includes(".") ) {
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
            switchBtn.disabled = false;
            switchBtn.classList.remove("disabled-btn");    
    }
}

function appendNumber(number) {

    if (answerText !== "" && !containsOperator && numOne !== "") {
        expressionText = "";
        answerText = "";
        numOne = "";
        numTwo = "";
        containsNumber = false;
        operation = null;
        containsOperator = false;

        updateResult();
        updateExpression();
    }

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

    deactivateButtons();
    reactivateButtons();

    if (number === ".") {
        deactivateButtons()
    }

    updateExpression ();
}

// Mathematical Functions

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (+b === 0) {
        return "Error! Cannot divide by 0!";
    }

    return a / b;
}

function switchSign(num) {
    return num * -1;
}

function operate (a, b) {

    prevNumOne = numOne;
    prevNumTwo = numTwo;
    prevOperation = operation;
    prevExpressionText = expressionText;

    switch (operator) {
        case "+":
            answerText = add(a, b);
            break;
        case "-":
            answerText = subtract(a, b);
            break;
        case "x":
        case "*":
            operator = "x";
            answerText = multiply(a,b);
            break;
        case "÷": 
        case "/":
            operator = "÷";
            answerText = divide(a, b);
            break;
    }

    updateResult ();

    if (!isNaN(answerText)) {
        numOne = answerText.toString();
        operation = null;
        numTwo = "";
        containsNumber = true;
        containsOperator = false;
    }
    else {
        deactivateButtons();
        return;
    }

    reactivateButtons();
    deactivateButtons();
}

// Beginning Function Calls
deactivateButtons()