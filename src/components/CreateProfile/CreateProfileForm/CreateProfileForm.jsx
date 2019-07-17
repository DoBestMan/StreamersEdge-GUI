/**
 * The CreateProfileForm is a 3-step master form component containing all of the create and update
 * profile features.
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ActiveAccount from './ActiveAccount';
import Dropdown from '../../Dropdown';
import InputField from '../../InputField';
import LinkAccount from './LinkAccount';
import LinkCrypto from './LinkCrypto';
import ProfilePictureUpload from './ProfilePictureUpload';
import nextBtnImg from '../../../assets/images/profile/next-green.svg';
import prevBtnImg from '../../../assets/images/profile/btn__back--green.svg';
import emailInput from '../../../assets/images/email.svg';
import emailInputActive from '../../../assets/images/email--active.svg';

class CreateProfileForm extends Component {
  constructor(props) {
    super(props);

    // Set the initial input values
    this.state = {
      email: '',
      platform: 'Viewer'
    };
  }

  componentDidMount() {
    // Redirect Check
    if (this.props.location.search) {
      this.setState({
        currentStep: 2
      });
    }
  }

  handleEmailChange = (event) => {
    const {value} = event.target;
    this.setState({
      email: value
    });
  };

  handleAccountChange = (event) => {
    const {value} = event.target;
    this.setState({
      platform: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // const email = this.state.email;
  };

  // Handles form validation based on the step. We may not need validation for some steps.
  validate = () => {
    let currentStep = this.props.currentStep;
    let result = false;

    switch (currentStep) {
      case 1:
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        result = re.test(this.state.email);
        break;

      case 2:
        result = true;
        break;

      case 3:
        result = true;
        break;

      default:
        break;
    }

    return result;
  };

  next = () => {
    let currentStep = this.props.currentStep;

    const validateCheck = this.validate();

    if (!validateCheck) {
      return;
    }

    // We need to conditionally validate based on currentStep, only then can we continue.
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.props.changeStep(currentStep);
  };

  prev = () => {
    let currentStep = this.props.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.props.changeStep(currentStep);
  };

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.props.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return <img className='profile-form-next' src={ prevBtnImg } alt='next' onClick={ this.prev } />;
    }

    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.props.currentStep;

    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return <img className='profileform-next' src={ nextBtnImg } alt='next' onClick={ this.next } />;
    }

    // ...else render nothing
    return null;
  }

  render() {
    let form;
    let active = <ActiveAccount search={ this.props.location.search } />;
    const navigationClass = `profile-form-navigation__${this.props.currentStep}`;

    switch (this.props.currentStep) {
      case 1:
        form = (
          <form className='profile-form-one' onSubmit={ this.handleSubmit }>
            <span className='profile-form-title'>CREATE YOUR PROFILE</span>

            <div className='profile-form-outer'>
              <ProfilePictureUpload />
              <div className='profile-form-inner'>
                <FormControl margin='normal' required fullWidth>
                  <Dropdown dropdownList={ ['Viewer', 'Gamer', 'Sponsor'] } handleChange={ this.handleAccountChange } selectedValue={ this.state.platform } />
                  <FormHelperText className='profile-form__helper'>Select account type</FormHelperText>
                </FormControl>
                <div className='profile-form-email'>
                  <FormControl margin='normal' required fullWidth>
                    <InputField className='email__txt' name='email' inputImage={ emailInput } activeInputImage={ emailInputActive } handleChange={ this.handleEmailChange } />
                  </FormControl>
                </div>

                <FormHelperText className='profile-form__helper'>Edit Streamers Edge account email</FormHelperText>
              </div>
            </div>
          </form>
        );

        active = <></>;
        break;
      case 2:
        form = <LinkAccount />;
        break;
      case 3:
        form = <LinkCrypto />;
        break;
      default:
    }

    return (
      <>
        {form}
        <div className={ navigationClass }>
          {this.previousButton}
          {this.nextButton}
        </div>
        {active}
      </>
    );
  }
}

export default CreateProfileForm;
