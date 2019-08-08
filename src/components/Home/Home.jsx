import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ProfileService} from '../../services';
import {AccountActions, NavigateActions, ModalActions} from '../../actions';
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

  testModal = () => {
    this.props.setModalType('REPORT_USER');
    this.props.toggleModal();
  }

  render() {
    return (
      <>
        <div className='home'><div className='lorem'>{translate('lorem')}</div></div>
        <span onClick={ this.testModal }>Test Report Modal</span>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setLoggedIn: AccountActions.setIsLoggedInAction,
    setAccount: AccountActions.setAccountAction,
    navigateToRoot: NavigateActions.noValidPathRedirect,
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(Home);
