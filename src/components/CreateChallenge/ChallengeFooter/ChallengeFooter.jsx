import React, {Component} from 'react';
import {
  nextButton,
  backButton,
  createButton,
  step1,
  step2,
  step3,
  step4
} from '../../../assets/images/challenge';

class ChallengeFooter extends Component {
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
          <img className='challenge-footer__item--hide' src={ backButton } alt='' />
        </div>
      );
    } else {
      return (
        <div className='challenge-footer__step-back'>
          <img className='challenge-footer__item' onClick={ onBack } src={ backButton } alt='' />
        </div>
      );
    }
  }

  /*
   * Render step images
  */
  renderSteps = () => {
    const {currentStep} = this.props;
    let steps = [step1, step2, step3, step4];

    return (
      <img className='challenge-footer__step-steppers challenge-footer__item' src={ steps[currentStep - 1] } alt='' />
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
        <div className='challenge-footer__step-next'>
          <img className='challenge-footer__item' onClick={ onComplete } src={ createButton } alt='' />
        </div>
      );
    } else {
      return (
        <div className='challenge-footer__step-next'>
          <img className='challenge-footer__item' onClick={ onNext } src={ nextButton } alt='' />
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