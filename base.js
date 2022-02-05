//Global Variable where word will be stored
let wordToGuess = "";
let wordGuess = "";
const wrongLetter = [];
const wrongPos = [];
const correctLetter = [];
let attempt = 0;
async function main(){
    let squirdle = await readFromTxTFile();
}
//Function that reads what word to guess
async function readFromTxTFile(){
    //reads text file
    const response = await fetch('https://adrian625.github.io/fileTest.txt');
    //convert to string
    var data = await response.text();
    const splitData = data.toLowerCase().split("\n");
    wordToGuess = splitData[randVal(splitData.length)].toUpperCase();
    return wordToGuess;
}
//Function returns random number based on length of list
function randVal(lengthVal){
    return Math.floor(Math.random() * lengthVal)
}
function setboxVal(letter){
    if(wordGuess.length < 5 ){
        wordGuess = wordGuess + letter;
        updateBoxWord(letter);
        updateDispWord();
    }

}
function delCharWord(){
    wordGuess = wordGuess.slice(0,-1);
    updateDispWord();
}
function updateBoxWord(letter){
    let idGet = attempt.toString() + (wordGuess.length - 1).toString();
    document.getElementById("testOut").innerHTML = idGet;
    document.getElementById(idGet).innerHTML = letter;
}
function enterKeyPress(){
    if(wordGuess.length < 5 ){
        return;
    }
    checkWord();
    if (correctLetter.length == 5) {
        //Add Win Function
    }
    attempt += 1;
    attemptCheck();
    updateLetterStatus();
    clearListVal()
}
function checkWord(){
    for (let index = 0; index < wordGuess.length; index++) {
        if(wordGuess.charAt(index) == wordToGuess.charAt(index)){
            correctLetter.push(wordGuess.charAt(index));
        }
        else if (wordToGuess.includes(wordGuess.charAt(index))){
            wrongPos.push(wordGuess.charAt(index))
        }
        else{
            wrongLetter.push(wordGuess.charAt(index))
        }
    }
    document.getElementById("demo").innerHTML = correctLetter.join('');
}
function clearListVal(){
    while(correctLetter.length > 0) {
        correctLetter.pop();
    }
    while(wrongPos.length > 0) {
        wrongPos.pop();
    }
    while(wrongLetter.length > 0) {
        wrongLetter.pop();
    }
}
function attemptCheck(){

}
function updateDispWord(){
    document.getElementById("demo").innerHTML = wordGuess;
}
function updateLetterStatus(){
    updateCorrectLetters();
    updateWrongPosLetters();
    updateWrongLetters();
    wordGuess = "";
}
function updateCorrectLetters(){
    //To Do: Change css when letter is correct
    correctLetter.forEach(element => {
        document.getElementById(element).style.backgroundColor = "green"
    });
}
function updateWrongPosLetters(){
    //To Do: Change css when letter is correct but in wrong position
    wrongPos.forEach(element => {
        document.getElementById(element).style.backgroundColor = "blue"
    });
}
function updateWrongLetters(){
    //To Do: Change css when letter is wrong
    wrongLetter.forEach(element => {
        document.getElementById(element).style.backgroundColor = "gray"
    });
}



const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container')
const squirdle = 'SUPER'
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Enter',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<'
]
const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === '<<') {
        deleteLetter()
        return
    }
    if (letter === 'Enter'){
        checkRow()
        return
    }
    addLetter(letter)
}
keys.forEach(key => {
    const buttonELement = document.createElement('button')
    buttonELement.textContent = key
    buttonELement.setAttribute('id', key)
    buttonELement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonELement)
})

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) =>{
       const tileElement = document.createElement('div')
       tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
       tileElement.classList.add('tile')
       rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
});

let currentRow = 0
let currentTile = 0
let isGameOver = false

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log('guessRows', guessRows)
    }
   
}

const deleteLetter = () => {
    if (currentTile > 0){
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentTile > 4) {
       
       console.log('guess is ' + guess, 'squirdle is ' + squirdle)
       flipTile()
       if (squirdle === guess) {
           showMessage('Good')
           isGameOver= true
           return
       } else {
           if (currentRow >= 5) {
               isGameOver = false
               return
           }
           if (currentRow <5){
               currentRow++
               currentTile = 0
           }
       }
    }
}

const showMessage = (message) => {
   const messageElement = document.createElement('p')
   messageElement.textContent = message
   messageDisplay.append(messageElement)
   setTimeout(() => messageDisplay.removeChild(messageElement, 2000))
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow). childNodes
    let checkSquirdle = squirdle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'orange-overlay'})
    })

      guess.forEach((guess, index) => {
          if (guess.letter == squirdle[index]){
              guess.color = 'crystal-overlay'
              checkSquirdle = checkSquirdle.replace(guess.letter, '')
          }
      })
       
      guess.forEach(guess =>{
          if (checkSquirdle.includes(guess.letter)) {
              guess.color = 'yellow-overlay'
              checkSquirdle = checkSquirdle.replace(guess.letter, '')
          }
      })






    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')

        setTimeout(() => {
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
            tile.classList.add('flip')
            if (dataLetter == squirdle[index]) {
                tile.classList.add('crystal-overlay')
                addColorToKey(dataLetter, 'crystal-overlay')
            } else if (squirdle.includes(dataLetter)){
                tile.classList.add('yellow-overlay')
                addColorToKey(dataLetter, 'yellow-overlay')
            } else {
                tile.classList.add('orange-overlay')
                addColorToKey.add(dataLetter, 'orange-overlay')
            }
        }, 500 * index)
    })
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}