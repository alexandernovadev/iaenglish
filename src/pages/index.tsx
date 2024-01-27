import MultipleUniqueOptions from "@/components/questions/MultipleUniqueOptions";
import { OpenAnswer } from "@/components/questions/OpenAnwser";

const questions: string[] = [
  "has started",
  "will have started",
  "had started",
  "starts",
];

export default function Home() {
  const handleAnswers = (e: any) => {
    console.log("aui rta ", e);
  };

  return (
    <div className="p-4 overflow-auto h-[100vh]">
      <h1 className="text-4xl font-bold text-white-800 mb-2">
        Examen de Inglés
      </h1>
      <h2 className="text-2xl font-semibold text-white-700 mb-1">Level B2</h2>
      <h3 className="text-xl font-medium text-white-600 pb-4">
        Dificulty:{" "}
        <span className="bg-blue-500 text-grey-300 px-2 py-1 rounded-full text-sm">
          HARD
        </span>
      </h3>
      <MultipleUniqueOptions
        onChange={handleAnswers}
        title="  By the time we arrive at the theater, the play __________ ."
        questions={questions}
      />
      <MultipleUniqueOptions
        onChange={handleAnswers}
        title="  By the time we arrive at the theater, the play __________ ."
        questions={questions}
        multiple
      />

      <OpenAnswer
        onChange={handleAnswers}
        title={"Write a text using past tense about the "}
      />
    </div>
  );
}
