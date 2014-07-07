# OpenID-Request -- OpenID Node.js client

Openid-request takes as baseline the project **node-openid** (https://github.com/havard/node-openid) (0.5.9) and refactors the http.get and http.post to handle the proxy request with (mikeal/request).

All rights reserved to the owners of each project.

## Install
```javascript
npm install openid-request
```

## Use
Run the sample.js file
```javascript
node sample.js
```
Go to
```javascript
http://localhost:8888/authenticate?openid_identifier=https://login.launchpad.net //change the value of openid_identifier for your favorite OpenID provider
```

## License

MIT

**Free Software**
