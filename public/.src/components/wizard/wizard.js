import React from "react";
import Store from "../../redux/store";
import { 
    StepView, 
    Step1, 
    Step2,
    Step3,
    Step4,
    Step5
} from "./";

import constants from "../../constants";

class ForceAlarmWizard extends React.Component {
    static contextType = Store;
    componentDidMount() {
        const {dispatch} = this.context;
        setTimeout(() => {
            dispatch({ type: constants.LOADING_OFF });
        }, 2000 );
        
    }
    handleBackStep = () => {
        const { dispatch, state} = this.context;
        const returnToStep = state.step - 1;
        console.log("%c STEP: %s", "font-size:2em;", returnToStep );
        // Check if user is trying to go back to step 2 or tree to reset the seleccion
        if( returnToStep === 1 || returnToStep === 2 ) {
            dispatch({ type: constants.SELECT_PLAN, data: []});
            dispatch({ type: constants.STEP, data: 1 });    
        } else {
            dispatch({ type: constants.STEP, data: state.step === 0 ? 0 : returnToStep });
        }
    }
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
        console.log("Third step triggers and addon", addon );
        const {state, dispatch} = this.context;
        state.data.selection.push( addon );
        dispatch({ type: constants.SELECT_PLAN, data: state.data.selection });
        dispatch({ type: constants.STEP, data: 3 });
    }
    handleForthStep = ( data ) => {
        const {dispatch} = this.context;
        dispatch({ type: constants.SET_USER_DATA, data });
        dispatch({ type: constants.STEP, data: 4 });
    }
    handleFithStep = ( data ) => {
        console.log("Handling fith step data", data );
        const {dispatch} = this.context;
        dispatch({ type: constants.LOADING_ON });
        dispatch({ type: constants.SET_PAYMENT_DATA, data });
    }

    render() {
        const { state } = this.context;

        return (
            <React.Fragment>
                <StepView step={0}>
                    <Step1 handleStep={this.handleFirstStep} />
                </StepView>
                <StepView step={1}>
                    <Step2 handleStep={this.handleSecondStep} handleBack={this.handleBackStep} />
                </StepView>
                <StepView step={2}>
                    <Step3 handleStep={this.handleThirdStep} handleBack={this.handleBackStep} />
                </StepView>
                <StepView step={3}>
                    <Step4 handleStep={this.handleForthStep} form={state.data.form} handleBack={this.handleBackStep} />
                </StepView>
                <StepView step={4}>
                    <Step5 handleStep={this.handleFithStep} handleBack={this.handleBackStep} />
                </StepView>
            </React.Fragment>
        );
    }
}


export default ForceAlarmWizard;