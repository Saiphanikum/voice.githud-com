const recognition = new webkitSpeechRecognition(); // For WebKit browsers (Chrome, Safari)
recognition.continuous = true;
recognition.lang = 'en-US'; // Default language is set to English

let typingTimer;  // Timer identifier
const doneTypingInterval = 1000;  // Time in milliseconds (1 second)

recognition.onstart = function () {
    document.getElementById('recognitionStatus').innerText = 'Listening...';
};

recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    document.getElementById('output').innerText = transcript;
};

recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
    document.getElementById('recognitionStatus').innerText = 'Error occurred';
};

recognition.onend = function () {
    document.getElementById('recognitionStatus').innerText = 'Speech recognition ended';
};

function startSpeechRecognition() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    recognition.lang = selectedLanguage;
    recognition.start();
    document.getElementById('recognitionStatus').innerText = 'Listening...';
}

function stopSpeechRecognition() {
    recognition.stop();
    document.getElementById('recognitionStatus').innerText = 'Speech recognition stopped';
}

function convertToSpeech() {
    const textToSpeech = document.getElementById('output').innerText;
    if (textToSpeech) {
        const speech = new SpeechSynthesisUtterance(textToSpeech);

        // Set rate and pitch
        speech.rate = parseFloat(document.getElementById('rate').value);
        speech.pitch = parseFloat(document.getElementById('pitch').value);

        const selectedLanguage = document.getElementById('languageSelect').value;
        speech.lang = selectedLanguage;

        window.speechSynthesis.speak(speech);
    } else {
        alert('Please provide some text to convert to speech.');
    }
}

function handleTextInput() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(convertTextAreaToSpeech, doneTypingInterval);
}

function convertTextAreaToSpeech() {
    const textToSpeech = document.getElementById('textToSpeech').value;
    if (textToSpeech) {
        const speech = new SpeechSynthesisUtterance(textToSpeech);

        // Set rate and pitch
        speech.rate = parseFloat(document.getElementById('rate').value);
        speech.pitch = parseFloat(document.getElementById('pitch').value);

        const selectedLanguage = document.getElementById('languageSelect').value;
        speech.lang = selectedLanguage;

        window.speechSynthesis.speak(speech);
    } else {
        alert('Please provide some text in the textarea to convert to speech.');
    }
}

function clearText() {
    document.getElementById('textToSpeech').value = '';
    document.getElementById('output').innerText = '';
}