import { MainLayout } from "@/components/layouts/MainLayout";
import { useState } from "react";

const CodeColorWords = {
  know: "text-green-500",
  isUnKnow: "text-red-500",
};
export default function Home() {
  const [textConent] = useState("He wanna goes to the school");

  const SearchWordInDb = (word: string) => {
    // Extract all word and remove duplicates
    const words = textConent.split(" ");
    const uniqueWords = [...new Set(words)];
  };

  const speakWordEN = (word: string) => {
    const speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);

    window.open(
      "https://dictionary.cambridge.org/dictionary/english/gangway",
      "_blank",
      "left=100,top=100,width=320,height=320"
    );
  };

  const renderWord = (word: string) => {
    return (
      <span
        onClick={() => speakWordEN(word)}
        className="text-white-500 hover:text-blue-200 cursor-pointer"
      >
        {word}
      </span>
    );
  };

  return (
    <MainLayout>
      <div className="text-white">
        {/* Recorrer text and render word */}
        <div className="text-2xl">
          {textConent.split(" ").map((word, index) => (
            <span key={index}>{renderWord(word)} </span>
          ))}

          {textConent.split(" ").map((word, index) => (
            <span key={index}>{renderWord(word)} </span>
          ))}
        </div>

        <section className="bottom-0 bg-white fixed w-full m-0 left-0">
          MArina no hace caso
        </section>
      </div>
    </MainLayout>
  );
}
