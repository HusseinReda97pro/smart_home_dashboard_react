import {
  LESSON_CREATE_REQUEST,
  LESSON_CREATE_SUCCESS,
  LESSON_CREATE_FAIL,
  LESSON_LIST_REQUEST,
  LESSON_LIST_SUCCESS,
  LESSON_LIST_FAIL,
  LESSON_SINGLE_REQUEST,
  LESSON_SINGLE_SUCCESS,
  LESSON_SINGLE_FAIL,
  LESSON_UPDATE_REQUEST,
  LESSON_UPDATE_SUCCESS,
  LESSON_UPDATE_FAIL,
  LESSON_EDIT_REQUEST,
  LESSON_EDIT_SUCCESS,
  LESSON_EDIT_FAIL,
  LESSON_STUDENTS_REQUEST,
  LESSON_STUDENTS_SUCCESS,
  LESSON_STUDENTS_FAIL,
} from "../constants/lesson";

export const lessonReducer = (
  state = {
    lessons: [],
    lesson: {},
    lessonStudents: [],
  },
  action
) => {
  switch (action.type) {
    // * lesson list
    case LESSON_LIST_REQUEST:
      return {
        ...state,
        lessonListLoading: true,
      };
    case LESSON_LIST_SUCCESS:
      return {
        ...state,
        lessons: action.payload,
        lessonListLoading: false,
      };
    case LESSON_LIST_FAIL:
      return {
        ...state,
        lessonListError: action.payload,
        lessonListLoading: false,
      };

    // * single lesson
    case LESSON_SINGLE_REQUEST:
      return {
        ...state,
        lessonSingleLoading: true,
      };
    case LESSON_SINGLE_SUCCESS:
      return {
        ...state,
        lesson: action.payload,
        lessonSingleLoading: false,
      };
    case LESSON_SINGLE_FAIL:
      return {
        ...state,
        lessonSingleError: action.payload,
        lessonSingleLoading: false,
      };

    // * lesson create
    case LESSON_CREATE_REQUEST:
      return {
        ...state,
        lessonCreateLoading: true,
      };
    case LESSON_CREATE_SUCCESS:
      return {
        ...state,
        lessons: [action.payload, ...state.lessons],
        lessonCreateSuccess: true,
        lessonCreateLoading: false,
      };
    case LESSON_CREATE_FAIL:
      return {
        ...state,
        lessonCreateError: action.payload,
        lessonCreateLoading: false,
      };

    // * lesson UPDATE
    case LESSON_UPDATE_REQUEST:
      return {
        ...state,
        lessonUpdateLoading: true,
      };
    case LESSON_UPDATE_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.map((lesson) =>
          lesson._id === action.payload._id
            ? { ...action.payload, enabled: action.payload.enabled }
            : lesson
        ),
        lessonUpdateSuccess: true,
        lessonUpdateLoading: false,
      };
    case LESSON_UPDATE_FAIL:
      return {
        ...state,
        lessonUpdateError: action.payload,
        lessonUpdateLoading: false,
      };

    // * lesson edit
    case LESSON_EDIT_REQUEST:
      return {
        ...state,
        lessonEditLoading: true,
      };
    case LESSON_EDIT_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.map((lesson) =>
          lesson._id === action.payload._id
            ? {
                ...action.payload,
                title: action.payload.title,
                description: action.payload.description,
                imageUrl: action.payload.imageUrl,
                videoUrl: action.payload.videoUrl,
                price: action.payload.price,
                pdfUrl: action.payload.pdfUrl,
                maxCount: action.payload.maxCount,
              }
            : lesson
        ),
        lessonEditSuccess: true,
        lessonEditLoading: false,
      };
    case LESSON_EDIT_FAIL:
      return {
        ...state,
        lessonEditError: action.payload,
        lessonEditLoading: false,
      };

    // * lesson students
    case LESSON_STUDENTS_REQUEST:
      return {
        ...state,
        lessonStudentsLoading: true,
      };
    case LESSON_STUDENTS_SUCCESS:
      return {
        ...state,
        lessonStudents: action.payload,
        lessonStudentsLoading: false,
      };
    case LESSON_STUDENTS_FAIL:
      return {
        ...state,
        lessonStudentsError: action.payload,
        lessonStudentsLoading: false,
      };
    default:
      return state;
  }
};
