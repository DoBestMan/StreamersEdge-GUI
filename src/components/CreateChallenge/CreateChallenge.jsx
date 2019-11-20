import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addDays} from 'date-fns';

import ChallengeFooter from './ChallengeFooter';
import ChallengeForm from './ChallengeForm';
import DateForm from './DateForm';
import ConditionForm from './ConditionForm';
import InviteForm from './InviteForm';

import {ModalTypes} from '../../constants';
import {ModalActions} from '../../actions';
import {GenUtil, ValidationUtil} from '../../utility';
import {GameService} from '../../services';

const trans = GenUtil.translate;

const DEFAULT_CONDITION = {
  param: '',
  join: 'AND',
  operator: '>',
  value: 100
};

class CreateChallenge extends Component {
  state = {
    currentStep: 1,
    isUpdatedConditions: false,
    gameStats: {},
    // Challenge Info
    name: '',
    game: '',
    conditions: [],
    ppyAmount: 100000,
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    isUndefinedEndDate: true,
    accessRule: 'invite',
    invitedAccounts: [],
    // Errors
    errors: []
  };

  componentDidMount() {
    GameService.getGameStats().then((res) => {
      const entries = Object.entries(res);

      if (entries.length > 0) {
        Object.assign(DEFAULT_CONDITION, {param: entries[0][1]});
        this.setState({
          gameStats: res,
          conditions: [Object.assign({}, DEFAULT_CONDITION, {join: 'must'})]
        });
      }
    }).catch((err) => {
      this.setState({
        conditions: [Object.assign({}, DEFAULT_CONDITION, {join: 'must'})]
      });
      console.log('Retrieve game stats failed: ', err);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Remove errors
    if ((prevState.name !== this.state.name)
      || (prevState.game !== this.state.game)
      || (prevState.invitedAccounts.length !== this.state.invitedAccounts.length)
      || (prevState.endDate.getTime() !== this.state.endDate.getTime() && this.state.endDate.getTime() >= this.state.startDate.getTime())
      || (prevState.currentStep !== this.state.currentStep)
    ) {
      this.setState({
        errors: []
      });
    }
  }

  handleBackClick = () => {
    this.setState((state) => ({
      currentStep: state.currentStep - 1
    }));
  }

  handleNextClick = () => {
    // Handle validation for each step
    if (this.state.currentStep === 1) {
      const valid = ValidationUtil.challengeNameAndGame(this.state.name, this.state.game);

      if (!valid.success) {
        this.setState({
          errors: valid.errors.filter((error) => !error.success).map((error) => error.errorString)
        });
        return;
      }
    } else if (this.state.currentStep === 2) {
      if (!this.state.isUndefinedEndDate && this.state.startDate.getTime() > this.state.endDate.getTime()) {
        this.setState({
          errors: [trans('createChallenge.errors.date.invalid')]
        });
        return;
      }
    } else if (this.state.currentStep === 3) {
      if (!this.state.isUpdatedConditions) {
        this.setState({
          errors: [trans('createChallenge.errors.condition.required')]
        });
        return;
      }
    }

    this.setState((state) => ({
      currentStep: state.currentStep + 1
    }));
  }

  handleCompleteClick = () => {
    // validte the invite accounts before completing
    if (this.state.accessRule !== 'anyone' && !this.state.invitedAccounts.length) {
      this.setState({
        errors: [trans('createChallenge.errors.invite.required')]
      });
      return;
    }

    this.props.setModalData({
      challenge: {
        name: this.state.name,
        game: this.state.game,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        isUndefinedEndDate: this.state.isUndefinedEndDate,
        accessRule: this.state.accessRule,
        ppyAmount: this.state.ppyAmount,
        invitedAccounts: this.state.invitedAccounts,
        conditions: this.state.conditions
      }
    });
    this.props.setModalType(ModalTypes.CHALLENGE_CONFIRM);
    this.props.toggleModal();
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

  handleChange = (name, value) => {
    if (name === 'startDate' && value > this.state.endDate) {
      this.setState({
        [name]: value,
        endDate: value
      });
      return;
    }

    this.setState({
      [name]: value
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
            onChange={ this.handleChange }
          />
        );
      case 2:
        return (
          <DateForm
            startDate={ this.state.startDate }
            endDate={ this.state.endDate }
            isUndefinedEndDate={ this.state.isUndefinedEndDate }
            onChange={ this.handleChange }
          />
        );
      case 3:
        return (
          <ConditionForm
            conditions={ this.state.conditions }
            ppyAmount={ this.state.ppyAmount }
            gameStats={ this.state.gameStats }
            errors={ this.state.errors }
            onChange={ this.handleChange }
            onChangeConditions={ this.handleChangeConditions }
          />
        );
      case 4:
        return (
          <InviteForm
            accessRule={ this.state.accessRule }
            invitedAccounts={ this.state.invitedAccounts }
            onChange={ this.handleChange }
          />
        );
      // no default
    }
  }

  render() {
    const {errors} = this.state;

    return (
      <>
        <div className='create-challenge__content'>
          <div className='create-challenge__wrapper'>
            <div className='create-challenge__title'>{ trans('createChallenge.header') }</div>
            { this.renderForm() }
            {!!errors.length && (
              <div className='create-challenge__error'>
                {errors.map((error, index) => <p key={ index }>{error}</p>)}
              </div>
            )}
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

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(CreateChallenge);
