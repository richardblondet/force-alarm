import React from "react";
import PropTypes from "prop-types";
import { StoreProvider } from "./redux/store";
import Header from "./components/header";
import Steps from "./components/steps";

import {
    Container,
    Row, Col
} from "reactstrap";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <StoreProvider config={{}}>
                <Header />
                <Container>
                    <Steps />
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="mt-5">Antes de comenzar</h1>
                        </Col>
                    </Row>
                </Container>
            </StoreProvider>
        );
    }
}

App.propTypes = {
    config: PropTypes.object
};

export default App;