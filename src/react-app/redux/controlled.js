import UTILS, {  } from '../Utils';
import CONSTANTS, {  } from '../Constants';

const controlled = (state = {}, { type, payload = {} }) => {
	/* state - это ветка state.controlled */
	// console.log('state, type, payload', state, type, payload);

	const { 
		value = '',
	} = payload;
	
	switch (type) {
		
		case 'SET_INPUT_VALUE':
			return { ...state,
				'INPUT_VALUE': value,
			};
		
		/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
			
		default:
			return state;
	}
};

export default controlled;