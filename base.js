//Global Variable where word will be stored
let wordToGuess = "";
let wordGuess = "";
const wrongLetter = [];
const wrongPos = [];
const correctLetter = [];
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
function wordCheck(){
    let intendedWord = pullWord();
}
//Function returns random number based on length of list
function randVal(lengthVal){
    return Math.floor(Math.random() * lengthVal)
}
function pullWord(){
    const letterList = document.getElementsByClassName("box").value;
    letterList.forEach(element => {
        wordGuess += element;
    });
    document.getElementById("demo").innerHTML = wordGuess;
}
function setboxVal(letter){
    if(wordGuess.length < 5 ){
        wordGuess = wordGuess + letter;
    }
    document.getElementById("demo").innerHTML = wordGuess;
}
function delCharWord(){
    wordGuess = wordGuess.slice(0,-1);
    document.getElementById("demo").innerHTML = wordGuess;
}
function enterKeyPress(){
    if(wordGuess.length < 5 ){
        return;
    }
    checkWord();
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