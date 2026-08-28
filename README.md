# 🤖 JARVIS V1

A simple voice-controlled personal desktop assistant built using **Python, Flask, HTML, CSS, and JavaScript**.

## 🌐 Live Demo

**Render Deployment:**
`[ Add your Render deployment link here ]`

---

## ✨ Features

* 🎤 Voice commands
* ⌨️ Text commands
* 🔊 Voice responses
* 🌀 Animated JARVIS GUI
* 🌐 Opens websites
* 💻 Opens applications
* 🕐 Provides time and date
* 🔎 Performs Google searches

---

## 🎙️ Supported Commands

| Command                   | Action                   |
| ------------------------- | ------------------------ |
| `Open YouTube`            | Opens YouTube            |
| `Open Google`             | Opens Google             |
| `Open VS Code`            | Opens Visual Studio Code |
| `What is the time?`       | Tells the current time   |
| `What is the date?`       | Tells the current date   |
| `Search Python tutorials` | Searches Google          |
| `Goodbye`                 | JARVIS says goodbye      |

---

## 🛠️ Technologies Used

* **Python** — Assistant logic and system actions
* **Flask** — Backend and API communication
* **HTML** — GUI structure
* **CSS** — Interface design and animations
* **JavaScript** — Voice recognition and frontend interaction
* **Web Speech API** — Voice input and voice output

---

## 📁 Project Structure

The project was created with a simple separation between the Flask backend and frontend:

```text
JARVIS/
│
├── app.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── venv/
```

### Workflow

```text
User
 ↓
Voice / Text Command
 ↓
JavaScript
 ↓
Flask API
 ↓
Python
 ↓
Command Processing
 ↓
Browser / Application
 ↓
JARVIS Response
```

The **HTML** creates the interface, **CSS** gives JARVIS its futuristic animated design, **JavaScript** handles voice and user interaction, while **Python + Flask** process commands and perform the required actions.

---

## ▶️ Run Locally

Install Flask:

```bash
py -m pip install flask
```

Run JARVIS:

```bash
py app.py
```

Then open:

```text
http://127.0.0.1:5000
```

Allow microphone access in the browser to use voice commands.

---

## 🚀 Version

**JARVIS V1.0 — Basic Voice Assistant**

This version focuses on understanding the basic workflow of building a voice assistant with a graphical interface. Future versions can introduce AI/LLM integration, more system commands, memory, and advanced automation.
