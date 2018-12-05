Serge Zhuravlev Vanilla SPA Router

1. Import.
    Import router creator from router.js file.
    import anyNameForRouterCreator from './router';

2. Creation and config.
    Create router with config
    You can pass a container or it selector with all routes or on array with all of them.

    const myVeryBestRouter = anyNameForRouterCreator(containerWithRoutes); //container DOM elt
    const myVeryBestRouter = anyNameForRouterCreator('#containerWithRoutes'); //container selector
    const myVeryBestRouter = anyNameForRouterCreator([route1, route2]); //route DOM elts
    const myVeryBestRouter = anyNameForRouterCreator(['.route1', '#route2', 'data-route="3"']); //route selectors
    const myVeryBestRouter = anyNameForRouterCreator('.route'); //route mask

    After creation it will pemanently stored as a window property (window.__CLIENT_ROUTER)

3. Navigation.
    myVeryBestRouter.go('routeName') method allow you to have
    proper navigation inside your SPA.
    You can pass all routing links or links container to intercept click handler on it besides.

3. CSS
    Please add route selector rule to hide non-active router
    [data-route] {
        display: none;

        &.is-active {
            display: block;
        }
    }