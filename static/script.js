// ==========================================
// JARVIS FRONTEND CONTROLLER
// ==========================================


const orb =
    document.getElementById("orb");

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
// COMMAND HISTORY
// ==========================================

function addCommand(command) {

    const item =
        document.createElement("div");

    item.className =
        "command-item";

    item.innerHTML = `
        <span class="command-icon">◉</span>
        <span>${command}</span>
    `;

    commandList.prepend(item);


    while (
        commandList.children.length > 4
    ) {

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

            resolve();

            return;

        }


        window.speechSynthesis.cancel();


        const utterance =
            new SpeechSynthesisUtterance(text);


        utterance.rate = 0.95;

        utterance.pitch = 1;

        utterance.volume = 1;


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
// EXECUTE BROWSER ACTION
// ==========================================

function executeAction(data) {

    const action =
        data.action;


    // -----------------------------
    // GOOGLE
    // -----------------------------

    if (action === "open_google") {

        window.open(
            "https://www.google.com",
            "_blank"
        );

    }


    // -----------------------------
    // YOUTUBE
    // -----------------------------

    else if (
        action === "open_youtube"
    ) {

        window.open(
            "https://www.youtube.com",
            "_blank"
        );

    }


    // -----------------------------
    // GOOGLE SEARCH
    // -----------------------------

    else if (
        action === "google_search"
    ) {

        const query =
            encodeURIComponent(
                data.query
            );


        window.open(
            "https://www.google.com/search?q=" + query,
            "_blank"
        );

    }


    // -----------------------------
    // TIME
    // -----------------------------

    else if (
        action === "get_time"
    ) {

        const now =
            new Date();


        const time =
            now.toLocaleTimeString(
                [],
                {
                    hour: "numeric",
                    minute: "2-digit"
                }
            );


        data.response =
            `Sir, the current time is ${time}.`;

    }


    // -----------------------------
    // DATE
    // -----------------------------

    else if (
        action === "get_date"
    ) {

        const now =
            new Date();


        const date =
            now.toLocaleDateString(
                [],
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        data.response =
            `Today is ${date}, Sir.`;

    }

}


// ==========================================
// SEND COMMAND
// ==========================================

async function sendCommand(
    command = null
) {

    if (!command) {

        command =
            commandInput.value.trim();

    }


    if (!command) {

        return;

    }


    addCommand(command);


    commandInput.value = "";


    setStatus(
        "processing",
        "Processing..."
    );


    responseBox.textContent =
        "Processing your command, Sir.";


    try {

        const response =
            await fetch(
                "/command",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        command: command
                    })
                }
            );


        if (!response.ok) {

            throw new Error(
                "Backend request failed"
            );

        }


        const data =
            await response.json();


        // Execute browser-side action

        executeAction(data);


        // Display response

        responseBox.textContent =
            data.response;


        // Speak response

        await speak(
            data.response
        );


        if (
            data.action === "exit"
        ) {

            setStatus(
                null,
                "Offline"
            );

        }


    }

    catch (error) {

        console.error(
            "JARVIS ERROR:",
            error
        );


        responseBox.textContent =
            "I cannot communicate with the JARVIS server.";


        setStatus(
            null,
            "Connection Error"
        );

    }

}


// ==========================================
// SPEECH RECOGNITION
// ==========================================

let recognition = null;


function setupSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.warn(
            "Speech recognition is not supported."
        );


        micButton.disabled =
            true;


        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-US";


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    // =============================
    // START
    // =============================

    recognition.onstart = () => {

        micButton.classList.add(
            "active"
        );


        setStatus(
            "listening",
            "Listening..."
        );


        responseBox.textContent =
            "I am listening, Sir.";

    };


    // =============================
    // RESULT
    // =============================

    recognition.onresult =
        (event) => {

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


            sendCommand(
                transcript
            );

        };


    // =============================
    // END
    // =============================

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


    // =============================
    // ERROR
    // =============================

    recognition.onerror =
        (event) => {

            console.error(
                "Speech recognition error:",
                event.error
            );


            micButton.classList.remove(
                "active"
            );


            if (
                event.error ===
                "not-allowed"
            ) {

                responseBox.textContent =
                    "Microphone permission was denied.";

            }

            else if (
                event.error ===
                "no-speech"
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
// MICROPHONE BUTTON
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

        if (
            event.key === "Enter"
        ) {

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
