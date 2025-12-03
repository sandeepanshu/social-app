import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./users/user.slice";
import profileReducer from "./profiles/profile.slice";
import developerReducer from "./developers/developer.slice";
import alertReducer from "./alerts/alert.slice";
import postsReducer from "./posts/post.slice";
import themeReducer from "./theme/theme.slice";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  developer: developerReducer,
  alerts: alertReducer,
  post: postsReducer,
  theme: themeReducer,
});

export default rootReducer;
