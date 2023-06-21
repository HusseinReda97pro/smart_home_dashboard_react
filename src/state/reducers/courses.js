import {
	COURSE_CREATE_REQUEST,
	COURSE_CREATE_SUCCESS,
	COURSE_CREATE_FAIL,
	COURSE_LIST_REQUEST,
	COURSE_LIST_SUCCESS,
	COURSE_LIST_FAIL,
	COURSE_SINGLE_REQUEST,
	COURSE_SINGLE_SUCCESS,
	COURSE_SINGLE_FAIL,
	TEACHERS_LIST_REQUEST,
	TEACHERS_LIST_SUCCESS,
	TEACHERS_LIST_FAIL,
	COURSE_UPDATE_REQUEST,
	COURSE_UPDATE_SUCCESS,
	COURSE_UPDATE_FAIL,
	COURSE_ARCHIVE_REQUEST,
	COURSE_ARCHIVE_SUCCESS,
	COURSE_ARCHIVE_FAIL,
	COURSE_DELETE_REQUEST,
	COURSE_DELETE_SUCCESS,
	COURSE_DELETE_FAIL,
	COURSE_EDIT_REQUEST,
	COURSE_EDIT_SUCCESS,
	COURSE_EDIT_FAIL,
	TEACHERS_CREATE_REQUEST,
	TEACHERS_CREATE_SUCCESS,
	TEACHERS_CREATE_FAIL,
	COURSE_STUDENTS_REQUEST,
	COURSE_STUDENTS_SUCCESS,
	COURSE_STUDENTS_FAIL,
	TEACHERS_UPDATE_REQUEST,
	TEACHERS_UPDATE_SUCCESS,
	TEACHERS_UPDATE_FAIL,
} from '../constants/courses';

export const courseReducer = (
	state = {
		courses: [],
		course: {},
		courseStudents: [],
	},
	action
) => {
	switch (action.type) {
		// * course list
		case COURSE_LIST_REQUEST:
			return {
				...state,
				courseListLoading: true,
			};
		case COURSE_LIST_SUCCESS:
			return {
				...state,
				courses: action.payload,
				courseListLoading: false,
			};
		case COURSE_LIST_FAIL:
			return {
				...state,
				courseListError: action.payload,
				courseListLoading: false,
			};

		// * single course
		case COURSE_SINGLE_REQUEST:
			return {
				...state,
				courseSingleLoading: true,
			};
		case COURSE_SINGLE_SUCCESS:
			return {
				...state,
				course: action.payload,
				courseSingleLoading: false,
			};
		case COURSE_SINGLE_FAIL:
			return {
				...state,
				courseSingleError: action.payload,
				courseSingleLoading: false,
			};

		// * course create
		case COURSE_CREATE_REQUEST:
			return {
				...state,
				courseCreateLoading: true,
			};
		case COURSE_CREATE_SUCCESS:
			return {
				...state,
				courses: [action.payload, ...state.courses],
				courseCreateSuccess: true,
				courseCreateLoading: false,
			};
		case COURSE_CREATE_FAIL:
			return {
				...state,
				courseCreateError: action.payload,
				courseCreateLoading: false,
			};

		// * course UPDATE
		case COURSE_UPDATE_REQUEST:
			return {
				...state,
				courseUpdateLoading: true,
			};
		case COURSE_UPDATE_SUCCESS:
			return {
				...state,
				courses: state.courses.map(course =>
					course._id === action.payload._id
						? {
							...action.payload,
							enabled: action.payload.enabled,
						}
						: course
				),
				courseUpdateSuccess: true,
				courseUpdateLoading: false,
			};
		case COURSE_UPDATE_FAIL:
			return {
				...state,
				courseUpdateError: action.payload,
				courseUpdateLoading: false,
			};

		// * course Archive
		case COURSE_ARCHIVE_REQUEST:
			return {
				...state,
				courseUpdateLoading: true,
			};
		case COURSE_ARCHIVE_SUCCESS:
			console.log(action.payload)
			return {
				...state,
				courses: state.courses.filter(course =>
					course._id !== action.payload._id

					// ? {
					// 	...action.payload,
					// 	archived: action.payload.archived,
					// }
					// : course
				),
				courseUpdateSuccess: true,
				courseUpdateLoading: false,
			};
		case COURSE_ARCHIVE_FAIL:
			return {
				...state,
				courseUpdateError: action.payload,
				courseUpdateLoading: false,
			};

		// * course edit
		case COURSE_EDIT_REQUEST:
			return {
				...state,
				courseEditLoading: true,
			};
		case COURSE_EDIT_SUCCESS:
			return {
				...state,
				courses: state.courses.map(course =>
					course._id === action.payload._id
						? {
							...action.payload,
							title: action.payload.title,
							description: action.payload.description,
							imageUrl: action.payload.imageUrl,
							label: action.payload.label,
							level: action.payload.level,
							type: action.payload.type,
						}
						: course
				),
				courseEditSuccess: true,
				courseEditLoading: false,
			};
		case COURSE_EDIT_FAIL:
			return {
				...state,
				courseEditError: action.payload,
				courseEditLoading: false,
			};

		// * course Delete
		case COURSE_DELETE_REQUEST:
			return {
				...state,
				courseDeleteLoading: true,
			};
		case COURSE_DELETE_SUCCESS:
			return {
				...state,
				courses: state.course.filter(
					course => course._id !== action.payload._id
				),
				courseDeleteSuccess: true,
				courseDeleteLoading: false,
			};
		case COURSE_DELETE_FAIL:
			return {
				...state,
				courseDeleteError: action.payload,
				courseDeleteLoading: false,
			};

		// * course students
		case COURSE_STUDENTS_REQUEST:
			return {
				...state,
				courseStudentsLoading: true,
			};
		case COURSE_STUDENTS_SUCCESS:
			return {
				...state,
				courseStudents: action.payload,
				courseStudentsLoading: false,
			};
		case COURSE_STUDENTS_FAIL:
			return {
				...state,
				courseStudentsError: action.payload,
				courseStudentsLoading: false,
			};

		default:
			return state;
	}
};

export const teachersReducer = (
	state = {
		teachers: [],
	},
	action
) => {
	switch (action.type) {
		// * get teachers
		case TEACHERS_LIST_REQUEST:
			return {
				...state,
				teacherListLoading: true,
			};
		case TEACHERS_LIST_SUCCESS:
			return {
				...state,
				teachers: action.payload,
				teacherListLoading: false,
			};
		case TEACHERS_LIST_FAIL:
			return {
				...state,
				teacherListError: action.payload,
				teacherListLoading: false,
			};
		// * create teachers
		case TEACHERS_CREATE_REQUEST:
			return {
				...state,
				teacherCreateLoading: true,
			};
		case TEACHERS_CREATE_SUCCESS:
			return {
				...state,
				teachers: [action.payload, ...state.teachers],
				teacherCreateSuccess: true,
				teacherCreateLoading: false,
			};
		case TEACHERS_CREATE_FAIL:
			return {
				...state,
				teacherCreateError: action.payload,
				teacherCreateLoading: false,
				teacherCreateSuccess: false,
			};

		// * update teachers
		case TEACHERS_UPDATE_REQUEST:
			return {
				...state,
				teacherUpdateLoading: true,
			};
		case TEACHERS_UPDATE_SUCCESS:
			return {
				...state,
				teachers: state.teachers.map(teacher =>
					teacher._id === action.payload._id
						? {
							...action.payload,
							firstName: action.payload.firstName,
							lastName: action.payload.lastName,
							email: action.payload.email,
							phoneNumber: action.payload.phoneNumber,
							password: action.payload.password,
						}
						: teacher
				),
				teacherUpdateSuccess: true,
				teacherUpdateLoading: false,
			};
		case TEACHERS_UPDATE_FAIL:
			return {
				...state,
				teacherUpdateError: action.payload,
				teacherUpdateLoading: false,
				teacherUpdateSuccess: false,
			};
		default:
			return state;
	}
};
