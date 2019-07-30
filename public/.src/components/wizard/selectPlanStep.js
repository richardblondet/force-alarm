import React from "react";
import styled from "styled-components";

import {
    Container,
    Jumbotron,
    Row, Col,
    Button
} from "reactstrap";

const PLANS = [
    {
        title: "Básico",
        excerpt: "<p>Alarma* para tu hogar, <b>SIN</b>&nbsp;la respuesta armada de<strong> SecurityForce™</strong></p>",
        content: "<p><strong>Panel de Control</strong>&nbsp;con teclado táctil.<br /> <strong>1 Sensor </strong>de Puerta / Ventana.<br /> <strong>1 Detector</strong>&nbsp;de Movimientos<b>&nbsp;IR.</b><br /> <strong>2 Controles Remotos&nbsp;</strong>tipo Llavero.<br /><strong>1 Adaptador </strong>de Corriente.<br /> <strong>Aplicación Móvil</strong>&nbsp;para iOS o Android.<br />Instalación<strong> Gratis</strong></p>",
        price: 1299.99,
        status: ""
    },
    {
        title: "FULL",
        excerpt: "<p>Alarma* para tu hogar, <strong>CON</strong> la respuesta armada de<strong> SecurityForce™</strong></p>Alarma* para tu hogar, CON la respuesta armada de SecurityForce™",
        content: "<p><strong>Panel de Control</strong>&nbsp;con teclado táctil.<br> <strong>1 Sensor </strong>de Puerta / Ventana.<br> <strong>1 Detector</strong>&nbsp;de Movimientos<b>&nbsp;IR.</b><br> <strong>2 Controles Remotos&nbsp;</strong>tipo Llavero.<br><strong>1 Adaptador </strong>de Corriente.<br> <strong>Aplicación Móvil</strong>&nbsp;para iOS o Android.<br>Instalación<strong> Gratis.<br>Monitoreo y Notificación&nbsp;</strong>a las Autoridades.<br><strong>Respuesta Armada**&nbsp;</strong>por Security Force.</p>",
        price: 1849.99,
        status: ""
    },
    {
        title: "FULL + FORCE SOS",
        excerpt: "<p>Alarma* para tu hogar, <strong>MAS</strong>&nbsp;servicio <strong>ForceSOS: MultiAsistencia</strong></p>",
        content: "<p><strong>Panel de Control</strong>&nbsp;con teclado táctil.<br> <strong>1 Sensor </strong>de Puerta / Ventana.<br> <strong>1 Detector</strong>&nbsp;de Movimientos<b>&nbsp;IR.</b><br> <strong>2 Controles Remotos&nbsp;</strong>tipo Llavero.<br><strong>1 Adaptador </strong>de Corriente.<br> <strong>Aplicación Móvil</strong>&nbsp;para iOS o Android.<br>Instalación<strong> Gratis.<br>Monitoreo y Notificación&nbsp;</strong>a las Autoridades.<br><strong>Respuesta Armada**&nbsp;</strong>por Security Force.<br><strong>ForceSOS: MultiAsistencia</strong>&nbsp;Hogar, Legal, Viajes, Mascotas, Salud, Bicicleta, Seguridad y Asistencia Vial, para toda la familia.&nbsp;</p>",
        price: 2449.99,
        status: ""
    }
];

const PlanName = styled.div`
    color: #AD301F;
    font-size: 22px;
`;

class SelectPlan extends React.Component {

    handleBackButton = (e) => {
        e.preventDefault();
    }
    handlePlanSelect = (e) => {
        e.preventDefault();
        this.props.handleStep();
    }
    getPlans = () => {
        return PLANS;
    }
    render() {
        const plans = this.getPlans();
        const renderPlans = plans.map( plan => (
            <Col xs="12" sm="4">
                <PlanName>
                    <span className="text-uppercase font-weight-light">{plan.title}</span>
                </PlanName>
            </Col>
        ));
        return (
            <React.Fragment>
                <Jumbotron tag="section" className="text-center" style={{backgroundColor:"white", borderRadius:"none"}}>
                    <Container>
                        <h2 className="jumbotron-heading display-5 mb-4">¿Con cuál plan desea proteger su hogar?</h2>
                    </Container>
                    <Container fluid>
                        <Row>
                            {renderPlans}
                        </Row>
                    </Container>    
                </Jumbotron>
                <Container fluid>
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h5 className="my-0 font-weight-normal">BÁSICO</h5>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$1,299.99 <small className="text-muted">/ mes</small></h1>
                                <button type="button" onClick={this.handlePlanSelect} className="mb-4 btn btn-lg btn-block btn-primary">Seleccionar</button>
                                
                                
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h5 className="my-0 font-weight-normal">FULL</h5>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$1,849.99 <small className="text-muted">/ mes</small></h1>
                                <button type="button" onClick={this.handlePlanSelect} className="mb-4 btn btn-lg btn-block btn-primary">Seleccionar</button>
                                
                                <p><strong>Plan Básico + </strong><br /><strong>Monitoreo y Notificación&nbsp;</strong>a las Autoridades.<br /><strong>Respuesta Armada**&nbsp;</strong>por Security Force.</p>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h5 className="my-0 font-weight-normal">FULL + FORCE SOS</h5>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$2,449.99 <small className="text-muted">/ mes</small></h1>
                                <button type="button" onClick={this.handlePlanSelect} className="mb-4 btn btn-lg btn-block btn-primary">Seleccionar</button>
                                
                                <p><strong>Plan FULL </strong>+ <br /><strong>ForceSOS: MultiAsistencia</strong>&nbsp;Hogar, Legal, Viajes, Mascotas, Salud, Bicicleta, Seguridad y Asistencia Vial, para toda la familia.&nbsp;</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

export default SelectPlan;