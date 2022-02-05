//Global Variable where word will be stored
let wordToGuess = "";
let wordGuess = "";
const wrongLetter = [];
const wrongPos = [];
const correctLetter = [];
let attempt = 0;
async function main(){
    let wordToGuess = await readFromTxTFile();
    document.getElementById("demo").innerHTML = wordToGuess;
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

