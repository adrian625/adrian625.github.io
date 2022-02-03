//Global Variable where word will be stored
let wordToGuess;
let wordGuess;
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
    wordToGuess = splitData[randVal(splitData.length)];
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
    wordGuess += letter;
}