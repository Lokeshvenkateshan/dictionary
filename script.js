const form = document.querySelector(".form");
const inputword=document.getElementById("inputword");
const titleword = document.getElementById("titleword");
const pos= document.querySelector(".pos");
const meaning=document.querySelector(".meaning");
const example=document.querySelector(".example");
const icon=document.getElementById("icon");
const searchbtn = document.getElementById("searchbtn");

searchbtn.addEventListener("click", async event =>{
    event.preventDefault();
    icon.style.display="block";
    const word = inputword.value;
    try{
        if(word){
            const data = await getdata(word);
            displaymeaning(data);
        } 
        else{
            throw new error("could not fetch data");
        }
    }
    catch(error){
        console.error(error);
        displayerror(error);
    }

})
async function getdata(word){
    const url =`https://api.dictionaryapi.dev/api/v2/entries/en/`;
    const response = await fetch(`${url}${word}`);
        if(!response.ok){
            throw new error("could not load the data");
        }
        return response.json();
}

icon.addEventListener("click",()=>{
    const utterance = new SpeechSynthesisUtterance(inputword.value);
    utterance.pitch =1;
    utterance.rate = 0.5;
    utterance.volume=2;
    speechSynthesis.speak(utterance);
})

function displaymeaning(data){
    const phonetics = data[0].phonetics[1].text;

    titleword.textContent=inputword.value;
    pos.textContent=`${data[0].meanings[0].partOfSpeech}${phonetics}`;
    meaning.textContent =data[0].meanings[0].definitions[0].definition;
    example.textContent=`"${data[0].meanings[0].definitions[0].example}"`;
}

function displayerror(error)
{
    meaning.textContent=error;
}
const loader = document.getElementById("loader");
const main = document.querySelector(".main");
window.addEventListener("load", ()=>{
    loader.style.display="none";
    main.style.display ="flex";
}) 