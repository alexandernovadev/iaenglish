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
        }
      };

      window.speechSynthesis.speak(utterThis);
    }
  }, [audioPlaying, words]);

  // Function to start the audio playback
  const startAudio = () => {
    setAudioPlaying(true);
  };

  // Function to stop the audio playback
  const stopAudio = () => {
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
        style={{
          backgroundColor: isCurrentWord ? "green" : "transparent",
          cursor: "pointer",
        }}
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
          <div>Marina no hace caso</div>
        </section>
      </div>
    </MainLayout>
  );
}
