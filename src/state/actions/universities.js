import axios from 'axios';
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

export const createUniversity = university => async (dispatch, getState) => {
	try {
		dispatch({
			type: UNIVERSITY_CREATE_REQUEST,
		});

		const {
			user: { userInfo },
		} = getState();

        const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.post(`${process.env.REACT_APP_API}/v1/admin/universities`, university, config);

		dispatch({
			type: UNIVERSITY_CREATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: UNIVERSITY_CREATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const getAllUniversities = () => async dispatch => {
	try {
		dispatch({ type: UNIVERSITY_LIST_REQUEST });

		const { data } = await axios.get(`${process.env.REACT_APP_API}/v1/universities`);

		dispatch({
			type: UNIVERSITY_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: UNIVERSITY_LIST_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const getUniversityFaculties = _id => async (dispatch, getState) => {
	try {
		dispatch({ type: UNIVERSITY_FACULTIES_LIST_REQUEST });

        const {
			user: { userInfo },
		} = getState();

        const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.get(`${process.env.REACT_APP_API}/v1/university/faculties?universityId=${_id}`, config);

		dispatch({
			type: UNIVERSITY_FACULTIES_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: UNIVERSITY_FACULTIES_LIST_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
}

export const updateUniversity = (universityId, name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UNIVERSITY_UPDATE_REQUEST,
        });

        const {
			user: { userInfo },
		} = getState();

        const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

        const { data } = await axios.put(`${process.env.REACT_APP_API}/v1/admin/university?universityId=${universityId}`, { name }, config);

        dispatch({
            type: UNIVERSITY_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
			type: UNIVERSITY_UPDATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
    }
}

export const deleteUniversity = universityId => async (dispatch, getState) => {
    try {
        dispatch({
            type: UNIVERSITY_DELETE_REQUEST,
        });

        const {
			user: { userInfo },
		} = getState();

        const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

        const { data } = await axios.delete(`${process.env.REACT_APP_API}/v1/admin/university?universityId=${universityId}`, config);

        dispatch({
            type: UNIVERSITY_DELETE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
			type: UNIVERSITY_DELETE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
    }
}