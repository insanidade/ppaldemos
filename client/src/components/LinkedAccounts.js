import React, { Component } from 'react';
//import JSONPretty from 'react-json-pretty';
import { createToken } from '../actions/postActions';
import { createPayment } from '../actions/postActions';
import { executePayment } from '../actions/postActions';
import { consumerReferral } from '../actions/postActions'
import Form from './form';
import PersonDetails from './PersonDetails';
import ResponseBoard from './responseBoard';
import FormCheckout from './formCheckout';
import ExternalButton from './externalButton';
import theImage from '../images/beer.jpeg';
import querystring from 'querystring';

//import scriptLoader from 'react-async-script-loader';


class LinkedAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: 'Response Board',
            jsonResponseObj: {},
            executeUrl: '',
            token: 'EMPTY_TOKEN',
            pppRef: {},
            billingAgreementData: '',
            redirectUrl: '',
            scope: ''
        }

    }

    //######################################################################################################
    //######################################################################################################    
    mySetJson = async (inputJson) => {
        this.setState({ jsonResponseObj: inputJson });
        console.log('##################  O EVENTO: ##########' + this.state.jsonResponseObj);
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
                token: outjson.access_token,
                scope: encodeURIComponent(outjson.scope)
            });
            console.log('SCOPE: ' + this.state.scope);
            console.log('TOKEN PREENCHIDO: ' + this.state.token);
        } catch (err) {
            this.setState(
                { msg: 'Request error' }
            );
        }
    }

    //######################################################################################################
    //######################################################################################################
    //######################################################################################################
    //######################################################################################################

    handleSubmitConsumerReferrals = async (data) => {
        console.log('Form value raw: ' + data.console);
        try {
            var outjson = await consumerReferral(this.state.token, data);
            this.setState({
                msg: JSON.stringify(outjson),
                jsonResponseObj: outjson,
                redirectUrl: outjson.links[0].href
            });
            console.log('REDIRECT URL: ' + this.state.redirectUrl);
            console.log('TOKEN PREENCHIDO: ' + this.state.token);
        } catch (err) {
            this.setState(
                { msg: 'Request error' }
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
    //######################################################################################################
    //######################################################################################################

    handleClickRedirect = async (data) => {
        console.log('Form value raw: ' + data);
        try {
            window.location.assign(this.state.redirectUrl + '&scope=' + this.state.scope);
            //this.setState({ calc_fin_invoked: false });
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

    render = () => {
        let dynamicButton;


        dynamicButton = <ExternalButton
            buttonText='Go to Redirect Url'

            onClick={this.handleClickRedirect} />;

        return (
            <div align="center">
                <Form
                    onSubmit={this.handleSubmit}>
                </Form>
                <br />

                <hr />
                <PersonDetails
                    onSubmit={this.handleSubmitConsumerReferrals}>
                </PersonDetails>
                <br />

                <hr />
                <div id="dropDownWrapper">

                    {dynamicButton}
                </div>

                <hr />
                <ResponseBoard
                    authObj={this.state.jsonResponseObj}
                    msg={this.state.msg}>
                </ResponseBoard>
            </div>
        );
    }



}


export default LinkedAccount;