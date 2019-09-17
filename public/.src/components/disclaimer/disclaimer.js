import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Store from "../../redux/store";
import constants from "../../constants";
import styled from "styled-components";
import ContentService from "../../services/content";

const MyModal = styled(Modal)`
    .modal-body {
        min-height: 75vh;
    }

`;

const MyIframe = styled.iframe`
    @media (max-width: 480px) {
        min-height: 100vh;
    }
    @media (min-width: 480.1px) {
        min-height: 650px;
    }
`;

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
            <MyModal isOpen={state.showDisclaimer} toggle={this.toggle} className={this.props.className} size="lg">
                <ModalHeader toggle={this.toggle} />
                <ModalBody>
                    {/* <div dangerouslySetInnerHTML={{ __html: disclaimer }} /> */}
                    <MyIframe src="http://159.89.53.77/formulario-de-solicitud/" width="100%" frameBorder="0" />
                </ModalBody>
            </MyModal>
        );
    }
}

export default Disclaimer;