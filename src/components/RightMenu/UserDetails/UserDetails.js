import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from '../../Avatar';

class UserDetails extends Component {
  render() {
    const {avatar, username} = this.props;

    return (
      <>
        <div className='user-details'>
          <Avatar avatar={ avatar } user={ username }/>
          <div className='user-details-content'>
            <div className='user-details-content__name'>{ username }</div>
            <div className='user-details-content__following'>
              200k Followers 1 Following
            </div>
            <div className='user-details-content__wallet'>
              Wallet:
              <span className='user-details-content__wallet__white'>1,500 USD</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.getIn(['profiles', 'currentAccount', 'avatar']),
  username: state.getIn(['profiles', 'currentAccount', 'username'])
});

export default connect(
  mapStateToProps,
  null
)(UserDetails);
