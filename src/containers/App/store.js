import { combineReducers, createStore, applyMiddleware } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import {
  sidebarReducer,
  themeReducer,
  doctorReducer,
  hospitalReducer,
  userReducer,
  scheduleReducer,
  fdUserReducer
} from "../../redux/reducers/index";
import thunk from "redux-thunk";

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  doctor: doctorReducer,
  hospital: hospitalReducer,
  user: userReducer,
  schedule: scheduleReducer,
  fduser: fdUserReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
