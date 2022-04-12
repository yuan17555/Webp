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
    //showPicture();
    output1.textContent = newChar + output1.textContent;

    getNewChar();
    //showPicture();
    output2.textContent = newChar + output2.textContent;

    getNewChar();
    //showPicture();
    output3.textContent = newChar + output3.textContent;

    getNewChar();
    //showPicture();
    output4.textContent = newChar + output4.textContent;

    getNewChar();
    //showPicture();
    output5.textContent = newChar + output5.textContent;

    getNewChar();
    //showPicture();
    output6.textContent = newChar + output6.textContent;
}

function showPicture()
{
    switch (newChar) {
        case 'A':
            document.write('<img src="A.png">');
            break;
        case 'B':
            document.write('<img src="B.png">');
            break;
        case 'C':
            document.write('<img src="C.png">');
            break;
        case 'D':
            document.write('<img src="D.png">');
            break;
        case 'E':
            document.write('<img src="E.png">');
            break;
        case 'F':
            document.write('<img src="F.png">');
            break;
        case 'G':
            document.write('<img src="G.png">');
            break;
        case 'H':
            document.write('<img src="H.png">');
            break;
        case 'I':
            document.write('<img src="I.png">');
            break;
        case 'J':
            document.write('<img src="J.png">');
            break;
        case 'K':
            document.write('<img src="K.png">');
            break;
        case 'L':
            document.write('<img src="L.png">');
            break;
        case 'M':
            document.write('<img src="M.png">');
            break;
        case 'N':
            document.write('<img src="N.png">');
            break;
        case 'O':
            document.write('<img src="O.png">');
            break;
        case 'P':
            document.write('<img src="P.png">');
            break;
        case 'Q':
            document.write('<img src="Q.png">');
            break;
        case 'R':
            document.write('<img src="R.png">');
            break;
        case 'S':
            document.write('<img src="S.png">');
            break;
        case 'T':
            document.write('<img src="T.png">');
            break;
        case 'U':
            document.write('<img src="U.png">');
            break;
        case 'V':
            document.write('<img src="V.png">');
            break;
        case 'W':
            document.write('<img src="W.png">');
            break;
        case 'X':
            document.write('<img src="X.png">');
            break;
        case 'Y':
            document.write('<img src="Y.png">');
            break;
        case 'Z':
            document.write('<img src="Z.png">');
            break;
        
        default:
            break;
    }
}

//---main function---

for (var i = 0; i < 1000; i++)
{
    setTimeout(reflashString, 5000 * i);
}

document.addEventListener('keydown',function(word){
    input.textContent += word.key;
    if(output1.textContent.slice(-1)==word.key)
    {
        output1.textContent = output1.textContent.slice(0, -1);
    }
    else if(output2.textContent.slice(-1)==word.key)
    {
        output2.textContent = output2.textContent.slice(0, -1);
    }
    else if(output3.textContent.slice(-1)==word.key)
    {
        output3.textContent = output3.textContent.slice(0, -1);
    }
    else if(output4.textContent.slice(-1)==word.key)
    {
        output4.textContent = output4.textContent.slice(0, -1);
    }
    else if(output5.textContent.slice(-1)==word.key)
    {
        output5.textContent = output5.textContent.slice(0, -1);
    }
    else if(output6.textContent.slice(-1)==word.key)
    {
        output6.textContent = output6.textContent.slice(0, -1);
    }
    else
    {
        reflashString();
    }
})

/*
$(function() {
    input.textContent += word.key;
    $("#input").keydown(function () {
        input.textContent += word.key;
        if(output1.textContent.slice(-1)==word.key)
        {
            output1.textContent = output1.textContent.slice(0, -1);
        }
        else if(output2.textContent.slice(-1)==word.key)
        {
            output2.textContent = output2.textContent.slice(0, -1);
        }
        else if(output3.textContent.slice(-1)==word.key)
        {
            output3.textContent = output3.textContent.slice(0, -1);
        }
        else if(output4.textContent.slice(-1)==word.key)
        {
            output4.textContent = output4.textContent.slice(0, -1);
        }
        else if(output5.textContent.slice(-1)==word.key)
        {
            output5.textContent = output5.textContent.slice(0, -1);
        }
        else if(output6.textContent.slice(-1)==word.key)
        {
            output6.textContent = output6.textContent.slice(0, -1);
        }
        else
        {
            reflashString();
        }
    });
});
*/