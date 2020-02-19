const express = require('express');

const fetch = require('node-fetch');

const dotenv = require('dotenv');    
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const ENV_PRODUCTION = 'prod';
const ENV_SANDBOX = 'sandbox';

app.get('/api/mensagem', (req, res) => {
    console.log("SERVIDOR CHAMANDO");

    res.send({ express: 'Reference com NVP' });
});

//#############################################################################
//#############################################################################
//#############################################################################
app.get('/api/doRef', (req, res) => {
    console.log("SERVIDOR: CHAMADA REMOTA DoReferenceTransaction");
    console.log("SERVIDOR: PARAMETROS =>" +req.query.ba);
    console.log("SERVIDOR: PARAMETROS =>" +req.hostname);
    console.log("SERVIDOR: PARAMETROS =>" +req.ip);
    var querystring = require('querystring');   

   
    var postData = querystring.stringify({
        "USER": "odefranca-bus_api1.paypal.com",
        "PWD": "N4YDYTL8972DZW6G",
        "SIGNATURE": "AkgQb6Ohw5xH4skCbbZZeyFBRJNDAbe641LDgzbnWkOgJr-z3qgmxiOr",
        "METHOD": "DoReferenceTransaction",
        "VERSION":"204",
        "AMT":"104.17",//#The amount the buyer will pay in a payment period
        "CURRENCYCODE":"BRL", //#The currency, such as US dollars
        "PAYMENTACTION":"SALE",    //#The type of payment
        "REFERENCEID":req.query.ba
    });

    console.log(postData);
    

    console.log('CONFIGURADO POSTDATA');
   
    const finalResult = fetch('https://api-3t.sandbox.paypal.com/nvp', {
        method: "POST",
        body: postData
       
    }).then(resp => resp.text())
    .then(
        textConverted => res.send(querystring.parse(textConverted))) ;

});
//#############################################################################
//#############################################################################
//#############################################################################
app.get('/api/createBA', (req, res) => {
    console.log("SERVIDOR: CHAMADA REMOTA CreateBillingAgreement");
    console.log("SERVIDOR: PARAMETROS =>" +req.query.token);
    var querystring = require('querystring');   

    /* 
   
    POST data:
    USER=insert_merchant_user_name_here
    &PWD=insert_merchant_password_here
    &SIGNATURE=insert_merchant_signature_value_here
    &METHOD=CreateBillingAgreement
    &VERSION=86
    &TOKEN=insert_token_value_here */

    var postData = querystring.stringify({
        "USER": "odefranca-bus_api1.paypal.com",
        "PWD": "N4YDYTL8972DZW6G",
        "SIGNATURE": "AkgQb6Ohw5xH4skCbbZZeyFBRJNDAbe641LDgzbnWkOgJr-z3qgmxiOr",
        "METHOD": "CreateBillingAgreement",
        "VERSION":"204",
        "TOKEN":req.query.token//insert_token_value_here
    });

    console.log(postData);
    
    var options = {
        uri: 'https://api-3t.sandbox.paypal.com/nvp',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Length': postData.length
        },
        formData: postData
    }

    /* rp(options)
    .then(function (body) {
        console.log('SUCESSO: '+body.responseText);
    })
    .catch(function (err) {
        console.log('DEU PAU: '+err);
    }); */

    console.log('CONFIGURADO POSTDATA');
    
    const finalResult = fetch('https://api-3t.sandbox.paypal.com/nvp', {
        method: "POST",
        body: postData
        /* headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"            
        }) */
    }).then(resp => resp.text())
    .then(
        textConverted => res.send(querystring.parse(textConverted))) ;

    
});


//#############################################################################
//#############################################################################
//#############################################################################
app.get('/api/setEC', (req, res) => {
    console.log("SERVIDOR: CHAMADA REMOTA SetExpressCheckout");

    console.log("SERVIDOR: ENV =>" +req.query.env);
    console.log("SERVIDOR: MOCK LABEL =>" +req.query.errMockLabel);
    console.log("SERVIDOR: MOCK VALUE =>" +req.query.errMockValue);
    console.log("SERVIDOR: RETURN URL =>" +req.query.returnUrl);

    
    var environment = req.query.env;    

    var querystring = require('querystring');    

    var postData = querystring.stringify({
        /* "USER": "odefranca-bus_api1.paypal.com",
        "PWD": "N4YDYTL8972DZW6G",
        "SIGNATURE": "AkgQb6Ohw5xH4skCbbZZeyFBRJNDAbe641LDgzbnWkOgJr-z3qgmxiOr", */

        "USER": environment === ENV_PRODUCTION?process.env.REACT_APP_USER:process.env.REACT_APP_SANDBOX_USER,
        "PWD": environment === ENV_PRODUCTION? process.env.REACT_APP_PWD:process.env.REACT_APP_SANDBOX_PWD,
        "SIGNATURE": environment === ENV_PRODUCTION?process.env.REACT_APP_SIGNATURE:process.env.REACT_APP_SANDBOX_SIGNATURE,
        "METHOD": "SetExpressCheckout",
        "VERSION":"204",
        "MAXAMT": req.query.errMockValue,
        "PAYMENTREQUEST_0_PAYMENTACTION": "SALE",    //#Payment authorization
        "PAYMENTREQUEST_0_AMT": req.query.amt,//    #The amount authorized
        //"AMT": req.query.errMockValue,//    #The amount authorized
        "PAYMENTREQUEST_0_CURRENCYCODE": "BRL",//    #The currency, e.g. US dollars
        //"L_BILLINGTYPE0": "MerchantInitiatedBilling",//    #The type of billing agreement
        //"L_BILLINGAGREEMENTDESCRIPTION0": "Acordo",// #The description of the billing agreement
        "cancelUrl": req.query.returnUrl, //#For use if the consumer decides not to proceed with payment
        "returnUrl": req.query.returnUrl,
        'PAYMENTREQUEST_0_SHIPTONAME':"Otávio Augusto",
        'PAYMENTREQUEST_0_SHIPTOSTREET': "Rua Ana Firmino da Costa, 42",
        'PAYMENTREQUEST_0_SHIPTOSTREET2': "Catolé",
        'PAYMENTREQUEST_0_SHIPTOCITY': "Campina Grande",
        'PAYMENTREQUEST_0_SHIPTOSTATE': "PB",
        'PAYMENTREQUEST_0_SHIPTOZIP': "58108125",
        'PAYMENTREQUEST_0_SHIPTOCOUNTRYCODE': "BR",
        'PAYMENTREQUEST_0_SHIPTOPHONENUM':"+558333222222",        
        "NOSHIPPING": '1',
        "ADDROVERRIDE": '1',

    });

    /* USER = fasilva_api1.paypal.com
PWD = 63GZ6QY8X8F45VE2
SIGNATURE = An5ns1Kso7MWUdW4ErQKJJJ4qi4-A33gNVOb3DgWNHivhhinGfeyEdM2 */
    

    console.log(postData);
    console.log('SERVER WILL SEND REQUEST TO: '+environment);
    
    /* var options = {
        uri: 'https://api-3t'+environment.toString().trim === ENV_PRODUCTION?'':'.sandbox'+'.paypal.com/nvp',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Length': postData.length
        },
        formData: postData
    } */

    

    console.log('CONDICIONAL: '+ (environment === ENV_PRODUCTION?'PROD!':'SANDBOX'))

    console.log('CONFIGURADO POSTDATA');
    var fetchUrl = 'https://api-3t'+ (environment === ENV_PRODUCTION?'':'.sandbox') +'.paypal.com/nvp';
    console.log('REQUISICAO SERA FEITA PARA '+fetchUrl);
    
    
    const finalResult = fetch(fetchUrl, {
        method: "POST",
        body: postData
        /* headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"            
        }) */
    }).then(resp => resp.text())
    .then(
        textConverted => res.send(querystring.parse(textConverted))) ;

    
});

//#############################################################################
//#############################################################################
//#############################################################################
app.get('/api/getECDetails', (req, res) => {
    console.log("SERVIDOR: CHAMADA REMOTA GetExpressCheckoutDetails");
    /* console.log("SERVIDOR: PARAMETROS =>" +req.query.ba);
    console.log("SERVIDOR: PARAMETROS =>" +req.hostname);
    console.log("SERVIDOR: PARAMETROS =>" +req.ip); */
    var environment = req.query.env;
    var querystring = require('querystring');   

   
    var postData = querystring.stringify({
        "USER": "fasilva_api1.paypal.com",
        "PWD": "63GZ6QY8X8F45VE2",
        "SIGNATURE": "An5ns1Kso7MWUdW4ErQKJJJ4qi4-A33gNVOb3DgWNHivhhinGfeyEdM2",
        "METHOD": "GetExpressCheckoutDetails",
        "VERSION":"204",
        "TOKEN":req.query.token
    });

    console.log(postData);
    

    console.log('CONFIGURADO POSTDATA');

    console.log('CONDICIONAL: '+ (environment === ENV_PRODUCTION?'PROD!':'SANDBOX'))

    console.log('CONFIGURADO POSTDATA');
    var fetchUrl = 'https://api-3t'+ (environment === ENV_PRODUCTION?'':'.sandbox') +'.paypal.com/nvp';
    console.log('REQUISICAO SERA FEITA PARA '+fetchUrl);

   
    const finalResult = fetch(fetchUrl, {
        method: "POST",
        body: postData
       
    }).then(resp => resp.text())
    .then(
        textConverted => res.send(querystring.parse(textConverted))) ;

});

//#############################################################################
//#############################################################################
//#############################################################################
app.get('/api/doEC', (req, res) => {
    console.log("SERVIDOR: CHAMADA REMOTA DoExpressCheckoutPayment");
    /* console.log("SERVIDOR: PARAMETROS =>" +req.query.ba);
    console.log("SERVIDOR: PARAMETROS =>" +req.hostname);
    console.log("SERVIDOR: PARAMETROS =>" +req.ip); */
    var environment = req.query.env;
    var querystring = require('querystring');   

   
    var postData = querystring.stringify({
        "USER": "fasilva_api1.paypal.com",
        "PWD": "63GZ6QY8X8F45VE2",
        "SIGNATURE": "An5ns1Kso7MWUdW4ErQKJJJ4qi4-A33gNVOb3DgWNHivhhinGfeyEdM2",
        "METHOD": "DoExpressCheckoutPayment",
        "VERSION":"204",
        "TOKEN":req.query.token, 
        "PAYERID":req.query.payerid,
        "PAYMENTREQUEST_0_PAYMENTACTION": "SALE",
        "PAYMENTREQUEST_0_AMT": req.query.amt,
        "PAYMENTREQUEST_0_CURRENCYCODE": "BRL"
    });

    console.log(postData);
    

    console.log('CONFIGURADO POSTDATA');

    console.log('CONDICIONAL: '+ (environment === ENV_PRODUCTION?'PROD!':'SANDBOX'))

    console.log('CONFIGURADO POSTDATA');
    var fetchUrl = 'https://api-3t'+ (environment === ENV_PRODUCTION?'':'.sandbox') +'.paypal.com/nvp';
    console.log('REQUISICAO SERA FEITA PARA '+fetchUrl);
   
    const finalResult = fetch(fetchUrl, {
        method: "POST",
        body: postData
       
    }).then(resp => resp.text())
    .then(
        textConverted => res.send(querystring.parse(textConverted))) ;

});

app.listen(port, () => console.log(`Listening on port ${port}`));