//import fetch from 'isomorphic-fetch';
import fetch from 'node-fetch';
import * as CryptoJS from 'crypto-js';
import querystring from 'querystring';

const FAKE_ENDPOINT = 'https://webhook.site/a998c0f2-1a3f-4697-b7f3-2a2bd350a51b';
const PAYPAL_SANDBOX_API = 'https://api.sandbox.paypal.com';
const PAYPAL_PROD_API = 'https://api.paypal.com';
const GET_KEY = '/v1/oauth2/token';
const CREATE_PAYMENT = '/v1/payments/payment';
const EXECUTE_PAYMENT = '/execute/';
const CREATE_BA = '/v1/billing-agreements/';
const CREATE_BA_TOKEN = CREATE_BA + 'agreement-tokens';
const CREATE_BA_ID = '/agreements';
const CALCULATED_FINANCING = '/v1/credit/calculated-financing-options';
const CONSUMER_REFERRAL = '/v1/customer/consumer-referrals';
const USER_INFO = '/v1/oauth2/token/userinfo?schema=openidconnect';



export async function consumerReferral(token, data) {
    /* console.log('invoking createToken: ' + data.clientID);
    console.log('invoking createToken secret: ' + data.secret);
 */
    const response = await fetch(PAYPAL_SANDBOX_API + CONSUMER_REFERRAL, {
        method: 'POST',
        //mode: 'CORS',
        headers: new Headers({
            'Accept': 'application/json',
            'Accept-Language':'en_US', 
            'Content-Type': 'application/json',           
            'Authorization':'Bearer ' + token
          }),
        body: "{\"person_details\":{"+ 
            "\"names\":["+
            "{"+
            "\"given_name\":\""+data.givenName+"\","+  
            "\"surname\":\""+data.surname+"\","+
            "\"confirmation\":{"+
            "\"status\":\""+data.status+"\""+
            "}"+
            "}"+
            "],"+
            "\"phone_contacts\":["+
            "{"+
            "\"phone\":{"+
            "\"country_code\":\""+data.phoneCountryCode+"\","+
            "\"national_number\":\""+data.phoneNationalNumber+"\""+
            "},"+
            "\"phone_type\":\""+data.phoneType+"\","+
            "\"confirmation\":{"+
            "\"status\":\""+data.phoneConfirmation+"\""+
            "}"+
            "}"+
            "],"+
            "\"addresses\":["+
            "{"+
            "\"address\":{"+
            "\"line1\":\""+data.addressLine1+"\","+
            "\"line2\":\""+data.addressLine2+"\","+
            "\"city\":\""+data.addressCity+"\","+
            "\"state\":\""+data.addressState+"\","+
            "\"country_code\":\""+data.addressCountryCode+"\","+
            "\"postal_code\":\""+data.addressPostalCode+"\""+
            "},"+
            "\"address_type\":\""+data.addressType+"\","+
            "\"confirmation\":{"+
            "\"status\":\""+data.addressConfirmation+"\""+
            "}"+
            "}"+
            "],"+
            "\"date_of_birth\":{"+
            "\"date\":\""+data.dateOfBirth+"\","+
            "\"confirmation\":{"+
            "\"status\":\""+data.dateConfirmation+"\""+
            "}"+
            "},"+
            "\"origin_country_code\":\""+data.originCountryCode+"\","+
            "\"email_addresses\":["+
            "{"+
            "\"email_address\":\""+data.emailAddress+"\","+
            "\"confirmed\":\""+data.emailConfirmed+"\","+
            "\"primary\":\""+data.emailPrimary+"\","+
            "\"confirmation\":{"+
            "\"status\":\""+data.emailConfirmation+"\""+
            "}"+
            "}"+
            "],"+
            "\"identity_documents\":["+
            "{"+
            "\"type\":\""+data.identityType+"\","+
            "\"value\":\""+data.identityValue+"\","+
            "\"issuer_country_code\":\""+data.identityIssuerCountryCode+"\","+
            "\"confirmation\":{"+
            "\"status\":\""+data.identityConfirmation+"\""+
            "}"+
            "}"+
            "],"+
            "\"locale\":\"pt_BR\""+
            "},"+
            "\"financial_instruments\":{"+
            "\"bank_accounts\":["+
            "{"+
            "\"account_number\":\"097162629\","+
            "\"account_type\":\"CHECKING\","+
            "\"account_number_type\":\"BBAN\","+
            "\"branch_code\": \"0001\","+
            "\"routing_number_1\":\"735\","+
            "\"country_code\":\"BR\","+
            "\"currency_code\":\"BRL\","+
            "\"bank_name\":\"Banco Itau\","+
            "\"confirmation\":{"+
            "\"status\":\"CONFIRMED\""+
            "}"+
            "}"+
            "],"+
            "\"card_accounts\":["+
            "{"+
            "\"account_number\":\"4485870039600228\","+
            "\"expiry_month\":\"05\","+
            "\"expiry_year\":\"2022\","+
            "\"type\":\"VISA\","+
            "\"country_code\":\"BR\","+
            "\"confirmation\":{"+
            "\"status\":\"CONFIRMED\""+
            "}"+
            "}"+
            "]"+
            "},"+
            "\"paypal_account_properties\":{"+
            "\"account_country_code\":\"BR\""+
            "}"+
            "}"
   
       
    })

    const finalJson = await response.json();
    console.log('FINAL CONSUMER REFERRAL: '+ JSON.stringify(finalJson));
    return finalJson

}

//####################################################################
//####################################################################
//####################################################################
export async function createToken(data) {
    console.log('invoking createToken: ' + data.clientID);
    console.log('invoking createToken secret: ' + data.secret);

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
export async function getUserIdentity(token) {
    console.log('ACCESS TOKEN GET USER IDENTITY : ' + token);
    

    const response = await fetch(PAYPAL_SANDBOX_API + USER_INFO, {
        method: 'POST',
        //mode: 'CORS',
        headers: new Headers({
            'Accept': 'application/json',
            'Accept-Language':'en_US', 
            'Content-Type': 'application/x-www-form-urlencoded',
            'PayPal-Partner-Attribution-Id': 'Provided_by_PayPal',           
            'Authorization':'Bearer ' + token
          })
          /* ,
        body: 'grant_type=authorization_code&response_type=token&redirect_uri='+ 'http://localhost:3000/linkedAcc' + '&code=' +code */
   
       
    })

    const finalJson = await response.json();
    console.log('FINAL: '+ JSON.stringify(finalJson));
    return finalJson

}
//####################################################################
//####################################################################
//####################################################################
export async function createTokenPostOnboarding(data ,code) {
    console.log('invoking createToken client id: ' + data.clientID);
    console.log('invoking createToken secret: ' + data.secret);
    console.log('invoking createToken code: ' + code);

    const response = await fetch(PAYPAL_SANDBOX_API + GET_KEY, {
        method: 'POST',
        //mode: 'CORS',
        headers: new Headers({
            'Accept': 'application/json',
            'Accept-Language':'en_US', 
            'Content-Type': 'application/x-www-form-urlencoded',
            'PayPal-Partner-Attribution-Id': 'Provided_by_PayPal',           
            'Authorization':'Basic ' + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data.clientID+":"+data.secret))
          }),
        body: 'grant_type=authorization_code&response_type=token&redirect_uri='+ 'http://localhost:3000/linkedAcc' + '&code=' +code
   
       
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
    const response = await fetch(PAYPAL_SANDBOX_API + CREATE_PAYMENT/*FAKE_ENDPOINT*/, {
        method: 'POST',
        //mode: 'CORS',
        headers: new Headers({
            "Content-Type": "application/json",
            'Accept-Language':'en_US', 
            //'Content-Type': 'application/x-www-form-urlencoded',
            //"PayPal-Mock-Response":"{\"mock_application_codes: INSTRUMENT_DECLINED\"}",           
            "Authorization":"Bearer " + token
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
                                            "\"currency\": \"USD\","+
                                            "\"total\": \"120.00\","+
                                            "\"details\": {"+
                                                        "\"shipping\": \"20.00\","+
                                                        "\"subtotal\": \"100.00\""+
                                                        "}"+
                                            "},"+
                                            "\"description\": \"Order #942342 from storeURL\","+
                                            "\"custom\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjI0ZTg1NC00MzkwLTQ1ZWYtYjQ0NC03OTBjMWM2MWI3MTgiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE1ODg3MDQzODYsImlhdCI6MTU1NzE2ODM4Nn0=.kzn66lejAiDYMMhf0ggpwiGzqJ/6kYsoreCdRCHFti0=\","+
                                            "\"payment_options\": {"+
                                                                "\"allowed_payment_method\": \"IMMEDIATE_PAY\""+
                                                                "},"+
                                            "\"item_list\": {"+
                                                            "\"shipping_address\": {"+
                                                                                "\"recipient_name\": \"Otávio Augusto\","+
                                                                                "\"line1\": \"3355 S\","+
                                                                                "\"line2\": \"Las Vegas Blvd\","+
                                                                                "\"city\": \"Las Vegas\","+
                                                                                "\"country_code\": \"US\","+
                                                                                "\"postal_code\": \"89109\","+
                                                                                "\"state\": \"NV\","+
                                                                                "\"phone\": \"(66)9371-5868\""+
                                                                                "},"+
                                                            "\"items\": [{"+
                                                                        "\"name\": \"Product\","+
                                                                        "\"description\": \"Product description\","+
                                                                        "\"quantity\": \"2\","+
                                                                        "\"price\": \"50.00\","+
                                                                        "\"sku\": \"product_id_99\","+
                                                                        "\"currency\": \"USD\""+
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

export async function capturePaymentWithInstallments(token, billingAgreement, json, installments, negativeTestObj) {
    console.log('invoking createPayment com token: ' + token);
    var index = installments - 1;
    var term = json.financing_options[0].qualifying_financing_options[index].credit_financing.term;
    var value = json.financing_options[0].qualifying_financing_options[index].monthly_payment.value;
    
    var discount_percentage = 0;
    var disc_value = 0;
    var currency = 'BRL';
    if (typeof (json.financing_options[0].qualifying_financing_options[index].discount_amount) != 'undefined'){
        discount_percentage = json.financing_options[0].qualifying_financing_options[index].discount_percentage;
        disc_value = json.financing_options[0].qualifying_financing_options[index].discount_amount.value;
        currency = json.financing_options[0].qualifying_financing_options[index].discount_amount.currency_code;
    }
    
     
    /* var bodytemp = "{\"intent\": \"sale\" ,"+
    "\"payer\": {"+
                "\"payment_method\": \"paypal\","+                            
                "\"funding_instruments\":["+
                    "{"+
                       "\"billing\":{"+
                          "\"billing_agreement_id\":\""+billingAgreement+"\","+
                          "\"selected_installment_option\":{"+
                             "\"term\":"+term+","+
                             "\"monthly_payment\":{"+
                                "\"value\":"+value+","+
                                "\"currency\":\""+currency+"\""+
                             "},"+
                             "\"discount_percentage\":"+discount_percentage+","+
                             "\"discount_amount\":{"+
                                "\"value\":"+disc_value+","+
                                "\"currency\":\""+currency+"\""+
                             "}"+
                          "}"+
                       "}"+
                    "}"+
                 "]"+
                "},"+                
    "\"transactions\":[{"+
                    "\"amount\": {"+
                                "\"currency\": \"BRL\","+
                                "\"total\": \"120.00\""+                                            
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
                                                            "\"price\": \"60.00\","+
                                                            "\"sku\": \"product_id_99\","+
                                                            "\"currency\": \"BRL\""+
                                                            "}]"+
                                                "}"+
                        "}],"+
    "\"redirect_urls\": {"+
                        "\"return_url\": \"http://www.bababababa.com\","+
                        "\"cancel_url\": \"http://www.bababababa.com\""+
                        "}"+
    "}"; */
    //var mock_content = "'PayPal-Mock-Response': '{\"mock_application_codes\": \"" +negativeTestObj.label+ "\"}',";

    var headersObj = {
        'Content-Type': 'application/json',
        'PayPal-Mock-Response': '{\"mock_application_codes\": \"' + negativeTestObj.label + '\"}',
        //'Content-Type': 'application/x-www-form-urlencoded',
        //'PayPal-Mock-Response':'{\"mock_application_codes\": \"MALFORMED_REQUEST\"}',           
        'Authorization': 'Bearer ' + token
    };
    if (0 > negativeTestObj.value) {
        headersObj = {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            //'PayPal-Mock-Response':'{\"mock_application_codes\": \"MALFORMED_REQUEST\"}',           
            'Authorization': 'Bearer ' + token
        }
    }

    var dynHeader = new Headers(headersObj);

    const response = await fetch(PAYPAL_SANDBOX_API + CREATE_PAYMENT, {
        method: 'POST',
        //mode: 'CORS',
        headers: dynHeader,
        body: "{\"intent\": \"sale\" ,"+
        "\"payer\": {"+
                    "\"payment_method\": \"paypal\","+                            
                    "\"funding_instruments\":["+
                        "{"+
                           "\"billing\":{"+
                              "\"billing_agreement_id\":\""+billingAgreement+"\","+
                              "\"selected_installment_option\":{"+
                                 "\"term\":"+term+","+
                                 "\"monthly_payment\":{"+
                                    "\"value\":"+value+","+
                                    "\"currency\":\""+currency+"\""+
                                 "},"+
                                 "\"discount_percentage\":"+discount_percentage+","+
                                 "\"discount_amount\":{"+
                                    "\"value\":"+disc_value+","+
                                    "\"currency\":\""+currency+"\""+
                                 "}"+
                              "}"+
                           "}"+
                        "}"+
                     "]"+
                    "},"+                
        "\"transactions\":[{"+
                        "\"amount\": {"+
                                    "\"currency\": \"BRL\","+
                                    "\"total\": \"120.00\""+                                            
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
                                                                "\"price\": \"60.00\","+
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
    

    const response = await fetch(PAYPAL_SANDBOX_API + CREATE_BA_TOKEN, {
        method: 'POST',        
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + token
          }),          
        body: "{"+
                "\"merchant_custom_data\" : \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjI0ZTg1NC00MzkwLTQ1ZWYtYjQ0NC03OTBjMWM2MWI3MTgiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE1ODg3MDQzODYsImlhdCI6MTU1NzE2ODM4Nn0=.kzn66lejAiDYMMhf0ggpwiGzqJ/6kYsoreCdRCHFti0=\","+               

                "\"description\":" + "\"Descrição do termo de odefranca - The date "+
                
                "is date and time in the execute agreement response, it shows the converted date and time in the UTC time zone. So, the internal 2017-01-02T00:00:00 start date and time becomes 2017-01-01T23:00:00 externally.\""+
       
                " ,"+
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
        body: "{"+
                "\"agreement_token\":\""+ ba_token + "\"," +
                "\"custom\" : \""+token+ "\""+
            "}"
       
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
export async function createBANvp(token) {
    console.log('FRONTEND: TOKEN PARA OBTER BA É '+token)
    const response = await fetch('/api/createBA?token='+token);
    const body = await response.text();// .json();
    if (response.status !== 200) throw Error(body.message);

    console.log("MEU FRONTEND INFORMA!!!: " + body);
    return body;
}
//####################################################################
//####################################################################
//####################################################################
export async function setEC(erroCodeLabel, errorCodeVAlue) {
    const response = await fetch('/api/setEC?errMockLabel='+erroCodeLabel+'&errMockValue='+errorCodeVAlue);
    const body = await response.text();// .json();
    if (response.status !== 200) throw Error(body.message);

    console.log("MEU FRONTEND INFORMA!!!: " + body);
    return body;
}

//####################################################################
//####################################################################
//####################################################################
export async function doRef(billingAgreement) {
    const response = await fetch('/api/doRef?ba='+billingAgreement);
    const body = await response.text();// .json();
    if (response.status !== 200) throw Error(body.message);

    console.log("MEU FRONTEND INFORMA!!!: " + body);
    return body;
}

