import ActionTypes from './ActionTypes';
import {Action} from 'redux';


/**
 * Public actions related to ErrorBox actions.
 *
 * @class ErrorBoxActions
 */
class ErrorBoxActions {
  /**
   * Call to update redux to show ErrorBox.
   *
   * @static
   * @param {boolean} visibility - Boolean to show the errorbox.
   * @param {Array} validationConditions - An array of object of type [{errorString and success}].
   * @param {object} position - An object having position of the parent element.
   * @returns {Action}
   * @memberof ErrorBoxActions
   */
  static setErrorBox(visibility, validationConditions, position){
    return {
      type: ActionTypes.ERRORBOX_SET_ERRORBOX,
      payload : {
        visibility: visibility,
        validationConditions: validationConditions,
        position: position
      }
    };
  }
  /**
   * Call to update redux to hide ErrorBox.
   *
   * @static
   * @returns {Action}
   * @memberof ErrorBoxActions
   */
  static hideErrorBox(){
    return{
      type: ActionTypes.ERRORBOX_HIDE_ERRORBOX
    };
  }
}

export default ErrorBoxActions;
