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

import PlansService from "../../services/plans";

const Plans = new PlansService('http://localhost/wp-admin/admin-ajax.php');

class ForceAlarmWizard extends React.Component {
    static contextType = Store;
    constructor( props ) {
        super( props );

        this.state = {
            plans: [],
            addons: []
        };
    }
    componentDidMount() {
        const {dispatch} = this.context;
        
        Plans.getPlans({ 
            type: "plan" 
        }).then( plansresponse => {
            Plans.getPlans({ 
                type: "addon" 
            }).then( addonsresponse => {
                this.setState({ 
                    plans: plansresponse.data,
                    addons: addonsresponse.data 
                });
                dispatch({ type: constants.LOADING_OFF });
            });
        });

        
        
    }
    goToStep = ( step ) => {
        const {dispatch} = this.context;
        dispatch({ type: constants.STEP, data: step });
    }
    handleBackStep = () => {
        const { dispatch, state} = this.context;
        const returnToStep = state.step - 1;
        console.log("%c STEP: %s", "font-size:2em;", returnToStep );
        // Check if user is trying to go back to step 2 or tree to reset the seleccion
        if( returnToStep === 1 || returnToStep === 2 ) {
            dispatch({ type: constants.SELECT_PLAN, data: []});
            this.goToStep( 1 );
        } else {
            this.goToStep( state.step === 0 ? 0 : returnToStep );
        }
    }
    handleForward = () => {
        const {state} = this.context;
        this.goToStep(state.step + 1);
    }
    handleFirstStep = () => {
        this.goToStep(1);
    }
    handleSecondStep = ( plan ) => {
        const {state, dispatch} = this.context;
        state.data.selection.push(plan);
        dispatch({ type: constants.SELECT_PLAN, data: state.data.selection });
        this.goToStep(2);
    }
    handleThirdStep = ( addon ) => {
        console.log("Third step triggers and addon", addon );
        const {state, dispatch} = this.context;
        state.data.selection.push( addon );
        dispatch({ type: constants.SELECT_PLAN, data: state.data.selection });
        this.goToStep(3);
    }
    handleForthStep = ( data ) => {
        const {dispatch} = this.context;
        dispatch({ type: constants.SET_USER_DATA, data });
        this.goToStep(4);
    }
    handleFithStep = ( data ) => {
        console.log("Handling fith step data", data );
        const {dispatch} = this.context;
        dispatch({ type: constants.LOADING_ON });
        dispatch({ type: constants.SET_PAYMENT_DATA, data });
    }
    showTermsModal = () => {
        const {dispatch} = this.context;
        dispatch({ type: constants.SHOW_TERMS });
    }
    showServiceModal = ( plan ) => {
        const {dispatch} = this.context;
        dispatch({ type: constants.SET_MODAL_SERVICE, data: plan });
        dispatch({ type: constants.SHOW_MODAL_SERVICE  });
    }
    render() {
        const { state } = this.context;

        return (
            <React.Fragment>
                <StepView step={0}>
                    <Step1 handleStep={this.handleFirstStep} />
                </StepView>
                <StepView step={1}>
                    <Step2
                        plans={this.state.plans}
                        handleStep={this.handleSecondStep} 
                        handleBack={this.handleBackStep} 
                        showServiceModal={this.showServiceModal} />
                </StepView>
                <StepView step={2}>
                    <Step3 
                        addons={this.state.addons}
                        handleStep={this.handleThirdStep} 
                        handleForward={this.handleForward} 
                        handleBack={this.handleBackStep} />
                </StepView>
                <StepView step={3}>
                    <Step4 
                        handleStep={this.handleForthStep} 
                        form={state.data.form} 
                        handleBack={this.handleBackStep} 
                        showTermsModal={this.showTermsModal} />
                </StepView>
                <StepView step={4}>
                    <Step5 handleStep={this.handleFithStep} handleBack={this.handleBackStep} />
                </StepView>
            </React.Fragment>
        );
    }
}


export default ForceAlarmWizard;