import { combineReducers } from "redux";
import statusLogin from "./login";
import setToken from "./setToken";
import infoUser from "./infoUsers";

const allReducer = combineReducers({
  statusLogin,
  setToken,
  infoUser,
});


export default allReducer 