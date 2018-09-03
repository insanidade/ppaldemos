import React, { Component } from 'react';
import Form from './form';
import ResponseBoard from './responseBoard';
import {setEC} from '../actions/postActions';

import scriptLoader from 'react-async-script-loader';



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

class ReferenceNVP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: 'Response Board',
            jsonResponseObj: {},
            executeUrl: '',
            token: 'EMPTY_TOKEN',
            pppRef: {},
            billingAgreementData: ''
        }

    }



    //######################################################################################################
    //######################################################################################################
    //######################################################################################################
    //######################################################################################################

    handleSetExpressCheckout = async (data) => {
        var outnvp;
        console.log('CHAMANDO setExpressCheckout');

        try {
            outnvp = await setEC();

            console.log('CHAMOU setExpressCheckout');
            this.setState({
                //msg: querystring.stringify(outnvp),
                jsonResponseObj: outnvp  
                //token: outnvp.access_token

            });
            //console.log('RESPOSTA NVP: ' + outnvp);
        } catch (err) {
            console.log('ERROR!!')
            this.setState(
                { msg: 'Request error: '+err }
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
                    onSubmit={this.handleSetExpressCheckout}>
                </Form>
                <br />

                <hr />

                <ResponseBoard
                    authObj={this.state.jsonResponseObj}
                    msg={this.state.msg}>
                </ResponseBoard>
            </div>
        );
    }
}

export default ReferenceNVP;