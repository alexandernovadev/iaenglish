import { MainLayout } from "@/components/layouts/MainLayout";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Word } from "@/interfaces/word";
import React, { use, useEffect, useState } from "react";
import { DateTime } from "luxon";

const Dictionary = () => {
  const [wordUser, setWordUser] = useState("");
  const [words, setWords] = useState<Word[]>([]);

  const [isOpenModalWord, setIsOpenModalWord] = useState(false);
  const [wordDetail, setWordDetail] = useState<Word | null>(null);

  useEffect(() => {
    getWords();
  }, []);

  const getWords = async () => {
    const wordTemp = wordUser.toLowerCase() || "";
    try {
      const res = await fetch(`/api/wordslocaldict?word=${wordTemp}`);
      const data = await res.json();
      // if (data.length !== 0) {
      //   setWords(data.words);
      // } else {
      //   setWords([]);
      // }
      console.log(data);
      setWords(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    getWords();
  };

  const speakInEnglish = (word: string) => {
    const msg = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(msg);
  };
  return (
    <MainLayout>
      <>
        <div className="text-white px-4 pb-4 w-[100%]">
          <form onSubmit={handleSubmit} className="">
            <input
              type="search"
              value={wordUser}
              className="bg-gray-800 rounded-lg px-4 py-2 w-full border "
              placeholder="Search word"
              onChange={(e) => setWordUser(e.target.value)}
            />
          </form>

          <div className="flex flex-wrap gap-4 justify-center">
            {/* Updated conditional rendering */}
            {words && words.length > 0 ? (
              words.map((word, i) => (
                <div
                  key={`w${word.word}${i}`}
                  onClick={() => {
                    setWordDetail(word);
                    setIsOpenModalWord(true);
                  }}
                  className="cursor-pointer bg-gray-800 px-4 py-2 mt-2 w-[200px] rounded-lg border border-gray-700 hover:scale-101"
                >
                  <h3 className="text-xl font-bold capitalize">{word.word}</h3>
                  <span className="text-green-200">{word.ipa}</span>
                  <p className="capitalize text-yellow-400">
                    {word.es?.word || "Nwor Spanish :(  "}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-2xl text-center w-full pt-12">No words found</p>
            )}
          </div>
        </div>
        <Modal isOpen={isOpenModalWord} setIsOpen={setIsOpenModalWord}>
          <section className="h-full overflow-auto">
            <h1
              className="text-5xl font-semibold capitalize"
              onClick={() => speakInEnglish(wordDetail?.word!)}
            >
              {wordDetail?.word} <span className="cursor-pointer">🔊</span>
            </h1>

            <div className="py-2 px-3">
              {wordDetail?.type_word.map((type, i) => (
                <span
                  key={`type${type.name}${i}`}
                  className="text-orange-500 px-2 mx-1 border border-orange-500 rounded-lg"
                >
                  {type.name}
                </span>
              ))}
            </div>
            <h2 className="text-3xl text-green-500">{wordDetail?.ipa}</h2>
            <p className="py-3">{wordDetail?.definition}</p>

            <h3 className="pt-6 text-3xl flex capitalize items-center">
              🇪🇸 {wordDetail?.es?.word}
            </h3>
            <p className="py-2">{wordDetail?.es?.definition}</p>

            <h3 className="text-3xl flex capitalize items-center">
              🇧🇷 {wordDetail?.pt?.word}
            </h3>

            <p className="py-2">{wordDetail?.pt?.definition}</p>

            <div className="pt-4">
              <h2 className="text-2xl underline pb-2">Examples</h2>
              {wordDetail?.examples?.map((example, i) => (
                <p key={`example${example}${i}`} className="py-1">
                  - {example}
                </p>
              ))}
            </div>
            {wordDetail && wordDetail.updatedAt && (
              <div>
                <p className="py-1 text-gray-400">
                  Last Update: {/* @ts-ignore */}
                  {DateTime.fromISO(wordDetail.updatedAt).toLocaleString({
                    weekday: "long",
                    month: "long",
                    year: "numeric",
                    day:"2-digit"
                  })}
                </p>
              </div>
            )}
          </section>
        </Modal>
      </>
    </MainLayout>
  );
};

export default Dictionary;
