import { combineReducers } from 'redux';
import tasks from './tasks-list';

const rootReducer = combineReducers({
  tasks
});

export default rootReducer;
