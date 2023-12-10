import { ACADEMICTABLE, CONSONANT_SOUNDS, VOWELSOUNDS } from "@/data/sounds";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import NextLink from "next/link";
import TestComponent from "@/components/atoms/TestComponent";
import questions from "../../public/1_ExamB1.json";
import { MainLayout } from "@/components/layouts/MainLayout";
export const SoundsPage = () => {
  return (
    <MainLayout>
      <TestComponent questions={questions.questions} />
    </MainLayout>
  );
};
export default SoundsPage;
