import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { createToken, capturePaymentWithInstallments } from '../actions/postActions';
import { createBAToken } from '../actions/postActions';
import { createFinalBA } from '../actions/postActions';
import { executePayment } from '../actions/postActions';
import Form from './form';
import ResponseBoard from './responseBoard';
import FormCheckout from './formCheckout';
import ExternalButton from './externalButton';
import Dropdown from './DropDown';
import qs from 'query-string'
import theImage from '../images/beer_ref_inst.jpeg';
import { retrieveCalculatedFinancing } from '../actions/postActions';
/* import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css' */
import FormSingle from './FormSingle';


const CREDIT_FINANCING_INSTALLMENTS_MIN_AMOUNT = 1;
const defaultOption = {};
//import scriptLoader from 'react-async-script-loader';


class ReferenceInstallments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasBAToken: false,
            hasBAFinal: false,
            msg: 'Response Board',
            jsonResponseObj: '',
            executeUrl: '',
            token: 'EMPTY_TOKEN',
            pppRef: {},
            accept: false,
            ba_special_token: '',
            ba_token: '',
            ba_final: '',
            url_cancel_ba_final: '',
            calc_fin_invoked: false,
            installments: {},
            installmentsFullData: {},
            selectedValue:'',
            mock_negative_test_obj: {}
        }

    }

    componentDidMount() {

        console.log('PROPRIEDADES!!!!!!!!!!!!!!!!!!! ' + this.props.location.search);
        const values = qs.parse(this.props.location.search)
        //console.log(values.token)
        this.state.ba_special_token = values.token;
        //console.log(values.ba_token)
        this.state.ba_token = values.ba_token;
        //console.log(values.accept)
        this.state.accept = values.accept;
        //console.log(this.state.accept)

        this.setState({ msg: 'ba_token: ' + this.state.ba_token })

        if (this.state.accept) {
            this.setState({hasBAToken:true})            
        }

        this.state.token = localStorage.getItem('bearer_Token');
        console.log('BEARER TOKEN VINDO DO CACHE: ' + this.state.token)



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
                hasBAFinal: false,
                hasBAToken: false,
                ba_special_token: '',
                ba_token: '',
                ba_final: '',
                url_cancel_ba_final: '',
                calc_fin_invoked: false

            });
            localStorage.setItem('bearer_Token', this.state.token);
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

    handleSubmitCreateBAToken = async (data) => {
        console.log('Form value raw: ' + data.console);
        this.setState({
            hasBAToken: false,
            hasBAFinal: false
        })
        var outjson;
        try {
            outjson = await createBAToken(this.state.token);
            console.log('TERMINOU CHAMADA DE CREATE BA TOKEN');
            this.setState({
                //msg: JSON.stringify(outjson),
                jsonResponseObj: outjson,
                executeUrl: outjson.links[0].href,
                calc_fin_invoked: false

            });
            console.log('URL QUE EU QUEROOOOOO: ' + this.state.executeUrl);
            //this.state.hasBAToken = false;


        } catch (err) {
            this.setState(
                {
                    jsonResponseObj: '',
                    msg: 'Request error: ' + JSON.stringify(outjson)
                }
            );
        }
    }
    //######################################################################################################
    //######################################################################################################
    //######################################################################################################
    //######################################################################################################

    handleClickApprovalRedirect = async (data) => {
        console.log('Form value raw: ' + data);
        try {
            window.location.assign(this.state.executeUrl);
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
    handleSubmitRetrieveFinalBA = async (data) => {
        var outjson;
        console.log('ACCESS TOKEN: ' + this.state.token);
        try {
            outjson = await createFinalBA(this.state.token, this.state.ba_token);
            console.log('TERMINOU CHAMADA DE RETRIEVE BA');
            this.setState({
                //msg: JSON.stringify(outjson),
                jsonResponseObj: outjson,
                ba_final: outjson.id,
                url_cancel_ba_final: outjson.links[0].href,
                hasBAFinal: true,
                hasBAToken: false,
                calc_fin_invoked: false
            });
            console.log('O BA FINAL: ' + this.state.ba_final);
            console.log('O CANCEL URL DO BA FINAL: ' + this.state.url_cancel_ba_final);

        } catch (err) {
            this.setState(
                {
                    jsonResponseObj: '',
                    msg: 'Request error: ' + JSON.stringify(outjson)
                }
            );
        }
    }
    //######################################################################################################
    //######################################################################################################    
    installmentsAllowed(json) {
        var ret;
        try {
            ret = (CREDIT_FINANCING_INSTALLMENTS_MIN_AMOUNT < Object.keys(json.financing_options[0].qualifying_financing_options).length);
        }
        catch (err) {
            ret = false;
        }
        return ret;
    }
    //######################################################################################################
    //######################################################################################################    

    collectInstallmentsData(json) {
        var total = Object.keys(json.financing_options[0].qualifying_financing_options).length;
        console.log('TOTAL SIZE###########: '+total);
        var i;
        var terms = '';
        var installmentValue = '';
        var options = new Array(total);
        //const defaultOption = {};



        for (i = 0; i < total; i++) {
            console.log(json.financing_options[0].qualifying_financing_options[i].credit_financing.term + "<br>");
            
            terms = json.financing_options[0].qualifying_financing_options[i].credit_financing.term;
            console.log(terms);
            installmentValue = json.financing_options[0].qualifying_financing_options[i].monthly_payment.value;
            console.log(installmentValue);

            options[i] = { value: terms, installment: installmentValue , label: terms };
            console.log('PASSOU $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

        }

        return options;
    }

    //######################################################################################################
    //######################################################################################################
    handleSubmitCheckCalculatedFinancing = async (data) => {
        var outjson;
        console.log('ACCESS TOKEN: ' + this.state.token);
        try {
            outjson = await retrieveCalculatedFinancing(this.state.token, this.state.ba_final);
            console.log('TERMINOU CHAMADA DE CALCULATE FINANCING');

            

            this.state.installments = this.collectInstallmentsData(outjson);

            this.setState({
                //msg: JSON.stringify(outjson),
                installmentsFullData: outjson,                
                jsonResponseObj: outjson,
                calc_fin_invoked: true
                             
            });

        } catch (err) {
            console.log(err.message);
            this.setState(
                {                    
                    jsonResponseObj: '',
                    msg: 'Request error: ' + JSON.stringify(outjson)
                }
            );
        }
    }
    //######################################################################################################
    //######################################################################################################
    handleSubmitCapturePaymentInstallments = async (data) => {
        var outjson;

        console.log('Form value raw para installments: ' + data.installments);
        console.log('ACCESS TOKEN: ' + this.state.token);
        console.log('NEGATIVE TEST VALUE: ' + this.state.mock_negative_test_obj.label);
        //console.log('VALOR SELECIONADO: '+event.target.value)
        try {
            outjson = await capturePaymentWithInstallments(this.state.token, 
                this.state.ba_final, 
                this.state.installmentsFullData, data.installments, this.state.mock_negative_test_obj);
            console.log('TERMINOU CHAMADA DE CAPTURA WITH INSTALLMENTS');

            //this.state.installments = this.collectInstallmentsData(outjson);

            this.setState({
                //msg: JSON.stringify(outjson),
                jsonResponseObj: outjson,
                calc_fin_invoked: true
                             
            });

        } catch (err) {
            console.log(err.message);
            this.setState(
                {                    
                    jsonResponseObj: '',
                    msg: 'Request error: ' + JSON.stringify(outjson)
                }
            );
        }
    }

    //######################################################################################################
    //######################################################################################################
    render = () => {
        let dynamicButton;
        let singleForm;

        

        dynamicButton = <ExternalButton
            buttonText='Go to Approval'
            hasBAToken={this.hasBAToken}
            onClick={this.handleClickApprovalRedirect} />;

              

        if (this.state.hasBAToken) {
            this.hasBAFinal = false;
            dynamicButton = <ExternalButton
                buttonText='Request Final BA'
                hasBAToken={this.hasBAToken}
                onClick={this.handleSubmitRetrieveFinalBA} />;
        }

        if (this.state.hasBAFinal) {
            dynamicButton = <ExternalButton
                buttonText='Retrieve Calculated Financing'
                hasBAToken={this.hasBAToken}
                onClick={this.handleSubmitCheckCalculatedFinancing} />;
        }

        if (this.state.calc_fin_invoked) {
            singleForm = <FormSingle
                buttonText='Pay with installments'
                onSubmit={this.handleSubmitCapturePaymentInstallments}
            />
        }

        return (
            <div id="dropDownWrapper">                
                <table  width="100%"  border="2"  bordercolor="green" >
                    <tr>
                        <th>Request Token</th>
                        <th>Select Negative Testing</th>
                    </tr>
                    <tr>
                        <th>
                            <Form
                                onSubmit={this.handleSubmit}
                                buttonText={"Request Token"}>
                            </Form>
                        </th>
                        <th>
                            <Dropdown
                                onClick={this.handleSubmitSelectNegativeDropDown}>
                            </Dropdown>
                        </th>
                        <th>
                        </th>
                    </tr>
                </table>
                <br />

                <hr />
                <FormCheckout
                    prodName='Passion Flow'
                    prodBrewery='Dádiva'
                    prodImage={theImage}
                    prodPrice='$30'
                    buttonText='Assine e receba em casa'
                    onSubmit={this.handleSubmitCreateBAToken}
                    authObj={this.state.jsonResponseObj}
                /* msg={this.state.msg} */>
                </FormCheckout>
                <div id="dropDownWrapper">
                {singleForm}
                {dynamicButton}
                </div>

                <ResponseBoard
                    authObj={this.state.jsonResponseObj}
                    msg={this.state.msg}>
                </ResponseBoard>
            </div>
        );
    }



}


export default ReferenceInstallments;