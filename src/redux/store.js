import {createStore, combineReducers} from 'redux';
import accountReducer from './reducer/accountReducer';

const rootReducer = combineReducers({
  account: accountReducer,
});

const mainStore = () => createStore(rootReducer);

export default mainStore;
