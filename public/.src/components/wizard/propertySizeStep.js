import React from "react";

import {
    Container,
    Jumbotron,
    Row, Col,
    Button
} from "reactstrap";

class PropertySize extends React.Component {

    componentDidMount() {
        // 
    }
    handleYesButton = (e) => {
        e.preventDefault();
    }
    handleNoButton = (e) => {
        e.preventDefault();
        this.props.handleStep();
    }
    handleDisclaimer = (e) => {
        e.preventDefault();
        this.props.handleDisclaimer();
    }

    render() {

        return (
            <Jumbotron tag="section" style={{backgroundColor:"white", borderRadius:"none"}}>
                <Container>
                    <h2 className="text-center jumbotron-heading display-5 mb-4">¿Su propiedad es mayor de 200mts<sup>2</sup>?</h2>
                </Container>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Row>
                                <Col xs="12" sm="6">
                                    <Button block color="secondary" className="mb-4" onClick={this.handleDisclaimer}>Si</Button>
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