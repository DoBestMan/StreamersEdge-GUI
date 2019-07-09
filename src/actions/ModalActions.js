
import ActionTypes from './ActionTypes';


class ModalActions {

  static setModalType(modalType) {
    return {
      type: ActionTypes.MODAL_SET_TYPE,
      modalType: modalType
    };
  }

  static toggleModal() {
    return {
      type: ActionTypes.MODAL_TOGGLE
    };
  }
}

export default ModalActions;