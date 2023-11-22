import { useState, useEffect } from "react";
import { SpeechConfig, TextConcatType } from "./types";

const useSpeech = (
  config: SpeechConfig,
  textConcatType: TextConcatType = "REPLACE"
) => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  let speechRecognition: any | null = null;

  const [configUser, setConfigUser] = useState(config);

  useEffect(() => {
    getAvailableVoices();
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      speechRecognition = new SpeechRecognition();
      speechRecognition.lang = configUser.recognitionLang || "en-US";
      speechRecognition.interimResults =
        configUser.interimResults !== undefined
          ? configUser.interimResults
          : true;
      speechRecognition.continuous =
        configUser.continuous !== undefined ? configUser.continuous : false;
      speechRecognition.maxAlternatives = configUser.maxAlternatives || 1;
      speechRecognition.start();

      setIsListening(true);

      speechRecognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = 0; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const textResult =
          textConcatType === "CONCAT"
            ? " " + text + finalTranscript + interimTranscript
            : textConcatType === "REPLACE"
            ? finalTranscript + interimTranscript
            : "Stupid Love ";
        setText(textResult);
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };
    } else {
      alert("Tu navegador no soporta la Web Speech API");
    }
  };

  const speak = (text: string, lang?: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang || configUser.synthesisLang || "es-ES";
    // @ts-ignore
    speech.voice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.name === configUser.voiceName);
    speech.rate = configUser.rate || 1;
    speech.pitch = configUser.pitch || 1;
    speech.volume = configUser.volume || 1;
    window.speechSynthesis.speak(speech);
  };

  const getAvailableVoices = () =>
    setVoices(window.speechSynthesis.getVoices());

  return {
    text,
    isListening,
    voices,
    startListening,
    speak,
    setText,
    setConfigUser,
  };
};

export default useSpeech;
