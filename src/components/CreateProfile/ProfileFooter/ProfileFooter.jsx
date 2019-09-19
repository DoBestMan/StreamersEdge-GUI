import React, {Component} from 'react';
import {nextButton, backButton, step1, step2} from '../../../assets/images/profile';

class ProfileFooter extends Component {
  renderStep = () => {
    const step = this.props.currentStep === '1' ? step1 : step2;
    return <img className='profile-footer__item'src={ step } alt='' />;
  }

  backButton = () => {
    if(this.props.currentStep === '2') {
      return <img className='profile-footer__item' onClick={ () => this.props.setStep('1') } src={ backButton } alt='' />;
    } else {
      return <img className='profile-footer__item--hide' onClick={ this.nextStep } src={ backButton } alt='' />;
    }
  }

  nextButton = () => {
    return (
      <img className='profile-footer__item' onClick={ () => this.props.setStep('2') } src={ nextButton } alt='' />
    );
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