import React from "react";
import styled from "styled-components";

import {
    Container,
    Jumbotron,
    Row, Col,
    Button
} from "reactstrap";

const ADDONS = [
    {
        title: "Contra Robo",
        excerpt: "<p>Alarma* para tu hogar, <b>SIN</b>&nbsp;la respuesta armada de<strong> SecurityForce™</strong></p>",
        content: "<p><strong>Panel de Control</strong>&nbsp;con teclado táctil.<br /> <strong>1 Sensor </strong>de Puerta / Ventana.<br /> <strong>1 Detector</strong>&nbsp;de Movimientos<b>&nbsp;IR.</b><br /> <strong>2 Controles Remotos&nbsp;</strong>tipo Llavero.<br /><strong>1 Adaptador </strong>de Corriente.<br /> <strong>Aplicación Móvil</strong>&nbsp;para iOS o Android.<br />Instalación<strong> Gratis</strong></p>",
        price: 200,
        status: ""
    }
];

const PlanName = styled.div`
    color: #c32c1e;
    font-size: 22px;
`;

class SelectAddons extends React.Component {

    handleBackButton = (e) => {
        e.preventDefault();
    }
    handleNoButton = (e) => {
        e.preventDefault();
    }
    handlePlanSelect = (e, plan) => {
        e.preventDefault();
        this.props.handleStep(plan);
    }
    getAddons = () => {
        return ADDONS;
    }
    render() {
        const addons = this.getAddons();
        const renderAddons = addons.map( (plan, indx) => {
            const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency:'USD' });
            const PriceFormatted = formatter.format(plan.price);
            return (
                <Col xs="12" sm="4" key={indx} className="mt-5">
                    <div className="mb-3">
                        <center>
                            <img 
                                className="img-thumbnail py-5" 
                                src="https://forcealarm.interactiva.com.do/wp-content/uploads/2019/07/Logo-ForceAlarm.png" 
                                width="125" />
                        </center>
                    </div>
                    <PlanName>
                        <span className="text-uppercase font-weight-bold text-center">{plan.title}</span>
                    </PlanName>
                    <div>
                        <p className="my-3 h3 text-center">
                            {PriceFormatted} <span className="text-black-50 h6">/mes</span>
                        </p>
                    </div>
                    <Button color="danger" onClick={e=>this.handlePlanSelect(e, plan)}>Seleccionar</Button>
                </Col>
            );
        });
        return (
            <React.Fragment>
                <Jumbotron tag="section" className="text-center" style={{backgroundColor:"white", borderRadius:"none"}}>
                    <Container>
                        <h2 className="jumbotron-heading display-5 mb-4">¿Agregamos nuestro <strong>seguro contra robo</strong>?</h2>
                    </Container>
                    <Container fluid>
                        <Row>
                            <Col xs="12" md={{ size: 8, offset: 2 }}>
                                <Row>
                                    {renderAddons}
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