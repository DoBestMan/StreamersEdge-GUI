import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from './MUI.css';
import {withStyles} from '@material-ui/core/styles';
import UserInfo from './UserInfo';
import AccountConnections from './AccountConnections';
import {ModalActions} from '../../actions';
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
import {GenUtil} from '../../utility';
const translate = GenUtil.translate;
// import AccountActions from '../../actions/AccountActions';
// import {bindActionCreators} from 'redux';

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
      email: this.props.email || this.props.twitch || this.props.youtube || this.props.facebook || '',
      userType: '',
      errors: {
        email: ''
      },
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
              name: 'youtube',
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
    this.setState({email: email});
  }

  handleUserTypeChange = (userType) => {
    this.setState({userType: userType});
  }

  setStep = (currentStep) => {
    this.props.history.push('/profile/'+currentStep);
    this.setState({currentStep});
  }

  validation = (type) => {
    switch (type) {
      case 'email':
        this.setState({
          errors: {
            ...this.state.errors
          }
        });
        break;
      default:
        return;
    }
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

  render() {
    const {errors, connections, currentStep} = this.state;
    return (
      <div className='update-profile__wrapper'>
        <form className='update-profile' onSubmit={ this.handleSubmit }>
          <div className='update-profile__header'>
            { translate('createProfile.header') }
          </div>
          {currentStep === '1' ?
            <UserInfo handleEmailChange={ this.handleEmailChange } handleUserTypeChange={ this.handleUserTypeChange } validation={ this.validation } errors={ errors }/>
            :
            <AccountConnections connections={ connections } openLinkAccountModal={ this.openLinkAccountModal } openUnlinkAccountModal={ this.openUnlinkAccountModal }
              closeLinkAccountModal={ this.closeLinkAccountModal }/>
          }
        </form>
        <ProfileFooter currentStep={ currentStep } setStep={ this.setStep }/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData
  },
  dispatch
);

const mapStateToProps = (state) => ({
  account: state.getIn(['profiles', 'currentAccount']),
  emailUsername: state.getIn(['profiles', 'currentAccount', 'email']),
  userType: state.getIn(['profiles', 'currentAccount', 'userType']),
  twitchUsername: state.getIn(['profiles', 'currentAccount', 'twitchUserName']),
  youtubeUsername: state.getIn(['profiles', 'currentAccount', 'googleName']),
  facebookUsername: state.getIn(['profiles', 'currentAccount', 'facebook'])
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateProfile));
