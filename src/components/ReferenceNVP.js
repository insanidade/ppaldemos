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
import {setExpressCheckout} from '../actions/postActions';

//import scriptLoader from 'react-async-script-loader';


class ReferenceNVP extends Component{

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



//######################################################################################################
//######################################################################################################
//######################################################################################################
//######################################################################################################

    handleSubmit = async (data) => {
        console.log('CHAMANDO setExpressCheckout');
        
        
        try {
            var outnvp = await setExpressCheckout();
            console.log('CHAMOU SETEXPRESSCHECKOUT');
            this.setState({
                msg: outnvp,
                jsonResponseObj: outnvp,
                //token: outnvp.access_token

            });
            console.log('RESPOSTA NVP: ' + outnvp);
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
    "payerTaxId": "03199060439",
    "payerTaxIdType": "BR_CPF",
    "language": "pt_BR",
    "country": "BR",
    "rememberedCards": "customerRememberedCardHash",         
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
                onSubmit={this.handleSubmit}>
            </Form>
            <br />

            <hr />
            {/* <FormCheckout
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
            </ResponseBoard> */}
        </div>
    );
} 



}


export default ReferenceNVP;