import React from "react";
import Store from "../../redux/store";
import { StepView, Step1 } from "./";

import constants from "../../constants";

class ForceAlarmWizard extends React.Component {
    static contextType = Store;

    handleFirstStep = () => {
        const { dispatch } = this.context;

        dispatch({ type: constants.STEP, data: 1 });
    }

    render() {
        const { state } = this.context;

        return (
            <StepView step={0}>
                <Step1 handleStep={this.handleFirstStep} />
            </StepView>
        );
    }
}


export default ForceAlarmWizard;