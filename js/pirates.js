var translateButton = document.querySelector("#translate-btn-pirates")
var inputText = document.querySelector(".text-input")
var outputText = document.querySelector(".text-output")
var voiceList = document.querySelector('#voiceList');

var synth = window.speechSynthesis;
var voices = [];

var url = "https://api.funtranslations.com/translate/pirate.json"

const getTranslatedUrl = (input) => {
    return url + "?" + "text=" + input;
}

const catchError = (e) => {
    console.log(e);
    alert("Something went wrong with the server");
}

function PopulateVoices(){
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice)=>{
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });
  
    voiceList.selectedIndex = selectedIndex;
  }

const clickHandler = () => {
    var txtInput = inputText.value;
    console.log(txtInput);

    fetch(getTranslatedUrl(txtInput)).then(response => response.json()).then(json => {
        var translatedText = json.contents.translated;
        console.log(translatedText);
        
        var toSpeak = new SpeechSynthesisUtterance(translatedText);
            var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
            voices.forEach((voice)=>{
                if(voice.name === selectedVoiceName){
                    toSpeak.voice = voice;
                }
            });
            synth.speak(toSpeak);

        outputText.innerHTML = translatedText
    
    }).catch(catchError)
}

PopulateVoices();
if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = PopulateVoices;
}

translateButton.addEventListener("click", clickHandler);


