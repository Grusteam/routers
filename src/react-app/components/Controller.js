import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* redux actions */
import ACTIONS, { setInputValue } from '../redux/actions.js';

/* components */
import Button from './Button.js';
import InputLayoutPure from './InputLayoutPure';
import ValuePair from './ValuePair';
import HelloStateless from './HelloStateless';
import WelcomePure from './WelcomePure';

/* tools */
import CONSTANTS, { reduxStoreSetup } from '../Constants.js';
import UTILS, { notationModifier, getReduxStateFields } from '../Utils.js';

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

class Controller extends PureComponent {
	constructor(props, context) {
		super(props);

		const
			{  } = this.props, /* redux */
			{  } = this.props; /* parent */
	}

	onButtonClick() {
		const
			{  } = this.props, /* redux */
			{  } = this.props; /* parent */
	}

	classMethod() {}
	
	/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */
	
	render() {
		const
			{ testButtonClick, setInputValueCall, INPUT_VALUE } = this.props, /* redux */
			{  } = this.props; /* parent */

		return <div className="controller">
			<div className="controller__title">Controller</div>
			{/* <RenderTests/> */}
			{/* <div className="rennder-tests">
				<HelloStateless/>
				<div className="">---</div>
				<WelcomePure
					text={'WelcomePure'}
				/>
				<div className="">---</div>
				<WelcomePure
					text={Math.random()}
				/>
				<div className="">---</div>
				<WelcomePure
					onClick={()=>{}}
					text={'newInstance'}
				/>
				<div className="">---</div>
				<WelcomePure
					onClick={this.classMethod}
					text={'classMethod'}
				/>
				<div className="">---</div>
			</div> */}

			{Object.keys(reduxStoreSetup).map((branch, i) => {
				return <div className="section" key={`${branch}_${i}`}>
					<div className="section__title">{ branch }</div>
					<div className="section__body">
						{Object.keys(reduxStoreSetup[branch]).map((field, i) => {
							const
								reduxAction = reduxStoreSetup[branch][field]['action'],
								identifier = `${field}_${i}`,
								onClick = () => testButtonClick(reduxAction),
								value = `${this.props[field]}`;

							return field === 'INPUT_VALUE' ?
								<InputLayoutPure
									key={identifier}
									placeholder={''}
									file={''}
									value={INPUT_VALUE}
									type={''}
									name={''}
									onChange={setInputValueCall}
								/> :
								<ValuePair
									key={identifier}
									onClick={onClick}
									value={value}
									field={field}
								/>;
						})}	
					</div>
				</div>
			})}
		</div>
	}
}

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

const
	mapStateToProps = (state) => {
		
		return {
			...getReduxStateFields(state, reduxStoreSetup)
		};
	},
	mapDispatchToProps = dispatch => ({
		setInputValueCall: ({ target: { value } }) => dispatch(setInputValue(value)),
		testButtonClick: (key) => {
			return ACTIONS[key] ? dispatch(ACTIONS[key](Math.floor(Math.random() * 10))) : console.warn(`no action "${key}" in actions`);
		}, 
	});

const ControllerRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(Controller);

export default ControllerRedux;