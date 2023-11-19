export interface Word {
  id?: string;
  es?: {
    word?: string;
    definition?: string;
  };
  word: string;
  ipa: string;
  type_word: string;
  definition_en?: string;
  definition_es?: string;
  examples?: string[];
  times_seen?: number;
  status: "GOOD" | "EASY" | "HARD" | "FAIL";
  img?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
