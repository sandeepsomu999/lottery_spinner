// 1. Deposit amouunt 
// 2. determine number of lines to bet on 
// 3. Collect a bet amount 
// 4. Spin the slot machine 
// 5. Check if the user won
// 6. Give the user earnings if they won
// 7. Play again/ amount depleted 

// function deposit() {

// }

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {
    
    const depositedAmount = prompt("Enter the amount to be deposited: ");
    const numberDepositAmount = parseFloat(depositedAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid deposit amount, try again.");
        deposit();
    }
    return numberDepositAmount;
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Please enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again!");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Please enter the betting amount per line: ");
        const betAmount = parseFloat(bet);

        if (isNaN(betAmount) || betAmount <= 0 || betAmount*lines> balance) {
            console.log("Invalid bet amount, please try again!");
        } else {
            return betAmount;
            // balance = balance - betAmount;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [[], [], []];
    for (i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols];
        for (j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.slice(randomIndex, 1);
        }
    }

    return reels;
 };
const reels = spin();
console.log(reels);
let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);