# setaccesscontrolheaders

Use to set CORS headers to allow access from a set domain, or from localhost
if the local flag is set to true

## Usage

Install using:

```bash
npm install @neil188/setaccesscontrol
```

Then in your code import `accessControl`, then intialise by setting defaultOrigin
and allowLocal parameters

```js
const { accessControl } = require('@neil188/setaccesscontrol');

const setAccessControl = accessControl('http://default.com', true)
```

now in your request function you can call your setAccessControl function with
the response object and the request origin:

```js
exports.yourapi = async (req, res) => {

    // set CORS headers
    setAccessControl(res, req.get('origin'));
```

## LICENSE

MIT
