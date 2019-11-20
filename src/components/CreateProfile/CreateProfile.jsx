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
import ProfileFooter from './ProfileFooter';
import {
  facebookBox,
  twitchBox,
  youtubeBox,
  facebookIcon,
  twitchIcon,
  youtubeIcon,
  fortniteBox,
  pubgBox,
  leagueBox,
  fortniteIcon,
  pubgIcon,
  leagueIcon
} from '../../assets/images/profile';
import {GenUtil, ValidationUtil} from '../../utility';
const translate = GenUtil.translate;

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    const {twitchUsername, youtubeUsername, facebookUsername} = props;
    const path = this.props.location.pathname;
    const pathAry = path.split('/')[2];

    this.state = this.constructState(twitchUsername, youtubeUsername, facebookUsername, pathAry);
  }

  componentDidUpdate(prevProps) {

    if (this.props.account !== prevProps.account) {
      const {twitchUsername, youtubeUsername, facebookUsername} = this.props;
      const path = this.props.location.pathname;
      const pathAry = path.split('/')[2];
      this.setState(this.constructState(twitchUsername, youtubeUsername, facebookUsername, pathAry));
    }
  }

  constructState = (twitchUsername, youtubeUsername, facebookUsername, pathAry) => {
    return {
      currentStep: pathAry || '1',
      email: this.props.email || this.props.twitch || this.props.youtube || this.props.facebookUsername || '',
      emailValid: true,
      userType: this.props.userType || translate('createProfile.defaultAccountType'),

      connections: {
        social: {//twitch, facebook, youtube
          header: translate('updateProfile.accountConnections.socialHeader'),
          headerLabel: translate('updateProfile.accountConnections.connectionSelect'),
          headerDescription: translate('updateProfile.accountConnections.connectionDescription'),

          connections: [
            {//twitch
              name: 'twitch',
              headerIcon: twitchBox,
              bodyIcon: twitchIcon,
              bodyUsername: twitchUsername
            },
            {//facebook
              name: 'facebook',
              headerIcon: facebookBox,
              bodyIcon: facebookIcon,
              bodyUsername: facebookUsername
            },
            {//youtube
              name: 'google',
              headerIcon: youtubeBox,
              bodyIcon: youtubeIcon,
              bodyUsername: youtubeUsername
            }
          ]
        },
        game: {//fortnite, pubg, league of legends
          header: translate('updateProfile.accountConnections.gameHeader'),
          headerLabel: translate('updateProfile.accountConnections.connectionSelect'),
          headerDescription: translate('updateProfile.accountConnections.connectionDescription'),

          connections: [
            {//fortnite
              name: 'fortnite',
              headerIcon: fortniteBox,
              bodyIcon: fortniteIcon,
              bodyUsername: ''
            },
            {//pubg
              name: 'pubg',
              headerIcon: pubgBox,
              bodyIcon: leagueIcon,
              bodyUsername: ''
            },
            {//league of legends
              name: 'league',
              headerIcon: leagueBox,
              bodyIcon: pubgIcon,
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

  setStep = (currentStep) => {
    this.props.history.push('/profile/'+currentStep);
    this.setState({currentStep});
  }

  openLinkAccountModal = (authRoute) => {
    this.props.setModalType(ModalTypes.LINK_ACCOUNT);
    this.props.setModalData(authRoute);
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

  submitStep1 = () => {
    const {email, userType} = this.state;
    let account = {userType: userType, email: email};

    if(email === this.props.email) { //email has not been changed, we can go to step 2
      ProfileService.updateProfile(account).then((res) => {
        this.props.setAccount(res);
        this.setState({currentStep: '2'});
      });
    } else { //changed email means we cannot go to step 2 until email has been confirmed
      ProfileService.updateProfile(account).then((res) => {
        this.props.setAccount(res);
        this.props.setModalType(ModalTypes.SUBMIT);
        this.props.toggleModal();
        this.props.setModalData({headerText: translate('createProfile.modal.header'), subText: translate('createProfile.modal.subText')});
      });
    }
  }

  render() {
    const {connections, currentStep, userType, emailValid} = this.state;
    return (
      <div className='create-profile__wrapper'>
        <form className='create-profile' onSubmit={ this.handleSubmit }>
          <div className='create-profile__header'>
            { translate('createProfile.header') }
          </div>
          {currentStep === '1' ?
            <UserInfo handleEmailChange={ this.handleEmailChange } email={ this.state.email } handleUserTypeChange={ this.handleUserTypeChange } userType={ userType } />
            :
            <AccountConnections connections={ connections } openLinkAccountModal={ this.openLinkAccountModal } openUnlinkAccountModal={ this.openUnlinkAccountModal }
              closeLinkAccountModal={ this.closeLinkAccountModal }/>
          }
        </form>
        <ProfileFooter currentStep={ currentStep } setStep={ this.setStep } submitStep1={ this.submitStep1 }
          navigateToDashboard={ this.props.navigateToDashboard } disabled={ !emailValid }/>
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
  email: state.getIn(['profiles', 'currentAccount', 'email']),
  userType: state.getIn(['profiles', 'currentAccount', 'userType']),
  twitchUsername: state.getIn(['profiles', 'currentAccount', 'twitchUserName']),
  youtubeUsername: state.getIn(['profiles', 'currentAccount', 'googleName']),
  facebookUsername: state.getIn(['profiles', 'currentAccount', 'facebook']),
  twitch: state.getIn(['profiles', 'currentAccount', 'twitch']),
  youtube: state.getIn(['profiles', 'currentAccount', 'youtube'])
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateProfile));
