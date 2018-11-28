import CONSTANTS, {  } from '../Constants';

export const

/* CLOUD OF TAGS */
	setCloudSelectedTags = (nodes) => ({type: 'SET_CLOUD_SELECTED_TAGS', payload: { nodes: [nodes] }}),

/* CONROLLED ELEMENTS */
	setInputValue = (value) => ({type: 'SET_INPUT_VALUE', payload: { value }}),

/* GRAPH */
	setGraphType = () => ({type: 'SET_GRAPH_TYPE'}),
	setGraphPathState = () => ({type: 'SET_GRAPH_PATH_STATE'}),

/* MAIN STATES */
	setSplashVisibility = () => ({type: 'SET_SPLASH_VISIBILITY'}),
	setLoaderVisibility = () => ({type: 'SET_LOADER_VISIBILITY'}),

/* USER */
	setUserName = (value) => ({type: 'SET_USER_NAME', payload: { value }}),
	setUserId = (value) => ({type: 'SET_USER_ID', payload: { value }});

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

const ACTIONS = {
	setCloudSelectedTags,
	setInputValue,
	setGraphType,
	setGraphPathState,
	setSplashVisibility,
	setLoaderVisibility,
	setUserName,
	setUserId,
};

export default ACTIONS;