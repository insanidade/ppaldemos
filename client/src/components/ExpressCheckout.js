import React, { Component } from 'react';
import Form from './form';
import fetch from 'node-fetch';
import ResponseBoard from './responseBoard';
import { createToken } from '../actions/postActions';
import FormCheckout from './formCheckout';
import theImage from '../images/beer.jpeg';
import { setEC } from '../actions/postActions';
import Script from 'react-load-script';
//import PAYPAL from 'https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js';

class ExpressCheckout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //clientID: this.props.clientid || 'ASpwwK3e6Xq319fcTEY4asiXBYzRZQK3kJLVZH5mQYf_7ZJw7cKzIScarLFGWwqcObuTKKYMPw6RLADw',
            //secret: this.props.secret || 'EJWh8j2_IvgH-4CWwCnqrWOgvj_epwM0YCNrCRKfevUS9GIH04NEiK27H7hna3JofiRZ7hUj789aDX6j',
            prodName: this.props.prodName,
            prodBrewery: this.props.prodBrewery,
            prodPrice: this.props.prodPrice,
            uriResponseObj:{},
            msg: 'Response Board',
            token: '',
            returnUrl: 'http://localhost:3000/ec',
            errorCodeLabel: '',
            errorCodeValue:'',
            response:''
        }

    }   


//######################################################################################################
//######################################################################################################

    handleSubmitCreate = async (data) => {
        console.log('invoking create payment');
        try {
            var returnUrl = this.state.returnUrl;
            var erroCodeLabel = this.state.errorCodeLabel;
            var errorCodeValue = this.state.errorCodeValue;

            //console.log('URL QUE EU QUERO: ' + this.state.jsonResponseObj.links[1].href);
            var ppp = await window.paypal.Buttons({

                style: {
                    color: 'gold',
                    shape: 'pill',
                    label: 'pay',
                    height: 40
                },

                // Set up the transaction
                createOrder: async function (data, actions) {
                    //const outnvp;
                    console.log('vai chamar setExpressCheckout');
                    /* try { */
                    var outnvp = await setEC(returnUrl,10,10);
                    
                    //const data = await res.json();
                    //const dataOut = await res.text();
                    console.log('CHAMOU setExpressCheckout: '+outnvp);
                    decodeURI(outnvp);
                    return  JSON.parse(outnvp).TOKEN;
                    

                    
                    console.log('CHAMOU setExpressCheckout - token: '+this.state.response);    
                    //return res.token;

            
                    console.log('CHAMOU setExpressCheckout');
                        /* this.setState({
                            //msg: querystring.stringify(outnvp),
                            jsonResponseObj: decodeURI(outnvp),
                            //response: JSON.parse(outnvp).TOKEN,
                            token: JSON.parse(outnvp).TOKEN
                            //token: outnvp.access_token
            
                        }); */
                        
                    /* } catch (err) {
                        console.log('ERROR!!')
                       /*  this.setState(
                            { msg: 'Request error: ' + err }
                        ); */
                    //}



                    /* const res = await fetch('/demo/checkout/api/paypal/order/create/', {
                        method: 'post'
                    });
                    const dataHandler = await res.json();
                    return dataHandler.orderID; */



                },

                // Finalize the transaction
                onApprove: async function (data, actions) {
                    
                    const res = await fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
                        method: 'post'
                    });
                    const details = await res.json();
                    // Show a success message to the buyer
                    alert('Transaction completed by ' + details.payer.name.given_name + '!');
                },


            }).render('#paypal-button-container');



            this.setState({ pppRef: ppp });

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

    handleSubmit = async (data) => {
        console.log('Form value raw: ' + data.console);
        try {
            var outjson = await createToken(data);
            this.setState({
                msg: JSON.stringify(outjson),
                jsonResponseObj: outjson,
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
                <FormCheckout
                    prodName='Leave the Gun! Take the Cannoli'
                    prodBrewery='Mafiosa Cervejaria'
                    prodImage={theImage}
                    prodPrice='$20'
                    buttonText='Pague com PayPal'
                    onSubmit={this.handleSubmitCreate}
                    authObj={this.state.uriResponseObj}
                    msg={this.state.msg}
                    divName='paypal-button-container'>
                </FormCheckout>

                <ResponseBoard
                    authObj={this.state.uriResponseObj}
                    msg={this.state.msg}>
                </ResponseBoard>


            </div>
        );
    }
}


export default ExpressCheckout;