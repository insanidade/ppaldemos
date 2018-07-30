import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';
//import {GenericScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';
//var React = require('react');
//var createReactClass = require('create-react-class');
//var ScrollBox = require('react-scroll-box').ScrollBox; // ES5
//var GenericScrollBox = require('react-scroll-box').GenericScrollBox;
 

class ResponseBoard extends Component{
//const ResponseBoard = createReactClass({    
    render = () => {
         //{this.props.authObj.access_token}
        return (
            
            <div className="scroll-box__viewport" align="left">
                
                    <JSONPretty id="json-pretty" json={this.props.authObj}></JSONPretty>
                    <br />
                   
                
            </div>
            
            
        );
       
    }
}


export default ResponseBoard;