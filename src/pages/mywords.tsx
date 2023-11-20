import { WordCard } from "@/components/molecules/WordCard";
import { useGetWordsDb } from "@/hooks/word/useGetWordsDb";
import React, { useEffect } from "react";
import NextLink from "next/link";

const mywordPage = () => {
  const { getWordsDB, isErrorGetWord, isLoadingGetWord, words } =
    useGetWordsDb();

  useEffect(() => {
    getWordsDB({});
  }, []);

  return (
    <div className="h-screen overflow-auto bg-gray-900 text-white p-8">
      <div className="sticky top-0 bg-gray-950 p-3">
        <NextLink href="/" passHref>
          Go to Read
        </NextLink>
      </div>

      <div className="flex flex-wrap justify-center">
        {words.map((word, i) => (
          <WordCard key={i} word={word} />
        ))}
      </div>
    </div>
  );
};

export default mywordPage;
