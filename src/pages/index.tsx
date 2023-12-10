import { MainLayout } from "@/components/layouts/MainLayout";
import { RootState } from "@/redux/reducers";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiPlayCircle, HiStopCircle } from "react-icons/hi2";
import CustomSlider from "@/components/atoms/CustomSlider";

export default function Home() {
  const { activeStory } = useSelector((state: RootState) => state.story);

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        voicesRef.current = voices;
      };
    }
  }, []);

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

  const handleSliderValueChange = (newValue: number) => {
    const newWordIndex = Math.floor((newValue / 100) * (words.length - 1));
    setCurrentWordIndex(newWordIndex);
    stopAudio();
    // Opcionalmente, puedes empezar a reproducir desde el nuevo índice
    // playAudioFromIndex(newWordIndex);
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
        key={"word-" + index}
        onDoubleClick={() => speakWordEN(word)}
        className={`p-1 rounded-md cursor-pointer inline-flex ${
          isCurrentWord ? "bg-green-800" : "transparent"
        }`}
      >
        {word}
      </span>
    );
  };

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        voicesRef.current = voices;
      };
    }
  }, []);

  return (
    <MainLayout>
      <div className="text-white ">
     
        <div className="text-2xl h-full overflow-y-auto px-4">
        <h1 className="text-4xl font-semibold pb-6">
          {activeStory?.title}
        </h1>

          {activeStory?.paragraphs && words.map(renderWord)}
        </div>

        <section className="fixed gap-3  bottom-0 w-full flex justify-center items-center bg-gradient-to-t from-slate-900 via-slate-900 opacity-90 to-transparent">
          <div>
            {audioPlaying ? (
              <HiStopCircle style={{ fontSize: 40 }} onClick={stopAudio} />
            ) : (
              <HiPlayCircle style={{ fontSize: 40 }} onClick={startAudio} />
            )}
          </div>

          <div className="slider-container">
            <CustomSlider
              min={0}
              max={100}
              value={sliderValue}
              onChange={handleSliderValueChange}
            />
          </div>

          <div>
            List of voices:
            <select className="bg-slate-800" name="voices" id="voices">
              {voicesRef.current.map((voice, i) => (
                <option key={`${i}-voice`}>{voice.name}</option>
              ))}
            </select>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
