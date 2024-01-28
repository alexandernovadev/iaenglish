export interface Exam {
  id: string;
  title: string;
  difficulty: "HARD" | "MEDUIM" | "EASY";
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  score: number;
  questions: Question[];
}

export interface Question {
  id: string;
  title: string;
  type: "MULTIPLE" | "UNIQUE" | "OPENTEXT";
  options: string[];
  userAnswer?: string | null | string[];
  feedback?: Feedback;
  validations?: Validations;
}

export interface Feedback {
  feedback: string | null;
  status: "WELLDONE" | "SO-SO" | "WRONG" | null;
}

export interface Validations {
  required?: boolean;
  max?: number;
  min?: number;
}
