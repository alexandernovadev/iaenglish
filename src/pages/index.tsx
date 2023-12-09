import { MainLayout } from "@/components/layouts/MainLayout";
import { useState } from "react";

const CodeColorWords = {
  know: "text-green-500",
  isUnKnow: "text-red-500",
};
export default function Home() {
  const [textConent] = useState(
    "La idea de qie react sea declarativo es que tu le dices a react que quieres que haga y react se encarga de manejar todos los cambios en el DOM"
  );


  const SearchWordInDb = (word: string) => {
    // Extract all word and remove duplicates
    const words = textConent.split(" ");
    const uniqueWords = Array.from(new Set(words));
    
    
  
  } 
  

  const renderWord = (word: string) => {
    return (
      <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
        {word}
      </span>
    );
  };

  return (
    <MainLayout>
      <div className="text-white">
        {/* Recorrer text and render word */}
        <div className="text-2xl">
          {textConent.split(" ").map((word, index) => (
            <span key={index}>{renderWord(word)} </span>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
