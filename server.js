const express = require('express');

const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

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
    var querystring = require('querystring');   

   
    var postData = querystring.stringify({
        "USER": "odefranca-bus_api1.paypal.com",
        "PWD": "N4YDYTL8972DZW6G",
        "SIGNATURE": "AkgQb6Ohw5xH4skCbbZZeyFBRJNDAbe641LDgzbnWkOgJr-z3qgmxiOr",
        "METHOD": "DoReferenceTransaction",
        "VERSION":"204",
        "AMT":"50",//#The amount the buyer will pay in a payment period
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
    /* (err, res) => {
        console.log('RES SUPERAGENT: '+res);
        console.log('ERR SUPERAGENT: '+err);
    }  */
    //console.log(finalResult);
      /* .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }); */
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const finalResult = fetch('https://api-3t.sandbox.paypal.com/nvp', {
        method: "POST",
        body: postData
        /* headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"            
        }) */
    }).then(resp => resp.text())
    .then(
        textConverted => res.send(querystring.parse(textConverted))) ;

    //console.log('FROM FETCH: '+ decodeURI(finalResult));
    
    //res.send(textConverted);


    //res.send({ express: 'Hello From Express, Otávio!' });
});
//#############################################################################
//#############################################################################
//#############################################################################
app.get('/api/setEC', (req, res) => {
    console.log("SERVIDOR: CHAMADA REMOTA SetExpressCheckout");
    var querystring = require('querystring');    

    var postData = querystring.stringify({
        "USER": "odefranca-bus_api1.paypal.com",
        "PWD": "N4YDYTL8972DZW6G",
        "SIGNATURE": "AkgQb6Ohw5xH4skCbbZZeyFBRJNDAbe641LDgzbnWkOgJr-z3qgmxiOr",
        "METHOD": "SetExpressCheckout",
        "VERSION":"204",
        "PAYMENTREQUEST_0_PAYMENTACTION": "SALE",    //#Payment authorization
        "PAYMENTREQUEST_0_AMT": "0",//    #The amount authorized
        "PAYMENTREQUEST_0_CURRENCYCODE": "BRL",//    #The currency, e.g. US dollars
        "L_BILLINGTYPE0": "MerchantInitiatedBilling",//    #The type of billing agreement
        "L_BILLINGAGREEMENTDESCRIPTION0": "Acordo",// #The description of the billing agreement
        "cancelUrl": "https://example.com/cancel", //#For use if the consumer decides not to proceed with payment
        "returnUrl": "http://localhost:3000/refnvp"
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
    /* (err, res) => {
        console.log('RES SUPERAGENT: '+res);
        console.log('ERR SUPERAGENT: '+err);
    }  */
    //console.log(finalResult);
      /* .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }); */
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const finalResult = fetch('https://api-3t.sandbox.paypal.com/nvp', {
        method: "POST",
        body: postData
        /* headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"            
        }) */
    }).then(resp => resp.text())
    .then(
        textConverted => res.send(querystring.parse(textConverted))) ;

    //console.log('FROM FETCH: '+ decodeURI(finalResult));
    
    //res.send(textConverted);


    //res.send({ express: 'Hello From Express, Otávio!' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));




