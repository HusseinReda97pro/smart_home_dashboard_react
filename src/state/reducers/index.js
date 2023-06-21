import { combineReducers } from "redux";

// reducers
import { userReducer } from "./user";
import { courseReducer, teachersReducer } from "./courses";
import { universityReducer } from "./universities";
import { facultyReducer } from "./faculties";
import { historyReducer } from "./history";
import { lessonReducer } from "./lessons";
import { typeReducer } from "./type";
import { enrollRequestsReducer } from "./enrollRequests";

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  university: universityReducer,
  faculty: facultyReducer,
  teacher: teachersReducer,
  history: historyReducer,
  lesson: lessonReducer,
  type: typeReducer,
  enrollRequests: enrollRequestsReducer,
});

export default rootReducer;
