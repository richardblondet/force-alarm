import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import logo from "../../static/logo-fa-color.png";
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
        const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency:"USD" });
        const PriceFormatted = `RD${formatter.format(state.modalService.price)}`;

        return (
            <Modal isOpen={state.showModalService} toggle={this.toggle} className={this.props.className}>
                
                <ModalBody className="text-center">
                    <div>
                        <img 
                            className="pt-5 pb-2 mx-auto d-block" 
                            src={logo} 
                            width="125" />
                    </div>
                    <div dangerouslySetInnerHTML={{__html: state.modalService.post_title}} />
                    <h3>{PriceFormatted}</h3>
                </ModalBody>
                <ModalBody className="text-center" style={{"whiteSpace": "pre-line"}}>
                    <div dangerouslySetInnerHTML={{__html: state.modalService.post_excerpt}} />
                </ModalBody>
                <ModalBody className="text-center" style={{"whiteSpace": "pre-line"}}>
                    <div dangerouslySetInnerHTML={{__html: state.modalService.post_content}} />
                </ModalBody>
                <ModalFooter className="text-center border-0">
                    <Button color="danger" onClick={this.toggle} className="mx-auto">Cerrar</Button>
                </ModalFooter>
            </Modal>
        );
    }
};


ServicesModal.propTypes = {
    className: PropTypes.string
};

export default ServicesModal;