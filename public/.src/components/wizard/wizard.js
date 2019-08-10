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
import { 
    format
} from "date-fns";


import PlansService from "../../services/plans";
import OrderService from "../../services/orders";
import axios from "axios";

const Plans = new PlansService('http://localhost/wp-admin/admin-ajax.php');
const Order = new OrderService('http://localhost/wp-admin/admin-ajax.php');

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
        const {dispatch} = this.context;
        console.log("payment_data", data )
        dispatch({ type: constants.LOADING_ON });
        let test = dispatch({ type: constants.SET_PAYMENT_DATA, data });
        console.log(test);
        this.process( data );
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
    process = ( payment ) => {
        const {state} = this.context;
        const data = state.data;

        // Clean selected items
        data.selection.forEach( item => {
            delete item.post_content;
            delete item.post_excerpt;
            delete item.guid;
        });
        console.log( "data", data );
        // Format selected date
        data.form.date = format(data.form.date, "dd/MM/yyyy");
        data.form.time = format(data.form.time, "h:mm aa");

        // Get payment info
        data.payment = payment;

        console.log("Send to backend", data );

        axios({
            url: 'http://localhost/wp-admin/admin-ajax.php',
            method: "POST",
            params: {
                action: 'force-alarm-orders'
            },
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }).then( res => res.data ).then( response => {
            console.log( "Server Response", response );
        }).catch(error => {
            console.log( "Error Handling", error );
        });
        
        // Order.sendOrder( data ).then( response => {
        //     console.log( "Server Response", response );
        // }).catch(error => {
        //     console.log( "Error Handling", error );
        // });

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