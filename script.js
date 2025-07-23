// Create global variables
let numOne, numTwo, operation;

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
        case "/": 
            answer = divide(a, b);
            break;
        case "%":
            answer = modulus(a, b);
            break;
    }

    return answer;
}