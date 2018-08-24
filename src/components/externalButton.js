import React, { Component } from 'react';
import { Redirect } from 'react-router';

//import {GenericScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';
//var React = require('react');
//var createReactClass = require('create-react-class');
//var ScrollBox = require('react-scroll-box').ScrollBox; // ES5
//var GenericScrollBox = require('react-scroll-box').GenericScrollBox;
 

class ExternalButton extends Component{

    constructor (props) {
        super(props);
        this.state = {}
        
    }



handleClick = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
        //window.PAYPAL.apps.doContinue;
        this.props.onClick(this.state);
}


//const ResponseBoard = createReactClass({    
    render = () => {
       /*   if (this.props.redirectState){
            console.log('REDIRECT STATE!!!!');
            return <Redirect push to="/sample" />;
         } */
        return (
            <div align="center">            
                <button id="continueButton" onClick={this.handleClick}>
                {this.props.buttonText}
                </button>
            </div>
        );
       
    }
}


export default ExternalButton;