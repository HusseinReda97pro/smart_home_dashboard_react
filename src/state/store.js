import { 
    createStore,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const userInfoFromLS = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	user: { userInfo: userInfoFromLS },
}

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;