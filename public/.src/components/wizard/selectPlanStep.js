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
    color: #c32c1e;
    font-size: 22px;
`;

class SelectPlan extends React.Component {

    handleBackButton = (e) => {
        e.preventDefault();
    }
    handlePlanSelect = (e, plan) => {
        e.preventDefault();
        this.props.handleStep( plan );
    }
    getPlans = () => {
        return PLANS;
    }
    showServiceModal = (plan) => {
        console.log("showServiceModal plan", plan );
        this.props.showServiceModal(plan);

    }
    render() {
        const plans = this.getPlans();
        const renderPlans = plans.map( (plan, indx) => {
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
                    <div><a href="" onClick={e=> {
                        e.preventDefault();
                        this.showServiceModal(plan);
                    }} title={plan.title} price={plan.price}>ver más</a></div>
                </Col>
            );
        });
        return (
            <React.Fragment>
                <Jumbotron tag="section" className="text-center" style={{backgroundColor:"white", borderRadius:"none"}}>
                    <Container>
                        <h2 className="jumbotron-heading display-5 mb-4">¿Con cuál plan desea proteger su hogar?</h2>
                    </Container>
                    <Container fluid>
                        <Row>
                            <Col xs="12" md={{ size: 8, offset: 2 }}>
                                <Row>
                                    {renderPlans}
                                </Row>
                            </Col>
                        </Row>
                    </Container>    
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default SelectPlan;