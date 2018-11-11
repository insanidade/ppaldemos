import React, { Component } from 'react';
import Select from 'react-select';

const scaryAnimals = [
    { label: "NO NEGATIVE TESTING", value: -1 },
    { label: "10014", value: 100.14 },
    { label: "10001", value: 100.01 },
    { label: "10002", value: 100.02 },
    { label: "10003", value: 100.03 },
    { label: "10004", value: 100.04 },
    { label: "10005", value: 100.05 },
    { label: "10006", value: 100.06 },
    { label: "10007", value: 100.07 },
];

class DropDownNVP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //label: 'GENERIC_LABEL',// || 'AYMGJl2GTe2fO0fQd4PyEHmtD6o7GnXSUaH7GFhl6GQDy2HRZ42aDhgrkcx_b_E5bTL2h19jQMCGJXJF',
            //value: -1///|| 'EPV1gUHgDGtpKNROYZ_2evOxSHANbI-PVnCQG_CeJB49AzcVgTfpnWYLa2mtTHcBuXKs0_awCvmULBZm'
        }
    }

    
    handleSubmit = (opt) => {
        console.log('DROP DOWN: '+opt.label);
        //opt.preventDefault();
        
        //console.log('valor de client id: '+this.state.clientID);
        this.props.onClick(opt);
        //console.log('valor de client id 2: '+this.state.clientID);
    }

    render = () => {
        return (
            <div className="app">
                <div className="container">
                    {/* <Select options={scaryAnimals} onSubmit={opt => console.log(opt.label, opt.value)}  /> */}
                    <Select
                        options={scaryAnimals}
                        /* defaultInputValue={this.state.label} */
                        onChange={opt => this.handleSubmit(opt)}
                        //defaultInputValue={scaryAnimals[0].label}
                        defaultValue={scaryAnimals[0]}
                    />
                </div>
            </div>
        );
    }
}


export default DropDownNVP;