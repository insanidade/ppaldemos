import React, { Component } from 'react';

class FormSingle extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            installments: this.props.installments,// || 'AYMGJl2GTe2fO0fQd4PyEHmtD6o7GnXSUaH7GFhl6GQDy2HRZ42aDhgrkcx_b_E5bTL2h19jQMCGJXJF',
            //secret: this.props.secret //|| 'EPV1gUHgDGtpKNROYZ_2evOxSHANbI-PVnCQG_CeJB49AzcVgTfpnWYLa2mtTHcBuXKs0_awCvmULBZm'
        }
    }

    handleInstallmentsChange = (e) => {
        this.setState({
            installments: e.target.value
        });
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log('valor de client id: '+this.state.clientID);
        this.props.onSubmit(this.state);
        //console.log('valor de client id 2: '+this.state.clientID);
    }

    render = () => {
        return (
            <form name="create_key" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="create_key">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_clientID">Quantas parcelas?</label>
                        <div className="col-sm-10">
                            <input size="80" type="text"
                                id="create_key_clientID"
                                required="required"
                                className="form-control"
                                value={this.state.installments}
                                onChange={this.handleInstallmentsChange} />
                        </div>
                    </div>
                    
                    <div align="center">
                        <button id="continueButton" onClick={this.handleSubmit}>
                            {this.props.buttonText}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}


export default FormSingle;