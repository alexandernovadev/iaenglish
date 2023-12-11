import { Exam } from "./types";

interface ExamData {
  isLoaded?: boolean;
  isError?: boolean;
  isGraded?: boolean;
}

const initialState: Exam & ExamData = {
  difficulty: "A1",
  title: "",
  questions: [],
  userChatWithGepeto: [],
};
