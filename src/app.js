/*styles*/
import './styles/styles.css';

/*tools*/
import _ from 'lodash';

import createRouter, {  } from './router';
import DOM_UTILS, { append } from './dom';

const allRoutes = [
    'parameters',
    'floor',
];

let ROUTER;

/* DOMReady */
document.addEventListener("DOMContentLoaded", () => {
    initRouter();

    window.back = () => history.back(),
    window.forward = () => history.forward();
});

const
    links = Array.from(document.querySelectorAll('#links'))[0],
    buttons = Array.from(document.querySelectorAll('#buttons'))[0];

/* first level debug> */
/* console.log( window.location.href );
window.history.replaceState( {} , 'foo', '/foo' );
console.log( window.location.href );
throw new Error(`I do not whant to execute js more!`); */
/* <first level debug */

/* CLIENT_ROUTER */
const initRouter = () => {
    // ROUTER = createRouter({routeSelectorMask: 'data-route', linksSelector: '.route-link'});
    ROUTER = createRouter({routeSelectorMask: 'data-route', linksContainer: '#links'});

    const {  } = ROUTER;

    // setTimeout(() => {
    //     ROUTER.go('test');
    // }, 2000);

}

/* ___ */
/* const addElements = () => {
    const templates = {
        button: route => `<button id="${route}">${route}</button>`,
        link: route => `<a id="${route}" href='${route}'>${route}</a>`,
    };

    allRoutes.forEach(route => {
        const
            code = templates.button(route),
            link = append(links, code);

        // console.log('route, link', route, link);

        link.addEventListener('click', (e) => {
            const { parseHash, navigate, locate } = ROUTER;

            // console.log('route', route);

            return navigate(route);
        }, false);
    });
} */

















































/*







window.addEventListener('popstate', (e) => {
    console.log('history', history);
}, false);

document.querySelectorAll('#back')[0].addEventListener('click', (e) => {
    history.back();

    console.log('back');
}, false);

document.querySelectorAll('#forward')[0].addEventListener('click', (e) => {
    history.forward();

    console.log('forward');
}, false);

document.querySelectorAll('#test1')[0].addEventListener('click', (e) => {
    history.pushState(null, '', 'test1');

    console.log('test1');
}, false);

document.querySelectorAll('#test2')[0].addEventListener('click', (e) => {
    console.log('test2');
}, false);

document.querySelectorAll('#test3')[0].addEventListener('click', (e) => {
    console.log('test3');
    e.preventDefault();
    history.pushState(null, '', 'test3');
}, false);

document.querySelectorAll('#test4')[0].addEventListener('click', (e) => {
    console.log('test4');
    e.preventDefault();
    history.pushState(null, '', 'test4');
}, false);

document.querySelectorAll('#test5')[0].addEventListener('click', (e) => {
    console.log('test5');
    e.preventDefault();
    history.pushState(null, '', 'test5');
}, false);

const stateObj = { foo: "bar" };

const parseHash = hash => {
    const
        setup = {},
        sub = hash[0] === '#' ? hash.substr(1) : hash,
        pairs = sub.split('#') || [];

    pairs.forEach(pair => {
        const
            arr = pair.split('='),
            key = arr[0],
            val = arr[1];

        setup[key] = val;
    });

    return setup;
};

const setup = parseHash(window.location.hash);

*/