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
        //TODO add toggle for positive/negative
        if (currentOperator === '') {
            firstNumber = (firstNumber * -1).toString();
        } else {
            secondNumber = (secondNumber * -1).toString();
        }
        updateDisplay();
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

function clear() {
    // Clear all the variables
    firstNumber = '';
    currentOperator = '';
    secondNumber = '';

    // Clear the display
    display.value = '0';
}

function clearEntry() {
    // If there's only one digit, set it to '0' and clear variables
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
            // empty the operator variable when secondNumber is empty
            if (secondNumber.length === 0) {
                currentOperator = '';
            }
            // If an operator is set, remove the last digit from the second number
            secondNumber = secondNumber.slice(0, -1);
        } 
    }
}

//TODO Execute operate fx when equals button is pressed
function operate(firstNumber, currentOperator, secondNumber) {
    if (currentOperator === '+') {
        return firstNumber + secondNumber;
    }
    
}
const additionResult = operate(firstNumber, currentOperator, secondNumber);
console.log('additionResult:', additionResult);



//add keyboard support

