import React, { Component } from 'react';
import FormSimple from './formSimple';
import ExternalButton from './externalButton'
import ResponseBoard from './responseBoard';
import DropDownNVP from './DropDownNVP';
import { setEC } from '../actions/postActions';
import { createBANvp } from '../actions/postActions';
import { doRef } from '../actions/postActions';

import scriptLoader from 'react-async-script-loader';
//import DropDownNVP from './DropDownNVP';

//https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_expresscheckout&token=InsertTokenHere

const APPROVAL_URL_REDIRECT = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=';

class ReferenceNVP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: 'Response Board',
            jsonResponseObj: {},
            executeUrl: '',
            token: 'EMPTY_TOKEN',
            pppRef: {},
            billingAgreement: '',
            response: '',
            transactionID: '',
            paymentStatus: '',
            paymentType: '',
            mock_negative_test_obj: {},
            returnUrl: 'http://localhost:3000/refnvp'
        }

    }

    //######################################################################################################
    //######################################  JUST A TEST  #################################################
    //######################################################################################################
    //######################################################################################################

    /* componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
            
    } */

    componentDidMount() {

        var qs = require('querystring');
        console.log('PROPRIEDADES!!!!!!!!!!!!!!!!!!! ' + this.props.location.search);
        const values = qs.parse(this.props.location.search, '?');
        console.log(values.token);

        this.setState({
            jsonResponseObj: values.token,
            response: values.token,
            token: values.token
        })

        console.log('BEARER TOKEN VINDO DO CACHE: ' + this.state.token)
    }

    callApi = async () => {
        const response = await fetch('/api/mensagem');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        console.log("MEU BACKEND INFORMA!!!: " + body.express);
        return body;
    };

    //######################################################################################################
    //######################################################################################################
    //######################################################################################################
    //######################################################################################################

    handleDoRef = async (data) => {
        var outnvp;
        console.log('CHAMANDO DoReferenceTransaction');

        try {
            outnvp = await doRef(this.state.billingAgreement);

            console.log('CHAMOU DoReferenceTransaction');
            this.setState({
                //msg: querystring.stringify(outnvp),
                jsonResponseObj: decodeURI(outnvp),
                response: JSON.parse(outnvp).ACK,
                transactionID: JSON.parse(outnvp).TRANSACTIONID,
                paymentStatus: JSON.parse(outnvp).PAYMENTSTATUS,
                paymentType: JSON.parse(outnvp).PAYMENTTYPE
            });
            //console.log('RESPOSTA NVP: ' + outnvp);
        } catch (err) {
            console.log('ERROR!!')
            this.setState(
                { msg: 'Request error: ' + err }
            );
        }
    }

    //######################################################################################################
    //######################################################################################################
    //######################################################################################################
    //######################################################################################################

    handleCreateBA = async (data) => {
        var outnvp;
        console.log('CHAMANDO CreateBillingAgreement');

        try {
            outnvp = await createBANvp(this.state.token);

            console.log('CHAMOU CreateBillingAgreement');
            this.setState({
                //msg: querystring.stringify(outnvp),
                jsonResponseObj: decodeURI(outnvp),
                response: JSON.parse(outnvp).BILLINGAGREEMENTID,
                billingAgreement: JSON.parse(outnvp).BILLINGAGREEMENTID
                //token: outnvp.access_token

            });
            //console.log('RESPOSTA NVP: ' + outnvp);
        } catch (err) {
            console.log('ERROR!!')
            this.setState(
                { msg: 'Request error: ' + err }
            );
        }
    }

    //######################################################################################################
    //######################################################################################################
    //######################################################################################################
    //######################################################################################################

    handleSetExpressCheckout = async (data) => {
        var outnvp;
        console.log('CHAMANDO setExpressCheckout');
        console.log('MOCK VALUE: '+this.state.mock_negative_test_obj.value);

        try {
            outnvp = await setEC(this.state.returnUrl, this.state.mock_negative_test_obj.label, 
                this.state.mock_negative_test_obj.value);

            console.log('CHAMOU setExpressCheckout');
            this.setState({
                //msg: querystring.stringify(outnvp),
                jsonResponseObj: decodeURI(outnvp),
                response: JSON.parse(outnvp).TOKEN,
                token: JSON.parse(outnvp).TOKEN
                //token: outnvp.access_token

            });
            //console.log('RESPOSTA NVP: ' + outnvp);
        } catch (err) {
            console.log('ERROR!!')
            this.setState(
                { msg: 'Request error: ' + err }
            );
        }
    }


    //################################################################################################
    //################################################################################################
    handleClickApprovalRedirect = async (data) => {
        console.log('Form value raw: ' + data);
        try {
            window.location.assign(APPROVAL_URL_REDIRECT + this.state.token);
            this.setState({ calc_fin_invoked: false });
            //this.renderRedirect();
            //this.props.history.(this.state.executeUrl)
            console.log('CLICOU NO BOTAO EXTERNO');
        } catch (err) {
            this.setState(
                { msg: 'Request error: ' + err }
            );
        }
    }

    //######################################################################################################
    //######################################################################################################

    handleSubmitSelectNegativeDropDown = async (data) => {
        console.log('dropdown value raw: ' + data.label);
        this.setState(
            { mock_negative_test_obj: data }
        );
        try {

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


                <table width="40%" border="2" bordercolor="green" >
                    <tr>
                        <th>Set Express Checkout</th>
                        <th>Select Negative Testing</th>
                    </tr>
                    <tr>
                        <th>
                            <FormSimple
                                onSubmit={this.handleSetExpressCheckout}>
                            </FormSimple>
                        </th>
                        <th>
                            <DropDownNVP
                                onClick={this.handleSubmitSelectNegativeDropDown}>
                            </DropDownNVP>
                        </th>
                        <th>
                        </th>
                    </tr>
                </table>

                <br />

                <ExternalButton
                    buttonText='Checkout'
                    onClick={this.handleClickApprovalRedirect}>
                </ExternalButton>

                <hr />
                <ExternalButton
                    buttonText='Request BA'
                    onClick={this.handleCreateBA}>
                </ExternalButton>

                <hr />
                <ExternalButton
                    buttonText='Pay (DoRef)'
                    onClick={this.handleDoRef}>
                </ExternalButton>

                <ResponseBoard
                    authObj={this.state.jsonResponseObj}
                    msg={this.state.response + ', ' +
                        this.state.transactionID + ', ' +
                        this.state.paymentStatus + ', ' +
                        this.state.paymentType}>
                </ResponseBoard>
            </div>
        );
    }
}

export default ReferenceNVP;