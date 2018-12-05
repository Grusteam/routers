const _U = 'undefined';

class Router {
	constructor(setup) {
		this.setup = setup;

		const { routes, routeSelectorMask, routesContainer, containerSelector, linksContainer } = setup;

		this.defaultRoute = 1;
		this.errorRoute = 0;

		/* искать вручную по селекторам нужные теги */
		this.parsedDomSelectors = this.parseDomSelectors();

		/* селекторы */
		this.routeSelector = this.dataAttrWrap(routeSelectorMask) || `.route`;
		this.containerSelector = this.dataAttrWrap(containerSelector) || `#routes`;
		// console.log('this.routeSelector, this.containerSelector', this.routeSelector, this.containerSelector);
		this.visibilityClass = `is-active`;

		/* пройтись по DOM и собрать роуты */
		[this.routes, this.container] = this.getRoutes();

		this.entryPoint = this.parseUrl();

		/* установить активный роут */
		this.setActive(this.getRouteIndex(this.entryPoint.path));

		/* отследить активный роут */
		this.checkCurrentRouteMutate(this.entryPoint.path);

		/* перехватить ссылки */
		this.handleLinks();

		/* изначальное состояние в адресной строке */
		this.initFragmentState = this.parseHash();

		/* корректные значения инпутов в экземпляре роутера */
		this.inputValues = {};
		
		/* собрать все поля подлежащие отслеживанию и установить обработку*/
		this.hashHandledFields = this.setHashHandledFields('data-handled');

		/* отслеживать изменение адресной строки */
		this.handleUrlChanges();

		console.assert(Object.keys(this.inputValues).length, 'нет значений');
	}

	parseDomSelectors(container = document) {
		const
			iterable = [],
			keyVal = {},
			prefixes = ['#', '.', 'data-'],	
			presumption = [
				'routes',
				'route',

			];

		presumption.forEach(body => {
			prefixes.forEach(prefix => {
				const
					selector = prefix.includes('data') ? this.dataSelect(body) : `${prefix}${body}`,
					{ length } = this.dqsa(selector);

				iterable.push({ length, selector });
				keyVal[selector] = length;
			});
		});

		iterable.sort((a, b) => b.length - a.length);

		return {
			iterable,
			keyVal,
		};
	}

	getCurrentRoute() {
		return this.parseUrl('path');
	}
	
	/* обработчик события popstate */
	handleUrlChanges() {
		window.onpopstate = (e) => {
			this.checkCurrentRouteMutate();

			const appliedParams = this.getHash(this.currentRoute);

			this.applyHash();

			this.setActive(this.getRouteIndex(this.currentRoute));
		}
	}

	checkCurrentRouteMutate(route = this.getCurrentRoute()) {
		this.currentRoute = route;
	}

	/* query selector */
	dqsa(s, container = document) {
		let result = [];

		try {
			result = Array.from(container.querySelectorAll(s));
		} catch (error) {
			console.log('dqsa error', error,);
			console.log('s, container', s, container);
		}

		return result;
	}

	dqsa0(s) {
		const all = this.dqsa(s);

		return all[0];
	}

	/* комплексный метод смены роута */
	go(route = '/', routes = this.routes) {
		const appliedParams = this.getHash(route);

		this.navigate(appliedParams);

		this.setActive(this.getRouteIndex(route));
	}

	/* применить значения инпутов из адресной строки */
	applyInputValueFromHash(field, fragment = this.initFragmentState) {
		if (!field || !fragment) return;

		const { id } = field;

		if (fragment[id]) {
			field.value = fragment[id];
			this.inputValues[id] = fragment[id];
		}
	}

	/* установить обработку изменений на все поля*/
	setHashHandledFields(mask = 'data-handled') {
		const
			arr = this.dqsa(this.dataAttrWrap(mask)),
			habledFields = [];
		
		arr.forEach(field => {
			this.hashHandle(field);
			habledFields.push(field);

			this.applyInputValueFromHash(field);
		});

		return habledFields;
	}

	/* определить индекс роута в общей пачке */
	getRouteIndex(selector, routes = this.routes) {
		if (typeof selector === _U) return 0;
		if (typeof selector === 'string' && (selector === '' || selector === '/')) {
			return this.errorRoute === 0 ? this.errorRoute + 1 : this.defaultRoute;
		};


		const
			prefixes = ['#', '.'],
			prefix = prefixes.indexOf(selector[0]);

		const
			completeSelector = this.dataAttrWrap(this.routeSelector, selector),
			el = this.dqsa0(completeSelector);


		const i = Array.prototype.indexOf.call(routes, el);
		console.assert(i >= 0, 404);
		
		return i;
	}

	/* парсить роуты в DOM */
	getRoutes(routeSelector = this.routeSelector, containerSelector = this.containerSelector) {
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

	redirect(path = '', state = null, title = '') {
		history.replaceState(state, title, path);
	}
	
	/* выборка по дата аттрибуту */
	dataSelect(name = 'route', val = '') {
		return `[data-${name}${val ? `=${val}` : ''}]`;
	}

	/* работать с дата аттрибутом */
	dataAttrWrap(dataParam = '', paramVal = ''){
		let
			full = '',
			cleanDataParam = dataParam;

		if (cleanDataParam && cleanDataParam.includes) {
			if (cleanDataParam, paramVal) {
				if (cleanDataParam.includes('[') && cleanDataParam.includes(']')) {
					cleanDataParam = cleanDataParam.replace('[', '').replace(']', '');
				}
			}

			if (!cleanDataParam.includes('data-')) {
				return cleanDataParam;
			}

			if (paramVal) {
				full = `${cleanDataParam}="${paramVal}"`;

			} else {
				full = `${cleanDataParam}`;
			}
		}


		if (full.length && !(full.includes('[') && full.includes(']'))) {
			full = `[${full}]`;
		}
		return full;
	}

	/* установить 1 активный роут */
	setActive(index = 0, routes = this.routes) {
		const correctedActiveRouteIndex = index < 1 ?
			typeof this.errorRoute !== _U ? this.errorRoute :
				this.defaultRoute : index;

		routes.forEach((route, i) => {
			route.classList && route.classList[i === correctedActiveRouteIndex ? 'add' : 'remove'](this.visibilityClass);
		});
	}

	/* самоуничтожение */
	destroy() {
		window.__CLIENT_ROUTER = null;
	}

	/* записать в историю */
	navigate(route, state = window.history.state, title = '',) {
		 window.history.pushState(state, 'xxx', route);
	}

	/* перехватить все ссылки */
	handleLinks(links = this.getLinks()) {
		links.forEach((link, i, all) => {
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

	/* повесить обработчик изменения инпутов => */
	hashHandle(input) {
		if (!input) return;

		input.addEventListener('input', this.handleInputChange.bind(this));
	}

	/* обработчик изменения инпутов =>
		записывает значение в inputValues и в адресную строку */
	handleInputChange(e) {
		const
			{ target } = e,
			{ value, id } = target;

		this.inputValues[id] = value;
		this.applyHash();
	}

	applyHash(hash = this.getHash(), route = this.getCurrentRoute()){
		this.redirect(`${route}${hash}`);
	}

	getHash(path = '') {
		let applied = path;

		this.hashHandledFields.forEach((field, i) => {
			const { value, id } = field;

			if (value) {
				if (applied.includes('?')) {
					applied += '&'
				} else {
					applied += '?'
				}
			
				applied += `${id}=${value}`
			};
		});

		return applied;
	}

	getParamString(oldString= '', obj = {}) {
		let str = '';

		for (const key in obj) {
			if (str.includes(key)) {

			} else {

			}
			
			str += `${str.length ? '&' : ''}${key}=${obj[key]}`
		}

		return str;
	}

	/* парсить адресной строку */
	parseUrl(param) {
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
			result = param && setup.hasOwnProperty(param) ? setup[param] : setup;

		return result;
	}

	hide(el) {
		el.classList && el.classList['remove'](this.visibilityClass);
	}

	show(el) {
		el.classList && el.classList['add'](this.visibilityClass);
	}

	/* инвертировать наличие класса */
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

	/* изъять параметры из адресной строки */
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
			setup._length = setup._iterable.length;
		});

		return setup._iterable.length ? setup : null;
	}
}

/* ... . .-. --. . / --.. .... ..- .-. .- ...- .-.. . ...- */

/* инициирующий метод роутера */
const createRouter = (...all) => {
	if (typeof window.__CLIENT_ROUTER === _U) {
		window.__CLIENT_ROUTER = new Router(...all);
	}
	
	return window.__CLIENT_ROUTER;
}

export {
	Router
};

export default createRouter;

/* 

	setHashField(val) {
		const
			current = this.parseUrl(),
			{ param } = current,
			{ state } = window.history,
			newState = Object.assign({}, state, val),
			paramString = this.getParamString(param, newState);

		this.navigate(`${current.pathname}?${paramString}`, newState);

		//history.pushState(newState, null, `${current.pathname}?${paramString}`);
	}

	this.setHashField(`${id}=${value}`);
	this.setHashField({[id]: value});

	if (activeRouteSelector[0] && !selectors.includes(activeRouteSelector[0])) { console.log('initRoutesMutate => wrong selector'); return; }

			const
				activeRouteSet = activeRouteSelector ? this.dqsa(activeRouteSelector) : null,
				activeRoute = activeRouteSet && activeRouteSet.length ? activeRouteSet[0] : null;

			activeRouteIndex = activeRoute ? this.getRouteIndex(activeRoute) : 0;

 */