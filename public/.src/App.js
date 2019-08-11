import React from "react";
import PropTypes from "prop-types";
import { StoreProvider } from "./redux/store";
import Loading from "./components/loading";
import Header from "./components/header";
import Steps from "./components/steps";
import ForceAlarmWizard from "./components/wizard";
import Terms from "./components/terms";
import ServicesModal from "./components/servicesModal";
import Disclaimer from "./components/disclaimer";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { globals } = this.props;
        return (
            <StoreProvider config={globals}>
                {/* <Loading /> */}
                <Disclaimer />
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