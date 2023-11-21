import { combineReducers } from "redux";
import { storyReducer } from "./storyReducer/storyreducer";
import { wordReducer } from "./wordRecuder/wordreducer";

const rootReducer = combineReducers({
  story: storyReducer,
  word: wordReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
