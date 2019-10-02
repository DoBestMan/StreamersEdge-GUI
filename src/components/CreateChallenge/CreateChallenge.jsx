import React, {Component} from 'react';
import ChallengeFooter from './ChallengeFooter';

class CreateChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1
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

  render() {
    return (
      <>
        <div className='create-challenge__content'>
          <h1>Create Challenge</h1>
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