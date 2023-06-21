import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants/user";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/admin/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.log({ err });
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: LOGOUT,
  });
};
