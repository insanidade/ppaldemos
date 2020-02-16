import React, { Component } from 'react';
//import myImage from '../images/beer.jpeg';
import Script from 'react-load-script';
//import PAYPAL from 'https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prodName: this.props.prodName,            
            prodImage: this.props.prodImage,
            prodPrice: this.props.prodPrice,
            prodAmount: this.props.prodAmount,
            prodId: this.props.prodId
        }

    }   


    handleAmountChange = (e) => {
        this.setState({
            prodAmount: e.target.value
        });
        console.log('MUDANDO QUANTIDADE!!! => '+e.target.value)
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log('valor de client id: ' + this.state.clientID);
        this.props.onSubmit(this.state);
        //console.log('valor de client id 2: ' + this.state.clientID);
    }



    render = () => {

        return (
            <form name="checkout" className="form-horizontal" onSubmit={this.handleSubmit}>

                <table border="1" bordercolor="black" align="center">
                    <tr align='center'>
                        <p>{this.state.prodName}</p>
                    </tr>
                    <tr align='center'>
                        <img src={this.state.prodImage} width="50" border="1" />
                    </tr>
                    <tr align='center'>
                        <p>{this.state.prodPrice}</p>
                    </tr>
                    <tr align='center'>
                        <input
                            value={this.state.prodAmount}
                            maxLength='3'
                            size='3'
                            onChange={this.handleAmountChange}
                        />
                    </tr>


                </table>
            <input type='submit'value='Add to kart'/>
            </form>
        );
    }
}


export default Product;