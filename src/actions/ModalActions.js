import ActionTypes from './ActionTypes';
import {Action} from 'redux';

/**
 * Public actions related to Modals.
 *
 * @class ModalActions
 */
class ModalActions {
  /**
   * Change the type of modal to display.
   * Valid types are in ModalTypes.js.
   *
   * @static
   * @param {string} modalType - See ModalTypes.js.
   * @returns {Action}
   * @memberof ModalActions
   */
  static setModalType(modalType) {
    return {type: ActionTypes.MODAL_SET_TYPE, modalType: modalType};
  }

  /**
   * Toggles the display of the modal component.
   *
   * @static
   * @returns {Action}
   * @memberof ModalActions
   */
  static toggleModal() {
    return {type: ActionTypes.MODAL_TOGGLE};
  }
}

export default ModalActions;