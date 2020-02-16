import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
//import {GenericScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';
//var React = require('react');
//var createReactClass = require('create-react-class');
//var ScrollBox = require('react-scroll-box').ScrollBox; // ES5
//var GenericScrollBox = require('react-scroll-box').GenericScrollBox;

var JSONPrettyMon = require('react-json-pretty/dist/monikai');
 

class ResponseBoard extends Component{
//const ResponseBoard = createReactClass({    
    render = () => {
         //{this.props.authObj.access_token}
         //className="scroll-box__viewport"
        return (
            
            <div align="left">
                <JSONPretty json={this.props.msg} theme={JSONPrettyMon} ></JSONPretty>
                <br />
                <JSONPretty json={this.props.authObj} theme={JSONPrettyMon} ></JSONPretty>
                <br />
            </div>
            
            
        );
       
    }
}


export default ResponseBoard;