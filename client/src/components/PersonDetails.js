import React, { Component } from 'react';

class PersonDetails extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            /* givenName: this.props.givenName,
            surname: this.props.surname,
            status: this.props.status,
            phoneCountryCode: this.props.phoneCountryCode,
            phoneNationalNumber: this.props.phoneNationalNumber,
            phoneType: this.props.phoneType,
            phoneConfirmation: this.props.phoneConfirmation, */
            givenName: "otavio",
            surname: "augusto",
            status: "CONFIRMED",
            phoneCountryCode: "55",
            phoneNationalNumber: "1155555555",
            phoneType: "MOBILE",
            phoneConfirmation: "CONFIRMED",
            addressLine1:"Avenida Brigadeiro Luis Antonio",
            addressLine2:"Jardim Paulista",
            addressCity:"São Paulo",
            addressState:"SP",
            addressCountryCode:"BR",
            addressPostalCode:"01402000",
            addressType:"HOME",
            addressConfirmation:"CONFIRMED",
            dateOfBirth:"1979-09-30",
            dateConfirmation:"CONFIRMED",
            originCountryCode:"BR",
            /* emailAddress:this.props.emailAddress, */
            emailAddress:"otavio.augusto-buyer@gmail.com",
            emailConfirmed:"false",
            emailPrimary:"true",
            emailConfirmation:"CONFIRMED",
            identityType:"TAX_IDENTIFICATION_NUMBER",
            identityValue:"03199060439",
            identityIssuerCountryCode:"BR",
            identityConfirmation:"CONFIRMED",
            locale:"pt_BR"
        }
    }

    handleLocaleChange = (e) => {
        this.setState({
            locale: e.target.value
        });
    }
    handleIdentityConfirmationChange = (e) => {
        this.setState({
            identityConfirmation: e.target.value
        });
    }
    handleIdentityIssuerCountryCodeChange = (e) => {
        this.setState({
            identityIssuerCountryCode: e.target.value
        });
    }
    handleIdentityValueChange = (e) => {
        this.setState({
            identityValue: e.target.value
        });
    }
    handleIdentityTypeChange = (e) => {
        this.setState({
            identityType: e.target.value
        });
    }
    handleEmailConfirmationChange = (e) => {
        this.setState({
            emailConfirmation: e.target.value
        });
    }
    handleEmailPrimaryChange = (e) => {
        this.setState({
            emailPrimary: e.target.value
        });
    }
    handleEmailConfirmedChange = (e) => {
        this.setState({
            emailConfirmed: e.target.value
        });
    }
    handleEmailAddressChange = (e) => {
        this.setState({
            emailAddress: e.target.value
        });
    }
    handleOriginCountryCodeChange = (e) => {
        this.setState({
            originCountryCode: e.target.value
        });
    }
    handleDateConfirmationChange = (e) => {
        this.setState({
            dateConfirmation: e.target.value
        });
    }
    handleDateOfBirthChange = (e) => {
        this.setState({
            dateOfBirth: e.target.value
        });
    }
    handleAddressConfirmationChange = (e) => {
        this.setState({
            addressConfirmation: e.target.value
        });
    }
    handleAddressTypeChange = (e) => {
        this.setState({
            addressType: e.target.value
        });
    }
    handleAddressPostalCodeChange = (e) => {
        this.setState({
            addressPostalCode: e.target.value
        });
    }
    handleAddressCountryCodeChange = (e) => {
        this.setState({
            addressCountryCode: e.target.value
        });
    }
    handleAddressStateChange = (e) => {
        this.setState({
            addressState: e.target.value
        });
    }
    handleAddressCityChange = (e) => {
        this.setState({
            addressCity: e.target.value
        });
    }
    handleAddressLine2Change = (e) => {
        this.setState({
            addressLine2: e.target.value
        });
    }
    handleAddressLine1Change = (e) => {
        this.setState({
            addressLine1: e.target.value
        });
    }
    handlePhoneConfirmationChange = (e) => {
        this.setState({
            phoneConfirmation: e.target.value
        });
    }

    handlePhoneTypeChange = (e) => {
        this.setState({
            phoneType: e.target.value
        });
    }

    handlePhoneNationalNumberChange = (e) => {
        this.setState({
            phoneNationalNumber: e.target.value
        });
    }
    handlePhoneCountryCodeChange = (e) => {
        this.setState({
            phoneCountryCode: e.target.value
        });
    }

    handleGivenNameChange = (e) => {
        this.setState({
            givenName: e.target.value
        });
    }

    handleSurnameChange = (e) => {
        this.setState({
            surname: e.target.value
        });
    }

    handleStatusChange = (e) => {
        this.setState({
            status: e.target.value
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
                        <label className="col-sm-2 control-label required" htmlFor="create_key_clientID">Given Name</label>
                        <div className="col-sm-10">
                            <input size="80" type="text"
                                id="create_key_clientID"
                                required="required"
                                className="form-control"
                                value={this.state.givenName}
                                onChange={this.handleGivenNameChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Surname</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.surname}
                                onChange={this.handleSurnameChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Status</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.status}
                                onChange={this.handleStatusChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Phone Country Code</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.phoneCountryCode}
                                onChange={this.handlePhoneCountryCodeChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Phone National Number</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.phoneNationalNumber}
                                onChange={this.handlePhoneNationalNumberChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Phone Type</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.phoneType}
                                onChange={this.handlePhoneTypeChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Phone Confirmation</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.phoneConfirmation}
                                onChange={this.handlePhoneConfirmationChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Address Line 1</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.addressLine1}
                                onChange={this.handleAddressLine1Change} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Address Line 2</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.addressLine2}
                                onChange={this.handleAddressLine2Change} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">City</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.addressCity}
                                onChange={this.handleAddressCityChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">State</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.addressState}
                                onChange={this.handleAddressStateChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Country Code</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.addressCountryCode}
                                onChange={this.handleAddressCountryCodeChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Postal Code</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.addressPostalCode}
                                onChange={this.handleAddressPostalCodeChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Address Type</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.addressType}
                                onChange={this.handleAddressTypeChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Address Confirmation</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.addressConfirmation}
                                onChange={this.handleAddressConfirmationChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Date of Birth</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.dateOfBirth}
                                onChange={this.handleDateOfBirthChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Date of Birth Confirmation</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.dateConfirmation}
                                onChange={this.handleDateConfirmationChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Origin Country Code</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.originCountryCode}
                                onChange={this.handleOriginCountryCodeChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">E-mail Address</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.emailAddress}
                                onChange={this.handleEmailAddressChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">E-mail Address confirmed</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.emailConfirmed}
                                onChange={this.handleEmailConfirmedChange} />
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Primary E-mail?</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.emailPrimary}
                                onChange={this.handleEmailPrimaryChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">E-mail Address confirmation</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.emailConfirmation}
                                onChange={this.handleEmailConfirmationChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Identity Type</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.identityType}
                                onChange={this.handleIdentityTypeChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Identity Value</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.identityValue}
                                onChange={this.handleIdentityValueChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Issuer Country Code</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.identityIssuerCountryCode}
                                onChange={this.handleIdentityIssuerCountryCodeChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Identity Confirmation</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.identityConfirmation}
                                onChange={this.handleIdentityConfirmationChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="create_key_secret">Locale</label>
                        <div className="col-sm-10">
                            <input size="80"  type="text"
                                id="create_key_secret"
                                required="required"
                                className="form-control"
                                value={this.state.locale}
                                onChange={this.handleLocaleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                        <br/>
                            <button type="submit"
                                id="create_key_submit"
                                className="btn-default btn">
                                Issue Consumer Referral
                            </button>
                        </div>
                    </div>


                </div>
            </form>
        );
    }
}


export default PersonDetails;