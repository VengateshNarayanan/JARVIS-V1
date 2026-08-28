import pyttsx3

engine = pyttsx3.init()

engine.setProperty("volume", 1.0)
engine.setProperty("rate", 170)

print("Speaking now...")

engine.say("Opening YouTube, Sir.")
engine.runAndWait()

print("Finished.")