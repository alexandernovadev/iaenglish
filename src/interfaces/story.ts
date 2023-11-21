export interface Story {
  id?: string;
  _id?: string;
  title?: string;
  subtitle?: string;
  topicUser?: string;
  paragraphs?: string[];
  notes?: string;
  img?: string;
  times_seen?: number;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  language: "es" | "en" | "pt";
  createdAt?: Date;
  updatedAt?: Date;
}
