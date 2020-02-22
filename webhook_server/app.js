// Dependencies
const fetch = require('node-fetch');
const fs = require('fs');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const express = require('express');
const querystring = require('querystring');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/insanidade.servebeer.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/insanidade.servebeer.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/insanidade.servebeer.com/chain.pem', 'utf8');

const token = 'A21AAEgA6mAo6FT7kDN30_LrfQMhBlITcj-bS39d8CZQhort1SIDP4i4-MnxKh82LZA1Qqi_D3BqxC7JqjBbd0juGIHuquRRw';

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

//app.use((req, res) => {
//	res.send('Hello, OTAVIO !');
//});
app.use(bodyParser.json());

app.post('/wh', function (req, res) {
  
  const body = req.body.id
  console.log('SERVIDOR CHAMADO POST PARA /wh' );
  console.log('SERVIDOR: HOSTNAME ORIGEM =>'+req.hostname );
  console.log('SERVIDOR: IP ORIGEM => '+req.ip);
  console.log('SERVIDOR: ID ORIGEM => '+req.body.id);
  console.log('SERVIDOR LISTENER: EVENT TYPE ORIGEM => '+req.body.event_type);
  //console.log('SERVIDOR FULL BODY => '+JSON.stringify(req.body));
  //console.log(JSON.stringify(req.headers));  
//console.log(req.body);
//############################################
  /* console.log(req.header("paypal-transmission-id"));
  console.log(req.header("paypal-transmission-time"));
  console.log(req.header("paypal-transmission-sig"));
  console.log(req.header("paypal-auth-version"));
  console.log(req.header("paypal-cert-url"));
  console.log(req.header("paypal-auth-algo")); */

  var myBody = "{"+
    "\"transmission_id\":\""+req.header("paypal-transmission-id")+"\","+
    "\"transmission_time\":\""+req.header("paypal-transmission-time")+"\","+
    "\"cert_url\":\""+req.header("paypal-cert-url")+"\","+
    "\"auth_algo\":\""+req.header("paypal-auth-algo")+"\","+
    "\"transmission_sig\":\""+req.header("paypal-transmission-sig")+"\","+
    "\"webhook_id\":\"3L32938382032915T\","+
    "\"webhook_event\": "+JSON.stringify(req.body)+
  "}"

  console.log('MY BODY IS: ' + myBody);

  const finalResult = fetch('https://api.sandbox.paypal.com/v1/notifications/verify-webhook-signature', {
    method: req.body.links[1].method,
    body: myBody,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token/* ,
      "paypal-transmission-id": req.header("paypal-transmission-id"),
      "paypal-transmission-time": req.header("paypal-transmission-time"),
      "paypal-transmission-sig": req.header("paypal-transmission-sig"),
      "paypal-auth-version": req.header("paypal-auth-version"),
      "paypal-cert-url": req.header("paypal-cert-url"),
      "paypal-auth-algo": req.header("paypal-auth-algo") */
    }

    }).then(resp => resp.text())
    .then(
        textConverted => {
		console.log(querystring.parse(textConverted));
		res.send(querystring.parse(textConverted));
		}) ;
//#####################################
  //res.send('Oi Otavio!!Hello World!');
});

app.get('/wh', function (req, res) {
  console.log('SERVIDOR CHAMADO PARA /wh' );
  res.send('Oi Otavio!!Hello World!');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('odefranca - HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('odefranca - HTTPS Server running on port 443');
});
