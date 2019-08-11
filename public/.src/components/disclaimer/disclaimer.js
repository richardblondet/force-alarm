import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Store from "../../redux/store";
import constants from "../../constants";

import ContentService from "../../services/content";

class Disclaimer extends React.Component {
    static contextType = Store;

    constructor(props) {
        super(props);

        this.state = {
            disclaimer: ""
        }
    
        this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount() {
        const {state} = this.context;
        const Disclaimer = new ContentService("force-alarm-content", state.AJAX_URL );
        Disclaimer.getContent({ content: "disclaimer" }).then(res => this.setState({ disclaimer: res.data.content }));
    }
    
    toggle() {
        const {state,dispatch} = this.context;
        const toggle = state.showDisclaimer ? constants.HIDE_DISCLAIMER : constants.SHOW_DISCLAIMER;

        dispatch({ type: toggle });
    }

    render() {
        const {state} = this.context;
        const {disclaimer} = this.state;

        return (
            <Modal isOpen={state.showDisclaimer} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Contáctanos</ModalHeader>
                <ModalBody>
                    <div dangerouslySetInnerHTML={{ __html: disclaimer }} />
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={this.toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Disclaimer;