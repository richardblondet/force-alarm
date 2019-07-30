import React from "react";

import {
    Container,
    Jumbotron,
    Row, Col,
    Button
} from "reactstrap";

class PropertySize extends React.Component {

    handleYesButton = (e) => {
        e.preventDefault();
    }
    handleNoButton = (e) => {
        e.preventDefault();
        this.props.handleStep();
    }

    render() {

        return (
            <Jumbotron tag="section" className="text-center" style={{backgroundColor:"white", borderRadius:"none"}}>
                <Container>
                    <h2 className="jumbotron-heading display-5 mb-4">¿Su propiedad es mayor de 200mts<sup>2</sup>?</h2>
                </Container>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <Row>
                                <Col xs="12" sm="6">
                                    <Button block color="secondary">Si</Button>
                                </Col>
                                <Col xs="12" sm="6">
                                    <Button block color="danger" onClick={this.handleNoButton}>No, Continuemos</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

export default PropertySize;