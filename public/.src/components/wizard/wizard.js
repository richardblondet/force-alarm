import React from "react";
import Store from "../../redux/store";
import { StepView, Step1, Step2 } from "./";

import constants from "../../constants";

class ForceAlarmWizard extends React.Component {
    static contextType = Store;

    handleFirstStep = () => {
        const { dispatch } = this.context;

        dispatch({ type: constants.STEP, data: 1 });
    }
    handleSecondStep = () => {
        const { dispatch } = this.context;

        dispatch({ type: constants.STEP, data: 2 });
    }

    render() {
        const { state } = this.context;

        return (
            <React.Fragment>
                <StepView step={0}>
                    <Step1 handleStep={this.handleFirstStep} />
                </StepView>
                <StepView step={1}>
                    <Step2 handleStep={this.handleSecondStep} />
                </StepView>
            </React.Fragment>
        );
    }
}


export default ForceAlarmWizard;