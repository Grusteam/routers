/*styles*/
import './styles/styles.css';

/*tools*/
import _ from 'lodash';

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

const stateObj = { foo: "bar" };

/* setTimeout(() => {
    history.pushState(stateObj, '', 'path');
}, 1500);

setTimeout(() => {
    console.log('window.history', window.history);
}, 2000);
 */