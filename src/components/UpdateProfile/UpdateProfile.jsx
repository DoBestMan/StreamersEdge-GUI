import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from './MUI.css';
import {withStyles} from '@material-ui/core/styles';
import UserInfo from './UserInfo';
import AccountConnections from './AccountConnections';
import {ProfileService} from '../../services';
import {ModalActions, NavigateActions, AccountActions} from '../../actions';
import {ModalTypes} from '../../constants';
import {GenUtil, ValidationUtil} from '../../utility';
import {PeerplaysIcon, YoutubeIcon, TwitchIcon, FacebookIcon, PubgIcon, CancelButton} from '../../assets/images/updateProfile';
import SaveButton from '../../assets/images/preferences/Save.png';
const translate = GenUtil.translate;

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    const {twitchUsername, youtubeUsername, facebookUsername,peerplaysAccountName} = props;
    const path = this.props.location.pathname;
    const pathAry = path.split('/')[2];

    this.state = this.constructState(twitchUsername, youtubeUsername, facebookUsername, peerplaysAccountName,pathAry);
  }

  componentDidMount() {
    ProfileService.getProfile().then((res) => {
      this.props.setAccount(res);
    });
  }

  componentDidUpdate(prevProps) {

    if (this.props.account !== prevProps.account) {
      const {twitchUsername, youtubeUsername, facebookUsername, peerplaysAccountName} = this.props;
      const path = this.props.location.pathname;
      const pathAry = path.split('/')[2];
      this.setState(this.constructState(twitchUsername, youtubeUsername, facebookUsername, peerplaysAccountName,pathAry));
    }
  }

  constructState = (twitchUsername, youtubeUsername, facebookUsername, peerplaysAccountName,pathAry) => {
    return {
      currentStep: pathAry || '1',
      email: this.props.email || this.props.twitch || this.props.youtube || this.props.facebookUsername || '',
      emailValid: true,
      userType: this.props.userType || translate('createProfile.defaultAccountType'),

      connections: {

        peerplays: {
          header: translate('updateProfile.accountConnections.cryptoHeader'),
          connections: [
            {
              name: 'peerplays',
              username: peerplaysAccountName,
              headerIcon: PeerplaysIcon
            }
          ]
        },
        social: {//twitch, facebook, youtube
          header: translate('updateProfile.accountConnections.socialHeader'),
          connections: [
            {//twitch
              name: 'twitch',
              headerIcon: TwitchIcon,
              username: twitchUsername
            },
            {//facebook
              name: 'facebook',
              headerIcon: FacebookIcon,
              username: facebookUsername
            },
            {//youtube
              name: 'youtube',
              username: youtubeUsername,
              headerIcon: YoutubeIcon
            }
          ]
        },
        game: {//fortnite, pubg, league of legends
          header: translate('updateProfile.accountConnections.gameHeader'),
          headerLabel: translate('updateProfile.accountConnections.connectionSelect'),
          headerDescription: translate('updateProfile.accountConnections.connectionDescription'),

          connections: [
            {//pubg
              name: 'pubg',
              headerIcon: PubgIcon,
              bodyIcon: null,
              bodyUsername: ''
            }
          ]
        }
      }
    };
  }

  handleEmailChange = (email) => {
    const validation = ValidationUtil.seEmail(email).success;
    this.setState({email: email, emailValid: validation});
  }

  handleUserTypeChange = (userType) => {
    this.setState({userType: userType});
  }

  openLinkAccountModal = (authRoute) => {
    this.props.setModalType(ModalTypes.LINK_ACCOUNT);

    if(authRoute === 'youtube'){
      this.props.setModalData('google');
    } else {
      this.props.setModalData(authRoute);
    }

    this.props.toggleModal();
  }

  openUnlinkAccountModal = (authRoute) => {
    this.props.setModalType(ModalTypes.UNLINK_ACCOUNT);
    this.props.setModalData(authRoute);
    this.props.toggleModal();
  }

  closeLinkAccountModal = () => {
    this.props.toggleModal();
  }

  submitHandler = () => {
    const {email, userType} = this.state;
    let account = {userType: userType, email: email};

    ProfileService.updateProfile(account).then((res) => {
      this.props.setAccount(res);
      this.props.setModalType(ModalTypes.SUBMIT);
      this.props.setModalData({headerText: translate('updateProfile.userInfo.updatedSuccessfully'), subText: translate('preferences.modal.redirectClickHere'),
        redirect: '/dashboard', type: 'success'});
      this.props.toggleModal();
    }).catch(() => {
      this.props.setModalType(ModalTypes.SUBMIT);
      this.props.setModalData({headerText: translate('updateProfile.userInfo.updateFailed'), type: 'error'});
      this.props.toggleModal();
    });
  }

  render() {
    const {connections} = this.state;
    return (
      <div className='update-profile__wrapper'>
        <form className='update-profile-form' onSubmit={ this.handleSubmit }>
          <UserInfo handleEmailChange={ this.handleEmailChange } email={ this.state.email } handleUserTypeChange={ this.handleUserTypeChange } />
          <AccountConnections connections={ connections } openLinkAccountModal={ this.openLinkAccountModal } openUnlinkAccountModal={ this.openUnlinkAccountModal }
            closeLinkAccountModal={ this.closeLinkAccountModal } peerplaysAccountName = { this.props.peerplaysAccountName } />
          <img src={ CancelButton } alt='close button' className='update-profile__close-btn' onClick={ this.props.navigateToDashboard }/>
          <img src={ SaveButton } alt='save button' className='update-profile__save-btn' onClick={ this.submitHandler }/>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData,
    setAccount: AccountActions.setAccountAction,
    navigateToDashboard: NavigateActions.navigateToDashboard
  },
  dispatch
);

const mapStateToProps = (state) => ({
  account: state.getIn(['profiles', 'currentAccount']),
  username: state.getIn(['profiles', 'currentAccount','username']),
  email: state.getIn(['profiles', 'currentAccount', 'email']),
  userType: state.getIn(['profiles', 'currentAccount', 'userType']),
  twitchUsername: state.getIn(['profiles', 'currentAccount', 'twitchUserName']),
  youtubeUsername: state.getIn(['profiles', 'currentAccount', 'googleName']),
  facebookUsername: state.getIn(['profiles', 'currentAccount', 'facebook']),
  peerplaysAccountName: state.getIn(['profiles','currentAccount','peerplaysAccountName']),
  twitch: state.getIn(['profiles', 'currentAccount', 'twitch']),
  youtube: state.getIn(['profiles', 'currentAccount', 'youtube'])
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateProfile));
