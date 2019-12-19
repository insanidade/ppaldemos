import React, { Component } from 'react';
//import JSONPretty from 'react-json-pretty';
import { createToken } from '../actions/postActions';
import { createPayment } from '../actions/postActions';
import {executePayment} from '../actions/postActions';
import Form from './form';
import ResponseBoard from './responseBoard';
import FormCheckout from './formCheckout';
import ExternalButton from './externalButton';
import theImage from '../images/beer.jpeg';

//import scriptLoader from 'react-async-script-loader';
 

class PayPalPlus extends Component{

    constructor (props) {
        super(props);
        this.state = {
            msg: 'Response Board',
            jsonResponseObj: {},
            executeUrl: '',
            token: 'EMPTY_TOKEN',
            pppRef:{}, 
            billingAgreementData:''
        }      
        
    }

  //################################################################################################
  receiveMessage = (event) => {

    try {
        var message = JSON.parse(event.data);

        console.log("PEGOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOU");
        if (typeof message['cause'] !== 'undefined') { //iFrame error handling

            var ppplusError = message['cause'].replace(/['"]+/g, ""); //log & attach this error into the order if possible

            // <<Insert Code Here>>

            switch (ppplusError) {

                case "INTERNAL_SERVICE_ERROR": //javascript fallthrough
                case "SOCKET_HANG_UP": //javascript fallthrough
                case "socket hang up": //javascript fallthrough
                case "connect ECONNREFUSED": //javascript fallthrough
                case "connect ETIMEDOUT": //javascript fallthrough
                case "UNKNOWN_INTERNAL_ERROR": //javascript fallthrough
                case "fiWalletLifecycle_unknown_error": //javascript fallthrough
                case "Failed to decrypt term info": //javascript fallthrough
                case "RESOURCE_NOT_FOUND": //javascript fallthrough
                case "INTERNAL_SERVER_ERROR":
                    alert("Ocorreu um erro inesperado, por favor tente novamente. (" + ppplusError + ")"); //pt_BR
                    //Generic error, inform the customer to try again; generate a new approval_url and reload the iFrame.
                    // <<Insert Code Here>>
                    break;

                case "RISK_N_DECLINE": //javascript fallthrough
                case "NO_VALID_FUNDING_SOURCE_OR_RISK_REFUSED": //javascript fallthrough
                case "TRY_ANOTHER_CARD": //javascript fallthrough
                case "NO_VALID_FUNDING_INSTRUMENT":
                    alert("Seu pagamento não foi aprovado. Por favor utilize outro cartão, caso o problema persista entre em contato com o PayPal (0800-047-4482). (" + ppplusError + ")"); //pt_BR
                    //Risk denial, inform the customer to try again; generate a new approval_url and reload the iFrame.
                    // <<Insert Code Here>>
                    break;

                case "CARD_ATTEMPT_INVALID":
                    alert("Ocorreu um erro inesperado. Por favor, tente novamente. (" + ppplusError + ")"); //pt_BR
                    //03 maximum payment attempts with error, inform the customer to try again; generate a new approval_url and reload the iFrame.
                    // <<Insert Code Here>>
                    break;

                case "INVALID_OR_EXPIRED_TOKEN":
                    alert("A sua sessão expirou. Por favor, tente novamente. (" + ppplusError + ")"); //pt_BR
                    //User session is expired, inform the customer to try again; generate a new approval_url and reload the iFrame.
                    // <<Insert Code Here>>
                    break;

                case "CHECK_ENTRY":
                    alert("Por favor revise os dados de Cartão de Crédito inseridos. (" + ppplusError + ")"); //pt_BR
                    //Missing or invalid credit card information, inform your customer to check the inputs.
                    // <<Insert Code Here>>
                    break;

                default:  //unknown error & reload payment flow
                    alert("Ocorreu um erro inesperado, por favor tente novamente. (" + ppplusError + ")"); //pt_BR
                //Generic error, inform the customer to try again; generate a new approval_url and reload the iFrame.
                // <<Insert Code Here>>

            }

        }

        if (message['action'] === 'checkout') { //PPPlus session approved, do logic here

            var rememberedCard = null;
            var payerID = null;
            var installmentsValue = null;

            rememberedCard = message['result']['rememberedCards']; //save on user BD record
            payerID = message['result']['payer']['payer_info']['payer_id']; //use it on executePayment API
            this.mySetJson(message);

            if (message['result']['term']['term']) {
                installmentsValue = message['result']['term']['term']; //installments value
                this.mySetJson(message);
            } else {
                installmentsValue = 1; //no installments
                this.mySetJson(message);
            }

            

            /* Next steps:

            console.log (rememberedCard);
            console.log (payerID);
            console.log (installmentsValue);

                1) Save the rememberedCard value on the user record on your Database.
                2) Save the installmentsValue value into the order (Optional).
                3) Call executePayment API using payerID value to capture the payment.

            */

            /*  window.onload = function () {
                
                     var x = document.forms["myForm"]["ip_address"].value;
                     var Url = "https://httpbin.org/post";
                     var xhr = new XMLHttpRequest();
                     xhr.setRequestHeader("Content-Type", "application/json");
                     xhr.setRequestHeader("Authorization", "Bearer "+this.state.token);
                     xhr.
                     xhr.open('POST', Url, true);
                     xhr.send(x);
                     xhr.onreadystatechange = processRequest;
                     function processRequest(e) {
                         if (xhr.readyState == 4 && xhr.status == 200) {
                             // alert(xhr.responseText.headers.Host);
                             var response1 = JSON.parse(xhr.responseText);
                             document.getElementById("origin").innerHTML = response1.origin;
                             document.getElementById("url").innerHTML = response1.url;
                             document.getElementById("data").innerHTML = response1.data;
                         }
                     }
                 
             } */

        }

    } catch (e) { //treat exceptions here

        // <<Insert Code Here>>

    }

}
//################################################################################################


componentDidMount() {

    console.log('COMPONENT DID MOUNT');

    if (window.addEventListener) {

        window.addEventListener("message", this.receiveMessage.bind(this));


        console.log("addEventListener successful", "debug");

    } else if (window.attachEvent) {

        window.attachEvent("onmessage", this.receiveMessage);

        console.log("attachEvent successful", "debug");

    } else {

        console.log("Could not attach message listener", "debug");

        throw new Error("Can't attach message listener");

    }
}


//######################################################################################################
//######################################################################################################    
mySetJson = async (inputJson) => {
    this.setState({jsonResponseObj: inputJson});
    console.log('##################  O EVENTO: ##########'+ this.state.jsonResponseObj);
    //var outjson = await executePayment(this.state.jsonResponseObj, this.state.token, this.state.executeUrl);
    //this.setState({
        //jsonResponseObj: outjson
    //});
}


//######################################################################################################
//######################################################################################################
//######################################################################################################
//######################################################################################################

handleSubmit = async (data) => {
    console.log('Form value raw: ' + data.console);
    try {
        var outjson = await createToken(data);
        this.setState({
            msg: JSON.stringify(outjson),
            jsonResponseObj: outjson,
            token: outjson.access_token

        });
        console.log('TOKEN PREENCHIDO: '+this.state.token);
    } catch (err) {
        this.setState(
            { msg: 'Request error' }
        );
    }
}
//######################################################################################################
//######################################################################################################

handleSubmitCreate = async (data) => {
console.log('invoking create payment');
try {
  var outjson = await createPayment(this.state.token, this.state.billingAgreementData);
  this.setState({
      msg: JSON.stringify(outjson),
      jsonResponseObj: outjson,
      executeUrl: outjson.links[2].href
  });
  console.log('URL QUE EU QUERO: '+this.state.jsonResponseObj.links[1].href);
  var ppp = await window.PAYPAL.apps.PPP({
    "approvalUrl": this.state.jsonResponseObj.links[1].href,
    "placeholder": "ppplusDiv",
    "mode": "sandbox",
    "payerFirstName": "Otávio",
    "payerLastName": "Franca",
    "payerPhone": "+5561998459881",
    "payerEmail":"otavio.augusto@gmail.com",
    //"payerEmail":"werqw@gmail.com",
    //"payerTaxId": "",
    //"payerTaxIdType": "",
    "payerTaxId": "03199060439",
    "payerTaxIdType": "BR_CPF",
    //"language": "en_US",
    "language": "pt_BR",
    //"merchantInstallmentSelection":4,
    //"merchantInstallmentSelectionOptional":false,
    "country": "BR",
    //"country": "US",
    "rememberedCards": "customerRememberedCardHash", 
    onError: (err) => {
        console.log('CAPTUREI UM ERRO COM O onError: ', err);
    },
    onContinue: (rememberedCardsToken, payerId, token, term) => {
        console.log('CAPTUREI rememberedCardsToken COM O onContinue: ', rememberedCardsToken);
        console.log('CAPTUREI payerId COM O onContinue: ', payerId);
        console.log('CAPTUREI EC token COM O onContinue: ', token);
        console.log('CAPTUREI term COM O onContinue: ', term);        
       
        this.capture(payerId);
    }        
    });
    this.setState({pppRef: ppp});        

} catch (err) {
  this.setState(
      {
          msg: 'Request error'
      }
  );
}
}
//######################################################################################################
//######################################################################################################
//######################################################################################################
//######################################################################################################

capture = async (payerId) => {
    //this.setState({jsonResponseObj: inputJson});
    console.log('##################  CAPTURAR COM O PAYER ID: ########## '+ payerId);
    var outjson = await executePayment(payerId, this.state.token, this.state.executeUrl);
    this.setState({
        jsonResponseObj: outjson
    });
}


//######################################################################################################
//######################################################################################################
//######################################################################################################
//######################################################################################################
handleClickExternalButton = async (data) => {
console.log('Form value raw: ' + data);
try {
   this.state.pppRef.doContinue()       

    console.log('CLICOU NO BOTAO EXTERNO');
} catch (err) {
    this.setState(
        { msg: 'Request error' }
    );
}
}
//######################################################################################################
//######################################################################################################

render = () => {
    //console.log('Form value raw 2: ' + this.state.jsonResponseObj.access_token);
    return (
        <div align="center">
            <Form
                onSubmit={this.handleSubmit}
                buttonText={"Request Token"}>
            </Form>
            <br />

            <hr />
            <FormCheckout
                prodName='Leave the Gun! Take the Cannoli'
                prodBrewery='Mafiosa Cervejaria' 
                prodImage={theImage} 
                prodPrice='$20'
                buttonText='Pague com PayPal'
                onSubmit={this.handleSubmitCreate}
                authObj={this.state.jsonResponseObj}
                msg={this.state.msg}>
            </FormCheckout>

            <ExternalButton
                buttonText='Checkout'
                onClick={this.handleClickExternalButton}>
            </ExternalButton>

            <ResponseBoard
                authObj={this.state.jsonResponseObj}
                msg={this.state.msg}>
            </ResponseBoard>
        </div>
    );
} 



}


export default PayPalPlus;