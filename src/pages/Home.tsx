import { WordCard } from "@/components/molecules/WordCard";
import { useGenertateStoryJsonGPT } from "@/hooks/story/useGenertateStoryJsonGPT";
import { useGetWordJsonGPT } from "@/hooks/word/useGetWordJsonGPT";
import { useGetWordsDb } from "@/hooks/word/useGetWordsDb";
import { useSaveWordtoDb } from "@/hooks/word/useSaveWordtoDb";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { MSG_NO_WORD } from "@/constanst/wordsCommon";

export default function Home() {
  /*
  const [inputWord, setInputWord] = useState("");
  const [storyUser, setStoryUser] = useState(
    "Liderar es una gran opotunidad !"
  );

  const { getStory, isErrorGetStory, isLoadingGetStory, story, setStory } =
    useGenertateStoryJsonGPT();

  const { callGPT, isError, isLoading, wordGPTJSON, setWordGPTJSON } =
    useGetWordJsonGPT();

    
  const { getWordsDB, isErrorGetWord, isLoadingGetWord, words } =
    useGetWordsDb();
  const {
    saveWordDB,
    isError: isErrorDB,
    isLoading: isLoadingDB,
  } = useSaveWordtoDb();

  useEffect(() => {
    setStory((s) => ({ ...s, topicUser: storyUser }));
  }, [storyUser]);

  const handleMouseUp = async () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      setInputWord(selectedText);
      speakWord(selectedText);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const response = await fetch(`/api/datatest?query=${inputWord}`);
    const data = await response.json();
    console.log(data);
  };

  const speakWord = (word: string) => {
    const speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div
      className="h-screen overflow-auto bg-gray-900 text-white p-8"
      onMouseUp={handleMouseUp}
    >
      <NextLink href="/mywords" passHref>
        Mis Words
      </NextLink>

      <section className="w-[1080px]  ">
        <div>
          <input
            type="text"
            value={storyUser}
            onChange={(e) => {
              setStoryUser(e.target.value);
              setStory((s) => ({ ...s, topicUser: e.target.value }));
            }}
            className="p-2 bg-gray-800 border border-gray-700 rounded-md w-[580px] mx-4"
          />

          <form onSubmit={handleSubmit}>
            <input
              type="Buscar"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder="Search a word..."
              className="p-2 bg-gray-800 border border-gray-700 rounded-md w-[580px] mx-4"
            />
   
          </form>
          <button
            type="button"
            onClick={() => getStory()}
            className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Genera Stoty
          </button>
        </div>
        <div className="p-6 bg-gray-900 shadow-sm shadow-gray-500">
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
        {isLoading ||
          isLoadingDB ||
          (isLoadingGetStory && (
            <h1 className="text-2xl font-bold">
              !
              {isLoading
                ? "GPT think word "
                : isLoadingDB
                ? "Saving "
                : " Story loading "}
            </h1>
          ))}
        - Word: <b>{inputWord || "No word selected yet !"}</b>
        <form
          onSubmit={() => {}}
          className="mb-4 mt-2 flex border-teal-400 border p-3 rounded-lg"
        >
          {wordGPTJSON?.word !== MSG_NO_WORD && (
            <button
              onClick={() => wordGPTJSON && saveWordDB(wordGPTJSON)}
              disabled={isLoading}
              type="button"
              className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Save Word
            </button>
          )}

          <button
            type="button"
            onClick={() => callGPT(inputWord)}
            disabled={isLoading}
            className="ml-2 p-2 bg-yellow-600 hover:bg-yellow-700 rounded-md flex gap-3"
          >
            GPTear
            {isLoading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </form>
        {wordGPTJSON && <WordCard word={wordGPTJSON} />}
      </section>
    </div>
  );
  
  */
 return <>Hello HOME</>
}
