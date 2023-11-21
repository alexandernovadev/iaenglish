import { combineReducers } from 'redux';
import { storyReducer } from './storyreducer';

const rootReducer = combineReducers({
  story: storyReducer,
});

export default rootReducer;
