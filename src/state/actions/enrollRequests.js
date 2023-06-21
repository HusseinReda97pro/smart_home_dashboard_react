import axios from "axios";
import {
  ENROLL_REQUESTS_LIST_REQUEST,
  ENROLL_REQUESTS_LIST_SUCCESS,
  ENROLL_REQUESTS_LIST_FAIL,
  ENROLL_REQUESTS_UPDATE_REQUEST,
  ENROLL_REQUESTS_UPDATE_SUCCESS,
  ENROLL_REQUESTS_UPDATE_FAIL,
} from "../constants/enrollRequests";

export const getAllEnrollRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENROLL_REQUESTS_LIST_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/admin/courses/requests`,
      config
    );

    dispatch({
      type: ENROLL_REQUESTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: ENROLL_REQUESTS_LIST_FAIL,
      payload: err.response?.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const updateEnrollRequest =
  (id, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ENROLL_REQUESTS_UPDATE_REQUEST,
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
        `${process.env.REACT_APP_API}/v1/admin/courses/requests`,
        { id, status },
        config
      );

      dispatch({
        type: ENROLL_REQUESTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.log({ err });
      dispatch({
        type: ENROLL_REQUESTS_UPDATE_FAIL,
        payload: err.response?.data.message
          ? err.response.data.message
          : err.message,
      });
    }
  };
