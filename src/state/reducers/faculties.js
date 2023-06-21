import {
	FACULTY_CREATE_REQUEST,
	FACULTY_CREATE_SUCCESS,
	FACULTY_CREATE_FAIL,
	FACULTY_UPDATE_REQUEST,
	FACULTY_UPDATE_SUCCESS,
	FACULTY_UPDATE_FAIL,
	FACULTY_DELETE_REQUEST,
	FACULTY_DELETE_SUCCESS,
	FACULTY_DELETE_FAIL,
	FACULTY_TYPES_REQUEST,
	FACULTY_TYPES_SUCCESS,
	FACULTY_TYPES_FAIL,
} from '../constants/faculties';

export const facultyReducer = (
	state = {
		faculties: [],
		faculty: {},
	},
	action
) => {
	switch (action.type) {
		// * faculty create
		case FACULTY_CREATE_REQUEST:
			return {
				...state,
				facultyCreateLoading: true,
			};
		case FACULTY_CREATE_SUCCESS:
			return {
				...state,
				faculties: [...state.faculties, action.payload],
				facultyCreateSuccess: true,
				facultyCreateLoading: false,
			};
		case FACULTY_CREATE_FAIL:
			return {
				...state,
				facultyCreateError: action.payload,
				facultyCreateLoading: false,
			};

		// * faculy types
		case FACULTY_TYPES_REQUEST:
			return {
				...state,
				facultyTypesLoading: true,
			};
		case FACULTY_TYPES_SUCCESS:
			return {
				...state,
				facultyTypes: action.payload,
				facultyTypesLoading: false,
			};
		case FACULTY_TYPES_FAIL:
			return {
				...state,
				facultyTypesError: action.payload,
				facultyTypesLoading: false,
			};

		// * faculty update
		case FACULTY_UPDATE_REQUEST:
			return {
				...state,
				facultyUpdateLoading: true,
			};
		case FACULTY_UPDATE_SUCCESS:
			return {
				...state,
				faculties: state.faculties.map(faculty =>
					faculty._id === action.payload._id
						? { ...action.payload, name: action.payload.name }
						: faculty
				),
				facultyUpdateSuccess: true,
				facultyUpdateLoading: false,
			};
		case FACULTY_UPDATE_FAIL:
			return {
				...state,
				facultyUpdateError: action.payload,
				facultyUpdateLoading: false,
			};

		// * faculty delete
		case FACULTY_DELETE_REQUEST:
			return {
				...state,
				facultyDeleteLoading: true,
			};
		case FACULTY_DELETE_SUCCESS:
			return {
				...state,
				faculties: state.faculties.filter(
					faculty => faculty._id !== action.payload._id
				),
				facultyDeleteSuccess: true,
				facultyDeleteLoading: false,
			};
		case FACULTY_DELETE_FAIL:
			return {
				...state,
				facultyDeleteError: action.payload,
				facultyDeleteLoading: false,
			};
		default:
			return state;
	}
};
