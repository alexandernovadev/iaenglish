import { combineReducers } from 'redux';
import { storyReducer } from './storyReducer/storyreducer';

const rootReducer = combineReducers({
  story: storyReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;