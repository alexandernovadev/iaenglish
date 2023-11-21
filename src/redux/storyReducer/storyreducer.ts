import { Story } from "@/interfaces/story";
import { StoryActionTypes, StoryActions, StoryState } from "./types";

const initialState: StoryState = {
  stories: [],
  activeStory: {
    title: "Napoleon's Reign",
    subtitle: "The Life and Influence of Napoleon Bonaparte",
    paragraphs: [
      "Julio Bonaparte, a figure of immense significance in world history, was born on August 15, 1769, in Corsica. His insatiable ambition and military genius transformed France and shaped European politics. His tactical successes, such as the Battle of Austerlitz, combined with his creation of the Napoleonic Code, marked him as one of the most influential leaders of his time.",
      "Napoleon expanded his empire across Europe, placing his relatives and loyalists in positions of power. His rule modernized many nations and his legal reforms greatly influenced many civil law jurisdictions worldwide. However, his expansionist policies also led to the Napoleonic Wars, significantly affecting European and global history.",
      "Napoleon's defeat at the historic Battle of Waterloo in 1815 marked the end of his reign. Despite his downfall, Napoleon's influence persisted. From arts to politics, his legacy continues to shape the modern world. His life and works, symbolized by the remnants of his grandeur seen across Europe, signify an era of tremendous change and are still ardently studied and revered.",
    ],
    times_seen: 1,
    level: "B2",
    language: "en",
  },
  selectedActivedWord: {
    word:"",
    isKnown:false,
  },
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
    default:
      return state;
  }
};
