import React from "react";
import PropTypes from "prop-types";
import { StoreProvider } from "./redux/store";
import Loading from "./components/loading";
import Header from "./components/header";
import Steps from "./components/steps";
import ForceAlarmWizard from "./components/wizard";
import Terms from "./components/terms";
import ServicesModal from "./components/servicesModal";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <StoreProvider config={{}}>
                {/* <Loading /> */}
                <Terms />
                <ServicesModal />
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