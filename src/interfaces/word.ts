export interface Word {
  id?: string;
  _id?: string;
  es?: {
    word?: string;
    definition?: string;
  };
  pt?: {
    word?: string;
    definition?: string;
  };
  word: string;
  ipa: string;
  type_word: string;
  definition?: string;
  examples?: string[];
  times_seen?: number;
  status: "GOOD" | "EASY" | "HARD" | "FAIL";
  img?: string;
  createdAt?: Date;
  updatedAt?: Date;
  note?:String
}
