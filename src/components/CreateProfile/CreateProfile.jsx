/**
 * CreateProfile.jsx is the container for the Create/Update profile page, and contains the master form.
 * This would be the Redux injection point if needed.
 */

import React, {Component} from 'react';
import CreateProfileForm from './CreateProfileForm';
import step_1 from '../../assets/images/profile/step_1.svg';
import step_2 from '../../assets/images/profile/step_2.svg';
import step_3 from '../../assets/images/profile/step_3.svg';

class CreateProfile extends Component{
  constructor() {
    super();
    this.state = {currentStep: 1};
  }

  changeStep = (step) => {
    this.setState({currentStep: step});
  }

  renderStep() {
    const step = this.state.currentStep;

    switch(step) {
      case 1 :
        return (<img src={ step_1 } alt='' />);
      case 2 :
        return (<img src={ step_2 } alt='' />);
      case 3 :
        return (<img src={ step_3 } alt='' />);
      default:
        return;
    }
  }

  render(){
    return(
      <>
      <div className='profile-page'>
        <div className='profile-form'>
          <CreateProfileForm changeStep={ this.changeStep } currentStep={ this.state.currentStep } location={ this.props.location } />
        </div>
      </div>
      <div className='profile-divider__bottom'/>
      <div className='profile-footer'>
        {this.renderStep()}
      </div>
      </>
    );
  }
}

export default CreateProfile;
