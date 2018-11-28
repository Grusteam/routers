import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* tools */
import CONSTANTS, {  } from '../Constants';
import UTILS, {  } from '../Utils';

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

const InputLayoutStateless = props => {
	const
		{ placeholder, file, value, type, name, onChange } = props; /* parent */
		
	return <input
		placeholder={placeholder}
		value={file ? undefined : value}
		type={type || 'text'}
		name={name}
		onChange={onChange}
		className={`input input--${name}`}
	/>;
}

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

InputLayoutStateless.propTypes = {
//   test: PropTypes.string.isRequired,
};


export default InputLayoutStateless;