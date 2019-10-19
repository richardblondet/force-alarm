import React from "react";
import Store from "../../redux/store";
import { 
    StepView, 
    Step1, 
    Step2,
    Step3,
    Step4,
    Step5,
    Step6
} from "./";
import constants from "../../constants";
import { 
    format
} from "date-fns";

import moment from 'moment';


import PlansService from "../../services/plans";
import OrderService from "../../services/orders";
import ContentService from "../../services/content";

import { findsRecurssionInArray } from '../../functions';

class ForceAlarmWizard extends React.Component {
    static contextType = Store;
    constructor( props ) {
        super( props );
        this.Plans = null;
        this.Order = null;
        this.state = {
            plans: [],
            addons: [],
            provincias: [],
            bockedDateList: []
        };
    }
    componentDidMount() {
        const {state, dispatch} = this.context;
        const ProvinciasContent = new ContentService("force-alarm-content", state.AJAX_URL );
        this.Plans = new PlansService("force-alarm-services", state.AJAX_URL);
        this.Order = new OrderService("force-alarm-orders", state.AJAX_URL);
        console.log("%c state", "font-size:2em;", state );

        const today = moment(new Date()).format("MM/DD/YYYY");
        this.CheckBookedTime(today);
        //
        this.Plans.getPlans({ 
            type: "plan"
        }).then( plansresponse => {
            this.Plans.getPlans({ 
                type: "addon"
            }).then( addonsresponse => {
                this.Plans.getPlans({
                    type: "item"
                }).then( itemResponse => {
                    console.log([...addonsresponse.data, ...itemResponse.data]);
                    this.setState({ 
                        plans: plansresponse.data,
                        addons: [...addonsresponse.data, ...itemResponse.data]
                    });
                })
                dispatch({ type: constants.LOADING_OFF });
            });
            ProvinciasContent.getContent({ 
                content: "provincias" 
            }).then(provinciasresponse => {
                console.log("Provoncioas", provinciasresponse.data );
                this.setState({ provincias: provinciasresponse.data.content });
            });
        });
        
    }



    CheckBookedTime = (date) => {
        const mDate = moment(date).format("MM/DD/YYYY");

        console.log("Mytime", mDate)
        //"09/18/2019"
        this.Order.getTimesByDate(mDate).then( ({ data }) => {
            console.log('data', data);
            const { booked } = data
            let finds = [
                '9:00 am',
                '11:00 am', 
                '1:00 pm', 
                '3:00 pm',
                '5:00 pm', 
                '5:30 pm'
               ];
            const results =  findsRecurssionInArray(finds, booked, 'installation_time');
            this.setState({ bockedDateList:  results });
            console.log('myresult', results)
           console.log("%c dates", "font-size:2em;", booked );
       });
    }

    goToStep = ( step ) => {
        const {dispatch} = this.context;
        dispatch({ type: constants.STEP, data: step });
    }
    handleDisclaimer = () => {
        const {dispatch} = this.context;
        dispatch({ type: constants.SHOW_DISCLAIMER });
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
    handleThirdStep = ( addon, quantity) => {
        // console.log('QTY', quantity);
        // console.log('ADDON', addon['ID']);

        const {state, dispatch} = this.context;

        state.data.selection.push( addon );
        // console.log('SELECTIONBEFORE', state.data.selection);
        state.data.selection = state.data.selection.map((selection) => {
            if(selection['ID'] === addon['ID'] && !selection.qty) {
                // selection.price = (Number(selection.price) * quantity);
                selection = {...selection, qty: quantity};
                
            }
            return selection;
        })

        console.log('SelectionAFTER', state.data.selection);
        dispatch({ type: constants.SELECT_PLAN, data: state.data.selection });
        // this.goToStep(3);
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
        dispatch({ type: constants.SET_PAYMENT_DATA, data });
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
        const {dispatch} = this.context;
        const {state} = this.context;
        const data = {};

        // Copy data
        for( let d in state.data ) {
            // format date
            if( d === "date" ) {
                data[d] = format(state.data[d], "dd/MM/yyyy"); 
            } else if( d === "time" ) {
                data[d] = format(state.data[d], "h:mm aa");
            } else {
                data[d] = state.data[d];
            }
        }

        // Clean selected items
        data.selection.forEach( item => {
            delete item.post_content;
            delete item.post_excerpt;
            delete item.guid;
        });
        console.log( "data", data );
        
        // Get payment info
        data.payment = payment;

        console.log("Send to backend", data );
        
        this.Order.sendOrder( data ).then( response => {
            console.log( "Server Response", response );
            this.goToStep(5);
            dispatch({ type: constants.LOADING_OFF });
        }).catch((error) => {
            const { data } = error.response;
            let message = "";
            if( data.data && data.data.message ) {
                message = data.data.message;
            } else {
                message = "Intenta utilizar otra tarjeta o verifica que no este vencida o tengas conexión a internet.";
            }
            alert("Oh oh! Ha ocurrido algo con tu pago.\n\n" + message);
            dispatch({ type: constants.LOADING_OFF });
            console.log( "Error Handling", error.response, data );
        });

    }
    render() {
        const { state } = this.context;
        const { provincias } = this.state;
        return (
            <React.Fragment>
                <StepView step={0}>
                    <Step1 handleStep={this.handleFirstStep} handleDisclaimer={this.handleDisclaimer} />
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
                        showTermsModal={this.showTermsModal}
                        provincias={provincias}
                        bockedDateList={this.state.bockedDateList}
                        CheckBookedTime={this.CheckBookedTime}
                         />
                </StepView>
                <StepView step={4}>
                    <Step5 
                        form={state.data.payment}
                        handleStep={this.handleFithStep} 
                        handleBack={this.handleBackStep}  />
                </StepView>
                <StepView step={5}>
                    <Step6 />
                </StepView>
            </React.Fragment>
        );
    }
}


export default ForceAlarmWizard;