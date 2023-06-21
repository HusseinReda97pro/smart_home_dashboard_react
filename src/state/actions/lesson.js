import axios from 'axios';
import {
    LESSON_LIST_REQUEST,
    LESSON_LIST_SUCCESS,
    LESSON_LIST_FAIL,
    LESSON_CREATE_REQUEST,
    LESSON_CREATE_SUCCESS,
    LESSON_CREATE_FAIL,
    LESSON_EDIT_REQUEST,
    LESSON_EDIT_SUCCESS,
    LESSON_EDIT_FAIL,
    LESSON_STUDENTS_REQUEST,
    LESSON_STUDENTS_SUCCESS,
    LESSON_STUDENTS_FAIL,
} from '../constants/lesson';

export const getCourseLessons = courseId => async (dispatch, getState) => {
    try {
        dispatch({
            type: LESSON_LIST_REQUEST,
        });

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: userInfo.token,
            },
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API}/v1/admin/course/lessons?courseId=${courseId}`, config);

        dispatch({
            type: LESSON_LIST_SUCCESS,
            payload: data,
        })
    } catch (err) {
        console.log({ err });
        dispatch({
            type: LESSON_LIST_FAIL,
            payload: err.response?.data.message
                ? err.response.data.message
                : err.message,
        });
    }
}

export const createLesson = lesson => async (dispatch, getState) => {
    try {
        dispatch({
            type: LESSON_CREATE_REQUEST,
        });

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: userInfo.token,
            },
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API}/v1/admin/courses/lesson`, lesson, config);

        dispatch({
            type: LESSON_CREATE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        console.log({ err });
        dispatch({
            type: LESSON_CREATE_FAIL,
            payload: err.response?.data.message
                ? err.response.data.message
                : err.message,
        });
    }
}

export const editLesson = lesson => async (dispatch, getState) => {
    try {
        dispatch({
            type: LESSON_EDIT_REQUEST,
        });

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: userInfo.token,
            },
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/v1/admin/courses/lesson`, lesson, config);

        dispatch({
            type: LESSON_EDIT_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: LESSON_EDIT_FAIL,
            payload: err.response?.data.message
                ? err.response.data.message
                : err.message,
        });
    }
}

export const getLessonStudents = (courseId, lessonId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LESSON_STUDENTS_REQUEST,
        });

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: userInfo.token,
            },
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API}/v1/admin/courses/lesson/students?courseId=${courseId}&lessonId=${lessonId}`, config);

        dispatch({
            type: LESSON_STUDENTS_SUCCESS,
            payload: data,
        })
    } catch (err) {
        console.log({ err });
        dispatch({
            type: LESSON_STUDENTS_FAIL,
            payload: err.response?.data.message
                ? err.response.data.message
                : err.message,
        });
    }
}