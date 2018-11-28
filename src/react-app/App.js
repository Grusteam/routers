import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* redux actions */
import ACTIONS, {  } from './redux/actions'

/* tools */
import CONSTANTS, {  } from './Constants';
import UTILS, {  } from './Utils';

/* components */
// import Component from './components/Component'

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

class App extends Component {
	constructor(props, context) {
		super(props);

		const {  } = props; /* redux */
	}
	
	componentWillReceiveProps({ STEP }) {
		if (false) {
		}
	}
	
	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
	
	render() {
		const
			{  } = this.props; /* redux */
			
		return <div id="app" className="app">
			<p style={{position: 'absolute', top: 0, left: 0}}>
				App
			</p>
		</div>
	}
}

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

const
	mapStateToProps = ({  }) => {
		return {
		};
	},
	mapDispatchToProps = dispatch => ({
		// testActionClick: () => dispatch(testAction()),
	});

const AppRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppRedux;