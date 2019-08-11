import React from "react";
import styled from "styled-components";

import {
    Container,
    Jumbotron,
    Row, Col,
    Button,
    CardDeck, Card, CardBody, CardText
} from "reactstrap";

const ADDONS = [
    {
        id: "contra-robo",
        title: "Contra Robo",
        excerpt: "<p>Alarma* para tu hogar, <b>SIN</b>&nbsp;la respuesta armada de<strong> SecurityForce™</strong></p>",
        content: "<p><strong>Panel de Control</strong>&nbsp;con teclado táctil.<br /> <strong>1 Sensor </strong>de Puerta / Ventana.<br /> <strong>1 Detector</strong>&nbsp;de Movimientos<b>&nbsp;IR.</b><br /> <strong>2 Controles Remotos&nbsp;</strong>tipo Llavero.<br /><strong>1 Adaptador </strong>de Corriente.<br /> <strong>Aplicación Móvil</strong>&nbsp;para iOS o Android.<br />Instalación<strong> Gratis</strong></p>",
        price: 200,
        status: ""
    }
];

const PlanName = styled(CardText)`
    color: #c32c1e;
    font-size: 22px;
`;

class SelectAddons extends React.Component {
    handleBackButton = (e) => {
        e.preventDefault();
        this.props.handleBack();
    }
    handleNoButton = (e) => {
        e.preventDefault();
    }
    handleAddonSelect = (e, addon) => {
        e.preventDefault();
        this.props.handleStep(addon);
    }
    handleForwardButton = (e) => {
        e.preventDefault();
        this.props.handleForward();
    }
    getAddons = () => {
        return this.props.addons;
    }
    render() {
        const addons = this.getAddons();
        const renderAddons = addons.map( (addon, indx) => {
            const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency:'USD' });
            const PriceFormatted = formatter.format(addon.price);
            
            return (
                <Card className="mt-5 border-0" key={`addon-card-${indx}`}>
                    <div className="mb-3">
                        <center>
                            <img 
                                className="img-thumbnail py-5" 
                                src="https://forcealarm.interactiva.com.do/wp-content/uploads/2019/07/Logo-ForceAlarm.png" 
                                width="125" />
                        </center>
                    </div>
                    <CardBody>
                        <PlanName>
                            <span className="text-uppercase font-weight-bold text-center">{addon.post_title}</span>
                        </PlanName>
                        <p className="my-3 h3 text-center">
                            {PriceFormatted} <span className="text-black-50 h6">/mes</span>
                        </p>
                        <Button color="danger" onClick={e=>this.handleAddonSelect(e, addon)}>Seleccionar</Button>
                    </CardBody>
                </Card>
            );
        });
        return (
            <React.Fragment>
                <Jumbotron tag="section" className="text-center" style={{backgroundColor:"white", borderRadius:"none"}}>
                    <Container>
                        <h2 className="text-center jumbotron-heading display-5 mb-4">¿Agregamos nuestro <strong>seguro contra robo</strong>?</h2>
                    </Container>
                    <Container fluid>
                        <Row>
                            <Col xs="12" md={{ size: 8, offset: 2 }}>
                                <CardDeck>
                                    {renderAddons}
                                </CardDeck>
                                <Row className="mt-4 text-center">
                                    <Col xs="12" md={{ size: 6, offset: 3 }}>
                                        <Row>
                                            <Col>  
                                                <Button block onClick={this.handleBackButton} color="secondary">Atrás</Button>
                                            </Col>
                                            <Col>
                                                <Button block onClick={this.handleForwardButton} color="danger">No, Continuemos</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>    
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default SelectAddons;