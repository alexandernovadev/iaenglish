const initialState = {
  stories: [],
  activeStory: null,
  selecteActivedWord: "",
  isLoad: false,
  isError: "",
};

export const storyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_STORY":
      return {
        ...state,
        stories: [...state.stories, action.payload],
      };
    case "IS_LOADING":
      return {
        ...state,
        isLoad: action.payload,
      };
      case "IS_ERROR":
        return {
          ...state,
          isError: action.payload,
        };
    default:
      return state;
  }
};
