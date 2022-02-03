//Global Variable where word will be stored
let wordToGuess = "";
//test function
function test(){
    document.getElementById("demo").innerHTML = "Hello JavaScript";
}
//Function that reads what word to guess
async function readFromTxTFile(){
    //reads text file
    const response = await fetch('fileTest.txt');
    //convert to string
    var data = await response.text();
    const splitData = data.toLowerCase.split("\n");
    wordToGuess = splitData[randVal(splitData.length)];
    document.getElementById("demo").innerHTML = wordToGuess;
}
//Function returns random number based on length of list
function randVal(lengthVal){
    return Math.floor(Math.random() * lengthVal)
}