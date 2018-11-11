import React, { Component } from 'react';
import Select from 'react-select';

const scaryAnimals = [
    { label: "NO NEGATIVE TESTING", value: -1 },
    { label: "AGREEMENT_ALREADY_CANCELLED", value: 1 },
    { label: "AMOUNT_MISMATCH", value: 2 },
    { label: "AUTHORIZATION_ALREADY_COMPLETED", value: 3 },
    { label: "CREDIT_PAYMENT_NOT_ALLOWED", value: 4 },
    { label: "BUYER_NOT_SET", value: 5 },
    { label: "TOO_MANY_SETTLEMENTS", value: 6 },
    { label: "INSTRUMENT_DECLINED", value: 7 },
    { label: "INSUFFICIENT_FUNDS", value: 8 },
    { label: "INTERNAL_SERVICE_ERROR", value: 9 },
    { label: "INVALID_ACCOUNT_NUMBER", value: 10 },
    { label: "INVALID_CITY_STATE_ZIP", value: 11 },
    { label: "INVALID_EXPERIENCE_PROFILE_ID", value: 12 },
    { label: "INVALID_PAYER_ID", value: 13 },
    { label: "MAX_NUMBER_OF_PAYMENT_ATTEMPTS_EXCEEDED", value: 14 },
    { label: "MAXIMUM_ALLOWED_AUTHORIZATION_REACHED_FOR_ORDER", value: 15 },
    { label: "PAYEE_ACCOUNT_LOCKED_OR_CLOSED", value: 16 },
];

class DropDown extends Component {

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


export default DropDown;