import { all, fork } from "redux-saga/effects";
import { userSaga } from "./users/user.saga";
import { profileSaga } from "./profiles/profile.saga";
import { postSaga } from "./posts/post.saga";
import { developerSaga } from "./developers/developer.saga";

// Root Saga combines all sagas
export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(profileSaga),
    fork(postSaga),
    fork(developerSaga),
  ]);
}
