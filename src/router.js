const _U = 'undefined';

class Router {
	constructor(routeSelector, containerSelector) {
		this.routeSelector = routeSelector || `.route`;
		this.containerSelector = containerSelector || `#routes`;
		this.visibilityClass = `is-active`;

		[this.routes, this.container] = this.getRoutes(containerSelector, routeSelector);

		this.entryPoint = this.locate();
		this.initRoutesMutate(this.entryPoint.path);
		this.handleLinks();

		this.hashHandledFields = this.setHashHandledFields('data-handled');
	}

	dqsa(s, container = document) {
		let result = [];

		try {
			result = Array.from(container.querySelectorAll(s));
		} catch (error) {
			console.log('dqsa error', error);
		}

		return result;
	}

	dqsa0(s) {
		return this.dqsa(s)[0];
	}

	go(route = '/', routes = this.routes) {
		const appliedParams = this.addHash(route);

		window.history.pushState(null, '', appliedParams);

		this.setActive(this.getRouteIndex(route));

	}

	setHashHandledFields(mask = 'data-handled') {
		const
			arr = this.dqsa(this.dataAttrWrap(mask)),
			habledFields = [];
		
		arr.forEach(field => {
			this.hashHandle(field);
			habledFields.push(field);
		});

		return habledFields;
	}

	dataSelect(name) {
		return this.dqsa0(`[data-route=${name}]`);
	}

	getRouteIndex(route = this.routes[0], routes = this.routes) {
		let selector = '';

		const
			selectors = ['#', '.'],
			prefix = selectors.indexOf(route[0]);

		if (prefix >= 0) {
			selector = this.dqsa0(route);
		} else {
			selector = this.dqsa0(this.dataAttrWrap(route, this.routeSelector));
		}

		return Array.prototype.indexOf.call(routes, selector);
	}

	getRoutes(routeSelector = `${this.dataAttrWrap(this.routeSelector)}`, containerSelector = `${this.containerSelector}`) {
		const
			container = this.dqsa0(containerSelector),
			inContainer = this.dqsa(routeSelector, container),
			inDocument = this.dqsa(routeSelector),
			routes = inContainer.length ? inContainer : inDocument,
			result = [
				routes,
				container,
			];

		return result;
	}

	dataAttrWrap(param_1, param_2){
		let full = '';

		if (param_1 && param_1.includes('data-')) {
			full = `[${param_1}]`;
		} else {
			full = `[${param_2}="${param_1}"]`; 
		}

		return full;
	}

	initRoutesMutate(activeRouteSelector = '', routes = this.routes) {
		const selectors = ['#', '.'];

		let activeRouteIndex;

		const routeIndex = this.getRouteIndex(activeRouteSelector);


		if (typeof activeRouteSelector === 'number') {
			activeRouteIndex = activeRouteSelector;

		} else if (routeIndex >= 0) {
			activeRouteIndex = routeIndex;
		} else {
			/* if (activeRouteSelector[0] && !selectors.includes(activeRouteSelector[0])) { console.log('initRoutesMutate => wrong selector'); return; }

			const
				activeRouteSet = activeRouteSelector ? this.dqsa(activeRouteSelector) : null,
				activeRoute = activeRouteSet && activeRouteSet.length ? activeRouteSet[0] : null;

			activeRouteIndex = activeRoute ? this.getRouteIndex(activeRoute) : 0; */
		}

		this.setActive(activeRouteIndex);
	}

	setActive(activeRouteIndex, routes = this.routes) {
		routes.forEach((route, i) => {
			route.classList && route.classList[i === activeRouteIndex ? 'add' : 'remove'](this.visibilityClass);
		});
	}

	destroy() {
		window.CLIENT_ROUTER = null;
	}

	navigate(route) {
		 window.history.pushState(null, '', route);
	}

	handleLinks(links = this.getLinks(document)) {
		links.forEach((link, b, c) => {
			const
				{ href } = link,
				relHref = link.getAttribute('href');

			link.addEventListener('click', (e) => {
				e.preventDefault();

				this.go(relHref);
			});
		});
	}

	getLinks(selector = document) {
		return this.dqsa('a', selector);
	}

	hashHandle(input) {
		if (!input) return;

		input.addEventListener('input', this.handleInputChange.bind(this));
	}

	setWholeHash(pair, hash = window.location.hash) {
		const currentHash = this.parseHash();

		console.log('currentHash', currentHash);
	}

	handleInputChange(e) {
		const
			{ target } = e,
			{ value, id } = target,
			current = this.addHash();

		console.log('current', current);

		window[`__HANDLED_${id}`] = value;

		// this.setHashField(`${id}=${value}`);
		// this.setHashField({[id]: value});
		this.applyHash(current);
	}

	applyHash(hash){
		history.replaceState(null, null, `${this.locate('pathname')}${hash}`);
		// window.history.pushState(null, '', hash);
	}

	addHash(route = '') {
		let applied = route;

		this.hashHandledFields.forEach((field, i) => {
			const { value, id } = field;
			
			if (i === 0) {
				applied += '?'
			} else {
				applied += '&'
			}

			applied += `${id}=${value}`
		});

		return applied;
	}

	setHashField(val) {
		const
			current = this.locate(),
			{ param } = current,
			{ state } = window.history,
			newState = Object.assign({}, state, val),
			paramString = this.getParamString(param, newState);

		history.pushState(newState, null, `${current.pathname}?${paramString}`);
	}

	getParamString(oldString= '', obj = {}) {
		const currentState = this.parseHash(oldString);

		let str = '';

		for (const key in obj) {
			if (str.includes(key)) {

			} else {

			}
			
			str += `${str.length ? '&' : ''}${key}=${obj[key]}`
		}

		return str;
	}

	locate(param) {
		const
			{ pathname, search } = window.location,
			pathTrunc = pathname.substr(1),
			pathArr = pathTrunc.split('/'),
			depth = pathArr.length,
			path = pathArr[0],
			last = pathArr[pathArr.length - 1],
			setup = {
				path,
				last,
				depth,
				pathname,
				param: search,
			},
			result = param && setup[param] ? setup[param] : setup;

		return result;
	}

	hide(el) {
		el.classList && el.classList['remove'](this.visibilityClass);
	}

	show(el) {
		el.classList && el.classList['add'](this.visibilityClass);
	}

	toggleClass(el = body, _class = this.visibilityClass, propState) {
		const
			element = typeof el === 'string' ? this.dqsa0(el) : el,
			state = typeof propState !== _U ? propState : !this.hasClass(element, _class);

		element.classList && element.classList[state ? 'add' : 'remove'](_class);
	}

	toggleActivity(el) {
		this.toggleClass(el, this.visibilityClass)
	}

	hasClass(el = body, _class = this.visibilityClass) {
		return el.classList ? el.classList.contains(_class) : false;
	}

	parseHash(param = window.location.search) {
		const
			separators = ['#', '?', '&'],
			_iterable = [],
			setup = {
				_iterable
			},
			sub = separators.includes(param[0]) ? param.substr(1) : param,
			prePairs = sub.split('&'),
			pairs = prePairs[0].length ? prePairs : [];

		pairs.forEach(value => {
			let key, val;

			if (value.includes('=')) {
				const arr = value.split('=');

				key = arr[0];
				val = arr[1];
			} else {
				key = value;
				val = null;
			}

			setup[key] = val;
			setup._iterable.push({[key]: val});
		});

		return setup._iterable.length ? setup : null;
	}
}

const createRouter = (...all) => {
	if (typeof window.CLIENT_ROUTER === _U) {
		window.CLIENT_ROUTER = new Router(...all);
	}
	
	return window.CLIENT_ROUTER;
}

export {
	Router
};

export default createRouter;