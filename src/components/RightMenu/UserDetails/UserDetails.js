import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from '../../Avatar';
import Config from '../../../utility/Config';

class UserDetails extends Component {

  state = {
    balance: 0
  }

  componentDidUpdate(prevProps) {
    if(this.props.peerplaysAccount !== prevProps.peerplaysAccount) {
      this.setState({
        balance: this.props.peerplaysAccount ? this.getBalanceByAsset() : 0
      });
    }
  }

  getBalanceByAsset() {
    const asset = Config.sUSD;
    const balance = this.props.peerplaysAccount.getIn(['balances']);

    for (let i=0; i<balance.size; i++) {

      if (balance.getIn([i, 'asset_type']) === asset) {
        return this.formatBalance(balance.getIn([i, 'balance']));
      }
    }

    return '0';//no asset match
  }

  formatBalance(unformatedBalance) {
    const balancePrecision = this.props.balancePrecision;
    const balance = (unformatedBalance/Math.pow(10,balancePrecision));

    return balance;
  }

  render() {
    const {avatar, username} = this.props;

    return (
      <>
        <div className='user-details'>
          <Avatar avatar={ avatar } user={ username }/>
          <div className='user-details-content'>
            <div className='user-details-content__name'>{ username }</div>
            <div className='user-details-content__wallet'>
              <span>Wallet: {this.state.balance} sUSD</span>
              <span className='user-details-content__wallet__white'></span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.getIn(['profiles', 'currentAccount', 'avatar']),
  username: state.getIn(['profiles', 'currentAccount', 'username']),
  peerplaysAccount: state.getIn(['peerplays', 'account']),
  balancePrecision: state.getIn(['peerplays','balancePrecision'])
});

export default connect(
  mapStateToProps,
  null
)(UserDetails);
