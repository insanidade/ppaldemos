import React, { Component } from 'react';
//import JSONPretty from 'react-json-pretty';
import { createToken, createTokenPostOnboarding, getUserIdentity } from '../actions/postActions';
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
import qs from 'query-string'

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
            scope: '',
            code: '',
            access_token: '',
            user_id: ''
        }

    }

    //######################################################################################################
    //######################################################################################################    
    componentDidMount() {

        console.log('PROPRIEDADES!!!!!!!!!!!!!!!!!!! ' + this.props.location.search);
        const values = qs.parse(this.props.location.search)
        //console.log(values.token)
        this.state.code = values.code;
        console.log('CODE: '+values.code);
        this.state.scope = values.scope;
        console.log('SCOPE: '+values.scope);
        //this.state.accept = values.accept;
        //console.log(this.state.accept)

        this.setState({ msg: 'code from url: ' + this.state.code })

        // if (this.state.accept) {
        //     this.setState({hasBAToken:true})            
        // }

        //this.state.token = localStorage.getItem('bearer_Token');
        //console.log('BEARER TOKEN VINDO DO CACHE: ' + this.state.token)
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

    handleSubmitPostOnboarding = async (data) => {
        console.log('Form value raw: ' + data.console);
        try {
            var outjson = await createTokenPostOnboarding(data, this.state.code);
            this.setState({
                msg: JSON.stringify(outjson),
                jsonResponseObj: outjson,
                access_token: outjson.access_token,
                scope: encodeURIComponent(outjson.scope)
            });
            console.log('SCOPE: ' + this.state.scope);
            console.log('ACCESS TOKEN PREENCHIDO: ' + this.state.access_token);
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
            window.location.assign(this.state.redirectUrl + '&scope=' + this.state.scope + '&redirect_uri=' + 'http://localhost:3000/linkedAcc');
            console.log('URL COMPLETA: '+this.state.redirectUrl + '&scope=' + this.state.scope + '&redirect_uri=' + 'http://localhost:3000/linkedAcc');
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
    //######################################################################################################
    //######################################################################################################

    handleClickGetUserIdentity = async (data) => {

        //https://api.sandbox.paypal.com/v1/oauth2/token/userinfo?schema=openidconnect

        console.log('Form value raw: ' + data.console);
        try {
            var outjson = await getUserIdentity(this.state.access_token);
            this.setState({
                msg: JSON.stringify(outjson),
                jsonResponseObj: outjson,
                user_id: outjson.user_id,
                //scope: encodeURIComponent(outjson.scope)
            });
            console.log('USER ID: ' + this.state.user_id);
            //console.log('ACCESS TOKEN PREENCHIDO: ' + this.state.access_token);
        } catch (err) {
            this.setState(
                { msg: 'Request error' }
            );
        }
    }
    //######################################################################################################
    //######################################################################################################

    render = () => {
        let dynamicButton;
        let dynamicButtonPostOnboarding;
        let dynamicButtonUserIdentity;

        dynamicButton = <ExternalButton
            buttonText='Go to Redirect Url'

            onClick={this.handleClickRedirect} />;

            dynamicButtonPostOnboarding = <Form
            buttonText={"Post Onboarding Actions"}
            onSubmit={this.handleSubmitPostOnboarding} />;

            dynamicButtonUserIdentity = <ExternalButton
            buttonText={"Get User Identity[Last Step]"}
            onClick={this.handleClickGetUserIdentity} />;

        return (
            <div align="center">
                <Form
                    onSubmit={this.handleSubmit}
                    buttonText={"Request Token"}>                    
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
                <div id="dropDownWrapper">
                    {dynamicButtonPostOnboarding}
                </div>
                <hr />
                <div id="dropDownWrapper">
                    {dynamicButtonUserIdentity}
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