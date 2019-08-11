import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Store from "../../redux/store";
import constants from "../../constants";

import ContentService from "../../services/content";

class Terms extends React.Component {
    static contextType = Store;

    constructor(props) {
        super(props);
        this.state = {
            terms: ""
        }
        this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount() {
        const {state} = this.context;
        const Terms = new ContentService("force-alarm-content", state.AJAX_URL );
        Terms.getContent({ content: "terms" }).then(res => this.setState({ terms: res.data.content }));
    }

    toggle() {
        const {state,dispatch} = this.context;
        const toggle = state.showTerms ? constants.HIDE_TERMS : constants.SHOW_TERMS;

        dispatch({ type: toggle });
    }

    render() {
        const {state} = this.context;
        const {terms} = this.state;
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

export default Terms;