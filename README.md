# OpenID-Request -- OpenID Node.js client v0.1.4

Openid-request takes as baseline the project **node-openid** (https://github.com/havard/node-openid) (0.5.9) and refactors the http.get and http.post to handle the proxy request with (mikeal/request).

All rights reserved to the owners of each project.

## Install
```javascript
npm install openid-request
```

## Use/Example
Run the sample.js file
```javascript
node sample.js
```
Go to
```javascript
http://localhost:8888/authenticate?openid_identifier=https://login.launchpad.net //change the value of openid_identifier for your favorite OpenID provider
```

## Use through proxy
You have to set this environments variables on your system
* For HTTP:
```
 HTTP_PROXY_HOST=http://myproxy.net
 HTTP_PROXY_PORT=8080
```
* For HTTPS:
```
 HTTPS_PROXY_HOST=https://myproxy.net
 HTTPS_PROXY_PORT=8080
```
