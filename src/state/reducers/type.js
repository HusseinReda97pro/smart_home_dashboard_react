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

export const typeReducer = (
	state = {
		types: [],
		type: {},
	},
	action
) => {
	switch (action.type) {
		// * type create
		case TYPE_CREATE_REQUEST:
			return {
				...state,
				typeCreateLoading: true,
			};
		case TYPE_CREATE_SUCCESS:
			return {
				...state,
				types: [...state.types, action.payload],
				typeCreateSuccess: true,
				typeCreateLoading: false,
			};
		case TYPE_CREATE_FAIL:
			return {
				...state,
				typeCreateError: action.payload,
				typeCreateLoading: false,
			};

		// * type list
		case TYPE_LIST_REQUEST:
			return {
				...state,
				typeListLoading: true,
			};
		case TYPE_LIST_SUCCESS:
			return {
				...state,
				types: action.payload,
				typeListLoading: false,
			};
		case TYPE_LIST_FAIL:
			return {
				...state,
				typeListError: action.payload,
				typeListLoading: false,
			};

		// * type update
		case TYPE_UPDATE_REQUEST:
			return {
				...state,
				typeUpdateLoading: true,
			};
		case TYPE_UPDATE_SUCCESS:
			return {
				...state,
				types: state.types.map(type =>
					type._id === action.payload._id
						? {
								...action.payload,
								name: action.payload.name,
						  }
						: type
				),
				typeUpdateSuccess: true,
				typeUpdateLoading: false,
			};
		case TYPE_UPDATE_FAIL:
			return {
				...state,
				typeUpdateError: action.payload,
				typeUpdateLoading: false,
			};

		// * type delete
		case TYPE_DELETE_REQUEST:
			return {
				...state,
				typeDeleteLoading: true,
			};
		case TYPE_DELETE_SUCCESS:
			return {
				...state,
				types: state.types.filter(
					type => type._id !== action.payload._id
				),
				typeDeleteSuccess: true,
				typeDeleteLoading: false,
			};
		case TYPE_DELETE_FAIL:
			return {
				...state,
				typeDeleteError: action.payload,
				typeDeleteLoading: false,
			};
		default:
			return state;
	}
};
