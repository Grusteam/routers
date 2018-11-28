import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* redux actions */
import ACTIONS, {  } from '../redux/actions'

/* components */
// import Button from './Button'

/* tools */
import CONSTANTS, {  } from '../Constants';
import UTILS, {  } from '../Utils';

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

class ReduxComponent extends Component {
	constructor(props, context) {
		super(props);

		const
			{  } = this.props, /* redux */
			{  } = this.props; /* parent */

	}
	
	componentWillReceiveProps({ STEP }) {
		if ( false ) {
		}
	}
	
	onButtonClick() {
		const
			{  } = this.props, /* redux */
			{  } = this.props; /* parent */
	}
	
	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
	
	render() {
		const
			{  } = this.props, /* redux */
			{  } = this.props; /* parent */
			
		return <Button

		/>
	}
}

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

const
	mapStateToProps = ({  }) => {
		return {
		};
	},
	mapDispatchToProps = dispatch => ({
		// onNextStepClickRedux: () => dispatch(changeStep()),
	});

const ReduxComponentRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(ReduxComponent);

export default ReduxComponentRedux;