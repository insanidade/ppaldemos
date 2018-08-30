import fetch from 'isomorphic-fetch';
import * as CryptoJS from 'crypto-js';

const PAYPAL_SANDBOX_API = 'https://api.sandbox.paypal.com';
const GET_KEY = '/v1/oauth2/token';
const CREATE_PAYMENT = '/v1/payments/payment';
const EXECUTE_PAYMENT = '/execute/';
const CREATE_BA = '/v1/billing-agreements/';
const CREATE_BA_TOKEN = CREATE_BA + 'agreement-tokens';
const CREATE_BA_ID = '/agreements';
const CALCULATED_FINANCING = '/v1/credit/calculated-financing-options';


export async function createToken(data) {
    console.log('invoking createToken: ' + data.clientID);

    const response = await fetch(PAYPAL_SANDBOX_API + GET_KEY, {
        method: 'POST',
        //mode: 'CORS',
        headers: new Headers({
            'Accept': 'application/json',
            'Accept-Language':'en_US', 
            'Content-Type': 'application/x-www-form-urlencoded',           
            'Authorization':'Basic ' + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data.clientID+":"+data.secret))
          }),
        body: 'grant_type=client_credentials'
   
       
    })

    const finalJson = await response.json();
    console.log('FINAL: '+ JSON.stringify(finalJson));
    return finalJson

}

//####################################################################
//####################################################################
//####################################################################

export async function createPayment(token, billingAgreementData) {
    console.log('invoking createPayment com token: ' + token);
    const response = await fetch(PAYPAL_SANDBOX_API + CREATE_PAYMENT, {
        method: 'POST',
        //mode: 'CORS',
        headers: new Headers({
            'Content-Type': 'application/json',
            //'Accept-Language':'en_US', 
            //'Content-Type': 'application/x-www-form-urlencoded',           
            'Authorization':'Bearer ' + token
          }),
        body: "{\"intent\": \"sale\" ,"+
                "\"payer\": {"+
                            "\"payment_method\": \"paypal\""+


                            
                            "},"+
                "\"application_context\": {"+
                            "\"brand_name\": \"Store\","+
                            "\"shipping_preference\": \"SET_PROVIDED_ADDRESS\""+
                "},"+
                "\"transactions\":[{"+
                                "\"amount\": {"+
                                            "\"currency\": \"BRL\","+
                                            "\"total\": \"30.00\","+
                                            "\"details\": {"+
                                                        "\"shipping\": \"10.00\","+
                                                        "\"subtotal\": \"20.00\""+
                                                        "}"+
                                            "},"+
                                            "\"description\": \"Order #942342 from storeURL\","+
                                            "\"payment_options\": {"+
                                                                "\"allowed_payment_method\": \"IMMEDIATE_PAY\""+
                                                                "},"+
                                            "\"item_list\": {"+
                                                            "\"shipping_address\": {"+
                                                                                "\"recipient_name\": \"Otávio Augusto\","+
                                                                                "\"line1\": \"Avenida dos Tarumãs, 32 – apt 123\","+
                                                                                "\"line2\": \"Bairro\","+
                                                                                "\"city\": \"São Paulo\","+
                                                                                "\"country_code\": \"BR\","+
                                                                                "\"postal_code\": \"01402-000\","+
                                                                                "\"state\": \"SP\","+
                                                                                "\"phone\": \"(66)9371-5868\""+
                                                                                "},"+
                                                            "\"items\": [{"+
                                                                        "\"name\": \"Product\","+
                                                                        "\"description\": \"Product description\","+
                                                                        "\"quantity\": \"2\","+
                                                                        "\"price\": \"10.00\","+
                                                                        "\"sku\": \"product_id_99\","+
                                                                        "\"currency\": \"BRL\""+
                                                                        "}]"+
                                                            "}"+
                                    "}],"+
                "\"redirect_urls\": {"+
                                    "\"return_url\": \"http://www.bababababa.com\","+
                                    "\"cancel_url\": \"http://www.bababababa.com\""+
                                    "}"+
                "}"
   
       
    })
    const finalJson = await response.json();
    console.log('FINAL: '+ JSON.stringify(finalJson));

    return finalJson  
}

//####################################################################
//####################################################################
//####################################################################

export async function executePayment(fullJson, token, url) {
    console.log('invoking executePayment com payment-Id: ' + fullJson);
    var payer_id = fullJson.result.payer.payer_info.payer_id;
    //var createJson = "{\"intent\": \"sale\" ,\"payer\": {\"payment_method\": \"paypal\"},application_context: {brand_name: \"<<Store Name>>\",shipping_preference: \"SET_PROVIDED_ADDRESS\"},transactions: [    {        amount: {            currency: \"BRL\",              total: \"30.00\",              details: {        shipping: \"10.00\",                subtotal: \"20.00\"              }            },    \"description\": \"Order #942342 from storeURL\",    \"payment_options\": {    \"allowed_payment_method\": \"IMMEDIATE_PAY\"            },    \"invoice_number\": \"942342\",    \"item_list\": {    \"shipping_address\": {    \"recipient_name\": \"Thiago Gustavo Campos\",    \"line1\": \"Avenida dos Tarumãs, 32 – apt 123\",    \"line2\": \"Bairro\",    \"city\": \" Sâo Paulo\",  \"country_code\": \"BR\",    \"postal_code\": \" 78556224\",    \"state\": \"SP\",    \"phone\": \"(66)9371-5868\"              },    \"items\": [                {        \"name\": \"Product\",        \"description\": \"Product description\",        \"quantity\": \"2\",        \"price\": \"10.00\",        \"sku\": \"product_id_99\",        \"currency\": \"BRL\"                }]            }          }        ],\"redirect_urls\": {\"return_url\": \"http://www.<<Store URL>>.com\",\"cancel_url\": \"http://www.<<Store URL>>.com\"        }      }";

    const response = await fetch(url, {
        method: 'POST',
        //mode: 'CORS',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + token
          }),
        body: '{\"payer_id\": \"'+payer_id+'\" }'
   
       
    }) 

    const finalJson = await response.json();
    console.log('FINAL: '+ JSON.stringify(finalJson));

    
    return finalJson
  
}
//####################################################################
//####################################################################
//####################################################################

export async function createBAToken(token) {
    console.log('invoking createBAToken');
    //var payer_id = fullJson.result.payer.payer_info.payer_id;
    //var createJson = "{\"intent\": \"sale\" ,\"payer\": {\"payment_method\": \"paypal\"},application_context: {brand_name: \"<<Store Name>>\",shipping_preference: \"SET_PROVIDED_ADDRESS\"},transactions: [    {        amount: {            currency: \"BRL\",              total: \"30.00\",              details: {        shipping: \"10.00\",                subtotal: \"20.00\"              }            },    \"description\": \"Order #942342 from storeURL\",    \"payment_options\": {    \"allowed_payment_method\": \"IMMEDIATE_PAY\"            },    \"invoice_number\": \"942342\",    \"item_list\": {    \"shipping_address\": {    \"recipient_name\": \"Thiago Gustavo Campos\",    \"line1\": \"Avenida dos Tarumãs, 32 – apt 123\",    \"line2\": \"Bairro\",    \"city\": \" Sâo Paulo\",  \"country_code\": \"BR\",    \"postal_code\": \" 78556224\",    \"state\": \"SP\",    \"phone\": \"(66)9371-5868\"              },    \"items\": [                {        \"name\": \"Product\",        \"description\": \"Product description\",        \"quantity\": \"2\",        \"price\": \"10.00\",        \"sku\": \"product_id_99\",        \"currency\": \"BRL\"                }]            }          }        ],\"redirect_urls\": {\"return_url\": \"http://www.<<Store URL>>.com\",\"cancel_url\": \"http://www.<<Store URL>>.com\"        }      }";

    const response = await fetch(PAYPAL_SANDBOX_API + CREATE_BA_TOKEN, {
        method: 'POST',        
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + token
          }),
        body: "{"+
                "\"description\":" + "\"Descrição do termo de odefranca\" ,"+
                "\"payer\" : {"+
                    "\"payment_method\": \"PAYPAL\""+
                "},"+
                "\"plan\": {"+
                    "\"type\": \"MERCHANT_INITIATED_BILLING\","+
                    "\"merchant_preferences\": {"+
                            "\"cancel_url\": \"http://localhost:3000/refInstallCancel\","+
                            "\"return_url\": \"http://localhost:3000/refInst?accept=true\","+
                            "\"accepted_pymt_type\": \"Instant\""+
                    "}"+
                "}"+
            "}" 
   
//'{\"payer_id\": \"'+payer_id+'\" }'
        
       
    }) 

    const finalJson = await response.json();
    console.log('FINAL: '+ JSON.stringify(finalJson));

    
    return finalJson
  
}
//####################################################################
//####################################################################
//####################################################################

export async function createFinalBA(token, ba_token) {
    console.log('invoking createFinalBA');
    //var payer_id = fullJson.result.payer.payer_info.payer_id;
    //var createJson = "{\"intent\": \"sale\" ,\"payer\": {\"payment_method\": \"paypal\"},application_context: {brand_name: \"<<Store Name>>\",shipping_preference: \"SET_PROVIDED_ADDRESS\"},transactions: [    {        amount: {            currency: \"BRL\",              total: \"30.00\",              details: {        shipping: \"10.00\",                subtotal: \"20.00\"              }            },    \"description\": \"Order #942342 from storeURL\",    \"payment_options\": {    \"allowed_payment_method\": \"IMMEDIATE_PAY\"            },    \"invoice_number\": \"942342\",    \"item_list\": {    \"shipping_address\": {    \"recipient_name\": \"Thiago Gustavo Campos\",    \"line1\": \"Avenida dos Tarumãs, 32 – apt 123\",    \"line2\": \"Bairro\",    \"city\": \" Sâo Paulo\",  \"country_code\": \"BR\",    \"postal_code\": \" 78556224\",    \"state\": \"SP\",    \"phone\": \"(66)9371-5868\"              },    \"items\": [                {        \"name\": \"Product\",        \"description\": \"Product description\",        \"quantity\": \"2\",        \"price\": \"10.00\",        \"sku\": \"product_id_99\",        \"currency\": \"BRL\"                }]            }          }        ],\"redirect_urls\": {\"return_url\": \"http://www.<<Store URL>>.com\",\"cancel_url\": \"http://www.<<Store URL>>.com\"        }      }";

    console.log("ENDPOINT RETRIEVE BA: "+PAYPAL_SANDBOX_API + CREATE_BA + ba_token + CREATE_BA_ID);
    const response = await fetch(PAYPAL_SANDBOX_API + CREATE_BA + ba_token + CREATE_BA_ID, {
        method: 'POST',        
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + token
          }),
        body: "{\"agreement_token\":\""+ ba_token + "\"}"
       
    }) 

    const finalJson = await response.json();
    console.log('RESPONSE RETRIEVE BA: '+ JSON.stringify(finalJson));

    
    return finalJson
  
}
//####################################################################
//####################################################################
//####################################################################

export async function retrieveCalculatedFinancing(token, ba_final) {
    console.log('invoking createFinalBA');


    console.log("ENDPOINT RETRIEVE BA: "+PAYPAL_SANDBOX_API + CALCULATED_FINANCING);
    const response = await fetch(PAYPAL_SANDBOX_API + CALCULATED_FINANCING, {
        method: 'POST',        
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + token
          }),
        body: "{"+
            "\"financing_country_code\":\"BR\","+
            "\"transaction_amount\":{"+
               "\"value\":\"120.00\","+
               "\"currency_code\":\"BRL\""+
            "},"+
            "\"funding_instrument\":{"+
               "\"type\":\"BILLING_AGREEMENT\","+
               "\"billing_agreement\":{"+
                  "\"billing_agreement_id\":\""+ba_final+"\""+
               "}"+
            "}"+
         "}"
    }) 

    const finalJson = await response.json();
    console.log('RESPONSE CALCULATE FINANCING: '+ JSON.stringify(finalJson));

    
    return finalJson
  
}

//####################################################################
//####################################################################
//####################################################################

export async function setExpressCheckout_() {
    console.log('invoking setExpressCheckout');
    
    var http = require('https'),
    querystring = require('querystring');
    require('request-to-curl');
 
    var postData = querystring.stringify({
        'msg': 'Hello World!',
        'teste': 'data teste'
    });
     
    var options = {
        hostname: 'api-3t.sandbox.paypal.com',
        path: '/nvp',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    
    var req = http.request(options, (res) => {        
        console.log('REQUEST EM CURL: '+req.toCurl());
        
    });
     
    /* req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    }); */
     
    // write data to request body
    console.log('REQUEST.WRITE :'+req.write(postData));
    
    req.end();

    //http.request.

    
    return req.response
  
}
//####################################################################
//####################################################################
//####################################################################
export async function setExpressCheckout(){
    var https = require('https'),
    querystring = require('querystring');
    require('request-to-curl');
    require('request');

    var postData = querystring.stringify({
        'USER': 'odefranca-bus_api1.paypal.com',
        'PWD': 'N4YDYTL8972DZW6G',
        'SIGNATURE': 'AkgQb6Ohw5xH4skCbbZZeyFBRJNDAbe641LDgzbnWkOgJr-z3qgmxiOr',
        'METHOD': 'SetExpressCheckout',
        'VERSION':'86',
        'PAYMENTREQUEST_0_PAYMENTACTION': 'AUTHORIZATION',    //#Payment authorization
        'PAYMENTREQUEST_0_AMT': '25.00',//    #The amount authorized
        'PAYMENTREQUEST_0_CURRENCYCODE': 'BRL',//    #The currency, e.g. US dollars
        'L_BILLINGTYPE0': 'MerchantInitiatedBilling',//    #The type of billing agreement
        'L_BILLINGAGREEMENTDESCRIPTION0': 'ClubUsage',//    #The description of the billing agreement
        'cancelUrl': 'https://example.com/cancel', //    #For use if the consumer decides not to proceed with payment
        'returnUrl': 'https://example.com/success'
    });
     
    var options = {
        hostname: 'api-3t.sandbox.paypal.com',
        path: '/nvp',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };


    var req = await https.request(options, (resp) =>{
        
        req.toCurl();           
        
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) =>{
            data += chunk;
            console.log(data);
        });        
        
        resp.on('end', () =>{
            
            console.log(querystring.stringify(data));
        });

        resp.on("error", (err) => {
            console.log("Error: " + err.message);
        });
    })
    
    req.write(postData);
    req.end();
      
    console.log(req.data)
    
    return (req.data)  
}


/* Endpoint URL: https://api-3t.sandbox.paypal.com/nvp
HTTP method: POST
POST data:
USER=insert_merchant_user_name_here
&PWD=insert_merchant_password_here
&SIGNATURE=insert_merchant_signature_value_here
&METHOD=SetExpressCheckout
&VERSION=86
&PAYMENTREQUEST_0_PAYMENTACTION=AUTHORIZATION    #Payment authorization
&PAYMENTREQUEST_0_AMT=25.00    #The amount authorized
&PAYMENTREQUEST_0_CURRENCYCODE=USD    #The currency, e.g. US dollars
&L_BILLINGTYPE0=MerchantInitiatedBilling    #The type of billing agreement
&L_BILLINGAGREEMENTDESCRIPTION0=ClubUsage    #The description of the billing agreement
&cancelUrl=https://example.com/cancel    #For use if the consumer decides not to proceed with payment
&returnUrl=https://example.com/success    #For use if the consumer proceeds with payment */