import React, {Component} from 'react';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, RadioGroup, FormControl, FormControlLabel, TextField, FormLabel} from '@material-ui/core';
import CustomRadioButton from '../CustomRadioButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import inviteIcon from '../../../assets/images/preferences/Mail.png';
import Add from '../../../assets/images/preferences/Add.png';
import Close from '../../../assets/images/preferences/X.png';
import Close_Over from '../../../assets/images/preferences/X_Over.png';
import {withStyles} from '@material-ui/core/styles';
import styles from '../MUI.css';
import {translate} from '../../../../src/utility/GeneralUtils';

class InvitesForm extends Component {
    state = {user: ''}

  addUser = () => {
    const {user} = this.state;
    const {userList, userWhitelist, addUser, setError} = this.props;

    let userExists= userList.find((usr) => {
      return usr.username === user;
    });

    if(userExists && !userWhitelist.includes(user)) {
      addUser(this.state.user);
      setError('userSearch', null);
      this.setState({user: ''});
    } else if(userWhitelist.includes(user)){
      setError('userSearch', translate('preferences.invites.errors.alreadyAdded'));
    } else {
      setError('userSearch', translate('preferences.invites.errors.notFound'));
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  radioButtonChange = (event) => {

    if(this.props.inviteType !== '2') {
      this.setState({user: ''});
      this.props.setError('userSearch', null);
    }

    this.props.handleChange(event);
  }

  renderUserSearch() {
    const {classes, userWhitelist, errors} = this.props;
    return (
      <>
        <div className='userSearch'>
          <TextField
            name='user'
            placeholder={ translate('preferences.invites.searchUsersPlaceholder') }
            variant='outlined'
            value={ this.state.user }
            onChange={ this.handleChange }
            className={ 'userSearch__textbox' }
            InputProps={ {
              classes: {
                input: classes.userSearchTextbox, notchedOutline: classes.textboxBorder
              }
            } }
          />
          <img src={ Add } onClick={ this.addUser } alt=''/>
        </div>
        <FormLabel className={ 'errorLabel' } shrink error={ true }>{errors.userSearch}</FormLabel>
        {userWhitelist.length > 0 ?
          <div>
            {userWhitelist.map((user, index) => (
              <div className='whitelistedUsers' key={ index }>
                <p className='whitelistedUsers__text'>{user}</p>
                <img className='whitelistedUsers__image' src={ Close } onClick={ this.props.removeUser.bind(this, index, user) }
                  onMouseOver={ (e) => e.currentTarget.src = Close_Over } onMouseOut={ (e) => e.currentTarget.src = Close } alt='' />
              </div>
            ))}
          </div>
          :
          null
        }
      </>
    );
  }

  render() {
    const {classes, inviteType} = this.props;
    return (
      <div className='invites'>
        <ExpansionPanel className={ classes.expansion } defaultExpanded>
          <ExpansionPanelSummary
            expandIcon={ <ExpandMoreIcon className='expand-icon'/> }
            aria-controls='panel1a-content'
            id='panel1a-header'
            classes={ {content: classes.header} }
          >
            <img className='invites__image' src={ inviteIcon } alt=''/>
            <p className='invites__text'>{translate('preferences.invites.header')}</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className='invites__details'>
            <FormControl component='fieldset'>
              <RadioGroup
                aria-label='invite type'
                name='inviteType'
                className={ 'radio-group' }
                value={ inviteType }
                defaultValue='1'
                onChange={ this.radioButtonChange }
              >
                <FormControlLabel classes={ {label: classes.label} } value='1' control={ <CustomRadioButton /> } label={ translate('preferences.invites.option1') } />
                <FormControlLabel classes={ {label: classes.label} } value='2' control={ <CustomRadioButton /> } label={ translate('preferences.invites.option2') } />
                {inviteType === '2' ? <FormControlLabel className='search-column' name='user' control={ this.renderUserSearch() } /> : null}
                <FormControlLabel classes={ {label: classes.label} } value='3' control={ <CustomRadioButton /> } label={ translate('preferences.invites.option3') } />
                <FormControlLabel classes={ {label: classes.label} } value='4' control={ <CustomRadioButton /> } label={ translate('preferences.invites.option4') } />
              </RadioGroup>
              <div className='bounty'>
                <p className='bounty__text'>{ translate('preferences.invites.bounty') }</p>
                <TextField
                  placeholder={ translate('preferences.invites.bountyPlaceholder') }
                  type='number'
                  variant='outlined'
                  className={ 'bounty__textbox' }
                  InputProps={ {
                    classes: {
                      input: classes.bountyTextbox, notchedOutline: classes.textboxBorder
                    }
                  } }
                />
                <p className='bounty__text'> { translate('preferences.invites.ppy') } </p>
              </div>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(InvitesForm);
