import pyaudio

audio = pyaudio.PyAudio()

print("\nAvailable input devices:\n")

for i in range(audio.get_device_count()):
    info = audio.get_device_info_by_index(i)

    if info["maxInputChannels"] > 0:
        print(f"Index: {i}")
        print(f"Name: {info['name']}")
        print(f"Input Channels: {info['maxInputChannels']}")
        print(f"Sample Rate: {info['defaultSampleRate']}")
        print("-" * 40)

audio.terminate()