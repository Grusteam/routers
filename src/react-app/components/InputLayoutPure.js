import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* tools */
import CONSTANTS, {  } from '../Constants';
import UTILS, {  } from '../Utils';

/* components */
// import Component from './Component.js';

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

class InputLayoutPure extends PureComponent {
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

InputLayoutPure.propTypes = {
	// onClick: PropTypes.func.isRequired,
	// value: PropTypes.string.isRequired,
};

export default InputLayoutPure;