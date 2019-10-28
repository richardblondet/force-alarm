import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import constants from "../../constants";
import Store from "../../redux/store";

export default class AddonsModal extends React.Component {
  static contextType = Store;


  toggle = () => {
    const {state,dispatch} = this.context;
    const toggle = state.showModalAddon ? constants.HIDE_MODAL_ADDON : constants.SHOW_MODAL_ADDON;

    dispatch({ type: toggle });
}

  render() {
    const {state} = this.context;
    const { modalAddon } = state;
    const {
      post_title,
      post_content
    } = modalAddon;
    
    return (
      <Modal isOpen={state.showModalAddon}>
      <div>
      <img 
      className="pt-5 pb-2 mx-auto d-block" 
      src="https://forcealarm.interactiva.com.do/wp-content/uploads/2019/07/Logo-ForceAlarm.png" 
      width="125" />
      </div>
      <ModalBody className="text-center">
      <h4>{post_title}</h4>
      </ModalBody>
      <ModalBody className="text-center">
      <div dangerouslySetInnerHTML={{__html: post_content}} />
      </ModalBody>
      <ModalFooter className="text-center border-0">
      <Button color="danger" onClick={this.toggle}  className="mx-auto">Cerrar</Button>
      </ModalFooter>
      </Modal>
      )
    }
    
  }