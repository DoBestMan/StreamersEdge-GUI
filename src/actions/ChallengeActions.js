import ActionTypes from './ActionTypes';
import {Action} from 'redux';

/**
 * Public actions related to Challenge actions.
 *
 * @class ChallengeActions
 */

class ChallengeActions {
  /**
   * Call to update redux with a full list of challenges.
   *
   * @static
   * @param {Map} challenges - Key value pair where the key is the challenge id and the value is the challenge object.
   * @returns {Action}
   * @memberof ChallengeActions
   */
  static setChallengeAction(challenges) {
    return {
      type: ActionTypes.CHALLENGE_SET_CHALLENGES,
      payload: {
        challenges: challenges
      }
    };
  }
}

export default ChallengeActions;