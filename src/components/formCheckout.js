import React, { Component } from 'react';
//import myImage from '../images/beer.jpeg';
import Script from 'react-load-script';
//import PAYPAL from 'https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js';

class FormCheckout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientID: this.props.clientid || 'ASpwwK3e6Xq319fcTEY4asiXBYzRZQK3kJLVZH5mQYf_7ZJw7cKzIScarLFGWwqcObuTKKYMPw6RLADw',
            secret: this.props.secret || 'EJWh8j2_IvgH-4CWwCnqrWOgvj_epwM0YCNrCRKfevUS9GIH04NEiK27H7hna3JofiRZ7hUj789aDX6j',
            prodName: this.props.prodName,
            prodBrewery: this.props.prodBrewery,
            prodImage: '../images/beer.jpeg',
            prodPrice: this.props.prodPrice
        }

    }   


    handleClientIDChange = (e) => {
        this.setState({
            clientID: e.target.value
        });
    }

    handleSecretChange = (e) => {
        this.setState({
            secret: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('valor de client id: ' + this.state.clientID);
        this.props.onSubmit(this.state);
        console.log('valor de client id 2: ' + this.state.clientID);
    }



    render = () => {

        return (

            <form name="checkout" className="form-horizontal" onSubmit={this.handleSubmit}>

                <table border="5" bordercolor="red" align="center">

                    <tr >
                        <th  colSpan="3">Beer shopping cart</th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Brewery</th>
                        <th>Product Image</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <th>{this.props.prodName}</th>
                        <th>{this.props.prodBrewery}</th>
                        <th><img src={this.props.prodImage}  width="50" border="3" /></th>
                        <th>{this.props.prodPrice}</th>
                        <th>
                        <div id="checkout">                    
                    <div className="form-group">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <br />
                            <button type="submit"
                                id="create_key_submit"
                                className="btn-default btn">
                                Pague com Paypal
                            </button>
                        </div>
                    </div>
                </div>

                        </th>
                    </tr>
                </table>
                
                <hr />
                <div id="ppplusDiv"> </div>
                <hr />
            </form>
        );
    }
}


export default FormCheckout;