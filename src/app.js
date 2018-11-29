/*styles*/
import './styles/styles.css';

/*tools*/
import _ from 'lodash';

import routerCreator, {  } from './router';

const allRoutes = [
    'parameters',
];

const templates = {
    button: route => `<button id="${route}">${route}</button>`,
    link: route => `<a id="${route}" href='${route}'>${route}</a>`,
};

let ROUTER;

/* DOMReady */
document.addEventListener("DOMContentLoaded", () => {
    ROUTER = routerCreator('/', allRoutes);

    window.back = () => history.back(),
    window.forward = () => history.forward();
});

setTimeout(() => {
    const
        { parseHash, navigate, locate } = ROUTER;

        // navigate('loop');

        console.log('locate()', locate('last'));
}, 1000);

const
    links = Array.from(document.querySelectorAll('#links')),
    buttons = Array.from(document.querySelectorAll('#buttons'));

console.log('links, buttons', links, buttons);

allRoutes.forEach(route => {
    console.log('route', route);
    links
    buttons
});
















































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