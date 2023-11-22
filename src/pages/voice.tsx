import useSpeech from "@/hooks/speehAPI/useSpeech";
import React, { useState, useEffect } from "react";

export const speechConfig = {
  recognitionLang: process.env.REACT_APP_SPEECH_RECOGNITION_LANG || "es-ES",
  synthesisLang: process.env.REACT_APP_SPEECH_SYNTHESIS_LANG || "en-US",
  continuous: true,
  voiceName: "Google US English",
  rate: 1.2,
  pitch: 1,
  volume: 0.8,
};

const VoicePage: React.FC = () => {
  const { text, voices, startListening, speak, setText, setConfigUser } =
    useSpeech(speechConfig);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [recognitionLang, setRecognitionLang] = useState("en-US");
  const [synthesisLang, setSynthesisLang] = useState("en-US");
  const [rate, setRate] = useState(1.2);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [continuous, setContinuous] = useState(true);


  const handleSpeak = () => {
    setConfigUser({
      recognitionLang,
      synthesisLang,
      voiceName: selectedVoice,
      rate,
      pitch,
      volume,
      continuous,
    });
    speak(text);
  };

  return (
    <div className="p-4">
      <select
        className="block w-full p-2 border border-gray-300 rounded bg-black"
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>

      <select
        className="block w-full p-2 border border-gray-300 rounded mt-2 bg-black"
        value={recognitionLang}
        onChange={(e) => setRecognitionLang(e.target.value)}
      >
        <option value="en-US">English (US)</option>
        <option value="en-GB">English (UK)</option>
        <option value="es-ES">Spanish (Spain)</option>
        <option value="es-MX">Spanish (Mexico)</option>
        <option value="fr-FR">French (France)</option>
        <option value="de-DE">German (Germany)</option>
        <option value="it-IT">Italian (Italy)</option>
        <option value="ja-JP">Japanese (Japan)</option>
        <option value="zh-CN">Chinese (Mandarin)</option>
        <option value="ru-RU">Russian (Russia)</option>
        <option value="pt-BR">Portuguese (Brazil)</option>
        <option value="ko-KR">Korean (Korea)</option>
      </select>

      <select
        className="block w-full p-2 border border-gray-300 rounded mt-2 bg-black"
        value={synthesisLang}
        onChange={(e) => setSynthesisLang(e.target.value)}
      >
        <option value="en-US">English (US)</option>
        <option value="en-GB">English (UK)</option>
        <option value="es-ES">Spanish (Spain)</option>
        <option value="es-MX">Spanish (Mexico)</option>
        <option value="fr-FR">French (France)</option>
        <option value="de-DE">German (Germany)</option>
        <option value="it-IT">Italian (Italy)</option>
        <option value="ja-JP">Japanese (Japan)</option>
        <option value="zh-CN">Chinese (Mandarin)</option>
        <option value="ru-RU">Russian (Russia)</option>
        <option value="pt-BR">Portuguese (Brazil)</option>
        <option value="ko-KR">Korean (Korea)</option>
      </select>

      <label htmlFor="">Rate</label>
      <input
        type="range"
        className="w-full mt-2"
        min="0.5"
        max="2"
        step="0.1"
        value={rate}
        onChange={(e) => setRate(parseFloat(e.target.value))}
      />

      <label htmlFor="">Pitch</label>

      <input
        type="range"
        className="w-full mt-2"
        min="0"
        max="2"
        step="0.1"
        value={pitch}
        onChange={(e) => setPitch(parseFloat(e.target.value))}
      />

      <label htmlFor="">Volume</label>

      <input
        type="range"
        className="w-full mt-2"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />

      <label className="block mt-2">
        <span>Continuous:</span>
        <input
          type="checkbox"
          checked={continuous}
          onChange={() => setContinuous(!continuous)}
        />
      </label>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => startListening()}
      >
        Start Listening
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-2"
        onClick={handleSpeak}
      >
        Speak
      </button>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
        onClick={() => setText("")}
      >
        X
      </button>

      <hr className="my-4" />
      <h1 className="text-xl font-bold">{text}</h1>
      {/* Add additional elements for language translation and IPA */}

      <hr />
      <h3>Peter Piper picked a peck of pickled peppers.</h3>
      IPA Transcription:
      <h4>/ˈpiːtər ˈpaɪpər pɪkt ə pɛk əv ˈpɪkl̩d ˈpɛpərz/</h4>
    </div>
  );
};

export default VoicePage;
