import { ACADEMICTABLE, CONSONANT_SOUNDS, VOWELSOUNDS } from "@/data/sounds";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import NextLink from "next/link";

export const SoundsPage = () => {
  return (
    <div className="bg-gray-800 p-6 min-h-screen">
      <div className="sticky top-0 bg-gray-900 shadow-lg p-2 mb-4 flex items-center justify-start">
        <NextLink href="/" passHref className="flex">
          <IoMdArrowRoundBack className="text-yellow-400 text-2xl mr-2" />
          <span className="text-white font-semibold">Volver</span>
        </NextLink>
      </div>
      <h3 className="text-3xl font-bold text-yellow-400 mb-4">
        Tabla de Sonidos del Inglés
      </h3>
      <div className="mb-8">
        <h4 className="text-2xl text-green-300 mb-2">Vocales</h4>
        <ol className="list-decimal list-inside bg-gray-700 p-4 rounded-md">
          {VOWELSOUNDS.map((soundItem, index) => (
            <li key={index} className="text-lg text-white mb-2">
              <strong className="text-pink-500 text-2xl">
                {soundItem.sound}
              </strong>{" "}
              - {soundItem.description}
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-8">
        <h4 className="text-2xl text-green-300 mb-2">Consonantes</h4>
        <ol className="list-decimal list-inside bg-gray-700 p-4 rounded-md">
          {CONSONANT_SOUNDS.map((soundItem, index) => (
            <li key={index} className="text-lg text-white mb-2">
              <strong className="text-pink-500 text-2xl">
                {soundItem.sound}
              </strong>{" "}
              - {soundItem.description}
            </li>
          ))}
        </ol>
      </div>

      <h3 className="text-3xl font-bold text-yellow-400 mb-4">
        Tabla Académica en el Aprendizaje del Inglés
      </h3>
      <div className="bg-gray-700 p-4 rounded-md">
        {ACADEMICTABLE.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="text-purple-500 text-2xl font-bold mb-1">
              {item.topic}
            </div>
            <div className="text-lg text-white">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SoundsPage;
