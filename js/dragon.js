var translateButton = document.querySelector("#translate-btn-dragon")
var inputText = document.querySelector(".text-input")
var outputText = document.querySelector(".text-output")

var url = "https://api.funtranslations.com/translate/draconic.json"

const getTranslatedUrl = (input) => {
    return url + "?" + "text=" + input;
}

const catchError = (e) => {
    console.log(e);
    alert("Something went wrong with the server");
}

const clickHandler = () => {
    var txtInput = inputText.value;
    console.log(txtInput);

    fetch(getTranslatedUrl(txtInput)).then(response => response.json()).then(data => {
        var translatedText = data.contents.translated;
        console.log(translatedText);
        outputText.innerHTML = "";
        outputText.innerHTML = translatedText
    
    }).catch(catchError)
}

translateButton.addEventListener("click", clickHandler);


