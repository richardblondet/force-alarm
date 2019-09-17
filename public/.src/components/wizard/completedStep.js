import React from "react";

import {
    Container,
    Jumbotron,
    Row, Col,
    Button,
    Form, FormGroup, Label, Input, FormText
} from "reactstrap";

import checked_green from "../../static/checked-green.png";

class OrderCompleted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleHomeButton = (e) => {
        e.preventDefault();
        window.location = "/";
    }
    render() {
        
        return (
            <React.Fragment>
                <Jumbotron tag="section" style={{backgroundColor:"white", borderRadius:"none"}}>
                    <Container>
                        <div className="text-center mb-3">
                            <img src={checked_green} width="50" />
                        </div>
                        <h2 className="text-center jumbotron-heading display-5 mb-1 text-success">¡Pago realizado con éxito!</h2>
                        <p className="text-center text-success">Recibirás un correo electrónico con los detalles de tu compra.</p>
                        <div className="text-center"> 
                            <Button color="success" onClick={this.handleHomeButton}>Ir a Mi Página</Button>
                        </div>
                    </Container>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default OrderCompleted;