import { useStory } from "@/hooks/story/useStory";
import { RootState } from "@/redux/reducers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dictonary from "../../public/englishdb_ai.words.json";
import { Modal } from "@/components/molecules/Modal/Modal";

export default function Home() {
  const [word, setword] = useState("Historia de Napoleon ");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { getStoryFromGPT } = useStory();

  const dispatch = useDispatch();

  const { activeStory, isError, isLoad, selectedActivedWord } = useSelector(
    (state: RootState) => state.story
  );

  const searchGpt = () => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getStoryFromGPT(word);
  };

  const renderWord = (word: string, index: any) => {
    // Si la palabra existe en el diccionario de palabras debera ser verde si no rojo
    const wordLowerCase = word.toLocaleLowerCase();
    const wordExist = Dictonary.find(
      (word) => word.word.toLocaleLowerCase() === wordLowerCase
    );

    // Si la word tiene un punto al final o una coma se le quita, y se deja en unva variable aparte, pa
    // enviar la word limpia al dispatch y que se guarde en el store
    const wordClean = word.replace(/[.,]/g, "");

    return (
      <span
        key={`${index}-word`}
        className={`${
          wordExist ? "text-green-500" : "text-red-500"
        } cursor-pointer hover:underline`}
        onClick={() =>
          dispatch({
            type: "SELECTED_ACTIVED_WORD",
            payload: { word: wordClean, isKnown: wordExist },
          })
        }
      >
        {word}{" "}
      </span>
    );
  };
  const renderContent = (text: string, index: any) => {
    const textArray = text.split(" ");

    const news = textArray.map((word, index) => word.toLocaleLowerCase());
    const setUnique = new Set(news);

    return (
      <span key={`${index}-word`}>
        {textArray.map((word, index) => renderWord(word, index))}
      </span>
    );
  };

  return (
    <div className="w-full h-screen bg-slate-800 text-white overflow-hidden">
      <div className="flex flex-col h-full overflow-auto">
        <div className="flex-grow overflow-auto p-4">
          <section className="flex justify-between">
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
                {renderContent(paragraph, index)}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-2 bg-slate-700">
          <h1 className="flex-grow truncate">{selectedActivedWord?.word}</h1>
          <button
          onClick={() => setIsOpenModal(true)}
          className="w-1/5 px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
            Botón
          </button>
        </div>

        <form className="flex p-2" onSubmit={searchGpt()}>
          <input
            type="text"
            value={word}
            onChange={(e) => setword(e.currentTarget.value)}
            className="flex-grow p-2 mr-2 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoad}
            className="w-1/3 px-2 py-1 bg-green-600 rounded hover:bg-green-700 transition duration-300"
          >
            Enviar
          </button>
        </form>
        <small className="text-green text-xs">v1 1.09.1</small>
      </div>

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} >
        <h1 className="text-xl font-bold mb-2">Organizando tu palabra y haciendo magia</h1>
        <p>Tu contenido aquí {JSON.stringify(isOpenModal)}</p>

        <button
          onClick={() => setIsOpenModal(false)}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-red-700 transition duration-300"
        >
          Agregar Palabra
        </button>
      </Modal>
    </div>
  );
}
