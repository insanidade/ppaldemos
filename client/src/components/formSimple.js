import React, { Component } from 'react';

class FormSimple extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            clientID: this.props.clientid || 'ASpwwK3e6Xq319fcTEY4asiXBYzRZQK3kJLVZH5mQYf_7ZJw7cKzIScarLFGWwqcObuTKKYMPw6RLADw',
            secret: this.props.secret || 'EJWh8j2_IvgH-4CWwCnqrWOgvj_epwM0YCNrCRKfevUS9GIH04NEiK27H7hna3JofiRZ7hUj789aDX6j'
        }
    }

   /*  handleClientIDChange = (e) => {
        this.setState({
            clientID: e.target.value
        });
    }

    handleSecretChange = (e) => {
        this.setState({
            secret: e.target.value
        });
    } */
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
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                        <br/>
                            <button type="submit"
                                id="create_key_submit"
                                className="btn-default btn">
                                Request Token
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}


export default FormSimple;