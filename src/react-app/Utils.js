/*tools*/
import { forEach } from 'lodash';
import CONSTANTS, {  } from './Constants';

export const
	SCUDecision = (currentProps, nextProps, renderFelds) => {
		let
			fields = renderFelds,
			needUpdates = false;

		if (typeof renderFelds === 'string') fields = [renderFelds];

		fields.forEach(field => {
			if (currentProps[field] !== nextProps[field]) needUpdates = true;
		});

		return needUpdates;
	},
	getInitialState = (setup) => {
		const s = {};

		forEach(setup, (branch, branchField) => {
			forEach(branch, ({ action, constant, defaultState }, field, all) => {
				if (!s[branchField]) s[branchField] = {};
				
				s[branchField][field] = defaultState;
			})
		})

		return s;
	},
	/* snake-case to camelCase to snake-case */
	notationModifier = (input = '') => {
		if (input.includes('_')) {
			/* to camelCase */
			return input.toLowerCase().replace(/(\_\w)/g, m => m[1].toUpperCase());
		} else {
			/* to snake-case */
			return input.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
		}
	},
	getSetupFields = setup => {
		const a = [];

		forEach(setup, (branch, branchVal) => {
			forEach(branch, (field, fieldVal) => {
				a.push({ branch: branchVal, field: fieldVal });
			})
		})

		return a;
	},
	getReduxStateFields = (state, setup) => {
		const o = {};

		getSetupFields(setup).forEach(({ branch, field }) => {
			o[field] = state[branch] ? state[branch][field] : undefined;
		});

		return o;
	};
	
/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
	
const UTILS = {
	SCUDecision,
	getInitialState,
	notationModifier,
	getSetupFields,
	getReduxStateFields,
};

export default UTILS;