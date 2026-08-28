# 🤖 JARVIS V1

A simple voice-controlled personal assistant built using **Python, Flask, HTML, CSS, and JavaScript**.

## 🌐 Live Demo

🚀 **[JARVIS V1 — Live on Render](https://jarvis-v1-x7pq.onrender.com/)**

The deployed version can be accessed from any device with a modern web browser.

---

## ✨ Features

* 🎤 Voice commands
* ⌨️ Text commands
* 🔊 Voice responses
* 🌀 Animated JARVIS interface
* 🌐 Open websites in the user's browser
* 🔎 Google search
* 🕐 Local time
* 📅 Local date

---

## 🎙️ Supported Commands

| Command                   | Action                              |
| ------------------------- | ----------------------------------- |
| `Open YouTube`            | Opens YouTube in the user's browser |
| `Open Google`             | Opens Google in the user's browser  |
| `Search Python tutorials` | Performs a Google search            |
| `What is the time?`       | Gives the user's local time         |
| `What is the date?`       | Gives the user's local date         |
| `Goodbye`                 | JARVIS responds and goes offline    |

> **Note:** `Open VS Code` is not available in the deployed version because a website cannot directly launch applications on another user's computer.

---

## 🛠️ Technologies Used

* **Python** — Backend logic
* **Flask** — Web server and API
* **HTML** — Interface structure
* **CSS** — UI design and animations
* **JavaScript** — Voice recognition and browser actions
* **Web Speech API** — Voice input and output

---

## 📁 Project Structure

```text
JARVIS/
│
├── app.py
├── requirements.txt
├── .gitignore
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

### Development Workflow

```text
Create Project Folder
        ↓
Create Flask Backend
        ↓
Create HTML Interface
        ↓
Design GUI with CSS
        ↓
Add Voice & Interaction with JavaScript
        ↓
Connect Frontend with Flask API
        ↓
Test Locally
        ↓
Push to GitHub
        ↓
Deploy on Render
        ↓
🌐 Public JARVIS
```

---

## ▶️ Run Locally

Install the required packages:

```bash
py -m pip install -r requirements.txt
```

Run JARVIS:

```bash
py app.py
```

Open:

```text
http://127.0.0.1:5000
```

Allow microphone access in the browser to use voice commands.

---

## 🚀 Version

**JARVIS V1.0 — Public Web Assistant**

This version focuses on learning how to connect a **frontend, JavaScript voice interface, Flask backend, and browser-based actions** into a single working assistant.
