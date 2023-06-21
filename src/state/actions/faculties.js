import axios from 'axios';
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

export const createFaculty = faculty => async (dispatch, getState) => {
	try {
		dispatch({
			type: FACULTY_CREATE_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_API}/v1/admin/universities/faculties`,
			faculty,
			config
		);

		dispatch({
			type: FACULTY_CREATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: FACULTY_CREATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const updateFaculty =
	(facultyId, name) => async (dispatch, getState) => {
		try {
			dispatch({
				type: FACULTY_UPDATE_REQUEST,
			});

			const {
				user: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: userInfo.token,
				},
			};

			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/v1/admin/university/faculties?facultyId=${facultyId}`,
				{ name },
				config
			);

			dispatch({
				type: FACULTY_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: FACULTY_UPDATE_FAIL,
				payload: err.response?.data.message
					? err.response.data.message
					: err.message,
			});
		}
	};

export const getFacultyTypes = id => async (dispatch, getState) => {
	try {
		dispatch({ type: FACULTY_TYPES_REQUEST });

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		};

		const { data } = await axios.get(
			`${process.env.REACT_APP_API}/v1/admin/facultyTypes/${id}`,
			config
		);

		dispatch({
			type: FACULTY_TYPES_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: FACULTY_TYPES_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const deleteFaculty = facultyId => async (dispatch, getState) => {
	try {
		dispatch({
			type: FACULTY_DELETE_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		};

		const { data } = await axios.delete(
			`${process.env.REACT_APP_API}/v1/admin/university/faculties?facultyId=${facultyId}`,
			config
		);

		dispatch({
			type: FACULTY_DELETE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: FACULTY_DELETE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};
