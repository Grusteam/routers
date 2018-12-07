import React, { Component } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';

/* reducers */
import controlled from './redux/controlled';
import main from './redux/main';

/* tools */
import CONSTANTS, { reduxStoreSetup } from './Constants';
import UTILS, { getInitialState } from './Utils';

/* components */
import App from './App'

/* redux store creation */
const store = createStore(
	combineReducers({
		main,
		controlled,
	}),
	getInitialState(reduxStoreSetup),
	compose(
		// applyMiddleware(thunk),
		// window.devToolsExtension ? window.devToolsExtension() : f => f, //устревшая версия
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	),
);

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

class ReduxApp extends Component {
	render() {
		return <Provider store={store}>
			<App />
		</Provider>;
	}
}

export default ReduxApp;