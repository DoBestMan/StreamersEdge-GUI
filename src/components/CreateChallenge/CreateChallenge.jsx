import React, {Component} from 'react';
import ChallengeFooter from './ChallengeFooter';
import ChallengeForm from './ChallengeForm';
import DateForm from './DateForm';
import ConditionForm from './ConditionForm';
import InviteForm from './InviteForm';
import {GenUtil} from '../../utility';

const trans = GenUtil.translate;

const DEFAULT_CONDITION = {
  param: 'kill',
  join: 'and',
  operator: '>',
  value: 100
};

class CreateChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      isUpdatedConditions: false,
      // Challenge Info
      name: '',
      game: '',
      conditions: [Object.assign({}, DEFAULT_CONDITION, {join: 'must'})],
      ppyAmount: 100000,
      // Errors
      errors: []
    };
  }

  handleBackClick = () => {
    this.setState((state) => ({
      currentStep: state.currentStep - 1
    }));
  }

  handleNextClick = () => {
    // If current page is for conditions, then validate the conditions
    if (this.state.currentStep === 3 && !this.state.isUpdatedConditions) {
      this.setState({
        errors: [
          'Add at least one condition'
        ]
      });
      return;
    }

    this.setState((state) => ({
      currentStep: state.currentStep + 1
    }));
  }

  handleCompleteClick = () => {

  }

  handleChangeName = (newValue) => {
    this.setState({
      name: newValue
    });
  }

  handleChangeGame = (newValue) => {
    this.setState({
      game: newValue
    });
  }

  handleChangeConditions = (action, index = 0, newCondition = DEFAULT_CONDITION) => {
    switch (action) {
      case 'add':
        this.setState((state) => {
          return {
            isUpdatedConditions: true,
            errors: [],
            conditions: [
              ...state.conditions,
              Object.assign({}, newCondition)
            ]
          };
        });
        break;
      case 'delete':
        let conditions = this.state.conditions;

        conditions.splice(index, 1);
        this.setState({
          conditions,
          isUpdatedConditions: true,
          errors: []
        });
        break;
      case 'update':
        let newConditions = this.state.conditions;

        newConditions[index] = newCondition;
        this.setState({
          isUpdatedConditions: true,
          errors: [],
          conditions: newConditions
        });
        break;
      default:
        break;
    }
  }

  handleChangePPY = (newPPY) => {
    this.setState({
      ppyAmount: newPPY
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
            challengeName={ this.state.name }
            challengeGame={ this.state.game }
            onChangeName={ this.handleChangeName }
            onChangeGame={ this.handleChangeGame }
          />
        );
      case 2:
        return <DateForm />;
      case 3:
        return (
          <ConditionForm
            conditions={ this.state.conditions }
            ppyAmount={ this.state.ppyAmount }
            errors={ this.state.errors }
            onChangeConditions={ this.handleChangeConditions }
            onChangePPY={ this.handleChangePPY }
          />
        );
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