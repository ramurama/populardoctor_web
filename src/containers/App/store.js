import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { sidebarReducer, themeReducer, doctorReducer } from '../../redux/reducers/index';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
	sidebar: sidebarReducer,
	doctor: doctorReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
