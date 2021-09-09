import AuthReducer from "./Authentication";
import UserReducer from "./UserDetails";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  authSignIn: AuthReducer,
  userDetails: UserReducer,
});

export default allReducers;