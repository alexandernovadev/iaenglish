import { MainLayout } from "@/components/layouts/MainLayout";
import { RootState } from "@/redux/reducers";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiPlayCircle, HiStopCircle } from "react-icons/hi2";
import CustomSlider from "@/components/atoms/CustomSlider";

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

  // console.log(activeStory?.paragraphs);

  useEffect(() => {
    if (activeStory?.paragraphs) {
      // Usar flatMap para procesar todos los párrafos y agregar separación
      const allWords = activeStory.paragraphs.flatMap((paragraph, index) => {
        const paragraphWords = paragraph.split(" ");

        // Agregar un elemento de separación entre párrafos, excepto después del último
        // @ts-ignore
        return index < activeStory.paragraphs.length - 1
          ? [...paragraphWords, "¶"] // '¶' como marcador de separación
          : paragraphWords;
      });
      setWords(allWords);
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


  const handleSliderValueChange = (newValue: number) => {
    console.log("Nuevo valor del slider:", newValue);
  };

  const speakWordEN = (word: string) => {
    const speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);
    window.open(
      `https://dictionary.cambridge.org/dictionary/english/${word}#cald4-1`,
      "myWindow",
      "left=100,top=100,width=720,height=520,toolbar=no,location=no,menubar=no"
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
    const isSeparator = word === "¶"; // Verificar si la palabra es el marcador de separación

    return isSeparator ? (
      <div style={{ margin: "20px 0" }}></div> // Espaciado para separación de párrafos
    ) : (
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
        <div className="text-2xl h-full overflow-y-auto">
          {activeStory?.paragraphs && words.map(renderWord)}
        </div>

        <section className="fixed bottom-0 w-full flex justify-center items-center bg-gradient-to-t from-slate-900 via-slate-900 opacity-90 to-transparent">
          <div>
            {audioPlaying ? (
              <HiStopCircle style={{ fontSize: 40 }} onClick={stopAudio} />
            ) : (
              <HiPlayCircle style={{ fontSize: 40 }} onClick={startAudio} />
            )}
          </div>

          <div className="slider-container">
            {/* <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              className="slider w-[800px] min-w-sm bg-green-200"
              id="myRange"
              onChange={handleSliderChange}
            /> */}
            <CustomSlider min={0} max={100} onChange={handleSliderValueChange} />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
