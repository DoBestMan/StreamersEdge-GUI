let ls = window.localStorage;
/**
 * Base Storage service
 *
 * Used to interact with the browser's local storage.
 */
class StorageUtil {
  // Generic storage get
  static get(key) {
    return ls.getItem(key);
  }

  static set(key, value) {
    return ls.setItem(key, value);
  }

  static remove(key) {
    return ls.removeItem(key);
  }
}

export default StorageUtil;
