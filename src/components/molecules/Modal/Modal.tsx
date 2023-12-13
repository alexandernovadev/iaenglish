import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  // Aquí puedes añadir props adicionales si es necesario
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode | React.ReactNode[];
}

export const Modal = ({ isOpen = false, setIsOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimatedOpen, setIsAnimatedOpen] = useState(isOpen);

  const closeModal = () => {
    setIsAnimatedOpen(false);

    // modalRef.current?.classList.remove("animate-fadeInRight");
    // modalRef.current?.classList.add("animate-fadeOutRight");
    setTimeout(() => {
    }, 220);
    setIsOpen(false);
  };

  // Detectar clics fuera del modal useCallback

  const handleClickOutside = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target as Node)) {
      closeModal();
    }
  };

  // Añadir y remover el listener
  useEffect(() => {
    // modalRef.current?.classList.add("animate-fadeInRight");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // modalRef.current?.classList.remove("animate-fadeInRight");
      // modalRef.current?.classList.remove("animate-fadeOutRight");
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-end">
      <div
        ref={modalRef}
        className={`bg-gray-800 p-5 rounded-md shadow-lg w-[90%] h-screen rounded-tl-3xl rounded-bl-3xl `}
      >
        {children}
        {/* <h2 className="text-xl font-bold mb-4">Título del Modal</h2>
        <p>Tu contenido aquí {JSON.stringify(isAnimatedOpen)}</p>

        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
        >
          Cerrar
        </button> */}
      </div>
    </div>
  );
};
