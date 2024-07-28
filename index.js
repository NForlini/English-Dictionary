const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("infoText");
const meaningContEl = document.getElementById("meaningCont");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI (word){
    try {
        infoTextEl.style.display = "block";
        meaningContEl.style.display = "none";
        infoTextEl.innerHTML = `Searching the meaning of life and "${word}"`;


        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res)=>res.json());

        if(result.title){
            infoTextEl.style.display = "none";
            meaningContEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = result[0];
            audioEl.style.display = "none";
        }else{
            infoTextEl.style.display = "none";
            meaningContEl.style.display = "block";
            audioEl.style.display = "inline-flex";
            titleEl.innerText = result[0].word.charAt(0).toUpperCase() + result[0].word.slice(1);
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }




    } catch (error) {
        console.log(error);
        infoTextEl.innerHTML = `Could not find the meaning of life and "${word}".`;
        
    }
};

inputEl.addEventListener("keyup", (e)=>{
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }
});
