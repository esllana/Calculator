
//create references to the buttons and display
const display = document.getElementById('input');
const allButtons = document.getElementById('all-buttons');

//create a function that populates the display when buttons clicked
allButtons.addEventListener('click', function(event) {
    if (event.target.classList.contains('digits')) {
        //get the digit from the button that was clicked
        const digit = event.target.textContent;
        //call the addToDisplay function with the digit
        addToDisplay(digit);
    }
});

allButtons.addEventListener('click', function(event) {
    if (event.target.classList.contains('operator')) {
        //get the operator from the button that was clicked
        const operator = event.target.textContent;
        //call the addToDisplay function with the operator
        addOperator(operator);
    }
});

//function to add a buttons to the display
function addToDisplay(digit) {
    if (display.value === "0") {
        //If it is '0', replace it with the clicked digit
        display.value = digit;
    } else {
        //Otherwise, append the digit to what is already on the display
        display.value += digit;
    }
}

function addOperator(operator) {
    if (display.value === "0") {
        //If it is '0', replace it with the clicked digit
        display.value = operator;
    } else {
        //Otherwise, append the digit to what is already on the display
        display.value += operator;
    }
}

//create 3 variables to store the 2 digits and an operator
let firstNumber = "";
let secondNumber = "";
let operator = "";



//create a function called operate that takes an operator and 2 numbers and then calls a function on the numbers
//display the result in the output display
