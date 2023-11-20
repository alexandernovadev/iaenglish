import React, { useEffect, useState } from "react";
import { NavbarMain } from "@/components/molecules/NavbarMain";
import { useGenertateStoryJsonGPT } from "@/hooks/story/useGenertateStoryJsonGPT";
import { useGetWordJsonGPT } from "@/hooks/word/useGetWordJsonGPT";
import { WordCard } from "@/components/molecules/WordCard";
import { MSG_NO_WORD } from "@/constanst/wordsCommon";
import { useSaveWordtoDb } from "@/hooks/word/useSaveWordtoDb";

export default function Home() {
  const [selectedWordUser, setSelectedWordUser] = useState("");
  const [topicuser, setTopicuser] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [speechUtterance, setSpeechUtterance] =
    useState<SpeechSynthesisUtterance>();

  const { getStory, isErrorGetStory, isLoadingGetStory, story, setStory } =
    useGenertateStoryJsonGPT();

  const {
    callGPT,
    isError,
    isLoading: isLoadGetWordGPT,
    wordGPTJSON,
    setWordGPTJSON,
  } = useGetWordJsonGPT();

  const {
    saveWordDB,
    isError: isErrorDB,
    isLoading: isLoadingDB,
  } = useSaveWordtoDb();

  const handleMouseUp = async () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText && selectedText.length > 1) {
      // Validate if the user want know sinigal loike (. , "" ´ ' ... )
      setSelectedWordUser(selectedText);
      seachWordLocalDictionary();
      speakWord(selectedText);
    }
  };

  const speakWord = (word: string) => {
    if (speechUtterance) {
      speechUtterance.text = word;
      window.speechSynthesis.speak(speechUtterance);
    }
  };

  const handleOpenClick = () => {
    setIsExpanded(!isExpanded); // Toggle the state
  };

  useEffect(() => {
    const speechs = new SpeechSynthesisUtterance();
    setSpeechUtterance(speechs);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const seachWordLocalDictionary = async () => {
    try {
      const response = await fetch(`/api/datatest?query=${selectedWordUser}`);
      const data = await response.json();
      console.log(data.results[0]);
      setWordGPTJSON(data.results[0]);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const seachWordGPTJson = async () => {
    await callGPT(selectedWordUser);
    console.log(wordGPTJSON);
  };

  const handleStory = async (event: any) => {
    event.preventDefault();
    setStory((s) => ({ ...s, topicUser: topicuser }));
    await getStory();
  };

  return (
    <div className="h-screen overflow-y-scroll">
      <div className="max-w-full">
        <form
          className={`flex bg-gray-800 p-4 rounded h-[10vh] justify-center ${
            isLoadingGetStory ? "animate-pulse" : ""
          }`}
          onSubmit={handleStory}
        >
          <input
            type="text"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 w-full rounded p-2 mr-2 text-white bg-gray-700 placeholder-gray-400 max-w-[82%]"
            placeholder="Escribe aquí"
            disabled={isLoadingGetStory}
            value={topicuser}
            onChange={(e) => {
              setTopicuser(e.target.value);
              setStory((s) => ({ ...s, topicUser: e.target.value }));
            }}
          />
          <button
            disabled={isLoadingGetStory}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLoadingGetStory ? "Thinking ..." : "Generar Story"}
          </button>
        </form>

        <div
          className="p-6 bg-gray-900 shadow-sm shadow-gray-500 h-[75vh] overflow-x-scroll "
          onMouseUp={handleMouseUp}
        >
          <h1 className="text-2xl font-bold text-yellow-50 mb-2">
            {story.title}
          </h1>
          <h4 className="text-xl text-gray-100 mb-4">{story.subtitle}</h4>

          {story.paragraphs?.map((p, i) => (
            <p
              key={`${i}-story-p`}
              className="text-gray-200 text-base leading-relaxed my-5"
            >
              {p}
            </p>
          ))}
        </div>
        <div
          className={`w-full flex justify-cente p-4 items-start flex-col rounded-t-3xl ${
            isExpanded ? "bg-black" : "bg-slate-900"
          }`}
          style={{
            position: "fixed",
            bottom: 0,
            height: isExpanded ? "95vh" : "13vh",
            transition: "height 0.5s",
            width: "100%",
            overflowX: "scroll",
          }}
        >
          <section className="w-full flex justify-between px-4">
            {selectedWordUser ? (
              <h1 className="text-3xl font-bold text-yellow-50 mb-2 max-w-2xl">
                {selectedWordUser}
                <span
                  onClick={() => speakWord(selectedWordUser)}
                  className="mx-4 cursor-pointer user-select-none"
                >
                  🔊
                </span>
              </h1>
            ) : (
              <h1 className="text-1xl font-bold text-white mb-2 max-w-2xl">
                Select word to Show definition
              </h1>
            )}

            <div className="flex gap-2">
              {isLoadGetWordGPT ? (
                <h1 className="text-2xl font-bold text-white mb-2 max-w-2xl animate-pulse ">Thnkihs Word Definition ...</h1>
              ) : (
                <>
                  <button
                    onClick={seachWordGPTJson}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    GPTword
                  </button>

                  {wordGPTJSON?.word !== MSG_NO_WORD && (
                    <button
                      onClick={() => wordGPTJSON && saveWordDB(wordGPTJSON)}
                      disabled={isLoadGetWordGPT}
                      type="button"
                      className="ml-2 p-2 bg-yellow-500 hover:bg-yellow-700 rounded-md text-white "
                    >
                      Save Word
                    </button>
                  )}

                  <button
                    onClick={handleOpenClick}
                    className={`${isExpanded ?'bg-red-500 hover:bg-red-700':'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded`}
                  >
                    {!isExpanded ? "Ver" : "X"}
                  </button>
                </>
              )}
            </div>
          </section>

          <section className="w-[70vh] overflow-x-auto">
            {wordGPTJSON && <WordCard word={wordGPTJSON} />}
          </section>
        </div>
      </div>

      <NavbarMain />
    </div>
  );
}
