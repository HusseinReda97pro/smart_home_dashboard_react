import {
  ENROLL_REQUESTS_LIST_REQUEST,
  ENROLL_REQUESTS_LIST_SUCCESS,
  ENROLL_REQUESTS_LIST_FAIL,
  ENROLL_REQUESTS_UPDATE_REQUEST,
  ENROLL_REQUESTS_UPDATE_SUCCESS,
  ENROLL_REQUESTS_UPDATE_FAIL,
} from "../constants/enrollRequests";

export const enrollRequestsReducer = (
  state = { enrollRequests: [] },
  action
) => {
  switch (action.type) {
    case ENROLL_REQUESTS_LIST_REQUEST:
      return {
        ...state,
        enrollRequests: [],
        enrollRequestsLoading: true,
      };
    case ENROLL_REQUESTS_LIST_SUCCESS:
      return {
        ...state,
        enrollRequests: action.payload,
        enrollRequestsListLoading: false,
      };
    case ENROLL_REQUESTS_LIST_FAIL:
      return {
        ...state,
        enrollRequestsListError: action.payload,
        enrollRequestsListLoading: false,
      };
    case ENROLL_REQUESTS_UPDATE_REQUEST:
      return {
        ...state,
        enrollRequestsUpdateLoading: true,
        enrollRequestsUpdateSuccesss: false,
      };
    case ENROLL_REQUESTS_UPDATE_SUCCESS:
      return {
        ...state,
        enrollRequestsUpdateLoading: false,
        enrollRequestsUpdateSuccesss: true,
      };
    case ENROLL_REQUESTS_UPDATE_FAIL:
      return {
        ...state,
        enrollRequestsUpdateError: action.payload,
        enrollRequestsUpdateLoading: false,
      };
    default:
      return state;
  }
};
