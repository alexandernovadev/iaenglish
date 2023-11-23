import React, { useEffect, useState } from "react";
import Dictionary from "../../public/englishdb_ai.words.json";
import { WordCard } from "@/components/molecules/WordCard";
import { Word } from "@/interfaces/word";

const WordDbPage = () => {
  // Buscador
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filtersTypeWord, setFiltersTypeWord] = useState<any[]>([]);

  // Funcion filtrar
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  // // Filtrar por tipo de palabra
  // useEffect(() => {
  //   const types = Dictionary.map((word) => {
  //     return word.type_word;
  //   });

  //   const types2 = types.flat();
  //   const types3 = types2.map((type) => {
  //     return type.name;
  //   });
  //   // @ts-ignore
  //   const FiltroTypeVerb = [...new Set(types3)];

  //   setFiltersTypeWord(FiltroTypeVerb);
  // }, []);

  useEffect(() => {
    const results = Dictionary.filter((word) =>
      word?.word?.toLowerCase().includes(searchTerm)
    );

    // // Ordenar por palabra
    // results.sort((a, b) => {
    //   if (a.word < b.word) {
    //     return -1;
    //   }
    //   if (a.word > b.word) {
    //     return 1;
    //   }
    //   return 0;
    // });
    // @ts-ignore
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="w-full h-screen overflow-auto pt-2">
      <div className="flex justify-center items-center sticky top-0 w-full ">
        <input
          className=" h-10 px-3  text-xl focus:outline-none bg-slate-500"
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleChange}
        />

        <select
          className="w-1/4 h-10 px-3  text-xl focus:outline-none bg-slate-500"
          name="type_word"
          id="type_word"
        >
          {filtersTypeWord.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>

      </div>

      {searchResults.map((item, index) => {
        return (
          <div key={index}>
            {/* @ts-ignore */}
            <WordCard word={item as Word} />
          </div>
        );
      })}
    </div>
  );
};

export default WordDbPage;
