import UTILS, {  } from '../Utils';
import CONSTANTS, {  } from '../Constants';

const main = (state = {}, { type, payload = {} }) => {
	/* state - это ветка state.main */
	// console.log('state, type, payload', state, type, payload);

	const { 
		value = '',
	} = payload;
	
	
	switch (type) {
		
		case 'SET_SPLASH_VISIBILITY':
			return { ...state,
				'SHOW_SPLASH': !state['SHOW_SPLASH'],
			};
		
		case 'SET_LOADER_VISIBILITY':
			return { ...state,
				'SHOW_LOADER': !state['SHOW_LOADER'],
			};
		
		/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
			
		default:
			return state;
	}
};

export default main;