
/**
 * Token Util Functions.
 *
 * @namespace TokenUtil
 */
//TODO: Create a more robust client side Token verification system.

const TokenUtil = {
  /**
   * Verify if the URL format is constructed properly. Ensures there is nothing extra appeneded to the path.
   *
   * @param {string} path - The URL to check.
   * @returns {string} True or False depending on the reuslt.
   * @memberof TokenUtil
   */

  checkUrlLength(path) {
    const urlAry = path.split('/');

    if (urlAry.length === 4) {
      return true;
    }

    return false;
  }

};

export default TokenUtil;