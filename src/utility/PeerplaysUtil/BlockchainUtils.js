class BlockchainUtils {
  /**
   * Gets the current time on the blockchain.
   *
   * @param {Date} timeString - Instance of chain store.
   * @returns {Date} Date on the blockchain.
   */
  static blockchainTimeStringToDate(timeString) {
    let time = timeString;

    if (!timeString) {
      return new Date('1970-01-01T00:00:00.000Z');
    }

    // does not end in Z
    // https://github.com/cryptonomex/graphene/issues/368
    if (!/Z$/.test(timeString)) {
      time += 'Z';
    }

    return new Date(time);
  }
}

export default BlockchainUtils;
