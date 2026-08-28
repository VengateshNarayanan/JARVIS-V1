from flask import Flask, render_template, request, jsonify
import webbrowser
import subprocess
import datetime
from urllib.parse import quote_plus

app = Flask(__name__)


# -----------------------------
# HOME
# -----------------------------

@app.route("/")
def home():
    return render_template("index.html")


# -----------------------------
# COMMAND PROCESSOR
# -----------------------------

@app.route("/command", methods=["POST"])
def command():

    data = request.get_json()

    user_command = data.get("command", "").lower().strip()

    print(f"USER: {user_command}")

    if not user_command:
        return jsonify({
            "response": "I did not receive a command, Sir.",
            "status": "idle"
        })


    # -------------------------
    # YouTube
    # -------------------------

    if "open youtube" in user_command or user_command == "youtube":

        webbrowser.open("https://www.youtube.com")

        response = "Opening YouTube."

        print(f"JARVIS: {response}")

        return jsonify({
            "response": response,
            "status": "success"
        })


    # -------------------------
    # Google
    # -------------------------

    elif "open google" in user_command or user_command == "google":

        webbrowser.open("https://www.google.com")

        response = "Opening Google."

        print(f"JARVIS: {response}")

        return jsonify({
            "response": response,
            "status": "success"
        })


    # -------------------------
    # VS Code
    # -------------------------

    elif (
        "open vs code" in user_command
        or "open visual studio code" in user_command
    ):

        try:

            subprocess.Popen("code", shell=True)

            response = "Opening Visual Studio Code."

        except Exception:

            response = "I could not open Visual Studio Code."

        print(f"JARVIS: {response}")

        return jsonify({
            "response": response,
            "status": "success"
        })


    # -------------------------
    # TIME
    # -------------------------

    elif "time" in user_command:

        current_time = datetime.datetime.now().strftime("%I:%M %p")

        response = f"Sir, the current time is {current_time}."

        print(f"JARVIS: {response}")

        return jsonify({
            "response": response,
            "status": "success"
        })


    # -------------------------
    # DATE
    # -------------------------

    elif "date" in user_command:

        current_date = datetime.datetime.now().strftime(
            "%A, %d %B %Y"
        )

        response = f"Today is {current_date}."

        print(f"JARVIS: {response}")

        return jsonify({
            "response": response,
            "status": "success"
        })


    # -------------------------
    # GOOGLE SEARCH
    # -------------------------

    elif user_command.startswith("search"):

        search_query = user_command.replace(
            "search",
            "",
            1
        ).strip()

        if search_query:

            webbrowser.open(
                "https://www.google.com/search?q="
                + quote_plus(search_query)
            )

            response = f"Searching Google for {search_query}."

        else:

            response = "What would you like me to search for, Sir?"


        print(f"JARVIS: {response}")

        return jsonify({
            "response": response,
            "status": "success"
        })


    # -------------------------
    # EXIT
    # -------------------------

    elif (
        "exit" in user_command
        or "shutdown jarvis" in user_command
        or "goodbye" in user_command
    ):

        response = "Goodbye Sir."

        print(f"JARVIS: {response}")

        return jsonify({
            "response": response,
            "status": "exit"
        })


    # -------------------------
    # UNKNOWN COMMAND
    # -------------------------

    else:

        response = (
            "I do not know how to perform that command yet, Sir."
        )

        print(f"JARVIS: {response}")

        return jsonify({
            "response": response,
            "status": "unknown"
        })


# -----------------------------
# START SERVER
# -----------------------------

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )