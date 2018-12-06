import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

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
			{ INPUT_VALUE } = this.props; /* redux */
			
		return <Router>
			<div id="app" className="app">
				<p style={{position: 'absolute', top: 0, left: 0}}>
					App
				</p>

				{ INPUT_VALUE }

				<ul>
					<li>
						<Link to={'/'}>
							home
						</Link>
					</li>
					<li>
						<Link to={'/params'}>
							params
						</Link>
					</li>
					<li>
						<Link to={'/aparts'}>
							aparts
						</Link>
					</li>
				</ul>

				<Switch>
					<Route
						exact
						path={'/'}
						component={Home}
					/>

					<Route
						path={'/params/:param'}
						component={Params}
					/>

					<Route
						path={'/aparts/:param'}
						component={Aparts}
					/>

					<Route
						component={MyError}
					/>
				</Switch>
			</div>
		</Router>
	}
}

const Home = ({ match }) => {
		console.log('match', match);
		return <div>
			<h2>Home</h2>
		</div>
	},
	Params = ({ match }) => {
		console.log('match', match);
		return <div>
			<h2>Params</h2>
			<h2>{ match.params.param }</h2>
		</div>
	},
	MyError = ({ match }) => {
		console.log('match', match);
		return <div>
			<h2>MyError</h2>
			<h2>{ match.params.param }</h2>
		</div>
	},
	Aparts = ({ match }) => {
		console.log('match', match);
		return <div>
			<h2>Aparts</h2>
			<h2>{ match.params.param }</h2>
		</div>
	};

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

const
	mapStateToProps = ({ controlled: { INPUT_VALUE } }) => {
		return {
			INPUT_VALUE
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