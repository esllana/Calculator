//create references to the buttons and display
const display = document.getElementById('input');
const allButtons = document.getElementById('all-buttons');
const buttonEquals = document.querySelector('.equals');

// Create a variable to store the numbers
let firstNumber = '';
let currentOperator = '';
let secondNumber = '';
let result = '';
let equalsPressCount = 0;


//create an event listener on the container of the buttons
allButtons.addEventListener('click', function(event) {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('digits')) {
        const digit = clickedButton.textContent;
        if (currentOperator === '') {
            // If no operator has been set, append digits to the first number
            firstNumber += digit;
        } else {
            // If an operator is set, append digits to the second number
            secondNumber += digit;
        }
        updateDisplay();
        console.log('firstNumber:', firstNumber);
        console.log('secondNumber:', secondNumber);
    } else if (clickedButton.classList.contains('operator')) {
        const operator = clickedButton.textContent;
        if (currentOperator === '') {
            // Set the operator if it's not already set
            currentOperator = operator;
        } else {
            // Replace the existing operator with the new operator
            currentOperator = operator;
        } 
        updateDisplay(); 
        console.log('currentOperator:', currentOperator);
    } else if (clickedButton.classList.contains('equals')) {
        operate(); 
        equalsPressCount++; 
        console.log('equalsPressCount:', equalsPressCount);
        //consecutive equals operation
        if (equalsPressCount >= 2) { 
            firstNumber = result;
            secondNumber = secondNumber;

            operate();
            
        } 
        updateDisplay(); 
    } else if (clickedButton.classList.contains('clear')) {
        clear();
    } else if (clickedButton.classList.contains('clear-entry')) {
        clearEntry();
    } else if (clickedButton.classList.contains('decimal')) {
        const decimal = clickedButton.textContent;
        if (currentOperator === '') {
            if (firstNumber.includes(decimal)) {
                // If the first number already includes a decimal, do nothing
                return;
            }
            // If no operator has been set, append decimal to the first number
            firstNumber += decimal;
        } else {
            if (secondNumber.includes(decimal)) {
                // If the second number already includes a decimal, do nothing
                return;
            }
            // If an operator is set, append decimal to the second number
            secondNumber += decimal;
        }
        updateDisplay();
    } else if (clickedButton.classList.contains('positive-negative')) {
        if (result !== '') {
            result = parseFloat(result * -1);
            const outputDisplay = document.getElementById('output');
            outputDisplay.textContent = result;
        } else if (currentOperator === '') {
            firstNumber = (firstNumber * -1).toString();
            updateDisplay();
            console.log('firstNumber:', firstNumber);
        } else {
            secondNumber = (secondNumber * -1).toString();
            updateDisplay();
            console.log('secondNumber:', secondNumber);
        }
    }
});


// Function to update the display with the current numbers and operator
function updateDisplay() {
    // Define valid operators
    const validOperators = ['+', '-', '*', '/', 'x', '÷'];

    if (validOperators.includes(currentOperator)) {
        input.value = firstNumber + currentOperator + secondNumber; // Display the numbers and operator if valid
    }  else {
            input.value = firstNumber; // Display only the numbers if the operator is not valid and equalsPressCount is 0
    }

    //for appending equals sign
    if (validOperators.includes(currentOperator) && 
        firstNumber !== '' &&
        secondNumber !== ''&&
        equalsPressCount >= 1) {
        
        input.value = firstNumber + currentOperator + secondNumber + '=';
    }
}

function clear() {
    // Clear all the variables
    firstNumber = '';
    currentOperator = '';
    secondNumber = '';
    result = '';
    equalsPressCount = 0;

    // Clear the display
    input.value = '0';
    output.value = ' ';
}

function clearEntry() {
    // If there's only one digit, set it to '0' and clear variables
    if (currentOperator === '') {
        // If no operator is set, remove the last digit from the first number
        firstNumber = '';
        updateDisplay();
    } else if (result !== '') {
        clear();
    } else if (secondNumber !== '') {
        secondNumber = '';
        updateDisplay();
    }  else {
        // Clear operator if operator is set and secondNumber empty
        currentOperator = '';
        updateDisplay();
    } 
}

//Execute operate fx when equals button is pressed
function operate() {
    if (currentOperator === '+') {
        result = parseFloat(firstNumber) + parseFloat(secondNumber);
    } else if (currentOperator === '-') {
        result = parseFloat(firstNumber) - parseFloat(secondNumber);
    } else if (currentOperator === 'x' || currentOperator === '*') {
        result = parseFloat(firstNumber) * parseFloat(secondNumber);
    } else if (currentOperator === '÷' || currentOperator === '/') {
        // Check if dividing by zero
        if (parseFloat(secondNumber) === 0) {
            result = 'Critical Error!';
        } else {
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
        }
    }

    // Update the bottom display
    const outputDisplay = document.getElementById('output');
    outputDisplay.textContent = result;
    console.log('result:', result);
}


    //TODO should be able to use several operations and get right answer (e.g. 12+7-5*3=42)
    //TODO should round answers with long decimals (e.g. 12.3 / 7.2 = 1.7)
    //TODO add error handling for invalid input
    //TODO add error handling for too many digits

// Repeat the previous operation with the result as the first and second numbers




//add keyboard support