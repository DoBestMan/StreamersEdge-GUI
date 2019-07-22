import React, {Component} from 'react';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, RadioGroup, FormControl, FormControlLabel} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BellIcon from '../../../assets/images/preferences/Bell.png';
import CustomRadioButton from '../CustomRadioButton';
import styles from '../MUI.css';
import {withStyles} from '@material-ui/core/styles';
import {translate} from '../../../../src/utility/GeneralUtils';

class NotificationsForm extends Component {

  render() {
    const {classes, notificationType} = this.props;
    return(
      <div className='notifications'>
        <ExpansionPanel className={ classes.expansion } defaultExpanded>
          <ExpansionPanelSummary
            expandIcon={ <ExpandMoreIcon className='expand-icon'/> }
            aria-controls='panel1a-content'
            id='panel1a-header'
            classes={ {content: classes.header} }
          >
            <img className='notifications__image' src={ BellIcon } alt=''/>
            <p className='notifications__text'>{ translate('preferences.notifications.header') }</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className='details'>
            <FormControl component='fieldset'>
              <RadioGroup
                aria-label='notification type'
                name='notificationType'
                className={ 'radio-group' }
                value={ notificationType }
                defaultValue='1'
                onChange={ this.props.handleChange }
              >
                <FormControlLabel classes={ {label: classes.label} } value='1' control={ <CustomRadioButton /> } label={ translate('preferences.notifications.option1') } />
                <FormControlLabel classes={ {label: classes.label} } value='2' control={ <CustomRadioButton /> } label={ translate('preferences.notifications.option2') } />
              </RadioGroup>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(NotificationsForm);