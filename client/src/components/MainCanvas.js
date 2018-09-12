import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';
//import {GenericScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';
//var React = require('react');
//var createReactClass = require('create-react-class');
//var ScrollBox = require('react-scroll-box').ScrollBox; // ES5
//var GenericScrollBox = require('react-scroll-box').GenericScrollBox;
 

class MainCanvas extends Component{

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
         //{this.props.authObj.access_token}
        /* return (
            <div align="center">
                <Form
                    onSubmit={this.handleSubmit}>
                </Form>
                <br />
                <hr />
                <FormCheckout
                    onSubmit={this.handleSubmitCreate}
                    authObj={this.state.jsonResponseObj}
                    msg={this.state.msg}>
                </FormCheckout>

                <ExternalButton 
                    onClick={this.handleClickExternalButton}>
                </ExternalButton>

                <ResponseBoard
                    authObj={this.state.jsonResponseObj}
                    msg={this.state.msg}>
                </ResponseBoard>
            </div>
        ); */
       
    }
}


export default MainCanvas;