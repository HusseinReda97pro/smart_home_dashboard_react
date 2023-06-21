import axios from 'axios';
import {
	COURSE_CREATE_FAIL,
	COURSE_CREATE_REQUEST,
	COURSE_CREATE_SUCCESS,
	COURSE_LIST_FAIL,
	COURSE_LIST_REQUEST,
	COURSE_LIST_SUCCESS,
	COURSE_SINGLE_FAIL,
	COURSE_SINGLE_REQUEST,
	COURSE_SINGLE_SUCCESS,
	TEACHERS_LIST_FAIL,
	TEACHERS_LIST_REQUEST,
	TEACHERS_LIST_SUCCESS,
	COURSE_UPDATE_FAIL,
	COURSE_UPDATE_SUCCESS,
	COURSE_UPDATE_REQUEST,
	COURSE_ARCHIVE_REQUEST,
	COURSE_ARCHIVE_SUCCESS,
	COURSE_ARCHIVE_FAIL,
	COURSE_DELETE_REQUEST,
	COURSE_DELETE_SUCCESS,
	COURSE_DELETE_FAIL,
	COURSE_EDIT_REQUEST,
	COURSE_EDIT_SUCCESS,
	COURSE_EDIT_FAIL,
	TEACHERS_CREATE_FAIL,
	TEACHERS_CREATE_SUCCESS,
	TEACHERS_CREATE_REQUEST,
	COURSE_STUDENTS_REQUEST,
	COURSE_STUDENTS_SUCCESS,
	COURSE_STUDENTS_FAIL,
	TEACHERS_UPDATE_SUCCESS,
	TEACHERS_UPDATE_FAIL,
} from '../constants/courses';

export const createCourse = course => async (dispatch, getState) => {
	try {
		dispatch({
			type: COURSE_CREATE_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(`${process.env.REACT_APP_API}/v1/admin/courses`, course, config);

		dispatch({
			type: COURSE_CREATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: COURSE_CREATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const updateCourse = course => async (dispatch, getState) => {
	try {
		dispatch({
			type: COURSE_UPDATE_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.put(`${process.env.REACT_APP_API}/v1/admin/courses`, course, config);

		dispatch({
			type: COURSE_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: COURSE_UPDATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const archiveCourse = courseData => async (dispatch, getState) => {
	let { course } = courseData;
	try {
		dispatch({
			type: COURSE_ARCHIVE_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}


		const { data } = await axios.post(`${process.env.REACT_APP_API}/v1/admin/courses/archive/${course._id}?archived=${!course.archived}`, config);

		dispatch({
			type: COURSE_ARCHIVE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: COURSE_ARCHIVE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const getAllCourses = (level = '', type = '', archived = '') => async (dispatch, getState) => {
	console.log('getAllCourses ', archived);
	console.log(archived ? "true x" : 'false x');

	try {
		dispatch({ type: COURSE_LIST_REQUEST });

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.get(`${process.env.REACT_APP_API}/v1/admin/courses?${archived ? "archived=" + archived : ''}&level=${level}&type=${type}`, config);

		dispatch({
			type: COURSE_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: COURSE_LIST_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const getSingleCourse = id => async (dispatch, getState) => {
	try {
		dispatch({ type: COURSE_SINGLE_REQUEST });

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.get(`${process.env.REACT_APP_API}/v1/admin/courses/${id}`, config);

		dispatch({
			type: COURSE_SINGLE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: COURSE_SINGLE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const getAllTeachers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TEACHERS_LIST_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.get(`${process.env.REACT_APP_API}/v1/admin/teachers`, config);

		dispatch({
			type: TEACHERS_LIST_SUCCESS,
			payload: data,
		})
	} catch (err) {
		console.log({ err });
		dispatch({
			type: TEACHERS_LIST_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const createTeacher = teacher => async (dispatch, getState) => {
	try {
		dispatch({
			type: TEACHERS_CREATE_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.post(`${process.env.REACT_APP_API}/v1/teacher/signup`, teacher, config);

		dispatch({
			type: TEACHERS_CREATE_SUCCESS,
			payload: data,
		})
	} catch (err) {
		console.log({ err });
		dispatch({
			type: TEACHERS_CREATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const updateTeacher = (teacherId, teacher) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TEACHERS_CREATE_FAIL,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.put(`${process.env.REACT_APP_API}/v1/admin/teacher?teacherId=${teacherId}`, teacher, config);

		dispatch({
			type: TEACHERS_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (err) {
		console.log({ err });
		dispatch({
			type: TEACHERS_UPDATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const editCourse = course => async (dispatch, getState) => {
	try {
		dispatch({
			type: COURSE_EDIT_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.put(`${process.env.REACT_APP_API}/v1/admin/courses`, course, config);

		dispatch({
			type: COURSE_EDIT_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: COURSE_EDIT_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const deleteCourse = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: COURSE_DELETE_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.delete(`${process.env.REACT_APP_API}/v1/admin/courses/courseId`, config);

		dispatch({
			type: COURSE_DELETE_SUCCESS,
			payload: data,
		})
	} catch (err) {
		dispatch({
			type: COURSE_DELETE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const getCourseStudents = courseId => async (dispatch, getState) => {
	try {
		dispatch({
			type: COURSE_STUDENTS_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.get(`${process.env.REACT_APP_API}/v1/admin/course/students?courseId=${courseId}`, config);

		dispatch({
			type: COURSE_STUDENTS_SUCCESS,
			payload: data,
		})
	} catch (err) {
		console.log({ err });
		dispatch({
			type: COURSE_STUDENTS_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}