/*styles*/
import './styles/styles.css';

/*tools*/
import _ from 'lodash';

/*react*/
import React, { Component, PureComponent, createElement } from 'react';
import ReactDOM, { render, createPortal } from 'react-dom';

/*components*/
import ReduxApp from './react-app/ReduxApp';

/* react container in layout */
const reactRoot = document.getElementById('react-root');
	
render(<ReduxApp/>, reactRoot);