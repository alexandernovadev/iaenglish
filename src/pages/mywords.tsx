import { WordCard } from "@/components/molecules/WordCard";
import { useGetWordsDb } from "@/hooks/word/useGetWordsDb";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";

const MywordPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);
  const { getWordsDB, words } =
    useGetWordsDb();

  useEffect(() => {
    getWordsDB({});
  }, []);

  useEffect(() => {
    const filtered = words.filter((word) =>
      // @ts-ignore
      word.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filtered);

    setFilteredWords(filtered);
  }, [searchTerm, words]);

  return (
    <div className="h-screen overflow-auto bg-gray-900 text-white p-8">
      <div className="sticky top-0 bg-gray-950 p-3 flex justify-between items-center">
        <NextLink href="/" passHref className="text-yellow-100 underline">
          {"<"} Go to Read
        </NextLink>

        <input
          type="text"
          placeholder="Seatch word ..."
          className="text-white bg-gray-700 w-[80%] p-1"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredWords.map((word, i) => (
          <WordCard key={i} word={word} />
        ))}
      </div>
    </div>
  );
};

export default MywordPage;
