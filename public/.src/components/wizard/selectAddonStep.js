import React from "react";
import styled from "styled-components";
import addon_image from "../../static/force-alarm-addons.png";

import {
    Container,
    Jumbotron,
    Row, Col,
    Button,
    CardDeck, Card, CardBody, CardText
} from "reactstrap";

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
            const PriceFormatted = `RD${formatter.format(addon.price)}`
            
            return (
                <Card className="mt-5 border-0" key={`addon-card-${indx}`}>
                    <div className="mb-3">
                        <center>
                            <img 
                                className="img-thumbnail p-4" 
                                src={addon_image} style={{backgroundColor:"#691206"}} />
                        </center>
                    </div>
                    <CardBody>
                        <PlanName>
                            <span className="text-uppercase font-weight-bold text-center">{addon.post_title}</span>
                        </PlanName>
                        <p className="my-3 h3 text-center">
                            {PriceFormatted} <span className="text-black-50 h6">/mes adicionales</span>
                        </p>
                        <Button color="danger" onClick={e=>this.handleAddonSelect(e, addon)}>Agregar</Button>
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