import { MainLayout } from "@/components/layouts/MainLayout";
import { RootState } from "@/redux/reducers";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { activeStory } = useSelector((state: RootState) => state.story);

  // Definición de tipos y estado inicial
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const voicesRef = useRef<SpeechSynthesisVoice[]>(
    window.speechSynthesis.getVoices()
  );

  useEffect(() => {
    if (activeStory?.paragraphs) {
      setWords(activeStory.paragraphs[0].split(" "));
    }
  }, [activeStory?.paragraphs]);

  useEffect(() => {
    setSliderValue((currentWordIndex / Math.max(words.length - 1, 1)) * 100);
  }, [currentWordIndex, words.length]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSliderValue = parseInt(e.target.value, 10);
    setSliderValue(newSliderValue);
    const newWordIndex = Math.floor(
      (newSliderValue / 100) * (words.length - 1)
    );
    setCurrentWordIndex(newWordIndex);
    stopAudio();
  };

  const speakWordEN = (word: string) => {
    const speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);
    window.open(
      `https://dictionary.cambridge.org/dictionary/english/${word}`,
      "myWindow",
      "left=100,top=100,width=520,height=420,toolbar=no,location=no,menubar=no"
    );
  };

  const startAudio = () => {
    setAudioPlaying(true);
    playAudioFromIndex(currentWordIndex);
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setAudioPlaying(false);
  };

  const playAudioFromIndex = (startIndex: number) => {
    const paragraph = words.slice(startIndex).join(" ");
    const utterThis = new SpeechSynthesisUtterance(paragraph);

    utterThis.onboundary = (event: SpeechSynthesisEvent) => {
      if (event.name === "word") {
        const wordIndex = calculateWordIndexFromCharIndex(
          event.charIndex,
          startIndex
        );
        setCurrentWordIndex(wordIndex);
        if (wordIndex >= words.length - 1) {
          setAudioPlaying(false);
        }
      }
    };

    window.speechSynthesis.speak(utterThis);
  };

  const calculateWordIndexFromCharIndex = (
    charIndex: number,
    startIndex: number
  ) => {
    let cumulativeLength = 0;
    for (let i = startIndex; i < words.length; i++) {
      cumulativeLength += words[i].length + 1;
      if (cumulativeLength > charIndex) {
        return i;
      }
    }
    return startIndex;
  };

  const renderWord = (word: string, index: number) => {
    const isCurrentWord = index === currentWordIndex;
    return (
      <span
        key={index}
        onDoubleClick={() => speakWordEN(word)}
        className={`p-1 rounded-md cursor-pointer inline-flex ${
          isCurrentWord ? "bg-green-800" : "transparent"
        }`}
      >
        {word}
      </span>
    );
  };

  return (
    <MainLayout>
      <div className="text-white">
        <div className="text-2xl">
          {activeStory?.paragraphs && words.map(renderWord)}
        </div>

        <div>
          {audioPlaying ? (
            <button onClick={stopAudio}>Stop</button>
          ) : (
            <button onClick={startAudio}>Play</button>
          )}
        </div>

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
