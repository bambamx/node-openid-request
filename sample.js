var openid = require('openid-request');
var url = require('url');
var querystring = require('querystring');

var extensions = [new openid.UserInterface(),
                  new openid.SimpleRegistration(
                      {
                        "nickname" : true,
                        "email" : true,
                        "fullname" : true,
                        "dob" : true,
                        "gender" : true,
                        "postcode" : true,
                        "country" : true,
                        "language" : true,
                        "timezone" : true
                      }),
                  new openid.AttributeExchange(
                      {
                        "http://axschema.org/contact/email": "required",
                        "http://axschema.org/namePerson/friendly": "required",
                        "http://axschema.org/namePerson": "required"
                      }),
                  new openid.PAPE(
                      {
                        "max_auth_age": 24 * 60 * 60, // one day
                        "preferred_auth_policies" : "none" //no auth method preferred.
                      })];

var relyingParty = new openid.RelyingParty(
    'http://example.com/verify', // Verification URL (yours)
    null, // Realm (optional, specifies realm for OpenID authentication)
    false, // Use stateless verification
    false, // Strict mode
    extensions); // List of extensions to enable and include


var server = require('http').createServer(
    function(req, res)
    {
        var parsedUrl = url.parse(req.url);
        if(parsedUrl.pathname == '/authenticate')
        {
          // User supplied identifier
          var query = querystring.parse(parsedUrl.query);
          var identifier = query.openid_identifier;

          // Resolve identifier, associate, and build authentication URL
          relyingParty.authenticate(identifier, false, function(error, authUrl)
          {
            if(error)
            {
              res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
              res.end('Authentication failed: ' + error.message);
            }
            else if (!authUrl)
            {
              res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
              res.end('Authentication failed');
            }
            else
            {
              res.writeHead(302, { Location: authUrl });
              res.end();
            }
          });
        }
        else if(parsedUrl.pathname == '/verify')
        {
          // Verify identity assertion
          // NOTE: Passing just the URL is also possible
          relyingParty.verifyAssertion(req, function(error, result)
          {
            res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });

            if(error)
            {
              res.end('Authentication failed: ' + error.message);
            }
            else
            {
              // Result contains properties:
              // - authenticated (true/false)
              // - answers from any extensions (e.g.
              //   "http://axschema.org/contact/email" if requested
              //   and present at provider)
              res.end((result.authenticated ? 'Success :)' : 'Failure :(') +
                '\n\n' + JSON.stringify(result));
            }
          });
        }
        else
        {
            // Deliver an OpenID form on all other URLs
            res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
            res.end('<!DOCTYPE html><html><body>'
                + '<form method="get" action="/authenticate">'
                + '<p>Login using OpenID</p>'
                + '<input name="openid_identifier" />'
                + '<input type="submit" value="Login" />'
                + '</form></body></html>');
        }
    });
server.listen(8888);
