
//create references to the buttons and display
const display = document.getElementById('input');
const allButtons = document.getElementById('all-buttons');

//create a function that populates the display when buttons clicked
allButtons.addEventListener('click', function(event) {
    const clickedButton = event.target;

    if(clickedButton.classList.contains('digits')) {
        const digit = clickedButton.textContent;
        addToDisplayDigit(digit);
    } else if (clickedButton.classList.contains('operator')) {
        const operator = clickedButton.textContent;
        addToDisplayOperator(operator);
    } else if (clickedButton.classList.contains('equals')) {
        const equals = clickedButton.textContent;
        addToDisplayEquals(equals);
    }
});

//function to add the buttons to the display
function addToDisplayDigit(digit) {
    if (display.value === "0") {
        //If it is '0', replace it with the clicked digit
        display.value = digit;
    } else {
        //Otherwise, append the digit to what is already on the display
        display.value += digit;
    } 
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

function addToDisplayOperator(operator) {
    // List of valid operators
    const validOperators = ['+', '-', 'x', '÷'];

    // Check if the display contains a valid operator
    if (validOperators.includes(display.value.charAt(display.value.length - 1))) {
        // Replace the existing operator with the new operator
        display.value = display.value.slice(0, -1) + operator;
    } else {
        // If no valid operator is present, append the new operator
        display.value += operator;
    }
}
//create 3 variables to store the 2 digits and an operator
let firstNumber = "";
let secondNumber = "";
let operator = "";



//create a function called operate that takes an operator and 2 numbers and then calls a function on the numbers
//display the result in the output display
