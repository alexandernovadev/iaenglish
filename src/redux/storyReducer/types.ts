import { Story } from "@/interfaces/story";

export type StoryState = {
  stories: Story[];
  activeStory?: Story | null;
  selectedActivedWord?: {
    word: string;
    isKnown: boolean;
  };
  isLoad: boolean;
  isError: string;
};
export enum StoryActionTypes {
  ADD_STORY = "ADD_STORY",
  IS_LOADING = "IS_LOADING",
  IS_ERROR = "IS_ERROR",
  SELECTED_ACTIVED_WORD = "SELECTED_ACTIVED_WORD",
  SET_ACTIVE_STORY = "SET_ACTIVE_STORY",
}
export interface AddStoryAction {
  type: StoryActionTypes.ADD_STORY;
  payload: Story;
}

export interface IsLoadingAction {
  type: StoryActionTypes.IS_LOADING;
  payload: boolean;
}

export interface IsErrorAction {
  type: StoryActionTypes.IS_ERROR;
  payload: string;
}

export interface selectedActivedWordAction {
  type: StoryActionTypes.SELECTED_ACTIVED_WORD;
  payload: { word: string; isKnown: boolean };
}

export interface setActiveStoryAction {
  type: StoryActionTypes.SET_ACTIVE_STORY;
  payload: Story;
}

export type StoryActions =
  | AddStoryAction
  | IsLoadingAction
  | IsErrorAction
  | selectedActivedWordAction
  | setActiveStoryAction;
