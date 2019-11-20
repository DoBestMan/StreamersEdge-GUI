import React, {Component} from 'react';
import {format} from 'date-fns';
import {withStyles} from '@material-ui/core/styles';
import {Grid, FormControlLabel, Checkbox} from '@material-ui/core';
import DatePicker from 'react-datepicker';

import {GenUtil} from '../../../utility';
import DateInput from './DateInput';
import styles from './Mui.css';

const trans = GenUtil.translate;

class DateForm extends Component {
  state = {
    showStartDate: false,
    showEndDate: false,
    today: new Date()
  };

  toggleStartDate = () => {
    this.setState({
      showStartDate: !this.state.showStartDate
    });
  }

  toggleEndDate = () => {
    this.setState({
      showEndDate: !this.state.showEndDate
    });
  }

  handleChangeStartDate = (date) => {
    this.toggleStartDate();
    this.props.onChange('startDate', date);
  }

  handleChangeEndDate = (date) => {
    this.toggleEndDate();
    this.props.onChange('endDate', date);
  }

  handleChangeCheckbox = (event) => {
    this.props.onChange('isUndefinedEndDate', event.target.checked);
  }

  render() {
    const {classes} = this.props;

    return (
      <>
        <div className='date-form'>
          <Grid container>
            <Grid item xs={ 6 }>
              <div className='date-form__wrapper'>
                <div className='date-form__group'>
                  <label className='date-form__label'>
                    {trans('createChallenge.date.startDate')}
                  </label>
                  <DateInput
                    value={ format(this.props.startDate, 'MMMM d, y h:mm aa') }
                    onFocus={ this.toggleStartDate }
                  />
                </div>
                {this.state.showStartDate && (
                  <DatePicker
                    inline
                    showTimeSelect
                    selected={ this.props.startDate }
                    minDate={ this.state.today }
                    timeFormat='HH:mm'
                    timeIntervals={ 10 }
                    timeCaption='Time'
                    dateFormat='MMM d, y h:mm aa'
                    onChange={ this.handleChangeStartDate }
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={ 6 }>
              <div className='date-form__wrapper'>
                {!this.props.isUndefinedEndDate && (
                  <>
                    <div className='date-form__group'>
                      <label className='date-form__label'>
                        {trans('createChallenge.date.endDate')}
                      </label>
                      <DateInput
                        value={ format(this.props.endDate, 'MMMM d, y h:mm aa') }
                        onFocus={ this.toggleEndDate }
                      />
                    </div>

                    {this.state.showEndDate && (
                      <DatePicker
                        inline
                        showTimeSelect
                        selected={ this.props.endDate }
                        minDate={ this.props.startDate }
                        timeFormat='HH:mm'
                        timeIntervals={ 10 }
                        timeCaption='time'
                        dateFormat='MMM d, y h:mm aa'
                        onChange={ this.handleChangeEndDate }
                      />
                    )}
                  </>
                )}

                <FormControlLabel
                  classes={ {label: classes.formLabel} }
                  control={
                    <Checkbox
                      classes={ {root: classes.checkbox} }
                      checked={ this.props.isUndefinedEndDate }
                      onChange={ this.handleChangeCheckbox }
                      value='isUndefined'
                      color='primary'
                    />
                  }
                  label={ trans('createChallenge.date.undefined') }
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(DateForm);