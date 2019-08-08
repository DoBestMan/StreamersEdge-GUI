import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import preferences from '../../assets/images/preferences/settings.png';
import InvitesForm from './InvitesForm';
import NotificationsForm from './NotificationsForm';
import {GenUtil} from '../../../src/utility';
import AuthService from '../../services/AuthService';

const translate = GenUtil.translate;
class Preferences extends Component {
  constructor() {
    super();

    this.state = {
      inviteType: null,
      userWhitelist: [],
      userList: [],
      notificationType: null,
      errors: {
        userSearch: null,
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

  addUser = (user) => {
    this.setState({userWhitelist: [...this.state.userWhitelist, user]});
  }

  removeUser = (user, index) => {
    this.setState({userWhitelist: this.state.userWhitelist.filter((user) => {
      return user !== index;
    })});
  }

  render() {
    const {inviteType, userWhitelist, userList, notificationType, errors} = this.state;
    return (
      <div className='preferences'>
        <div className='preferences__header'>
          <img className='preferences__image' src={ preferences } alt=''/>
          <p> {translate('preferences.header')}</p>
        </div>

        <InvitesForm inviteType={ inviteType } userWhitelist={ userWhitelist } userList={ userList } errors={ errors }
          addUser={ this.addUser } removeUser={ this.removeUser } handleChange={ this.handleChange } setError={ this.setError }/>
        <NotificationsForm notificationType={ notificationType } handleChange={ this.handleChange }/>

        <div className='form-buttons'>
          <Button className='button-cancel'> </Button>
          <Button className='button-save'> </Button>
        </div>
      </div>
    );
  }
}

export default Preferences;