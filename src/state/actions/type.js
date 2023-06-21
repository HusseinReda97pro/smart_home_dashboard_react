import axios from 'axios';
import {
	TYPE_CREATE_FAIL,
	TYPE_CREATE_REQUEST,
	TYPE_CREATE_SUCCESS,
	TYPE_DELETE_FAIL,
	TYPE_DELETE_REQUEST,
	TYPE_DELETE_SUCCESS,
	TYPE_LIST_FAIL,
	TYPE_LIST_REQUEST,
	TYPE_LIST_SUCCESS,
	TYPE_UPDATE_FAIL,
	TYPE_UPDATE_REQUEST,
	TYPE_UPDATE_SUCCESS,
} from '../constants/type';

export const createType = name => async (dispatch, getState) => {
	try {
		dispatch({
			type: TYPE_CREATE_REQUEST,
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
			`${process.env.REACT_APP_API}/v1/admin/types`,
			name,
			config
		);

		dispatch({
			type: TYPE_CREATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: TYPE_CREATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const getAllTypes = () => async (dispatch, getState) => {
	try {
		dispatch({ type: TYPE_LIST_REQUEST });

		const {
			user: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		};

		const { data } = await axios.get(
			`${process.env.REACT_APP_API}/v1/admin/types`,
			config
		);

		dispatch({
			type: TYPE_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: TYPE_LIST_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const updateType = (name, id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TYPE_UPDATE_REQUEST,
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
			`${process.env.REACT_APP_API}/v1/admin/types`,
			{ name, id },
			config
		);

		dispatch({
			type: TYPE_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: TYPE_UPDATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const deleteType = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: TYPE_DELETE_REQUEST,
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
			`${process.env.REACT_APP_API}/v1/admin/types/${id}`,
			config
		);

		dispatch({
			type: TYPE_DELETE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: TYPE_DELETE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};
