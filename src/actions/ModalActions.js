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

  /**
   * Allows for passing of data to the modal: E.G modal content such as text.
   *
   * @static
   * @param {string} data - The data to be passed in to the modal.
   * @returns {Action}
   * @memberof ModalActions
   */
  static setModalData(data) {
    return {type: ActionTypes.MODAL_SET_DATA, modalData: data};
  }
}

export default ModalActions;