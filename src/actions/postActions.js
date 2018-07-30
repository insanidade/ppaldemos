import fetch from 'isomorphic-fetch';
import * as CryptoJS from 'crypto-js';

const PAYPAL_SANDBOX_API = 'https://api.sandbox.paypal.com';
const GET_KEY = '/v1/oauth2/token';
const CREATE_PAYMENT = '/v1/payments/payment';
const EXECUTE_PAYMENT = '/execute/';


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
    
    /* .then(response => 
        response.json()
        //return response;
    ).then(responseJson => {console.log(responseJson);} */ 


    const finalJson = await response.json();
    console.log('FINAL: '+ JSON.stringify(finalJson));
    return finalJson
    /* }).then(response => { 
        console.log('resultado: '+JSON.stringify(response));
        return response;
    }).catch(err => err); */

    /* return fetch(PAYPAL_SANDBOX_API + GET_KEY, {
        method: 'POST',
        //mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'Accept-Language':'en_US'
        }
    }).then(res => {
        console.log('resultado: '+res);
        return res;
    }).catch(err => err); */
}

//####################################################################
//####################################################################
//####################################################################

export async function createPayment(token) {
    console.log('invoking createPayment com token: ' + token);

    //var createJson = "{\"intent\": \"sale\" ,\"payer\": {\"payment_method\": \"paypal\"},application_context: {brand_name: \"<<Store Name>>\",shipping_preference: \"SET_PROVIDED_ADDRESS\"},transactions: [    {        amount: {            currency: \"BRL\",              total: \"30.00\",              details: {        shipping: \"10.00\",                subtotal: \"20.00\"              }            },    \"description\": \"Order #942342 from storeURL\",    \"payment_options\": {    \"allowed_payment_method\": \"IMMEDIATE_PAY\"            },    \"invoice_number\": \"942342\",    \"item_list\": {    \"shipping_address\": {    \"recipient_name\": \"Thiago Gustavo Campos\",    \"line1\": \"Avenida dos Tarumãs, 32 – apt 123\",    \"line2\": \"Bairro\",    \"city\": \" Sâo Paulo\",  \"country_code\": \"BR\",    \"postal_code\": \" 78556224\",    \"state\": \"SP\",    \"phone\": \"(66)9371-5868\"              },    \"items\": [                {        \"name\": \"Product\",        \"description\": \"Product description\",        \"quantity\": \"2\",        \"price\": \"10.00\",        \"sku\": \"product_id_99\",        \"currency\": \"BRL\"                }]            }          }        ],\"redirect_urls\": {\"return_url\": \"http://www.<<Store URL>>.com\",\"cancel_url\": \"http://www.<<Store URL>>.com\"        }      }";

    const response = await fetch(PAYPAL_SANDBOX_API + CREATE_PAYMENT, {
        method: 'POST',
        //mode: 'CORS',
        headers: new Headers({
            'Content-Type': 'application/json',
            //'Accept-Language':'en_US', 
            //'Content-Type': 'application/x-www-form-urlencoded',           
            'Authorization':'Bearer ' + token
          }),
        body: '{\"intent\": \"sale\" ,\"payer\": {\"payment_method\": \"paypal\"},\"application_context\": {\"brand_name\": \"Store\",\"shipping_preference\": \"SET_PROVIDED_ADDRESS\"},\"transactions\": [    {        \"amount\": {            \"currency\": \"BRL\",              \"total\": \"30.00\",              \"details\": {        \"shipping\": \"10.00\",                \"subtotal\": \"20.00\"              }            },    \"description\": \"Order #942342 from storeURL\",    \"payment_options\": {    \"allowed_payment_method\": \"IMMEDIATE_PAY\"            },        \"item_list\": {    \"shipping_address\": {    \"recipient_name\": \"Otávio Augusto\",    \"line1\": \"Avenida dos Tarumãs, 32 – apt 123\",    \"line2\": \"Bairro\",    \"city\": \"São Paulo\",  \"country_code\": \"BR\",    \"postal_code\": \"01402-000\",    \"state\": \"SP\",    \"phone\": \"(66)9371-5868\"              },    \"items\": [                {        \"name\": \"Product\",        \"description\": \"Product description\",        \"quantity\": \"2\",        \"price\": \"10.00\",        \"sku\": \"product_id_99\",        \"currency\": \"BRL\"                }]            }          }        ],\"redirect_urls\": {\"return_url\": \"http://www.bababababa.com\",\"cancel_url\": \"http://www.bababababa.com\"        }      }'
   
       
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