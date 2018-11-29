class Router {
	constructor(route, routes = []) {
		this.routes = [
		route,
		...routes,
		];
	}

	create() {
		window.CLIENT_ROUTER = null;
	}

	navigate(route) {
		 window.history.pushState(null, '', route);
	}

	locate(param) {
		const
			pathname = window.location.pathname,
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
			},
			result = param && setup[param] ? setup[param] : pathname;

		return result;
	}

	parseHash(hash = window.location.hash) {
		const
			_iterable = [],
			setup = {
				_iterable
			},
			sub = hash[0] === '#' ? hash.substr(1) : hash,
			prePairs = sub.split('#'),
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

const routerCreator = (...all) => {
	if (typeof window.CLIENT_ROUTER === 'undefined') {
		window.CLIENT_ROUTER = new Router(...all);
	}
	
	return window.CLIENT_ROUTER;
}

export {
	Router
};

export default routerCreator;