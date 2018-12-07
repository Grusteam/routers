import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, NavLink, Route } from 'react-router-dom';
import { extract, parse, parseUrl, stringify } from 'query-string';

/* redux actions */
import ACTIONS, { setInputValue } from './redux/actions'

/* tools */
import CONSTANTS, {  } from './Constants';
import UTILS, {  } from './Utils';

/* components */
// import Component from './components/Component'

class Full extends Component {
	constructor(props, context) {
		super(props);

		const { setInput } = props; /* redux */

		this.onchange = this.onchange.bind(this);
		this.applyValuesToUri = this.applyValuesToUri.bind(this);
	}
	
	componentDidMount() {
		const
			{ setInput, } = this.props, /* redux actions */
			{ INPUT_VALUE,  } = this.props, /* redux props */
			{ history } = this.props,
			{ state, search } = history.location,
			{ input } = this.refs;

		this.applyValuesToUri({ INPUT_VALUE, a: 'b' });

		// const urlSetup = parse(search);

		// /* apply init state in history */
		// history.push({
		// 	search,
		// 	state: urlSetup,
		// })


		// /* apply values to DOM */
		// for (var id in urlSetup) {
		// 	const val = urlSetup[id];

		// 	/* via redux */
		// 	setInput(val);

		// 	/* via refs */
		// 	// if (this.refs[id]) this.refs[id].value = val;
		// }
	}

	applyValuesToUri(values) {
		const
			{ history } = this.props;

		/* apply init state in history */
		history.push({
			search: this.formFragment(values),
			state: values,
		})
	}

	formFragment(setup) {
		let fragment = '';

		for (var key in setup) {
			const val = setup[key];

			if (val) fragment += `${fragment.includes('?') ? '&' : '?'}${key}=${val}`
		}

		return fragment;
	}

	applyToDom() {
		const
			{ setInput, } = this.props, /* redux actions */
			{ INPUT_VALUE,  } = this.props, /* redux props */
			{ history } = this.props;

		for (var id in urlSetup) {
			const val = urlSetup[id];

			/* via redux */
			this.applyToRedux(id, val);

			/* via refs */
			this.applyToRef(id, val);
		}
	}

	applyToRedux(id, val) {
		const { setInput, } = this.props; /* redux actions */
			
		setInput(id, val);
	}

	applyToRef(id, val) {
		if (this.refs[id]) this.refs[id].value = val;
	}

	componentDidUpdate(prevProps) {
	}

	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

	/* input change handler */
	onchange({ target }) {
		const
			{ setInput } = this.props, /* redux */
			{ history } = this.props,
			{ value } = target,
			id = target.getAttribute('data-identifier');

		/* applying input value to uri params */
		history.push({
			search: `${id}=${value}`,
			state: { [id]: value }
		})

		/* set value in redux */
		setInput(id, value);
	}

	goTo(val) {
		const
			{ history } = this.props;

		history.push({
			pathname: val,
			// search: `${id}=${value}`,
			// state: { [id]: value }
		})
	}

	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
	
	render() {
		const { INPUT_VALUE, history, match: { params: { param } } } = this.props;

		// console.log('INPUT_VALUE', INPUT_VALUE);

		return (
			<div>
				<h2>Full</h2>
				<h2>{ param }</h2>
				<input value={INPUT_VALUE} data-identifier="INPUT_VALUE" onChange={this.onchange} type="text" ref="input"/>
				<button onClick={()=>this.goTo(this.refs.input.value)}>goTo</button>
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
		// console.log('history', history);

		const { INPUT_VALUE } = this.props; /* redux */
			
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
						component={FullRedux}
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
		setInput: (id, val) => dispatch(setInputValue(id, val)),
	});

const AppRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

const FullRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(Full);

export default AppRedux;