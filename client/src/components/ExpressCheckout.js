import React, { Component } from 'react';
import Form from './form';
import ResponseBoard from './responseBoard';
import { createToken } from '../actions/postActions';
import FormCheckout from './formCheckout';
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
            prodImage: '../images/beer.jpeg',
            prodPrice: this.props.prodPrice,
            jsonResponseObj:{},
            msg: 'Response Board'
        }

    }   


//######################################################################################################
//######################################################################################################

handleSubmitCreate = async (data) => {
    console.log('invoking create payment');
    try {
        
    
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
        console.log('TOKEN PREENCHIDO: '+this.state.token);
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
                    prodImage={this.state.prodImage}
                    prodPrice='$20'
                    buttonText='Pague com PayPal'
                    onSubmit={this.handleSubmitCreate}
                    authObj={this.state.jsonResponseObj}
                    msg={this.state.msg}>
                </FormCheckout>

                <ResponseBoard
                    authObj={this.state.jsonResponseObj}
                    msg={this.state.msg}>
                </ResponseBoard>


            </div>
        );
    }
}


export default ExpressCheckout;