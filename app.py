from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)


# =============================
# HOME PAGE
# =============================

@app.route("/")
def home():
    return render_template("index.html")


# =============================
# COMMAND API
# =============================

@app.route("/command", methods=["POST"])
def command():

    data = request.get_json()

    user_command = data.get("command", "").lower().strip()

    print(f"USER: {user_command}")


    if not user_command:

        return jsonify({
            "response": "I did not receive a command, Sir.",
            "action": "none"
        })


    # =============================
    # GOOGLE
    # =============================

    if "open google" in user_command or user_command == "google":

        return jsonify({
            "response": "Opening Google.",
            "action": "open_google"
        })


    # =============================
    # YOUTUBE
    # =============================

    elif "open youtube" in user_command or user_command == "youtube":

        return jsonify({
            "response": "Opening YouTube.",
            "action": "open_youtube"
        })


    # =============================
    # GOOGLE SEARCH
    # =============================

    elif user_command.startswith("search"):

        search_query = user_command.replace(
            "search",
            "",
            1
        ).strip()


        if search_query:

            return jsonify({
                "response": f"Searching Google for {search_query}.",
                "action": "google_search",
                "query": search_query
            })


        return jsonify({
            "response": "What would you like me to search for, Sir?",
            "action": "none"
        })


    # =============================
    # TIME
    # =============================

    elif "time" in user_command:

        return jsonify({
            "response": "Let me check the current time, Sir.",
            "action": "get_time"
        })


    # =============================
    # DATE
    # =============================

    elif "date" in user_command:

        return jsonify({
            "response": "Let me check today's date, Sir.",
            "action": "get_date"
        })


    # =============================
    # VS CODE
    # =============================

    elif (
        "open vs code" in user_command
        or "open visual studio code" in user_command
    ):

        return jsonify({
            "response": "VS Code can only be opened when JARVIS is running locally on the computer.",
            "action": "none"
        })


    # =============================
    # GOODBYE
    # =============================

    elif (
        "goodbye" in user_command
        or "shutdown jarvis" in user_command
        or user_command == "exit"
    ):

        return jsonify({
            "response": "Goodbye Sir.",
            "action": "exit"
        })


    # =============================
    # UNKNOWN
    # =============================

    else:

        return jsonify({
            "response": "I do not know how to perform that command yet, Sir.",
            "action": "none"
        })


# =============================
# START SERVER
# =============================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
