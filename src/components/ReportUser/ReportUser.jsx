/**
 * Report User Component.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CustomInput from '../CustomInput';
import {ModalActions} from '../../actions';
import {Radio, RadioGroup, FormControl, FormControlLabel, Button, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {GenUtil} from '../../utility';
import {withStyles} from '@material-ui/core/styles';
import ReportButton from '../../assets/images/report/report_button.png';
import styles from './MUI.css';

const translate = GenUtil.translate;

class ReportUser extends Component {
  state = {
    reportType: '1',
    desc: '',
    error: ''
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleDescChange = (desc) => {
    this.setState({
      desc
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.reportType || !this.state.desc) {
      this.setState({
        error: translate('reportUser.error')
      });
    } else {
      this.setState({
        error: ''
      });
      console.log(this.state);
      //TODO: Connect to API once it exists
    }

  }

  render() {
    const {classes} = this.props;

    return (
      <div className='report'>
        <form className='report-form' onSubmit={ this.handleSubmit }>
          <IconButton className='report-form__close' aria-label='Close' onClick={ this.props.toggleModal }>
            <CloseIcon />
          </IconButton>
          <span className='report-form__title'>REPORT USER: John Doe</span>
          <div className='report-form__controls'>
            <FormControl className='report-form__radioGroup' margin='normal' required fullWidth>
              <span className='report-form__subTitle'>{translate('reportUser.selectableReasons')}</span>
              <RadioGroup
                m={ 0 }
                p={ 0 }
                aria-label='report type'
                name='reportType'
                className={ classes.reportOptions }
                value={ this.state.reportType }
                defaultValue='1'
                onChange={ this.handleChange }
              >
                <FormControlLabel classes={ {label: classes.label} } value='1' control={ <Radio color='primary' /> } label={ translate('reportUser.reasons.one') } />
                <FormControlLabel classes={ {label: classes.label} } value='2' control={ <Radio color='primary' /> } label={ translate('reportUser.reasons.two') } />
                <FormControlLabel classes={ {label: classes.label} } value='3' control={ <Radio color='primary' /> } label={ translate('reportUser.reasons.three') } />
              </RadioGroup>
            </FormControl>
            <FormControl className='report-form__textArea'>
              <CustomInput theme='white' muiInputClass='inputBlack' rows={ 10 } multiline fullwidth={ false } handleChange={ this.handleDescChange }
                placeholder={ translate('reportUser.giveDescription') }/>
            </FormControl>
          </div>
          <div className='report-form--center'>
            <Button className = 'report-form__submit' type='submit'>
              <img
                className='report-form__btn-img'
                src={ ReportButton }
                alt='Report'
                type='submit'
              />
            </Button>
          </div>
          <div className='report-form__txt--error'>{this.state.error}</div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ReportUser));
