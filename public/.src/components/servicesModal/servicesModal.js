import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import constants from "../../constants";
import Store from "../../redux/store";

class ServicesModal extends React.Component {
    static contextType = Store;

    constructor(props) {
        super(props);
        
        this.state = {
            modal: true
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        // 
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    render() {
        const {serviceTitle, serviceExcerpt, serviceContent} = this.props;

        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle} className="border-0 text-center">
                    <img 
                        className="py-5" 
                        src="https://forcealarm.interactiva.com.do/wp-content/uploads/2019/07/Logo-ForceAlarm.png" 
                        width="125" />
                </ModalHeader>
                <ModalBody className="text-center">
                    {serviceTitle}
                </ModalBody>
                <ModalBody className="text-center">
                    {serviceExcerpt}
                </ModalBody>
                <ModalBody className="text-center border-top">
                    {serviceContent}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.toggle}>Do Something</Button>{' '}
                </ModalFooter>
            </Modal>
        );
    }
};

export default ServicesModal;