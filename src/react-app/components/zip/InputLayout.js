import React, { Component, Component } from 'react';
import PropTypes from 'prop-types';

/* tools */
import CONSTANTS, {  } from '../Constants';
import UTILS, {  } from '../Utils';

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

class InputLayout extends Component {
	render() {
		const
			{ placeholder, file, value, type, name, onChange } = this.props; /* parent */
			
		return <input
			placeholder={placeholder}
			value={file ? undefined : value}
			type={type || 'text'}
			name={name}
			onChange={onChange}
			className={`input input--${name}`}
		/>;
	}
}

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */


export default InputLayout;