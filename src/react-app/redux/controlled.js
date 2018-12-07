import UTILS, {  } from '../Utils';
import CONSTANTS, {  } from '../Constants';

const controlled = (state = {}, { type, payload = {} }) => {
	/* state - это ветка state.controlled */
	// console.log('state, type, payload', state, type, payload);

	const { 
		id = '',
		value = '',
	} = payload;
	
	switch (type) {
		
		case 'SET_INPUT_VALUE':
		// console.log('value', value);
			return { ...state,
				[id]: value,
			};
		
		/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
			
		default:
			return state;
	}
};

export default controlled;