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
  const token = 'A21AAHuo6jzs0_LzADgtwRHLovUAN0ny6AvR7EVBoM4A4yylQECrBbz9o5JdqL-tZ6N5kdK03snOCooanlNYGQ3b9TndElyNA'
  const body = req.body.id
  console.log('SERVIDOR CHAMADO POST PARA /wh' );
  console.log('SERVIDOR: HOSTNAME ORIGEM =>'+req.hostname );
  console.log('SERVIDOR: IP ORIGEM => '+req.ip);
  console.log('SERVIDOR: ID ORIGEM => '+req.body.id);
  console.log('SERVIDOR LISTENER: EVENT TYPE ORIGEM => '+req.body.event_type);
  console.log('SERVIDOR REDIR LINK => '+req.body.links[1].href);
  console.log('SERVIDOR FULL BODY => '+JSON.stringify(req.body));
  console.log(JSON.stringify(req.headers));  

  var header = req.header('paypal-transmission-id');
  
  console.log('VAR header: '+header);



//############################################
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
