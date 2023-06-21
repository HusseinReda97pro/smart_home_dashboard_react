import {
    UNIVERSITY_CREATE_REQUEST,
    UNIVERSITY_CREATE_SUCCESS,
    UNIVERSITY_CREATE_FAIL,
    UNIVERSITY_LIST_REQUEST,
    UNIVERSITY_LIST_SUCCESS,
    UNIVERSITY_LIST_FAIL,
    UNIVERSITY_FACULTIES_LIST_REQUEST,
    UNIVERSITY_FACULTIES_LIST_SUCCESS,
    UNIVERSITY_FACULTIES_LIST_FAIL,
    UNIVERSITY_DELETE_REQUEST,
    UNIVERSITY_DELETE_SUCCESS,
    UNIVERSITY_DELETE_FAIL,
    UNIVERSITY_UPDATE_REQUEST,
    UNIVERSITY_UPDATE_SUCCESS,
    UNIVERSITY_UPDATE_FAIL,
} from '../constants/universities';

export const universityReducer = (
    state = {
        universities: [],
        universityFaculties: [],
        university: {},
    }, 
    action
) => {
	switch (action.type) {
        // * university list
		case UNIVERSITY_LIST_REQUEST:
			return {
                ...state,
				universityListLoading: true,
			};
		case UNIVERSITY_LIST_SUCCESS:
			return {
                ...state,
				universities: action.payload,
				universityListLoading: false,
			};
		case UNIVERSITY_LIST_FAIL:
			return {
                ...state,
				universityListError: action.payload,
				universityListLoading: false,
			};
        
        // * university create
        case UNIVERSITY_CREATE_REQUEST:
			return {
                ...state,
				universityCreateLoading: true,
			};
		case UNIVERSITY_CREATE_SUCCESS:
			return {
                ...state,
				universities: [action.payload, ...state.universities],
				universityCreateSuccess: true,
				universityCreateLoading: false,
			};
		case UNIVERSITY_CREATE_FAIL:
			return {
                ...state,
				universityCreateError: action.payload,
				universityCreateLoading: false,
			};

        // * university faculties list
		case UNIVERSITY_FACULTIES_LIST_REQUEST:
			return {
                ...state,
				universityFaculiesListLoading: true,
			};
		case UNIVERSITY_FACULTIES_LIST_SUCCESS:
			return {
                ...state,
				universityFaculties: action.payload,
				universityFaculiesListLoading: false,
			};
		case UNIVERSITY_FACULTIES_LIST_FAIL:
			return {
                ...state,
				universityFaculiesListError: action.payload,
				universityFaculiesListLoading: false,
			};

        // * university update
        case UNIVERSITY_UPDATE_REQUEST:
			return {
                ...state,
				universityUpdateLoading: true,
			};
		case UNIVERSITY_UPDATE_SUCCESS:
			return {
                ...state,
				universities: state.universities.map(university => university._id === action.payload._id ? { ...action.payload, name: action.payload.name } : university),
				universityUpdateSuccess: true,
				universityUpdateLoading: false,
			};
		case UNIVERSITY_UPDATE_FAIL:
			return {
                ...state,
				universityUpdateError: action.payload,
				universityUpdateLoading: false,
			};

        // * university delete
        case UNIVERSITY_DELETE_REQUEST:
			return {
                ...state,
				universityDeleteLoading: true,
			};
		case UNIVERSITY_DELETE_SUCCESS:
			return {
                ...state,
				universities: state.universities.filter(university => university._id !== action.payload._id),
				universityDeleteSuccess: true,
				universityDeleteLoading: false,
			};
		case UNIVERSITY_DELETE_FAIL:
			return {
                ...state,
				universityDeleteError: action.payload,
				universityDeleteLoading: false,
			};
		default:
			return state;
	}
}