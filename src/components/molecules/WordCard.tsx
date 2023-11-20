import { MSG_NO_WORD } from "@/constanst/wordsCommon";
import { Word } from "@/interfaces/word";

interface Props {
  word: Word;
}
export const WordCard = ({ word }: Props) => {
  const speakWord = () => {
    const speech = new SpeechSynthesisUtterance(word.word);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-gray-800 text-white m-4">
      {word.word === MSG_NO_WORD ? (
        <div className="p-4">
          {word.word} -{" "}
          <span className="bg-yellow-800 rounded-full px-2 py-1 mr-2">
            {word.ipa}
          </span>
        </div>
      ) : (
        <>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 flex gap-2">
              {word.word}{" "}
              <span className="text-gray-400 text-sm">{word.ipa}</span>
              <span onClick={speakWord} className="cursor-pointer">
                {" "}
                🔊
              </span>
            </div>
            <span className="bg-yellow-800 rounded-full px-2 py-1 mr-2">
              {word.type_word}
            </span>
            <p className="text-gray-300 text-base mt-4">{word.definition}</p>
          </div>
          <ul className="px-6 list-disc">
            {word.examples?.map((example, index) => (
              <li key={index} className="text-gray-300 text-sm mb-1">
                {example}
              </li>
            ))}
          </ul>
          <div className="px-6 py-2">
            <details className="mb-2">
              <summary className="text-gray-300 cursor-pointer">
                Spanish (es)
              </summary>
              <p className="text-gray-400">
                <b>
                  <i>{word.es?.word}</i>
                </b>{" "}
                : {word.es?.definition}
              </p>
            </details>
            <details>
              <summary className="text-gray-300 cursor-pointer">
                Portuguese (pt)
              </summary>
              <p className="text-gray-400">
                <b>
                  <i>{word.pt?.word}</i>
                </b>
                : {word.pt?.definition}
              </p>
            </details>
          </div>
          <div className="px-6 py-2 text-gray-400 text-xs">
            <div>Times Seen: {word.times_seen}</div>
            <div>Status: {word.status}</div>
            {word.createdAt && word.updatedAt && (
              <>
                <div>
                  Created: {new Date(word.createdAt).toLocaleDateString()}
                </div>
                <div>
                  Updated: {new Date(word.updatedAt).toLocaleDateString()}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
