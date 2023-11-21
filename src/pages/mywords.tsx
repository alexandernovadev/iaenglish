import { WordCard } from "@/components/molecules/WordCard";
import { Filters, useGetWordsDb } from "@/hooks/word/useGetWordsDb";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { FaAngleLeft } from "react-icons/fa";

const MywordPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);
  const { getWordsDB, words, totaWords } = useGetWordsDb();

  useEffect(() => {
    getWordsDB({});
  }, []);

  useEffect(() => {
    const filters: Filters = {};
    if (searchTerm) {
      filters["search"] = searchTerm;
    }
    getWordsDB(filters);
  }, [searchTerm]);

  return (
    <div className="h-screen overflow-auto bg-gray-900 text-white p-8">
      <div className="sticky top-0 bg-gray-950 p-3 flex justify-between items-center">
        <NextLink
          href="/"
          passHref
          className="text-yellow-100 underline border-yellow-400 border rounded-3xl flex items-center justify-center"
        >
          <FaAngleLeft style={{ fontSize: 32 }} />
        </NextLink>
        <div className="text-lg text-yellow-200 font-semibold mx-4">
          Words : {totaWords}
        </div>
        <input
          type="text"
          value={searchTerm}
          placeholder={`Search word of words`}
          className="text-white bg-gray-700 w-[80%] p-1"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {words.map((word, i) => (
          <WordCard key={i} word={word} />
        ))}
      </div>
    </div>
  );
};

export default MywordPage;
