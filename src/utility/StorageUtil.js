let ls = window.localStorage;
/**
 * Base Storage service.
 *
 * Used to interact with the browser's local storage.
 */
class StorageUtil {
  /**
   * Get an item from local storage by its key.
   *
   * @static
   * @param {string} key - Key of the item to retrieve.
   * @returns {object}
   * @memberof StorageUtil
   */
  static get(key) {
    return ls.getItem(key);
  }

  /**
   * Set the value of something in local storage by key.
   *
   * @static
   * @param {string} key - Key of the item to retrieve.
   * @param {object} value - Value being stored.
   * @returns {Function}
   * @memberof StorageUtil
   */
  static set(key, value) {
    return ls.setItem(key, value);
  }

  /**
   * Remove something from local storage by its key.
   *
   * @static
   * @param {string} key - Key of the item to retrieve.
   * @returns {Function}
   * @memberof StorageUtil
   */
  static remove(key) {
    return ls.removeItem(key);
  }
}

export default StorageUtil;
