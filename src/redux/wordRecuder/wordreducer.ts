import { Word } from "@/interfaces/word";
import { WordActionTypes, WordActions, WordState } from "./types";
import WordDict from "../../../public/englishdb_ai.words.json"


const initialState: WordState = {
  words: [],
  activeWord: null,
  selectedActivedWord: null,
  isLoad: false,
  isError: "",
};

export const wordReducer = (
  state: WordState = initialState,
  action: WordActions
): WordState => {
  switch (action.type) {
    case WordActionTypes.ADD_WORD:
      return {
        ...state,
        activeWord: action.payload,
        words: [...state.words, action.payload],
      };
    case WordActionTypes.IS_LOADING:
      return {
        ...state,
        isLoad: action.payload,
      };
    case WordActionTypes.IS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case WordActionTypes.SELECTED_ACTIVED_WORD:
      return {
        ...state,
        selectedActivedWord: action.payload,
      };
      case WordActionTypes.SET_ACTIVED_WORD:
        return {
          ...state,
          activeWord: action.payload,
        }; 
    default:
      return state;
  }
};
