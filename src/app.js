/*styles*/
import './styles/styles.css';

/*tools*/
import _ from 'lodash';


const
    navigate = (path) => {
        const current = window.location.href;
        window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
    },
    getHash = () => window.location.hash.split('#')[1] || '',
    listen = () => {
        const current = getHash();

        if (current !== currentUrl) makeChanges(currentUrl, current);

        currentUrl = current;

        setTimeout(listen, 200);
    },
    makeChanges = (prevUrl, newUrl) => {
        console.log('makeChanges => prevUrl, newUrl', prevUrl, newUrl);
    };

let currentUrl = getHash();

console.log('currentUrl', currentUrl);


listen();

/* setTimeout(() => {
    navigate(555);
}, 1000);

setTimeout(() => {
    navigate(777);
}, 5000); */