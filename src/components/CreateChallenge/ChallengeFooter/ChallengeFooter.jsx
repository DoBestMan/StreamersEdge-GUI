import React, {Component} from 'react';
import {
  NextButton,
  BackButton,
  CreateButton,
  Step1,
  Step2,
  Step3,
  Step4
} from '../../../assets/images/challenge';

class ChallengeFooter extends Component {
  handleKeyUpForNext = (e) => {
    if (e.keyCode === 13) {
      const {currentStep, lastStep, onNext, onComplete} = this.props;

      if (currentStep === lastStep) {
        onComplete();
      } else {
        onNext();
      }
    }
  }

  handleKeyUpForPrev = (e) => {
    if (e.keyCode === 13) {
      this.props.onBack();
    }
  }

  /*
   * Render back button
   * If current step is 1, not show the back button
   * Else show the back button to go to the previous page
  */
  renderBack = () => {
    const {currentStep, onBack} = this.props;

    if (currentStep === 1) {
      return (
        <div className='challenge-footer__step-back challenge-footer__item--hide'>
          <img className='challenge-footer__item--hide' src={ BackButton } alt='' />
        </div>
      );
    } else {
      return (
        <div className='challenge-footer__step-back' tabIndex={ 0 } onKeyUp={ this.handleKeyUpForPrev } onClick={ onBack }>
          <img className='challenge-footer__item' src={ BackButton } alt='' />
        </div>
      );
    }
  }

  /*
   * Render step images
  */
  renderSteps = () => {
    const {currentStep} = this.props;
    const Steps = [Step1, Step2, Step3, Step4];

    return (
      <img className='challenge-footer__step-steppers challenge-footer__item' src={ Steps[currentStep - 1] } alt='' />
    );
  }

  /*
   * Render next button
   * If current step is 4, show the complete button
   * Else, show the next button to go to the next page
  */
  renderNext = () => {
    const {currentStep, lastStep, onNext, onComplete} = this.props;

    if (currentStep === lastStep) {
      return (
        <div className='challenge-footer__step-next' tabIndex={ 0 } onKeyUp={ this.handleKeyUpForNext } onClick={ onComplete }>
          <img className='challenge-footer__item' src={ CreateButton } alt='' />
        </div>
      );
    } else {
      return (
        <div className='challenge-footer__step-next' tabIndex={ 0 } onKeyUp={ this.handleKeyUpForNext } onClick={ onNext }>
          <img className='challenge-footer__item' src={ NextButton } alt='' />
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <div className='challenge-footer'>
          <div className='divider-radial'/>
          <div className='challenge-footer__step-wrapper'>
            <div className='challenge-footer__step-content'>
              { this.renderBack() }
              { this.renderSteps() }
              { this.renderNext() }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChallengeFooter;