import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

/* tools */
import CONSTANTS, {  } from '../Constants';
import UTILS, {  } from '../Utils';

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

class Button extends Component {
	constructor(props, context) {
		super(props);

		const
			{  } = this.props; /* parent */
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	
	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
	
	render() {
		const
			{ name, onClick } = this.props; /* parent */
			
		return <button
			className="button"
			type="button"
			onClick={onClick}
		>
			{ name }
		</button>
	}
}

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */


export default Button;