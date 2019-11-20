import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ModalActions} from '../../actions';
import {GenUtil} from '../../utility';
import ChallengeGrid from '../Dashboard/ChallengeGrid';
import {ChallengeService, UserService} from '../../services';
import Avatar from '../Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReportButton from '../../assets/images/userprofile/report_btn.png';
import DonateButton from '../../assets/images/userprofile/donate_btn.png';
import FacebookButton from '../../assets/images/userprofile/facebook_btn.png';
import TwitchButton from '../../assets/images/userprofile/twitch_btn.png';
import PropTypes from 'prop-types';

const translate = GenUtil.translate;

class Profile extends Component {

  state = {
    challenges: [],
    user: {},
    loading: {
      user: true,
      challenges: true
    }
  };

  componentDidMount = () => {
    const {match: {params}} = this.props;
    this.fetchUser(params.user);
    this.fetchChallenges(params.user);
  }

  openReportModal = () => {
    this.props.setModalType('REPORT_USER');
    this.props.toggleModal();
  }

  openDonateModal = () => {
    this.props.setModalType('DONATE');
    this.props.toggleModal();
  }

  openSocial = (platform) => {
    if (platform === 'Facebook') {
      window.location.href = `http://www.facebook.com/${this.state.user.facebook}`;
    } else if (platform === 'Twitch') {
      window.location.href = `http://www.twitch.tv/${this.state.user.twitchUserName}`;
    }
  }

  fetchUser = async (id) => {
    try {
      const user = await UserService.getUserById(id);
      console.log('DEBUG USER', user);
      this.props.setUser(user);
      this.setState((prevState) => ({
        user,
        loading: {
          ...prevState.loading,
          user: false
        }
      }));
    } catch(error) {
      console.error(error);
    }
  }

  fetchChallenges = async (id) => {
    try {
      const challenges = await ChallengeService.getWonChallengesByUser(id);
      console.warn(challenges);
      this.setState({
        challenges
      });
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    let profileContent;

    if (this.state.loading.user) {
      profileContent = <CircularProgress/>;
    } else {
      let user = this.state.user;
      profileContent = (
      <>
        <div className='profile__avatar'>
          <Avatar avatar={ user.avatar }/>
        </div>
        <div className='profile__user-data'>
          <h2 className='profile__user-name'>{ user.username }</h2>
          <span className='profile__user-type'>{ user.userType ? user.userType.toUpperCase() : null }</span>
        </div>
        <div className='profile__user-socials'>
          {user.facebook ? <img
            className='profile__button-facebook'
            src={ FacebookButton }
            alt={ 'Facebook' }
            onClick={ () => this.openSocial('Facebook') }
          /> : null }

          {user.twitch ? <img
            className='profile__button-twitch'
            src={ TwitchButton }
            alt={ 'Twitch' }
            onClick={ () => this.openSocial('Twitch') }
          /> : null }
        </div>
        <div className='profile__buttons' >
          <img
            className='profile__button'
            src={ DonateButton }
            alt={ 'Donate' }
            onClick={ this.openDonateModal }
          />
          <img
            className='profile__button'
            src={ ReportButton }
            alt={ 'Report User' }
            onClick={ this.openReportModal }
          />
        </div>
    </>
      );
    }

    return (
      <>
      <div className='profile__info'>
        {profileContent}
      </div>
      <div className='dashboard__challenges'>
        <div className='dashboard__header'>
          <span className='dashboard__header-txt'>
            {translate('userProfile.challenges')}
            <span className='challenges'> {translate('userProfile.won')}</span>
          </span>
          <div className='dashboard__header-bar'>
            <div className='dashboard__header-bar--green'/>
          </div>
          <ChallengeGrid challenges={ this.state.challenges }/>
        </div>
      </div>
      </>
    );
  }
}

Profile.propTypes = {
  challenges: PropTypes.array
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal,
    setUser: ModalActions.selectModalUser
  },
  dispatch
);


export default connect(
  null,
  mapDispatchToProps
)(Profile);
