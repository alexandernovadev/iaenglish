export interface Exam {
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title: string;
  questions: Question[];
  userChatWithGepeto: UserChatWithGepeto[];
}

export interface Question {
  id: string;
  type: string;
  title: string;
  htmlContent?: string;
  answer?: string;
  instruction?: string;
  feedback?: string;
  comments?: string;
  metadata?: Metadata;
  subtitle?: string;
  options?: string[];
  status?: "correct" | "wrong" | "unanswered" | "skipped" | 'could_improve';
}

export interface Metadata {
  time_limit: number;
  minimum_word_count?: number;
  maximum_word_count?: number;
  difficulty: string;
  topic_tags: string[];
  points: number;
  reference_material: string;
  adaptive_logic: AdaptiveLogic;
}

export interface AdaptiveLogic {
  if_wrong: string;
  if_correct: string;
}

export interface UserChatWithGepeto {
  id: string;
  role: string;
  text: string;
}
