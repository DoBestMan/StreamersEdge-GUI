import React, {Component} from 'react';
import {nextButton, backButton, step1, step2} from '../../../assets/images/profile';
import {Button} from '@material-ui/core';
class ProfileFooter extends Component {
  renderStep = () => {
    const step = this.props.currentStep === '1' ? step1 : step2;
    return <img className='profile-footer__item'src={ step } alt='' />;
  }
  //if step 1 = back button hidden, if step 2 = back button takes you to page 1
  backButton = () => {
    if(this.props.currentStep === '2') {
      return <Button><img className='profile-footer__item' onClick={ () => this.props.setStep('1') } src={ backButton } alt='' /></Button>;
    } else {
      return <Button><img className='profile-footer__item--hide' alt='' /></Button>;
    }
  }
  //if step 1 = next button submits page one date, if step 2 = next button redirects to dashboard
  nextButton = () => {
    if(this.props.currentStep === '1') {
      return <Button disabled={ this.props.disabled }><img className='profile-footer__item' onClick={ () => this.props.submitStep1() } src={ nextButton } alt=''/></Button>;
    } else {
      return <Button> <img className='profile-footer__item' onClick={ () => this.props.navigateToDashboard() } src={ nextButton } alt='' /></Button>;
    }
  }

  render() {
    return(
      <footer className='profile-footer'>
        <div className='divider-radial'/>
        <div className='profile-footer__step-wrapper'>
          { this.backButton() }
          { this.renderStep() }
          { this.nextButton() }
        </div>
      </footer>
    );
  }
}

export default ProfileFooter;