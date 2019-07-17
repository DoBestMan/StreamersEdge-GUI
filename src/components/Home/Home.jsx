import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ProfileService} from '../../services';
import {AccountActions} from '../../actions';
import {bindActionCreators} from 'redux';

class Home extends Component {
  // Redirect to dashboard, if the user is not logged in then they will go to the login page instead.
  componentDidMount() {
    ProfileService.getProfile().then((profile) => {
      this.props.setAccount(profile);
      this.props.setLoggedIn(true);
      this.props.history.push('/dashboard');
    });
  }

  handleChange = (val) => {
    this.setState({inputValue: val});
  };

  render() {
    return (
      <div className='code-me'>
        <div className='inputs-center'>
          <p />
          <p />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setLoggedIn: AccountActions.setIsLoggedInAction,
    setAccount: AccountActions.setAccountAction
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(Home);
