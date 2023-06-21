import {
	HISTORY_LIST_REQUEST,
	HISTORY_LIST_SUCCESS,
	HISTORY_LIST_FAIL,
	UPDATE_BALANCE_REQUEST,
	UPDATE_BALANCE_SUCCESS,
	UPDATE_BALANCE_FAIL,
	HISTORY_USER_LIST_REQUEST,
	HISTORY_USER_LIST_SUCCESS,
	HISTORY_USER_LIST_FAIL,
	RESET_USER_DEVICE_REQUEST,
	RESET_USER_DEVICE_SUCCESS,
	RESET_USER_DEVICE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_EDIT_REQUEST,
	USER_EDIT_SUCCESS,
	USER_EDIT_FAIL,
	HISTORY_USER_REQUEST,
	HISTORY_USER_SUCCESS,
	HISTORY_USER_FAIL,
	USER_UPDATE_PASSWORD_REQUEST,
	USER_UPDATE_PASSWORD_SUCCESS,
	USER_UPDATE_PASSWORD_FAIL,
	UPDATE_MULTI_BALANCE_REQUEST,
	UPDATE_MULTI_BALANCE_SUCCESS,
	UPDATE_MULTI_BALANCE_FAIL,
} from '../constants/history';

export const historyReducer = (
	state = {
		histories: [],
		historyUsers: [],
	},
	action
) => {
	switch (action.type) {
		// * history list
		case HISTORY_LIST_REQUEST:
			return {
				...state,
				historyListLoading: true,
			};
		case HISTORY_LIST_SUCCESS:
			return {
				...state,
				histories: action.payload,
				historyListLoading: false,
			};
		case HISTORY_LIST_FAIL:
			return {
				...state,
				historyListError: action.payload,
				historyListLoading: false,
			};

		// * history list
		case HISTORY_USER_REQUEST:
			return {
				...state,
				historyUserLoading: true,
			};
		case HISTORY_USER_SUCCESS:
			return {
				...state,
				userHistory: action.payload,
				historyUserLoading: false,
			};
		case HISTORY_USER_FAIL:
			return {
				...state,
				historyUserError: action.payload,
				historyUserLoading: false,
			};

		// * update balance
		case UPDATE_BALANCE_REQUEST:
			return {
				...state,
				updateBalanceLoading: true,
				updateBalanceSuccess: false,
			};
		case UPDATE_BALANCE_SUCCESS:
			return {
				...state,
				updateBalanceSuccess: true,
				updateBalanceLoading: false,
			};
		case UPDATE_BALANCE_FAIL:
			return {
				...state,
				updateBalanceError: action.payload,
				updateBalanceLoading: false,
				updateBalanceSuccess: false,
			};
			
		// * update password
		case USER_UPDATE_PASSWORD_REQUEST:
			return {
				...state,
				updatePasswordLoading: true,
				updatePasswordSuccess: false,
			};
		case USER_UPDATE_PASSWORD_SUCCESS:
			return {
				...state,
				updatePasswordSuccess: true,
				updatePasswordLoading: false,
			};
		case USER_UPDATE_PASSWORD_FAIL:
			return {
				...state,
				updatePasswordError: action.payload,
				updatePasswordLoading: false,
				updatePasswordSuccess: false,
			};

		// * history list
		case HISTORY_USER_LIST_REQUEST:
			return {
				...state,
				historyUserListLoading: true,
			};
		case HISTORY_USER_LIST_SUCCESS:
			return {
				...state,
				historyUsers: action.payload,
				historyUserListLoading: false,
			};
		case HISTORY_USER_LIST_FAIL:
			return {
				...state,
				historyUserListError: action.payload,
				historyUserListLoading: false,
			};

		// * reset device
		case RESET_USER_DEVICE_REQUEST:
			return {
				...state,
				resetUserDeviceLoading: true,
				resetUserDeviceSuccess: false,
			};
		case RESET_USER_DEVICE_SUCCESS:
			return {
				...state,
				resetData: action.payload,
				resetUserDeviceSuccess: true,
				resetUserDeviceLoading: false,
			};
		case RESET_USER_DEVICE_FAIL:
			return {
				...state,
				resetUserDeviceError: action.payload,
				resetUserDeviceLoading: false,
				resetUserDeviceSuccess: false,
			};

		// * user edit
		case USER_EDIT_REQUEST:
			return {
				...state,
				userEditLoading: true,
				userEditSuccess: false,
			};
		case USER_EDIT_SUCCESS:
			return {
				...state,
				// historyUsers: state.historyUsers.map(historyUser => historyUser._id === action.payload._id ? {
				//     ...action.payload,
				//     firstName: action.payload.firstName,
				//     lastName: action.payload.lastName,
				//     email: action.payload.email,
				//     balance: action.payload.balance,
				//     phoneNumber: action.payload.phoneNumber,
				//     enabled: action.payload.enabled,
				// } : historyUser),
				userEditSuccess: true,
				userEditLoading: false,
			};
		case USER_EDIT_FAIL:
			return {
				...state,
				userEditError: action.payload,
				userEditLoading: false,
				userEditSuccess: false,
			};

		// * user delete
		case USER_DELETE_REQUEST:
			return {
				...state,
				userDeleteLoading: true,
			};
		case USER_DELETE_SUCCESS:
			return {
				...state,
				historyUsers: state.historyUsers.filter(
					historyUser => historyUser._id !== action.payload._id
				),
				userDeleteSuccess: true,
				userDeleteLoading: false,
			};
		case USER_DELETE_FAIL:
			return {
				...state,
				userDeleteError: action.payload,
				userDeleteLoading: false,
			};
		case UPDATE_MULTI_BALANCE_REQUEST:
			return {
				...state,
				updateMultiBalanceLoading: true,
				updateMultiBalanceSuccess: false,
			};
		case UPDATE_MULTI_BALANCE_SUCCESS:
			return {
				...state,
				updateMultiBalanceSuccess: true,
				updateMultiBalanceLoading: false,
			};
		case UPDATE_MULTI_BALANCE_FAIL:
			return {
				...state,
				updateMultiBalanceError: action.payload,
				updateMultiBalanceLoading: false,
				updateMultiBalanceSuccess: false,
			};
		default:
			return state;
	}
};
