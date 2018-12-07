import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, NavLink, Route } from 'react-router-dom';
import { extract, parse, parseUrl, stringify } from 'query-string';

/* redux actions */
import ACTIONS, {  } from './redux/actions'

/* tools */
import CONSTANTS, {  } from './Constants';
import UTILS, {  } from './Utils';

/* components */
// import Component from './components/Component'

class Full extends Component {
	constructor(props, context) {
		super(props);

		const {  } = props; /* redux */

		this.onchange = this.onchange.bind(this);
	}
	
	componentDidMount() {
		const
			{ history } = this.props,
			{ state, search } = history.location,
			{ input } = this.refs;

		const urlSetup = parse(search);

		/* apply init state in history */
		history.push({
			search,
			state: urlSetup,
		})

		/* apply values to DOM */
		for (var id in urlSetup) {
			const val = urlSetup[id];

			if (this.refs[id]) this.refs[id].value = val;
		}
	}

	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

	onchange({ target }) {
		const
			{ history } = this.props,
			{ value } = target,
			id = target.getAttribute('data-identifier');

		history.push({
			search: `${id}=${value}`,
			state: { [id]: value }
		})
	}

	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
	
	render() {
		const { history, match: { params: { param } } } = this.props;

		return (
			<div>
				<h2>Full</h2>
				<h2>{ param }</h2>
				<input data-identifier="input" onChange={this.onchange} type="text" ref="input"/>
			</div>
		)
	}
}

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

class App extends Component {
	constructor(props, context) {
		super(props);

		const {  } = props; /* redux */
	}
	
	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
	
	render() {
		console.log('history', history);

		const
			{ INPUT_VALUE } = this.props; /* redux */
			
		return <Router>
			<div id="app" className="app">
				<p style={{position: 'absolute', top: 0, left: 0}}>
					App
				</p>

				<p>INPUT_VALUE - { INPUT_VALUE }</p>

				<ul>
					<li>
						<NavLink to={'/'}>
							home
						</NavLink>
					</li>
					<li>
						<NavLink to={'/params'}>
							params
						</NavLink>
					</li>
					<li>
						<NavLink to={'/full'}>
							full
						</NavLink>
					</li>
				</ul>

				<Switch>
					<Route
						exact
						path={'/'}
						component={Home}
					/>

					<Route
						path={'/params/:param?'}
						component={Params}
					/>

					<Route
						path={'/full/:param?'}
						component={Full}
					/>

					<Route
						component={MyError}
					/>
				</Switch>
			</div>
		</Router>
	}
}

const Home = (all) => {
		const { history, match: { params: { param } } } = all;
		return <div>
			<h2>Home</h2>
		</div>
	},
	Params = (all) => {
		const { history, match: { params: { param } } } = all;
		return <div>
			<h2>Params</h2>
			<h2>{ param }</h2>
		</div>
	},
	MyError = (all) => {
		const { history, match: { params: { param } } } = all;
		return <div>
			<h2>MyError</h2>
			<h2>{ param }</h2>
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