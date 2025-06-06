const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const numberToGuess = Math.floor(Math.random() * 100) + 1
function easy() {
    console.log("Great! You have selected the Easy difficulty level.\nLet's start the game!");
    question(1,10);

}
function medium() {
    console.log("Great! You have selected the Medium difficulty level.\nLet's start the game!");
    question(1,10);

}
function hard() {
    console.log("Great! You have selected the Hard difficulty level.\nLet's start the game!");
    question(1,10);

}


function question(currentAttempt, maxAttempts) {
    rl.question(`Enter number (Attempt ${currentAttempt})`, (number)=>{
        if(number == numberToGuess){
            console.log(`Congratulations! You guessed the correct number in ${currentAttempt} attempts.`)
            rl.close()
            return;
        }else if(number < numberToGuess){
            console.log(`Incorrect! The number is greater than ${number}.`)
        }else if(number > numberToGuess){
            console.log(`Incorrect! The number is less than ${number}.`)
        }

        if(currentAttempt == maxAttempts){
            console.log(`Sorry! You've used all ${maxAttempts} attempts. The correct number was ${numberToGuess}.`)
            rl.close();
            return;
        }
        question(currentAttempt + 1, maxAttempts)
    })
}



function menu() {
    console.log("Welcome to the Number Guessing Game!\n I'm thinking of a number between 1 and 100.\n You have 5 chances to guess the correct number.\n");
    console.log("Please select the difficulty level.\n 1. Easy (10 chances) \n 2. Medium (5 chances) \n 3. Hard (3 chances) \n");

    rl.question("Please enter your choice: ", (input) => {

        if (input == 1) {
            easy();
        } else if (input == 2) {
            medium();
        } else if (input == 3) {
            hard();
        } else {
            console.log("Please select a number between 1 to 3");
            rl.close();
        }

    });

}

menu();