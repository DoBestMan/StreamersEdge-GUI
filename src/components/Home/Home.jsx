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

  testModal = (type) => {
    this.props.setModalType(type);
    this.props.toggleModal();
  }


  render() {
    return (
      <>
        <div className='home'><div className='lorem'>{translate('lorem')}</div></div>
        <div onClick={ () => this.testModal('REPORT_USER') }>Test Report Modal</div>
        <div onClick={ () => this.testModal('DONATE')  }>Test Donate</div>
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
