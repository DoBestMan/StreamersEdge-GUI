import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ProfileService} from '../../services';
import {AccountActions, NavigateActions} from '../../actions';
import {GenUtil} from '../../utility';
const translate = GenUtil.translate;

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
      <>
        <div className='home'><div className='lorem'>{translate('lorem')}</div></div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setLoggedIn: AccountActions.setIsLoggedInAction,
    setAccount: AccountActions.setAccountAction,
    navigateToRoot: NavigateActions.noValidPathRedirect
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(Home);
