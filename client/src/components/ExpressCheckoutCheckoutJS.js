import React, { Component } from 'react';
import Form from './form';
import fetch from 'node-fetch';
import ResponseBoard from './responseBoard';
import { createToken } from '../actions/postActions';
import FormCheckout from './formCheckout';
import FormCheckoutLegacy from './formCheckoutLegacy';
import theImage from '../images/beer.jpeg';
import { setEC } from '../actions/postActions';
import { getECDEtails } from '../actions/postActions';
import { doEC } from '../actions/postActions';
import Script from 'react-load-script';
import { properties } from '../properties.js';
import dotenv from 'dotenv'

//import PAYPAL from 'https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js';

class ExpressCheckoutCheckoutJS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            environment: properties.env,            
            prodName: this.props.prodName,
            prodBrewery: this.props.prodBrewery,
            prodPrice: this.props.prodPrice,
            uriResponseObj:{},
            msg: 'Response Board as set by constructor',
            token: '',
            returnUrl: 'http://localhost:3000/ec',
            errorCodeLabel: '10',
            errorCodeValue:'10',
            amt:'30.00',
            response:''
        }
        

    }   
    
    //######################################################################################################
    //######################################################################################################
    componentWillMount(data){

        console.log('COMPONENTE VAI MONTAR');

        console.log('inserting checkout.js');

        const the_script = document.createElement('script');
        the_script.src = 'https://www.paypalobjects.com/api/checkout.js';        

        document.head.append(the_script)
    }

    //######################################################################################################
    //######################################################################################################
    componentDidMount(data) {
        
        
        console.log('invoking create payment');

        try {
            var env = this.state.environment;
            var returnUrl = this.state.returnUrl;
            var errorCodeLabel = this.state.errorCodeLabel;
            var errorCodeValue = this.state.errorCodeValue;
            var amt = this.state.amt;

            
            console.log('ENV: ' + env);
            var ppp =  window.paypal.Button.render({
                env: env,

                // Set up the transaction
                createOrder: async (data, actions) => {
                    console.log('vai chamar setECWrapper. env é: '+env);
                    //this.updateState("TESTE");
                    
                    var outnvp = await this.setECWrapper(env, returnUrl,errorCodeLabel,errorCodeValue,amt);// await setEC(returnUrl,errorCodeLabel,errorCodeValue,amt);
                    
                
                    console.log('CHAMOU setECWrapper: '+outnvp);
                    //decodeURI(outnvp);
                    
                    return (outnvp).TOKEN;
                },

                // Finalize the transaction
                onApprove: async (data, actions) => {
                    console.log('CHAMAR ONAPPROVE: '+data.orderID);
                    const ecDetails = await getECDEtails(data.orderID);
                    decodeURI(ecDetails);
                    const payerID = JSON.parse(ecDetails).PAYERID;
                    const amt = JSON.parse(ecDetails).PAYMENTREQUEST_0_AMT
                    console.log('CHAMOU GET EXPRESS DETAILS PAYERID: '+payerID);
                    console.log('CHAMOU GET EXPRESS DETAILS AMT: '+amt);

                    var outnvp =  await doEC(data.orderID, payerID, amt);
                    console.log('CHAMOU DoExpressCheckoutPayment : '+outnvp);
                    decodeURI(outnvp);

                    this.setState({
                        uriResponseObj:outnvp, 
                        msg: "doEC executado. Status: "+JSON.parse(outnvp).PAYMENTINFO_0_PAYMENTSTATUS
                    });
                    
                    console.log("STATUS DOEC: "+JSON.parse(outnvp).PAYMENTINFO_0_PAYMENTSTATUS);
                     
                    
                
                },


            }, '#paypal-button');

            this.setState({
                pppRef: ppp
            });

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
    setECWrapper = async (env,returnUrl,errorCodeLabel,errorCodeValue,amt) => {
        console.log('VAI CHAMAR setExpressCheckout');
        var outnvp = await setEC(env, returnUrl,errorCodeLabel,errorCodeValue,amt);
        console.log('CHAMOU setExpressCheckout: '+outnvp);
        decodeURI(outnvp);
        console.log('decodificou outnvp: '+outnvp);
        this.setState({
            uriResponseObj:outnvp, 
            msg: "setEC executado. Aguardando aprovação para continuar..."
        });
        console.log('setou estado de uriResponseObj');
        return JSON.parse(outnvp);
    }
    //######################################################################################################
    //######################################################################################################

    handleSubmitCreate = async (data) => {
        alert('NO ACTION ATTACHED TO THIS BUTTON!');
        
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
                msg: "Token retrieved!",//JSON.stringify(outjson),
                uriResponseObj: outjson,
                token: outjson.access_token

            });
            console.log('TOKEN PREENCHIDO: ' + this.state.token);
        } catch (err) {
            this.setState(
                { msg: 'Request error' }
            );
        }
    }  


    render = () => {

        return (            

            <div align="center">
                <Form
                    onSubmit={this.handleSubmit}
                    buttonText={"Request Token"}>
                </Form>
                <br />

                <hr />
                <FormCheckoutLegacy
                    prodName='Leave the Gun! Take the Cannoli'
                    prodBrewery='Mafiosa Cervejaria'
                    prodImage={theImage}
                    prodPrice='$20'
                    buttonText='Pague com PayPal'
                    onSubmit={this.handleSubmitCreate}
                    authObj={this.state.uriResponseObj}
                    msg={this.state.msg}
                    >
                </FormCheckoutLegacy>

                <ResponseBoard
                    authObj={this.state.uriResponseObj}
                    msg={this.state.msg}>
                </ResponseBoard>


            </div>
        );
    }
}


export default ExpressCheckoutCheckoutJS;