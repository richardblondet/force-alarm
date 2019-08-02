import React from "react";
import PropTypes from "prop-types";
import { StoreProvider } from "./redux/store";
import Header from "./components/header";
import Steps from "./components/steps";
import ForceAlarmWizard from "./components/wizard";

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
                <Steps />
                <ForceAlarmWizard />
            </StoreProvider>
        );
    }
}

App.propTypes = {
    config: PropTypes.object
};

export default App;