var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var randomValue;
var newChar;

function getNewChar()
{
    randomValue = (Math.round(Math.random() * 100)) % 26;
    newChar = alphabet.charAt(randomValue);
}

function reflashString()    //add new char
{
    getNewChar();
    output.textContent = newChar + output.textContent;
}

//---main function---

for (let i = 0; i < 100; i++)
{
    setTimeout(reflashString, 400 * i);
}

document.addEventListener('keydown',function(word)
{
    input.textContent += word.key;
    if(output.textContent.slice(-1)==word.key)
    {
        output.textContent = output.textContent.slice(0, -1);
    }
    else
    {
        reflashString();
    }
})