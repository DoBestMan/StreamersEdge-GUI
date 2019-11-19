import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from '../../Avatar';
import Config from '../../../utility/Config';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';

class UserDetails extends Component {

  state = {
    balance: 0,
    isTooltipOpen: false,
    isEllipsisActive: false
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

  componentDidMount() {
    const domUsername = this.refs.detailsUsername;
    const isEllipsisActive = this.isEllipsisActive(domUsername);

    this.setState({isEllipsisActive: isEllipsisActive});
  }

  isEllipsisActive(e) {
    return (e.offsetWidth < e.scrollWidth);
  }

  handleTooltipClose = () => {
    this.setState({isTooltipOpen: false});
  };

  handleTooltipOpen = () => {
    if(this.state.isEllipsisActive) {
      this.setState({isTooltipOpen: true});
    }
  }

  render() {
    const {avatar, username} = this.props;
    return (
      <>
        <div className='user-details'>
          <Avatar avatar={ avatar } user={ username }/>
          <div className='user-details-content'>
            <Tooltip open={ this.state.isTooltipOpen } onOpen={ this.handleTooltipOpen } onClose={ this.handleTooltipClose } title={ username } placement='top-start'>
              <div className='user-details-content__name' ref='detailsUsername' >{ username }</div>
            </Tooltip>
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
)(withStyles(styles)(UserDetails));
