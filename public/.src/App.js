import React from "react";
import PropTypes from "prop-types";
import { StoreProvider } from "./redux/store";
import Loading from "./components/loading";
import Header from "./components/header";
import Steps from "./components/steps";
import ForceAlarmWizard from "./components/wizard";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <StoreProvider config={{}}>
                <Loading />
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