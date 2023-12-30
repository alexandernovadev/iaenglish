import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode | React.ReactNode[];
}

export const Modal = ({ isOpen = false, setIsOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setTimeout(() => {}, 220);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      </div>
    </div>
  );
};
