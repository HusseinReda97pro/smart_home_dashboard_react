import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'antd/dist/antd.css';
import GlobalStyles from './GlobalStyles';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// * state
import { Provider } from 'react-redux';
import store from './state/store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <GlobalStyles />

            <App />
            <ToastContainer />
        </Router>
    </Provider>,
    document.getElementById('root')
);