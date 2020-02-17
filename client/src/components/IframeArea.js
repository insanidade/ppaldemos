import React, { Component } from 'react';
//import myImage from '../images/beer.jpeg';
import Script from 'react-load-script';
//import PAYPAL from 'https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js';

class IframeArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            divName: this.props.divName
        }

    }
    render = () => {
        return (
            <div id={this.props.divName}> </div>
        );
    }
}


export default IframeArea;