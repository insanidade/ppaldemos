import React, { Component } from 'react';

class BuyerPersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.firstName,            
            lastName: this.props.lastName,            
            phoneNumber: this.props.phoneNumber,
            email: this.props.email,
            country: this.props.country,
            language: this.props.language,
            cpf: this.props.cpf,
            taxIdType: this.props.taxIdType
        }
    }   

    handleCountryChange = (e) => {
        if('BR' !== e.target.value){
            this.setState({
                cpf:'',
                taxIdType:'',
                language: 'en_US'
            })

        }else{
            this.setState({
                taxIdType: 'BR_CPF',
                language: 'pt_BR'
            })
        }
        this.setState({
            country: e.target.value
        });
        console.log('MUDANDO COUNTRY!!! => '+e.target.value)
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
        console.log('MUDANDO EMAIL!!! => '+e.target.value)
    }

    handlePhoneNumberChange = (e) => {
        this.setState({
            phoneNumber: e.target.value
        });
        console.log('MUDANDO PHONE NUMBER!!! => '+e.target.value)
    }

    handleCpfChange = (e) => {
        this.setState({
            cpf: e.target.value
        });
        console.log('MUDANDO CPF!!! => '+e.target.value)
    }

    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value
        });
        console.log('MUDANDO ULTIMO NOME!!! => '+e.target.value)
    }

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value
        });
        console.log('MUDANDO PRIMEIRO NOME!!! => '+e.target.value)
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

                <table border="1" bordercolor="red" align="center">
                    <tr align='left'>
                    <label>
                            First Name
                            <input
                                label="teste"
                                value={this.state.firstName}
                                maxLength='10'
                                size='10'
                                onChange={this.handleFirstNameChange}
                            />
                        </label>
                    </tr>
                    <tr align='left'>
                    <label>
                            Last Name
                            <input
                                label="teste"
                                value={this.state.lastName}
                                maxLength='15'
                                size='15'
                                onChange={this.handleLastNameChange}
                            />
                        </label>
                    </tr>
                    <tr align='left'>
                    <label>
                            Buyer's e-mail
                            <input
                                label="teste"
                                value={this.state.email}
                                maxLength='20'
                                size='20'
                                onChange={this.handleEmailChange}
                            />
                        </label>
                    </tr>
                    <tr align='left'>
                        <label>
                            CPF (numbers only)
                            <input
                                label="teste"
                                value={this.state.cpf}
                                maxLength='11'
                                size='11'
                                onChange={this.handleCpfChange}
                            />
                        </label>
                    </tr>
                    <tr align='left'>
                        <label>
                            Phone number
                            <input
                                label="teste"
                                value={this.state.phoneNumber}
                                maxLength='13'
                                size='13'
                                onChange={this.handlePhoneNumberChange}
                            />
                        </label>
                    </tr>
                    <tr align='left'>
                        <label>
                            Country
                            <input
                                label="teste"
                                value={this.state.country}
                                maxLength='13'
                                size='13'
                                onChange={this.handleCountryChange}
                            />
                        </label>
                    </tr>

                </table>
            <input type='submit'value='Pay'/>
            </form>
        );
    }
}


export default BuyerPersonalInfo;