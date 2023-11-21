import { Word } from "@/interfaces/word";

export type WordState = {
  words: Word[];
  activeWord?: Word | null | WordTemp;
  selectedActivedWord?: Word | null | WordTemp;
  isLoad: boolean;
  isError: string;
};
export enum WordActionTypes {
  ADD_WORD = "ADD_WORD",
  IS_LOADING = "IS_LOADING",
  IS_ERROR = "IS_ERROR",
  SELECTED_ACTIVED_WORD = "SELECTED_ACTIVED_WORD",
  SET_ACTIVED_WORD = "SET_ACTIVED_WORD",
}
export interface AddWordAction {
  type: WordActionTypes.ADD_WORD;
  payload: Word;
}

export interface IsLoadingAction {
  type: WordActionTypes.IS_LOADING;
  payload: boolean;
}

export interface IsErrorAction {
  type: WordActionTypes.IS_ERROR;
  payload: string;
}

export interface selectedActivedWordAction {
  type: WordActionTypes.SELECTED_ACTIVED_WORD;
  payload: Word | null | WordTemp;
}

export interface setActivedWordAction {
  type: WordActionTypes.SET_ACTIVED_WORD;
  payload: Word | null | WordTemp;
}

export type WordActions =
  | AddWordAction
  | IsLoadingAction
  | IsErrorAction
  | selectedActivedWordAction
  | setActivedWordAction;
// Teemp

export interface WordTemp {
  _id: ID;
  es: Es;
  pt: Es;
  word: string;
  ipa: string;
  type_word: TypeWord[];
  definition: string;
  examples: string[];
  times_seen: number;
  status: string;
  createdAt: AtedAt;
  updatedAt: AtedAt;
  __v: number;
}

export interface ID {
  $oid: string;
}

export interface AtedAt {
  $date: Date;
}

export interface Es {
  word: string;
  definition: string;
}

export interface TypeWord {
  name: string;
  sigle: string;
  description: string;
}
