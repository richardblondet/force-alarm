import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import constants from "../../constants";
import Store from "../../redux/store";

class ServicesModal extends React.Component {
    static contextType = Store;

    toggle = () => {
        const {state,dispatch} = this.context;
        const toggle = state.showModalService ? constants.HIDE_MODAL_SERVICE : constants.SHOW_MODAL_SERVICE;

        dispatch({ type: toggle });
    }
    render() {
        const {state} = this.context;

        return (
            <Modal isOpen={state.showModalService} toggle={this.toggle} className={this.props.className}>
                
                <ModalBody className="text-center">
                    <div>
                        <img 
                            className="pt-5 pb-2 mx-auto d-block" 
                            src="https://forcealarm.interactiva.com.do/wp-content/uploads/2019/07/Logo-ForceAlarm.png" 
                            width="125" />
                    </div>
                    <div dangerouslySetInnerHTML={{__html: state.modalService.post_title}} />
                    <h3>{state.modalService.price}</h3>
                </ModalBody>
                <ModalBody className="text-center">
                    <div dangerouslySetInnerHTML={{__html: state.modalService.post_excerpt}} />
                </ModalBody>
                <ModalBody className="text-center">
                    <div dangerouslySetInnerHTML={{__html: state.modalService.post_content}} />
                </ModalBody>
                <ModalFooter className="text-center border-0">
                    <Button color="danger" onClick={this.toggle} className="mx-auto">Cerrar</Button>
                </ModalFooter>
            </Modal>
        );
    }
};

export default ServicesModal;