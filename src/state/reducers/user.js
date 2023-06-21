import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from '../constants/user';

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
            }
        case LOGIN_SUCCESS:
            return {
                userInfo: action.payload,
                loading: false,
            }
        case LOGIN_FAIL:
            return {
                error: action.payload,
                loading: false,
            }
        case LOGOUT:
            return {}
        default:
            return state;
    }
}