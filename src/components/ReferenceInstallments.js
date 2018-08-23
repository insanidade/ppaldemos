import React, { Component } from 'react';
//import JSONPretty from 'react-json-pretty';
import { createToken } from '../actions/postActions';
import { createPayment } from '../actions/postActions';
import {createBAToken} from '../actions/postActions';
import {executePayment} from '../actions/postActions';
import Form from './form';
import ResponseBoard from './responseBoard';
import FormCheckout from './formCheckout';
import ExternalButton from './externalButton';
import theImage from '../images/beer_ref_inst.jpeg';

//import scriptLoader from 'react-async-script-loader';
 

class ReferenceInstallments extends Component{

    constructor (props) {
        super(props);
        this.state = {
            msg: 'Response Board',
            jsonResponseObj: {},
            executeUrl: '',
            token: 'EMPTY_TOKEN',
            pppRef:{}
        }
        
        
    }


//######################################################################################################
//######################################################################################################    
mySetJson = async (inputJson) => {
    this.setState({jsonResponseObj: inputJson});
    console.log('##################  O EVENTO: ##########'+ this.state.jsonResponseObj);
    var outjson = await executePayment(this.state.jsonResponseObj, this.state.token, this.state.executeUrl);
    this.setState({
        jsonResponseObj: outjson
    });
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

handleSubmitCreateBAToken = async (data) => {
console.log('Form value raw: ' + data.console);
try {
  var outjson = await createBAToken(this.state.token);
  console.log('TERMINOU CHAMADA DE CREATE BA TOKEN');
  this.setState({
      //msg: JSON.stringify(outjson),
      jsonResponseObj: outjson,
      //executeUrl: outjson.links[2].href
  });
  console.log('URL QUE EU QUEROOOOOO: '+this.state.jsonResponseObj.links[1].href);
  /* var ppp = await window.PAYPAL.apps.PPP({
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
    this.setState({pppRef: ppp});      */   

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
            <FormCheckout
                prodName='Passion Flow'
                prodBrewery='Dádiva' 
                prodImage={theImage} 
                prodPrice='$30' 
                onSubmit={this.handleSubmitCreateBAToken}
                authObj={this.state.jsonResponseObj}
                msg={this.state.msg}>
            </FormCheckout>

            <ExternalButton 
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


export default ReferenceInstallments;