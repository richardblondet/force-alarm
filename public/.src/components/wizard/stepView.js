import React from "react";
import Store from "../../redux/store";

class StepView extends React.Component {
    static contextType = Store;

    render() {
        const { state } = this.context;
        const { step, children } = this.props;

        return state.step === step && children;
    }
}
export default StepView;