import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AppActions from '../../actions/AppActions';
import ProfileService from '../../services/ProfileService';
import {bindActionCreators} from 'redux';

class Dashboard extends Component {

  getProfile = () => {
    ProfileService.getProfile().then((profile) => {
      console.log(profile);
    }).catch((e) => {
      console.warn(e);
    });
  }

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    return(
      <>
        <span className='dashboard'>Dashboard component</span>
        <Button variant='outlined' color='secondary' onClick={ this.handleLogout }>
        Logout
        </Button>
        <Button variant='outlined' color='primary' onClick={ this.getProfile }>
        Get Profile
        </Button>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({logout: AppActions.logout}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);