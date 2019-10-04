import React, {Component} from 'react';
import ChallengeFooter from './ChallengeFooter';
import ChallengeForm from './ChallengeForm';
import DateForm from './DateForm';
import ConditionForm from './ConditionForm';
import InviteForm from './InviteForm';
import {GenUtil} from '../../utility';

const trans = GenUtil.translate;

class CreateChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      challenge: {
        name: '',
        game: ''
      }
    };
  }

  handleBackClick = () => {
    this.setState((state) => ({
      currentStep: state.currentStep - 1
    }));
  }

  handleNextClick = () => {
    this.setState((state) => ({
      currentStep: state.currentStep + 1
    }));
  }

  handleCompleteClick = () => {

  }

  handleChangeName = (newValue) => {
    this.setState({
      challenge: {
        ...this.state.challenge,
        name: newValue
      }
    });
  }

  handleChangeGame = (newValue) => {
    this.setState({
      challenge: {
        ...this.state.challenge,
        game: newValue
      }
    });
  }

  /*
   * Render component by the current step
   * step 1: ChallengeForm
   * step 2: DateForm
   * step 3: ConditionForm
   * step 4: InviteForm
   * otherwise: ChallengeForm
  */
  renderForm = () => {
    switch (this.state.currentStep) {
      case 1:
        return (
          <ChallengeForm
            challengeName={ this.state.challenge.name }
            challengeGame={ this.state.challenge.game }
            onChangeName={ this.handleChangeName }
            onChangeGame={ this.handleChangeGame }
          />
        );
      case 2:
        return <DateForm />;
      case 3:
        return <ConditionForm />;
      case 4:
        return <InviteForm />;
      default:
        return <ChallengeForm />;
    }
  }

  render() {
    return (
      <>
        <div className='create-challenge__content'>
          <div className='create-challenge__wrapper'>
            <div className='create-challenge__title'>{ trans('createChallenge.header') }</div>
            { this.renderForm() }
          </div>
        </div>
        <ChallengeFooter
          currentStep={ this.state.currentStep }
          lastStep={ 4 }
          onBack={ this.handleBackClick }
          onNext={ this.handleNextClick }
          onComplete={ this.handleCompleteClick }
        />
      </>
    );
  }
}

export default CreateChallenge;