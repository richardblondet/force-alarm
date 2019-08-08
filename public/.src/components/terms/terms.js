import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Store from "../../redux/store";
import constants from "../../constants";

class Terms extends React.Component {
    static contextType = Store;

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        const {state,dispatch} = this.context;
        const toggle = state.showTerms ? constants.HIDE_TERMS : constants.SHOW_TERMS;

        dispatch({ type: toggle });
    }

    render() {
        const {state} = this.context;
        return (
            <Modal isOpen={state.showTerms} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Términos y Condiciones</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={this.toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Terms;