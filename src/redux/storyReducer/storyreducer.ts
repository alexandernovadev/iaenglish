import { Story } from "@/interfaces/story";
import { StoryActionTypes, StoryActions, StoryState } from "./types";
import { ACTIVESTORY_MOCK, STORIES_MOCK } from "@/data/storymock";

const initialState: StoryState = {
  stories: STORIES_MOCK,
  activeStory: ACTIVESTORY_MOCK,
  selectedActivedWord: {
    word: "",
    isKnown: false,
  }, // ESTO NO DEBERIA ESTAR AQUI
  isLoad: false,
  isError: "",
};

export const storyReducer = (
  state: StoryState = initialState,
  action: StoryActions
): StoryState => {
  switch (action.type) {
    case StoryActionTypes.ADD_STORY:
      return {
        ...state,
        activeStory: action.payload,
        stories: [...state.stories, action.payload],
      };
    case StoryActionTypes.IS_LOADING:
      return {
        ...state,
        isLoad: action.payload,
      };
    case StoryActionTypes.IS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case StoryActionTypes.SELECTED_ACTIVED_WORD:
      return {
        ...state,
        selectedActivedWord: action.payload,
      };
    case StoryActionTypes.SET_ACTIVE_STORY:
      return {
        ...state,
        activeStory: action.payload,
      };
    default:
      return state;
  }
};
