import React from "react";
import Store from "../../redux/store";
import { 
    StepView, 
    Step1, 
    Step2,
    Step3,
    Step4
} from "./";

import constants from "../../constants";

class ForceAlarmWizard extends React.Component {
    static contextType = Store;

    handleFirstStep = () => {
        const { dispatch } = this.context;

        dispatch({ type: constants.STEP, data: 1 });
    }
    handleSecondStep = ( plan ) => {
        const {state, dispatch} = this.context;
        state.data.selection.push(plan);
        dispatch({ type: constants.SELECT_PLAN, data: state.data.selection });
        dispatch({ type: constants.STEP, data: 2 });
    }
    handleThirdStep = ( addon ) => {
        console.log("Third step triggers and addon", addon);
        const {state, dispatch} = this.context;
        state.data.selection.push(addon);
        dispatch({ type: constants.SELECT_PLAN, data: state.data.selection });
        dispatch({ type: constants.STEP, data: 3 });
    }
    handleForthStep = () => {
        console.log("Forth step");
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
                <StepView step={2}>
                    <Step3 handleStep={this.handleThirdStep} />
                </StepView>
                <StepView step={3}>
                    <Step4 handleStep={this.handleForthStep} />
                </StepView>
            </React.Fragment>
        );
    }
}


export default ForceAlarmWizard;