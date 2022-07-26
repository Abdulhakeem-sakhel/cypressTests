export {generateRandomSentence,generateRandomWord};

function generateRandomWord(length) {
    let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for(let ii=0; ii<length; ii++){
        string += chars[Math.floor(Math.random() * chars.length)];
}
    return string;
}
//genrate a random sentence with number of words as parameter
function generateRandomSentence(wordsCount)
{
    let str='';
    for (let i=0;i<wordsCount;i++)
    {
        str += generateRandomWord(4)+" "
    }
    return str.trim();
}
