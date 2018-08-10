const isLocalHost = s =>
    s.startsWith('http://localhost') || s.startsWith('https://localhost');
const is127 = s =>
    s.startsWith('http://127.0.0.1') || s.startsWith('https://127.0.0.1');

const allowOrigin = (o = '', allowLocal = true, defaultOrigin) =>
    allowLocal ?
        isLocalHost(o) || is127(o) ?
            o :
            defaultOrigin
        : defaultOrigin;

const accessControl = (defaultOrigin = '', allowLocal = true) =>
    (res, origin = '') => {
        // Set CORS headers
        // e.g. allow GETs from any origin with the Content-Type header
        // and cache preflight response for an 3600s
        const allowOriginString = allowOrigin(origin, allowLocal, defaultOrigin);
        res.set('Access-Control-Allow-Origin', allowOriginString);
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    }

module.exports = { isLocalHost, is127, allowOrigin, accessControl };
