import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ModalActions} from '../../actions';
import {TextField, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/core/styles';
import donateBtn from '../../assets/images/donate/donateBtn.png';
import {AuthService} from '../../services';
import InsufficientFunds from './InsufficientFunds';
import Success from './Success';
import {DonateConstants} from '../../constants';
import {GenUtil} from '../../utility';
import styles from './MUI.css';

const translate = GenUtil.translate;

//TODO: Hook up conditional page states once backend API is ready
class Donate extends Component {

  state = {
    page: DonateConstants.DONATE,
    account: 'John Doe',
    amount: 0
  };


  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  donate = (recipient, amount) => {
    AuthService.donate(recipient, amount).then((r) => {
      console.log(r);
      this.setState({
        amount: 0
      });
    }).catch((e) => {
      //TODO: Change page state.
      console.warn(e);
    });
  }


  render () {
    const {classes} = this.props;
    let content = (<>
    <div className='donate__txt--title'>{translate('donate.donateTo')}<span className='donate__txt--name'>John Doe</span></div>
    <div className='donate__input'>
      <p className='donate__txt--label'>{translate('donate.usd')}</p>
      <TextField
        name='amount'
        placeholder={ '0' }
        type='number'
        variant='outlined'
        className={ 'donate__textbox' }
        onChange={ this.handleChange }
        value = { this.state.amount }
        InputProps={ {
          classes: {
            input: classes.donateTextbox, notchedOutline: classes.donateBorder
          }
        } }
      />
    </div>
    <span className='donate__balance'>{translate('donate.balance')}</span>

    <img className='donate__submit'
      src={ donateBtn }
      alt='Submit'
      type='submit'
      onClick={ this.donate }
    /></>);

    if (this.state.page === DonateConstants.ERROR_INSUFFICIENT_FUNDS) {
      content = <InsufficientFunds/>;
    } else if (this.state.page === DonateConstants.SUCCESS) {
      content = <Success/>;
    }

    return (
      <div className='donate'>
        <IconButton className='donate__close' aria-label='Close' onClick={ this.props.toggleModal }>
          <CloseIcon />
        </IconButton>
        {content}
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
)(withStyles(styles)(Donate));