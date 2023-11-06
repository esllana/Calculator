//create references to the buttons and display
const display = document.getElementById('input');
const allButtons = document.getElementById('all-buttons');

// Create a variable to store the numbers
let firstNumber = '';
let currentOperator = '';
let secondNumber = '';

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
        const equals = clickedButton.textContent;
        addToDisplayEquals(equals);
    } else if (clickedButton.classList.contains('clear')) {
        clear();
    } else if (clickedButton.classList.contains('clear-entry')) {
        clearEntry();
    }
});

// Function to update the display with the current numbers and operator
function updateDisplay() {
    // Define valid operators
    const validOperators = ['+', '-', '*', '/', 'x', '÷'];
    display.value = validOperators.includes(currentOperator)
    ? firstNumber + currentOperator + secondNumber  // Display the numbers and operator if valid
    : firstNumber; // Display only the numbers if the operator is not valid
}


function addToDisplayEquals(equals) {
    if (display.value === "0") {
        //If it is '0', replace it with the clicked digit
        display.value = equals;
    } else if (!display.value.includes(equals)){
        //Otherwise, append the digit to what is already on the display
        display.value += equals;
    } 
}
/* 
function addToDisplayOperator(operator) {
    // List of valid operators
    const validOperators = ['+', '-', 'x', '÷'];

    // Check if the display contains a valid operator
    if (firstNumber !== '' && validOperators.includes(display.value.charAt(display.value.length - 1))) {
        // Replace the existing operator with the new operator
        display.value = display.value.slice(0, -1) + operator;
    } else {
        // If no valid operator is present, append the new operator
        display.value += operator;
        operator = operator; // Store the operator
    }
    console.log('operator:', operator);
}*/

function clear() {
    // Clear all the variables
    firstNumber = '';
    currentOperator = '';
    secondNumber = '';

    // Clear the display
    display.value = '0';
}

//TODO Review this function
function clearEntry() {
    // If there's only one digit, set it to '0'
    if (display.value.length === 1) {
        display.value = '0';
        firstNumber = '';
        currentOperator = '';
        secondNumber = '';
    } else {
        // Remove the last character
        display.value = display.value.slice(0, -1);
        if (currentOperator === '') {
            // If no operator is set, remove the last digit from the first number
            firstNumber = firstNumber.slice(0, -1);
        } else {
            // If an operator is set, remove the last digit from the second number
            secondNumber = secondNumber.slice(0, -1);
        }
    }
}

//TODO Execute operate fx if an operator is already set
function operate(firstNumber, currentOperator, secondNumber) {
    if (currentOperator === '+') {
        return firstNumber + secondNumber;
    }
    
}
const additionResult = operate(firstNumber, currentOperator, secondNumber);
console.log('additionResult:', additionResult);



//add keyboard support

