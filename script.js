//create references to the buttons and display
const display = document.getElementById('input');
const allButtons = document.getElementById('all-buttons');
const buttonEquals = document.querySelector('.equals');
const outputDisplay = document.getElementById('output');


// Create a variable to store the numbers
let firstNumber = '';
let currentOperator = '';
let secondNumber = '';
let result = '';
let equalsPressCount = 0;
let maxDigitLength = 12;


//create an event listener on the container of the buttons
allButtons.addEventListener('click', function(event) {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('digits')) {
        const digit = clickedButton.textContent;
        if (currentOperator === '') {
            // If no operator has been set, append digits to the first number
            firstNumber += digit;
            console.log('firstNumber:', firstNumber);
        } else {
            // If an operator is set, append digits to the second number
            secondNumber += digit;
            console.log('secondNumber:', secondNumber);
        }
        updateDisplay();    
    } else if (clickedButton.classList.contains('operator')) {
        const operator = clickedButton.textContent;
        if (currentOperator === '') {
            // Set the operator if it's not already set
            currentOperator = operator;
        } else if (currentOperator != '' && secondNumber !='') {
            //perform calculation and set the result as firstNumber, clear the secondNumber.
            
            operate();
            firstNumber = result;
            secondNumber = '';
            currentOperator = operator;


            console.log('currentOperator:', currentOperator);
            console.log('firstNumber:', firstNumber);
            console.log('secondNumber:', secondNumber);
            
        } else {
            //replace the operator if it's already set
            currentOperator = operator;
        }
        updateDisplay(); 
        console.log('currentOperator:', currentOperator);
    } else if (clickedButton.classList.contains('equals')) {
        operate(); 
        equalsPressCount++; 
        console.log('equalsPressCount:', equalsPressCount);

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
        if (result !== '' && firstNumber !== '' && secondNumber !== '') {
            secondNumber = parseFloat(secondNumber * -1);
            updateDisplay();
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
        input.value = firstNumber + ' ' + currentOperator + ' ' + secondNumber ; // Display the numbers and operator if valid
    }  else {
            input.value = firstNumber; // Display only the numbers if the operator is not valid and equalsPressCount is 0
    }

    //for appending equals sign
    if (validOperators.includes(currentOperator) && 
        firstNumber !== '' &&
        secondNumber !== ''&&
        equalsPressCount >= 1) {
        input.value += '=';
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

// Execute operate fx when equals button is pressed
function operate() {
    
    switch (currentOperator) {
        case '+':
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case '-':
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case 'x':
        case '*':
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case '÷':
        case '/':
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
    }
    errorMessages();
    updateOutput();
    
}

function errorMessages() {
    if (firstNumber.length > maxDigitLength || secondNumber.length > maxDigitLength) {
        result = 'Digit Limit Exceeded!';
    }
    if (currentOperator === '/' && firstNumber === 0 || secondNumber === '0') {
        result = 'Cannot divide by 0, bruh!';
    }
    if (firstNumber === '' || secondNumber === '' || currentOperator === '') {
        result = 'Invalid Input!';
    }

}

function updateOutput() {
    if (typeof result === 'number') {
        // Update the bottom display with the rounded result
        const roundedResult = Math.round(result * 100) / 100;
        outputDisplay.textContent = roundedResult;
        console.log('result:', roundedResult);
    } else {
        // Display the string message
        outputDisplay.textContent = result;
        console.log('result:', result);
    }
}

//add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase(); // Convert to lowercase
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'control',
                       '+', '-', '*', '/', 'x', '÷', '=', 'enter', 'backspace', 'delete', '.'];

    if (validKeys.includes(key)) {
        const clickedButton = document.querySelector(`button[data-type="${key}"]`);
        if (clickedButton) {
            clickedButton.click();
        }
    }
});

//toggle pastel theme
function switchTheme() {
    let checkbox = document.getElementById('theme');
    let footer = document.querySelector('.footer');
    let slider = document.querySelector('.earthpastel');
    let calculator = document.querySelector('.interface-buttons');
    let calculatortop = document.querySelector('.display-output');
    let calculatortop2 = document.querySelector('.display');
    let buttons = document.querySelectorAll('.digits, .operator, .decimal, .equals, .clear, .clear-entry, .positive-negative', 'clear-entry', 'clear');

    if (checkbox.checked) {
        // Switch to pastel theme
        document.documentElement.style.setProperty('--background-color', '#fce1e4'); 
        document.documentElement.style.setProperty('--text-color', '#fce1e4');
        footer.classList.add('pastel');
        slider.classList.add('pastel');
        calculator.classList.add('pastel');
        calculatortop.classList.add('pastel');
        calculatortop2.classList.add('pastel');
        buttons.forEach(button => button.classList.add('pastel'));
    } else {
        // Switch to default theme
        document.documentElement.style.setProperty('--background-color', 'var(--brown)');
        document.documentElement.style.setProperty('--text-color', 'var(--white)');
        footer.classList.remove('pastel');
        slider.classList.remove('pastel');
        calculator.classList.remove('pastel');
        calculatortop.classList.remove('pastel');
        calculatortop2.classList.remove('pastel');
        buttons.forEach(button => button.classList.remove('pastel'));
    }
}
