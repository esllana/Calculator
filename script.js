
//create references to the buttons and display
const display = document.getElementById('input');
const digitButtons = document.getElementById('all-buttons');

//create a function that populates the display when buttons clicked
digitButtons.addEventListener('click', function(event) {
    if (event.target.classList.contains('digits')) {
        const digit = event.target.textContent;
        addToDisplay(digit);
    }
});

function addToDisplay(digit) {
    if (display.value === "0") {
        display.value = digit;
    } else {
        display.value += digit;
    }
}

//create 3 variables to store the 2 digits and an operator
let firstNumber = "";
let secondNumber = "";
let operator = "";



//create a function called operate that takes an operator and 2 numbers and then calls a function on the numbers