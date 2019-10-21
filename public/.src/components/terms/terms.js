import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Store from "../../redux/store";
import constants from "../../constants";

// import ContentService from "../../services/content";

class Terms extends React.Component {
    static contextType = Store;

    constructor(props) {
        super(props);
        this.state = {
            terms: ""
        };
        this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount() {}
    
    toggle() {
        const {state,dispatch} = this.context;
        const toggle = state.showTerms ? constants.HIDE_TERMS : constants.SHOW_TERMS;

        dispatch({ type: toggle });
    }

    render() {
        const {state} = this.context;
        const terms = state.data.selection.length > 0 && state.data.selection.filter( product => product.product_type === "plan" )[0].contract;
        return (
            <Modal isOpen={state.showTerms} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Términos y Condiciones</ModalHeader>
                <ModalBody>
                    <div dangerouslySetInnerHTML={{ __html: terms }} />
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={this.toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

Terms.propTypes = {
    className: PropTypes.string
};

export default Terms;