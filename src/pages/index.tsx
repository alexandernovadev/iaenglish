import { MainLayout } from "@/components/layouts/MainLayout";
import { RootState } from "@/redux/reducers";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiPlayCircle, HiStopCircle } from "react-icons/hi2";
import CustomSlider from "@/components/atoms/CustomSlider";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { WordActionTypes } from "@/redux/wordRecuder/types";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import cambrigeLogo from "../../public/images/cambrige.png";
import Image from "next/image";
import Dictonary from '../../public/englishdb_ai.words.json'
export default function Home() {
  const { activeStory } = useSelector((state: RootState) => state.story);

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  const [wordUserSelected, setWordUserSelected] = useState("");

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        voicesRef.current = voices;
      };
    }
  }, []);


  useEffect(() => {

    const setUnique = new Set(words);
    const wordsKnown: string[] = [];
    const wordsUnKnown: string[] = [];
    setUnique.forEach((word) => {
      const wordLowerCase = word.toLocaleLowerCase().replace(/[.,();\/ ]/g, "");
      const wordExist = Dictonary.find(
        (w) => w.word?.toLocaleLowerCase() === wordLowerCase
      );
      if (wordExist) {
        wordsKnown.push(wordLowerCase);
      } else {
        wordsUnKnown.push(wordLowerCase);
      }
    });


    console.log('wordsUnKnown', wordsUnKnown)
    // console.log('wordsKnown',wordsKnown)

  }, [activeStory, words]);



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

  const serchCambridgeDictinonary = (word: string) => {
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
      <div key={"separator-" + index} style={{ margin: "20px 0" }}></div> // Espaciado para separación de párrafos
    ) : (
      <span
        key={"word-" + index}
        // onDoubleClick={() => speakWordEN(word)}
        onClick={() => setWordUserSelected(word)}
        className={`p-1 rounded-md cursor-pointer inline-flex ${isCurrentWord ? "bg-green-800" : "transparent"
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

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      stopAudio();
    }
  };

  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      stopAudio();
    }
  };

  return (
    <MainLayout>
      <div className="text-white ">
        <div className="text-2xl h-full overflow-y-auto px-4 pt-4">
          <h1 className="text-4xl font-semibold pb-6">{activeStory?.title}</h1>

          {activeStory?.paragraphs && words.map(renderWord)}
        </div>

        <section className="fixed gap-3 px-8 bottom-0 w-full flex justify-between items-center bg-gradient-to-t from-slate-900 via-slate-900 opacity-90 to-transparent pb-4">
          <div className="flex items-center">
            {audioPlaying ? (
              <HiStopCircle style={{ fontSize: 40 }} onClick={stopAudio} />
            ) : (
              <HiPlayCircle style={{ fontSize: 40 }} onClick={startAudio} />
            )}

            <GrCaretPrevious style={{ fontSize: 24 }} onClick={prevWord} />
            <GrCaretNext style={{ fontSize: 24 }} onClick={nextWord} />
          </div>

          <div className="flex items-center gap-4">
            {wordUserSelected && (
              <>
                <h1 className="text-3xl capitalize rounded-lg  ">
                  {wordUserSelected.replaceAll(/[,.()]/g, "")}{" "}
                </h1>
                <HiMiniSpeakerWave
                  style={{ fontSize: 24 }}
                  onClick={() => {
                    const speech = new SpeechSynthesisUtterance(
                      wordUserSelected
                    );
                    window.speechSynthesis.speak(speech);
                  }}
                />
                <div
                  className="rounded-full"
                  title="Search on Cambridge Dictinary"
                >
                  <Image
                    src={cambrigeLogo}
                    className="rounded-full cursor-pointer "
                    width={20}
                    height={20}
                    onClick={() => serchCambridgeDictinonary(wordUserSelected)}
                    alt="camdictoniay"
                  />
                </div>
              </>
            )}
          </div>

          {/* <div className="slider-container">
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
          </div> */}
        </section>
      </div>
    </MainLayout>
  );
}
