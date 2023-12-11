import React from "react";
import TestComponent from "@/components/atoms/TestComponent";
import questions from "../../public/1_ExamB1.json";
import { MainLayout } from "@/components/layouts/MainLayout";
export const EmaxsPage = () => {
  return (
    <MainLayout>
      <TestComponent questions={questions.questions} />
    </MainLayout>
  );
};
export default EmaxsPage;
