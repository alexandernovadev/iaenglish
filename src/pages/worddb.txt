import React, { useEffect, useState } from "react";
import Dictionary from "../../public/englishdb_ai.words.json";
import { WordCard } from "@/components/molecules/WordCard";
import { Word } from "@/interfaces/word";
import NextLink from "next/link";
import { FaAngleLeft } from "react-icons/fa";

const WordDbPage = () => {
  // Buscador
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filtersTypeWord, setFiltersTypeWord] = useState<any[]>([]);
  const [isShowOnlyWord, setIsShowOnlyWord] = useState(false);

  const [selectedType, setSelectedType] = useState(""); // New state for selected type
  const clearTypeFilter = () => {
    setSelectedType("");
    setSearchTerm("");
  };

  // Handle change for search
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  // Handle change for type filter
  const handleTypeChange = (event: any) => {
    setSelectedType(event.target.value);
  };

  // // Filtrar por tipo de palabra
  useEffect(() => {
    const types = Dictionary.map((word) => {
      return word.type_word;
    });

    const types2 = types.flat();
    const types3 = types2.map((type) => {
      return type.name;
    });
    // @ts-ignore
    const FiltroTypeVerb = [...new Set(types3)];

    setFiltersTypeWord(FiltroTypeVerb);
  }, []);

  useEffect(() => {
    const types = Dictionary.map((word) => word.type_word).flat();
    // @ts-ignore
    const uniqueTypes = [...new Set(types.map((type) => type.name))];
    setFiltersTypeWord(uniqueTypes);
  }, []);

  // Update search results
  useEffect(() => {
    let results = Dictionary.filter((word) =>
      word?.word?.toLowerCase().includes(searchTerm)
    );

    if (selectedType) {
      results = results.filter((word) =>
        word.type_word.some((type) => type.name === selectedType)
      );
    }

    results.sort((a, b) => a.word.localeCompare(b.word));
    // @ts-ignore
    setSearchResults(results);
  }, [searchTerm, selectedType]);

  return (
    <div className="w-full h-screen overflow-auto pt-2">
      <div className="flex justify-between items-center sticky top-0 w-full gap-2 px-4 bg-slate-800 py-3 ">
        <NextLink href="/" passHref className="text-purple-800 ">
          <FaAngleLeft style={{ fontSize: 32 }} />
        </NextLink>

        <h1 className="px-3 font-bold text-teal-500 ">
          {Dictionary.length} <b>WORDS</b>
        </h1>

        <label htmlFor="">ON</label>
        <input
          type="checkbox"
          id="showOnlyWord"
          name="showOnlyWord"
          checked={isShowOnlyWord}
          onChange={() => setIsShowOnlyWord(!isShowOnlyWord)}
        />

        <input
          className=" h-10 px-3  text-xl focus:outline-none bg-slate-500"
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleChange}
        />

        <select
          className="w-1/4 h-10 px-3  text-xl focus:outline-none bg-slate-800"
          name="type_word"
          id="type_word"
          onChange={handleTypeChange} // Use the new handler here
        >
          {filtersTypeWord.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        {(searchTerm || selectedType) && (
          <button
            onClick={clearTypeFilter}
            className="max-h-[25px] flex justify-center items-center rounded-xl bg-red-500 text-white  p-1"
          >
            X
          </button>
        )}
      </div>

      {searchResults.map((item, index) => {
        return (
          <div key={index}>
            {/* @ts-ignore */}
            <WordCard word={item as Word} isShowOnlyWord={isShowOnlyWord} />
          </div>
        );
      })}
    </div>
  );
};

export default WordDbPage;
