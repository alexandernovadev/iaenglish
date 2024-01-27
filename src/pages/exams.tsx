import React from "react";
import TestComponent from "@/components/atoms/TestComponent";
import questions from "../../public/1_ExamB1.json";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Examtwo } from "@/components/atoms/Examtwo";
export const EmaxsPage = () => {
  return (
    <MainLayout>
      <Examtwo/>
    </MainLayout>
  );
};
export default EmaxsPage;
