import { useStory } from "@/hooks/story/useStory";
import { RootState } from "@/redux/reducers";
import { memo, use, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dictonary from "../../public/englishdb_ai.words.json";
import { Modal } from "@/components/molecules/Modal/Modal";
import { useWord } from "@/hooks/word/useWord";
import { WordCard } from "@/components/molecules/WordCard";
import { Word } from "@/interfaces/word";
import { WordActionTypes } from "@/redux/wordRecuder/types";
import { AiOutlineLoading } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaBook } from "react-icons/fa";
import NextLink from "next/link";
import { FcReading } from "react-icons/fc";
import { LuBrainCircuit } from "react-icons/lu";

export default function Home() {
  const [word, setword] = useState("Historia de Napoleon ");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { getStoryFromGPT } = useStory();
  const { getWordFromGPT, saveWordDB } = useWord();

  const dispatch = useDispatch();

  const notify = () =>
    toast(
      <div className="rounded-xl p-4 flex gap-2">
        <FaCheckCircle style={{ color: "green" }} /> Error con la Story
      </div>,
      {
        style: { padding: 2 },
        duration: 1800,
      }
    );

  const { activeStory, isError, isLoad, selectedActivedWord } = useSelector(
    (state: RootState) => state.story
  );

  const {
    isError: isErrWord,
    isLoad: isLoadWordm,
    words,
    activeWord,
    selectedActivedWord: w,
  } = useSelector((state: RootState) => state.word);

  useEffect(() => {
    dispatch({ type: WordActionTypes.IS_LOADING, payload: false });
    dispatch({ type: WordActionTypes.IS_ERROR, payload: "" });
  }, []);

  useEffect(() => {
    if (isError) {
      notify();
    }
  }, [isError]);

  const searchGpt = () => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getStoryFromGPT(word);
  };

  const speakWordEN = (word: string) => {
    const speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);
  };
  const RenderWord = memo(({ word, index }: any) => {
    // console.log("renderWords =>", index);

    // Your existing logic for rendering a word
    const wordLowerCase = word.toLocaleLowerCase().replace(/[.,]/g, "");
    const wordExist = Dictonary.find(
      (w) => w.word.toLocaleLowerCase() === wordLowerCase
    );
    const wordClean = word.replace(/[.,]/g, "");
    return (
      <span
        key={`${index}-word`}
        className={`${
          wordExist ? "text-green-300" : "text-gray-400"
        } cursor-pointer hover:underline`}
        onClick={() => {
          dispatch({
            type: WordActionTypes.SELECTED_ACTIVED_WORD,
            payload: { word: wordClean, isKnown: !!wordExist },
          });
          dispatch({
            type: WordActionTypes.SET_ACTIVED_WORD,
            payload: wordExist,
          });
        }}
      >
        {word}{" "}
      </span>
    );
  });

  const RenderContent = memo(({ text, index }: any) => {
    const textArray = text.split(" ");
    // const news = textArray.map((word: any, index: any) =>
    //   word.toLocaleLowerCase()
    // );
    // const setUnique = new Set(news);
    return (
      <span key={`${index}-word`}>
        {textArray.map((word: any, idx: any) => (
          <RenderWord key={idx} word={word} index={idx} />
        ))}
      </span>
    );
  });

  return (
    <div className="w-full h-screen bg-slate-800 text-white overflow-hidden">
      <div className="flex flex-col h-full overflow-auto">
        <div className="flex-grow overflow-auto p-4">
          <section className="flex justify-between">
            <NextLink href="/mywords" passHref>
              <FaBook style={{ fontSize: 32 }} />
            </NextLink>

            <h1 className="text-xl font-bold mb-2">{activeStory?.title}</h1>

            <div className="flex gap-3">
              <span className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
                {activeStory?.level}
              </span>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full shadow-lg">
                {activeStory?.language}
              </span>
            </div>
          </section>
          <h4 className="text-lg mb-2">{activeStory?.subtitle}</h4>
          <div className="w-full">
            {activeStory?.paragraphs?.map((paragraph, index) => (
              <p key={index} className="mb-5 ">
                <RenderContent text={paragraph} index={index} />
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-2 bg-slate-700 px-4">
          {selectedActivedWord?.word ? (
            <h1 className="flex-grow truncate text-3xl capitalize font-bold">
              {selectedActivedWord?.word}
              <span
                onClick={() => speakWordEN(selectedActivedWord?.word!)}
                className="cursor-pointer"
              >
                {" "}
                🔊{" "}
              </span>
              <span className="px-2 text-xl text-gray-300">
                {" "}
                {activeWord?.ipa}
              </span>
            </h1>
          ) : (
            <>No hay word</>
          )}

          {!selectedActivedWord?.isKnown ? (
            <button
              onClick={() => {
                getWordFromGPT(selectedActivedWord?.word!);
                setIsOpenModal(true);
              }}
              className={` px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 transition duration-300 ${
                !selectedActivedWord?.word ? "hidden" : ""
              }`}
            >
              <LuBrainCircuit className="text-2xl" />
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpenModal(true);
              }}
              className="text-2xl px-2 py-1 bg-yellow-600 rounded hover:yellow-blue-700 transition duration-300"
            >
              <FcReading />
            </button>
          )}
        </div>

        <form
          className={`flex p-2 items-center justify-center ${
            isLoad ? "animate-pulse" : ""
          }`}
          onSubmit={searchGpt()}
        >
          <input
            type="text"
            value={word}
            disabled={isLoad}
            onChange={(e) => setword(e.currentTarget.value)}
            className="flex-grow p-2 mr-2 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!isLoad && (
            <button
              type="submit"
              disabled={isLoad}
              className="px-2 py-1 bg-green-600 rounded text-2xl hover:bg-green-700 transition duration-300"
            >
              <IoSend />
            </button>
          )}

          {isLoad && (
            <AiOutlineLoading className="animate-spin  text-2xl text-green-600" />
          )}
        </form>
        <small className="text-green text-xs">__________v1 1.99.99</small>
      </div>

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-2">
            Organizando tu palabra y haciendo magia
          </h1>
          <button
            onClick={() => setIsOpenModal(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
          >
            X
          </button>
        </div>
        {isLoadWordm && <p>Estamos trabajando en ello ...</p>}

        {isErrWord.length !== 0 && <p>Hubo un error</p>}

        {!isLoadWordm && (
          <>
            {/* @ts-ignore */}
            <WordCard word={activeWord} />

            <button
              onClick={() => saveWordDB(activeWord as Word)}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition duration-300"
            >
              Agregar Palabra
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}
