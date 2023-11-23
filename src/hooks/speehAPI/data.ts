import { SpeechConfig } from "./types";

const speechConfig: SpeechConfig = {
  recognitionLang: process.env.REACT_APP_SPEECH_RECOGNITION_LANG || "es-ES",
  synthesisLang: process.env.REACT_APP_SPEECH_SYNTHESIS_LANG || "en-US",
  continuous: true,
  interimResults: true,
  // no parar de escuchar 

  voiceName: "Google US English",
  rate: 1.2,
  pitch: 1,
  volume: 0.8,
};
