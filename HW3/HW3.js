var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var inputChar;
var newChar;
var newString;
var randomValue;
//var string=document.getElementById("input");




function getNewChar()
{
    randomValue = (Math.round(Math.random() * 100)) % 26;
    newChar = document.write(alphabet.charAt(randomValue));
}

function reflashString()    //add new char
{
    getNewChar();
    newString = newChar + newString;
}

function scanInputChar()
{
    if (inputChar == newString.charAt(newString.length))
    {
        newString = newString.substring(0, length);
    }
    else
    {
        reflashString();
    }
}

function showString()
{
    document.write(newString);
}

var body = document.body;
function goRocket(e)
{
    console.log(e.keyCode); //查鍵盤代碼
}
body.addEventListener('keydown', goRocket, false) //偵測按下按鍵的行為




//---main function---

for (var i = 0; i < 100; i++)
{
    setTimeout(reflashString, 400 * i);
}
scanInputChar();
showString();

document.addEventListener('keydown',function(word)
{
    inputChar.textContent += word.key;
})


