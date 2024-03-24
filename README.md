User
!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voice to Text and Text to Speech</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Voice to Text and Text to Speech</h1>
    
    <div id="recognitionStatus"></div>
    <button onclick="startSpeechRecognition()">Start Speaking</button>
    <button onclick="stopSpeechRecognition()">Stop Speaking</button>
    
    <div id="output"></div>

    <textarea id="textToSpeech" placeholder="Type or speak text here..." oninput="handleTextInput()"></textarea>

    <label for="rate">Rate (0.1 to 2):</label>
    <input type="number" id="rate" step="0.1" min="0.1" max="2" value="1">

    <label for="pitch">Pitch (0 to 2):</label>
    <input type="number" id="pitch" step="0.1" min="0" max="2" value="1">

    <label for="languageSelect">Select Language:</label>
    <select id="languageSelect">
        <option value="en-US">English</option>
        <option value="te-IN">Telugu</option>
        <option value="hi-IN">Hindi</option>
    </select>

    <button onclick="convertToSpeech()">Convert to Speech</button>
    <button onclick="clearText()">Clear Text</button>

    <script src="script.js"></script>
</body>
</html>
styles.css:

css
Copy code
body {
    font-family: 'Arial', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}

#recognitionStatus {
    margin-top: 10px;
}

#output {
    margin-top: 20px;
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-height: 100px;
}

textarea {
    margin-top: 10px;
    width: 80%;
    padding: 10px;
    font-size: 16px;
    resize: vertical;
}

button {
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

input {
    margin-top: 10px;
    font-size: 16px;
    padding: 8px;
}
script.js:

javascript
Copy code
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
