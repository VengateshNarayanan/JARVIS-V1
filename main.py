import pyttsx3
import speech_recognition as sr
import webbrowser
import subprocess
import datetime


# -----------------------------
# Initialize JARVIS
# -----------------------------

engine = pyttsx3.init()


def speak(text):
    print("JARVIS:", text)

    engine = pyttsx3.init()

    engine.setProperty("rate", 170)
    engine.setProperty("volume", 1.0)

    engine.say(text)
    engine.runAndWait()

    engine.stop()


# -----------------------------
# Listen
# -----------------------------

def listen():
    recognizer = sr.Recognizer()

    with sr.Microphone(device_index=1) as source:

        print("\nListening...")

        recognizer.adjust_for_ambient_noise(source, duration=0.5)

        try:
            audio = recognizer.listen(
                source,
                timeout=5,
                phrase_time_limit=8
            )

        except sr.WaitTimeoutError:
            print("No speech detected.")
            return ""

    print("Processing...")

    try:
        command = recognizer.recognize_google(audio)

        print("You:", command)

        return command.lower()

    except sr.UnknownValueError:
        speak("Sorry Sir, I could not understand you.")
        return ""

    except sr.RequestError:
        speak("Speech recognition service is unavailable.")
        return ""


# -----------------------------
# Execute Commands
# -----------------------------

def execute_command(command):

    # Open Google
    if "open google" in command:
        speak("Opening Google.")
        webbrowser.open("https://www.google.com")

    # Open YouTube
    elif "open youtube" in command:
        speak("Opening YouTube.")
        webbrowser.open("https://www.youtube.com")

    # Open VS Code
    elif "open vs code" in command or "open visual studio code" in command:
        speak("Opening Visual Studio Code.")
        subprocess.Popen("code", shell=True)

    # Tell time
    elif "time" in command:
        current_time = datetime.datetime.now().strftime("%I:%M %p")
        speak(f"Sir, the time is {current_time}.")

    # Tell date
    elif "date" in command:
        current_date = datetime.datetime.now().strftime("%d %B %Y")
        speak(f"Today's date is {current_date}.")

    # Google search
    elif command.startswith("search"):
        search_query = command.replace("search", "", 1).strip()

        if search_query:
            speak(f"Searching Google for {search_query}.")
            webbrowser.open(
                "https://www.google.com/search?q="
                + search_query.replace(" ", "+")
            )
        else:
            speak("What should I search for, Sir?")

    # Exit
    elif "exit" in command or "stop listening" in command or "goodbye" in command:
        speak("Goodbye Sir.")
        return False

    # Unknown command
    else:
        speak("I do not know how to perform that command yet.")

    return True


# -----------------------------
# Start JARVIS
# -----------------------------

speak("Hello Sir. JARVIS is now online.")

running = True

while running:

    command = listen()

    if command:
        running = execute_command(command)