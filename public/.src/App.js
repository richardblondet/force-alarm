import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StoreProvider } from "./redux/store";
import Loading from "./components/loading";
import Header from "./components/header";
import Steps from "./components/steps";
import ForceAlarmWizard from "./components/wizard";
import Terms from "./components/terms";
import ServicesModal from "./components/servicesModal";
import AddonsModal from "./components/addonsModal";
import Disclaimer from "./components/disclaimer";

const GlobalStyles = styled.div`
    position: relative;
    z-index: 0;
    @media (max-width: 480px) {
        .btn {

            margin-bottom: 1rem!important;
            font-size: 0.6em;
        }
        .ver-mas {
            font-size: 20px;
        }
        .details_link {
            font-size: 16px;
            margin-top: 2px;
        }
    };

    @media (max-width: 375px) {
        .btn {
            padding: 7px 3px;
            font-size: 0.6em;
        }
        .ver-mas {
            font-size: 20px;
        }
        .details_link {
            font-size: 14px;
            margin-top: 8px;
        }
    }

`;

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { globals } = this.props;
        return (
            <StoreProvider config={globals}>
                <GlobalStyles>
                    <Loading />
                    <Header />
                    <Disclaimer />
                    <Terms />
                    <ServicesModal />
                    <AddonsModal />
                    <Steps />
                    <ForceAlarmWizard />
                </GlobalStyles>
            </StoreProvider>
        );
    }
}

App.propTypes = {
    config: PropTypes.object,
    globals: PropTypes.object.isRequired
};

export default App;