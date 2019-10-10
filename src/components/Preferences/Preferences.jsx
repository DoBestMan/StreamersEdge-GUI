import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from '@material-ui/core';

import InvitesForm from './InvitesForm';
import NotificationsForm from './NotificationsForm';
import preferences from '../../assets/images/preferences/Settings.png';

import {ModalTypes} from '../../constants';
import {GenUtil} from '../../../src/utility';
import {AuthService, UserService, ProfileService} from '../../services';
import {AccountActions, ModalActions} from '../../actions';

const translate = GenUtil.translate;

const INVITATIONS = [
  'all',
  'users',
  'games',
  'none'
];

class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inviteType: INVITATIONS.indexOf(this.props.invitations).toString(),
      userWhiteList: [],
      userList: [],
      gameList: ['fortnite', 'pubg'],
      gameWhiteList: [],
      notificationType: this.props.notifications ? '1' : '2',
      errors: {
        search: null,
        save: null
      }
    };
  }

  componentDidMount = () => {
    AuthService.getUserList().then((res) => {
      this.setState({userList: res});
    });
  }

  setError = (name, err) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: err
      }});
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSave = () => {
    // Update invitation
    UserService
      .updateInvitation({
        invitations: INVITATIONS[+this.state.inviteType],
        users: this.state.userWhiteList.map((user) => {
          const findUser = this.state.userList.find((usr) => {
            return usr.username === user;
          });

          return findUser.id;
        }),
        games: this.state.gameWhiteList
      })
      .then((res) => {
        console.log('Update invitation successfully', res);

        // Update notification
        UserService
          .updateNotification((this.state.notificationType || '1') === '1')
          .then((res) => {
            console.log('Update notification successfully', res);

            ProfileService
              .getProfile()
              .then((profile) => {
                this.props.setAccount(profile);
                this.props.setModalType(ModalTypes.SUBMIT);
                this.props.toggleModal();
                this.props.setModalData({headerText: translate('preferences.modal.successHeader'), type: 'success'});
              })
              .catch((err) => {
                console.log('Get profile failed', err);
              });
          })
          .catch((err) => {
            console.log('Update notification failed', err);
          });
      })
      .catch((err) => {
        this.props.toggleModal();
        this.props.setModalType(ModalTypes.SUBMIT);
        this.props.setModalData({headerText: translate('preferences.modal.errorHeader'), subText: translate('preferences.modal.errorSubText'), type: 'error'});
        console.log('Update invitation failed', err);
      });
  }

  addUser = (user) => {
    this.setState({userWhiteList: [...this.state.userWhiteList, user]});
  }

  removeUser = (user) => {
    this.setState({
      userWhiteList: [
        ...this.state.userWhiteList.slice(0, user),
        ...this.state.userWhiteList.slice(user + 1)
      ]
    });
  }

  addGame = (game) => {
    this.setState({gameWhiteList: [...this.state.gameWhiteList, game]});
  }

  removeGame = (game) => {
    this.setState({
      gameWhiteList: [
        ...this.state.gameWhiteList.slice(0, game),
        ...this.state.gameWhiteList.slice(game + 1)
      ]
    });
  }

  render() {
    const {
      inviteType,
      userWhiteList,
      userList,
      gameList,
      gameWhiteList,
      notificationType,
      errors
    } = this.state;

    return (
      <div className='preferences'>
        <div className='preferences__header'>
          <img className='preferences__image' src={ preferences } alt=''/>
          <p> {translate('preferences.header')}</p>
        </div>

        <InvitesForm
          inviteType={ inviteType }
          userWhiteList={ userWhiteList }
          userList={ userList }
          errors={ errors }
          addUser={ this.addUser }
          removeUser={ this.removeUser }
          gameList={ gameList }
          gameWhiteList={ gameWhiteList }
          addGame={ this.addGame }
          removeGame={ this.removeGame }
          handleChange={ this.handleChange }
          setError={ this.setError }
        />

        <NotificationsForm
          notificationType={ notificationType }
          handleChange={ this.handleChange }
        />

        <div className='form-buttons'>
          <Button className='button-cancel'> </Button>
          <Button className='button-save' onClick={ this.handleSave }> </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.getIn(['profiles', 'currentAccount', 'notifications']),
  invitations: state.getIn(['profiles', 'currentAccount', 'invitations']),
  account: state.getIn(['profiles', 'currentAccount'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setAccount: AccountActions.setAccountAction,
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences);
