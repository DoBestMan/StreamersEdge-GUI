import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '@material-ui/core/Button';
import AppActions from '../../actions/AppActions';

class Dashboard extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <>
        <span className='dashboard'>Dashboard component</span>
        <Button variant='outlined' color='secondary' onClick={ this.handleLogout }>
          Logout
        </Button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    logout: AppActions.logout
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
