import axios from 'axios';
import {
	HISTORY_LIST_FAIL,
	HISTORY_LIST_REQUEST,
	HISTORY_LIST_SUCCESS,
	HISTORY_USER_FAIL,
	HISTORY_USER_LIST_FAIL,
	HISTORY_USER_LIST_REQUEST,
	HISTORY_USER_LIST_SUCCESS,
	HISTORY_USER_REQUEST,
	HISTORY_USER_SUCCESS,
	RESET_USER_DEVICE_FAIL,
	RESET_USER_DEVICE_REQUEST,
	RESET_USER_DEVICE_SUCCESS,
	UPDATE_BALANCE_FAIL,
	UPDATE_BALANCE_REQUEST,
	UPDATE_BALANCE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_EDIT_FAIL,
	USER_EDIT_REQUEST,
	USER_EDIT_SUCCESS,
	USER_UPDATE_PASSWORD_FAIL,
	USER_UPDATE_PASSWORD_REQUEST,
	USER_UPDATE_PASSWORD_SUCCESS,
	UPDATE_MULTI_BALANCE_REQUEST,
	UPDATE_MULTI_BALANCE_SUCCESS,
	UPDATE_MULTI_BALANCE_FAIL,
} from '../constants/history';

export const getAllHistories =
	(pageSize, page) => async (dispatch, getState) => {
		try {
			dispatch({ type: HISTORY_LIST_REQUEST });

			const {
				user: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: userInfo.token,
				},
			};

			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/v1/admin/history/all?pageSize=${pageSize}&page=${page}`,
				config
			);

			dispatch({
				type: HISTORY_LIST_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: HISTORY_LIST_FAIL,
				payload: err.response?.data.message
					? err.response.data.message
					: err.message,
			});
		}
	};

export const getUserHistory = userId => async (dispatch, getState) => {
	try {
		dispatch({ type: HISTORY_USER_REQUEST });

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		};

		const { data } = await axios.get(
			`${process.env.REACT_APP_API}/v1/admin/history/user?userId=${userId}`,
			config
		);

		dispatch({
			type: HISTORY_USER_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: HISTORY_USER_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const updateBalance =
	(userId, balance) => async (dispatch, getState) => {
		try {
			dispatch({ type: UPDATE_BALANCE_REQUEST });

			const {
				user: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: userInfo.token,
				},
			};

			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/v1/admin/balance`,
				{ userId, balance },
				config
			);

			dispatch({
				type: UPDATE_BALANCE_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: UPDATE_BALANCE_FAIL,
				payload: err.response?.data.message
					? err.response.data.message
					: err.message,
			});
		}
	};
export const resetStudentPassword =
	(userId, password) => async (dispatch, getState) => {
		try {
			dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });

			const {
				user: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: userInfo.token,
				},
			};

			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/v1/admin/resetStudentPassword`,
				{ id: userId, password },
				config
			);

			dispatch({
				type: USER_UPDATE_PASSWORD_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: USER_UPDATE_PASSWORD_FAIL,
				payload: err.response?.data.message
					? err.response.data.message
					: err.message,
			});
		}
	};

export const getAllUsersHistory =
	(pageSize, page, search) => async (dispatch, getState) => {
		try {
			dispatch({ type: HISTORY_USER_LIST_REQUEST });

			const {
				user: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: userInfo.token,
				},
			};

			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/v1/admin/users?pageSize=${pageSize}&page=${page}&search=${search}`,
				config
			);

			dispatch({
				type: HISTORY_USER_LIST_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: HISTORY_USER_LIST_FAIL,
				payload: err.response?.data.message
					? err.response.data.message
					: err.message,
			});
		}
	};

export const resetUserDevice = userId => async (dispatch, getState) => {
	try {
		dispatch({ type: RESET_USER_DEVICE_REQUEST });

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_API}/v1/admin/users/resetDeviceId`,
			{ userId },
			config
		);

		dispatch({
			type: RESET_USER_DEVICE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: RESET_USER_DEVICE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const editUser = (studentId, student) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_EDIT_REQUEST,
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
			`${process.env.REACT_APP_API}/v1/admin/student?studentId=${studentId}`,
			student,
			config
		);

		dispatch({
			type: USER_EDIT_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: USER_EDIT_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const deleteUser = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
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
			`${process.env.REACT_APP_API}/v1/admin/deleteStudent`,
			{ id },
			config
		);

		dispatch({
			type: USER_DELETE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const updateMultiBalance =
	(users, amount) => async (dispatch, getState) => {
		try {
			dispatch({
				type: UPDATE_MULTI_BALANCE_REQUEST,
			});

			const {
				user: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: userInfo.token,
				},
			};

			var emails = users.map(u => u.email);

			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/v1/admin/multiple-balance`,
				{ amount, emails },
				config
			);

			dispatch({
				type: UPDATE_MULTI_BALANCE_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: UPDATE_MULTI_BALANCE_FAIL,
				payload: err.response?.data.message
					? err.response.data.message
					: err.message,
			});
		}
	};
