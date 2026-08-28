// ==========================================
// JARVIS FRONTEND CONTROLLER
// ==========================================


const orb = document.getElementById("orb");

const statusText =
    document.getElementById("statusText");

const responseBox =
    document.getElementById("response");

const commandInput =
    document.getElementById("commandInput");

const micButton =
    document.getElementById("micButton");

const commandList =
    document.getElementById("commandList");


// ==========================================
// STATUS
// ==========================================

function setStatus(status, text) {

    orb.classList.remove(
        "listening",
        "processing",
        "speaking"
    );

    if (status) {
        orb.classList.add(status);
    }

    statusText.textContent = text;
}


// ==========================================
// ADD COMMAND TO HISTORY
// ==========================================

function addCommand(command) {

    const item =
        document.createElement("div");

    item.className = "command-item";

    item.innerHTML = `
        <span class="command-icon">◉</span>
        <span>${command}</span>
    `;

    commandList.prepend(item);

    // Keep only latest 4
    while (commandList.children.length > 4) {
        commandList.removeChild(
            commandList.lastChild
        );
    }
}


// ==========================================
// TEXT TO SPEECH
// ==========================================

function speak(text) {

    return new Promise((resolve) => {

        if (!("speechSynthesis" in window)) {

            console.warn(
                "Speech synthesis is not supported."
            );

            resolve();

            return;
        }


        // Stop previous speech

        window.speechSynthesis.cancel();


        const utterance =
            new SpeechSynthesisUtterance(text);


        utterance.rate = 0.95;

        utterance.pitch = 1.0;

        utterance.volume = 1.0;


        utterance.onstart = () => {

            setStatus(
                "speaking",
                "Speaking..."
            );

        };


        utterance.onend = () => {

            setStatus(
                null,
                "Ready"
            );

            resolve();

        };


        utterance.onerror = () => {

            setStatus(
                null,
                "Ready"
            );

            resolve();

        };


        window.speechSynthesis.speak(
            utterance
        );

    });
}


// ==========================================
// SEND COMMAND TO PYTHON
// ==========================================

async function sendCommand(command = null) {

    if (!command) {

        command =
            commandInput.value.trim();

    }


    if (!command) {
        return;
    }


    // Display command

    addCommand(command);


    // Clear input

    commandInput.value = "";


    // Processing state

    setStatus(
        "processing",
        "Processing..."
    );


    responseBox.textContent =
        "Processing your command, Sir.";


    try {

        const response =
            await fetch("/command", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    command: command
                })

            });


        if (!response.ok) {

            throw new Error(
                "Backend request failed."
            );

        }


        const data =
            await response.json();


        // Show response

        responseBox.textContent =
            data.response;


        // Speak response

        await speak(
            data.response
        );


        // Exit state

        if (data.status === "exit") {

            setStatus(
                null,
                "Offline"
            );

        }


    } catch (error) {

        console.error(
            "JARVIS ERROR:",
            error
        );


        responseBox.textContent =
            "I cannot communicate with my Python backend.";


        setStatus(
            null,
            "Connection Error"
        );

    }

}


// ==========================================
// VOICE RECOGNITION
// ==========================================

let recognition = null;


function setupSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.warn(
            "Speech recognition is not supported in this browser."
        );

        micButton.disabled = true;

        micButton.title =
            "Speech recognition is not supported in this browser.";

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;


    // --------------------------------------
    // START
    // --------------------------------------

    recognition.onstart = () => {

        micButton.classList.add("active");

        setStatus(
            "listening",
            "Listening..."
        );

        responseBox.textContent =
            "I am listening, Sir.";

    };


    // --------------------------------------
    // RESULT
    // --------------------------------------

    recognition.onresult = (event) => {

        const transcript =
            event.results[0][0]
                .transcript
                .trim();


        console.log(
            "Voice command:",
            transcript
        );


        commandInput.value =
            transcript;


        micButton.classList.remove(
            "active"
        );


        sendCommand(transcript);

    };


    // --------------------------------------
    // END
    // --------------------------------------

    recognition.onend = () => {

        micButton.classList.remove(
            "active"
        );

        if (
            !orb.classList.contains(
                "processing"
            ) &&
            !orb.classList.contains(
                "speaking"
            )
        ) {

            setStatus(
                null,
                "Ready"
            );

        }

    };


    // --------------------------------------
    // ERROR
    // --------------------------------------

    recognition.onerror = (event) => {

        console.error(
            "Speech recognition error:",
            event.error
        );


        micButton.classList.remove(
            "active"
        );


        if (event.error === "not-allowed") {

            responseBox.textContent =
                "Microphone permission was denied.";

        }

        else if (
            event.error === "no-speech"
        ) {

            responseBox.textContent =
                "I did not hear anything, Sir.";

        }

        else {

            responseBox.textContent =
                "I could not understand that.";

        }


        setStatus(
            null,
            "Ready"
        );

    };

}


// ==========================================
// START LISTENING
// ==========================================

function startListening() {

    if (!recognition) {

        alert(
            "Speech recognition is not supported in this browser."
        );

        return;

    }


    try {

        recognition.start();

    }

    catch (error) {

        console.log(
            "Recognition already running."
        );

    }

}


// ==========================================
// ENTER KEY
// ==========================================

commandInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            sendCommand();

        }

    }
);


// ==========================================
// INITIALIZE
// ==========================================

setupSpeechRecognition();

setStatus(
    null,
    "Ready"
);