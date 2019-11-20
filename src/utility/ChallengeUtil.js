/**
 * Challenge Utilities.
 *
 */
class ChallengeUtil {
  /**
   * Takes an array of challenges and filters out the empty ones.
   *
   * @static
   * @param {Array} challenges - Array of challenges.
   * @returns {Array}
   * @memberof StorageUtil
   */
  static getJoinedChallenges(challenges) {
    return challenges;
  }

  /**
   * Takes a raw challenge date and formats it to be used in a card.
   *
   * @static
   * @param {string} challengeDate - Raw challenge date.
   * @returns {string}
   * @memberof StorageUtil
   */
  static formatDate(challengeDate) {
    const formattedDate = new Date(challengeDate);
    return `Ending ${formattedDate.toDateString()}`;
  }
}

export default ChallengeUtil;
