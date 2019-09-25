import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CustomRadioButton from '../CustomRadioButton';
import SearchForm from '../SearchForm';
import {translate} from '../../../../src/utility/GeneralUtils';

import inviteIcon from '../../../assets/images/preferences/Mail.png';
import styles from '../MUI.css';

class InvitesForm extends Component {
  radioButtonChange = (event) => {

    if(this.props.inviteType !== '2') {
      this.setState({user: ''});
      this.props.setError('userSearch', null);
    }

    this.props.handleChange(event);
  }

  getUsernameList = () => {
    const {userList} = this.props;

    return userList.map((user) => {
      return user.username;
    });
  }

  render() {
    const {
      classes,
      inviteType,
      userWhiteList,
      gameWhiteList,
      gameList,
      errors,
      setError,
      addUser,
      removeUser,
      addGame,
      removeGame
    } = this.props;

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
                defaultValue='0'
                onChange={ this.radioButtonChange }
              >
                <FormControlLabel classes={ {label: classes.label} } value='0' control={ <CustomRadioButton /> } label={ translate('preferences.invites.option1') } />
                <FormControlLabel classes={ {label: classes.label} } value='1' control={ <CustomRadioButton /> } label={ translate('preferences.invites.option2') } />
                {inviteType === '1' ?
                  <FormControlLabel
                    className='search-column'
                    name='user'
                    control={
                      <SearchForm
                        type='user'
                        classes={ classes }
                        errors={ errors }
                        list={ this.getUsernameList() }
                        whiteList={ userWhiteList }
                        addToList={ addUser }
                        removeFromList={ removeUser }
                        setError={ setError }
                      />
                    }
                  /> :
                  null
                }
                <FormControlLabel classes={ {label: classes.label} } value='2' control={ <CustomRadioButton /> } label={ translate('preferences.invites.option3') } />
                {inviteType === '2' ?
                  <FormControlLabel
                    className='search-column'
                    name='game'
                    control={
                      <SearchForm
                        type='game'
                        classes={ classes }
                        errors={ errors }
                        list={ gameList }
                        whiteList={ gameWhiteList }
                        addToList={ addGame }
                        removeFromList={ removeGame }
                        setError={ setError }
                      />
                    }
                  /> :
                  null
                }
                <FormControlLabel classes={ {label: classes.label} } value='3' control={ <CustomRadioButton /> } label={ translate('preferences.invites.option4') } />
              </RadioGroup>
              {inviteType !== '3' && (
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
              )}
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(InvitesForm);
