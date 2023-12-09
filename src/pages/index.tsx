import { MainLayout } from "@/components/layouts/MainLayout";
import { RootState } from "@/redux/reducers";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const CodeColorWords = {
  know: "text-green-500",
  isUnKnow: "text-red-500",
};
export default function Home() {
  const { activeStory, isError, isLoad, selectedActivedWord, stories } =
    useSelector((state: RootState) => state.story);

  const [textConent] = useState<null | string | undefined>("");
  const [voices] = useState(window.speechSynthesis.getVoices());
  const [sliderValue, setSliderValue] = useState(0);

  // console.log(voices);

  const [audioPlaying, setAudioPlaying] = useState(false);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (activeStory?.paragraphs) {
      // @ts-ignore
      setWords(activeStory.paragraphs[0].split(" "));
    }
  }, [activeStory?.paragraphs]);

  useEffect(() => {
    if (words.length > 0) {
      setSliderValue((currentWordIndex / (words.length - 1)) * 100);
    }
  }, [currentWordIndex, words.length]);

  const handleSliderChange = (e: any) => {
    const newSliderValue = parseInt(e.target.value, 10);
    setSliderValue(newSliderValue);
    const newWordIndex = Math.floor(
      (newSliderValue / 100) * (words.length - 1)
    );
    setCurrentWordIndex(newWordIndex);
    // Opcional: Detener y reiniciar la narración desde la nueva posición
    stopAudio();
    // Actualice aquí la lógica para comenzar la narración desde newWordIndex si es necesario
  };

  useEffect(() => {
    if (audioPlaying && words.length > 0) {
      const paragraph = words.join(" ");
      const utterThis = new SpeechSynthesisUtterance(paragraph);

      utterThis.onboundary = (event) => {
        if (event.name === "word") {
          let cumulativeLength = 0;
          let wordIndex = 0;

          for (let i = 0; i < words.length; i++) {
            // @ts-ignore
            cumulativeLength += words[i].length + 1; // +1 for the space or end character
            if (cumulativeLength > event.charIndex) {
              wordIndex = i;
              break;
            }
          }

          setCurrentWordIndex(wordIndex);

          setCurrentWordIndex(wordIndex);
          setSliderValue((wordIndex / words.length) * 100);
        }
      };

      window.speechSynthesis.speak(utterThis);
    }
  }, [audioPlaying, words]);

  const [lastWordIndex, setLastWordIndex] = useState(0);

  const startAudio = () => {
    const paragraph = words.slice(lastWordIndex).join(" ");
    const utterThis = new SpeechSynthesisUtterance(paragraph);

    utterThis.onboundary = (event) => {
      if (event.name === "word") {
        let cumulativeLength = 0;
        let wordIndex = lastWordIndex;

        for (let i = lastWordIndex; i < words.length; i++) {
          // @ts-ignore
          cumulativeLength += words[i].length + 1;
          if (cumulativeLength > event.charIndex) {
            wordIndex = i;
            break;
          }
        }

        setCurrentWordIndex(wordIndex);
      }
    };

    utterThis.onend = () => {};

    window.speechSynthesis.speak(utterThis);
    setAudioPlaying(true);
  };

  const stopAudio = () => {
    setLastWordIndex(currentWordIndex);
    window.speechSynthesis.cancel();
    setAudioPlaying(false);
  };

  const speakWordEN = (word: string) => {
    const speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);

    var myWindow = window.open(
      "https://dictionary.cambridge.org/dictionary/english/" + word,
      "myWindow",
      "left=100,top=100,width=520,height=420,toolbar=no,location=no,menubar=no"
    );
  };
  const renderWord = (word: any, index: any) => {
    const isCurrentWord = index === currentWordIndex;
    return (
      <span
        key={index}
        className={`p-1 rounded-md  cursor-pointer ${
          isCurrentWord ? "bg-green-800" : "transparent"
        }`}
      >
        {word}{" "}
      </span>
    );
  };

  return (
    <MainLayout>
      <div className="text-white">
        {/* Story text */}
        <div className="text-2xl">
          {activeStory?.paragraphs &&
            activeStory.paragraphs[0].split(" ").map(renderWord)}
        </div>

        {/* Audio playback controls */}
        <div>
          {audioPlaying ? (
            <button onClick={stopAudio}>Stop</button>
          ) : (
            <button onClick={startAudio}>Play</button>
          )}
        </div>

        {/* Fixed section at the bottom */}
        <section className="fixed bottom-0 w-full">
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              className="slider"
              id="myRange"
              onChange={handleSliderChange}
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
