import React, {Component} from 'react';
import ProfilePictureUpload from '../CreateProfile/CreateProfileForm/ProfilePictureUpload';
import Dropdown from '../Dropdown';
import {FormControl, InputLabel, Button} from '@material-ui/core';
import SignupInput from '../SignupInput';
import IconEmail from '../../assets/images/signup_email_input.png';
import IconEmailActive from '../../assets/images/signup_email_active_input.png';
import {connect} from 'react-redux';
import AuthUtil from '../../utility/AuthUtil';
// import AccountActions from '../../actions/AccountActions';
// import {bindActionCreators} from 'redux';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {accountType: '', username: ''};
  }

  componentDidMount() {
    // debugger;
  }

  changeAccountType = (event) => {
    const {value} = event.target;

    this.setState({accountType: value});
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  renderInput = (inputValue, formName, inputImage, activeInputImage) => {
    let fieldPopulated = inputValue ? true : false;

    if (fieldPopulated) {
      return (
        <FormControl className='update-profile--input' margin='normal' required fullWidth>
          <SignupInput name={ formName } disabled={ true } inputValue={ inputValue } activeInputImage={ activeInputImage } />
        </FormControl>
      );
    } else {
      return (
        <Button onClick={ () => AuthUtil.authVia(formName, this.props.location.pathname) }>
          <FormControl className='update-profile--input' margin='normal' required fullWidth>
            <SignupInput name={ formName } disabled={ true } inputImage={ inputImage } activeInputImage={ activeInputImage } />
          </FormControl>
        </Button>
      );
    }
  };

  render() {
    return (
      <div className='update-profile'>
        <form className='forgot-form' onSubmit={ this.handleSubmit }>
          <p>UPDATE YOUR PROFILE</p>
          <FormControl margin='normal' required fullWidth>
            <ProfilePictureUpload />
          </FormControl>
          <InputLabel htmlFor='account' className='update-profile--label'>
            Customize Avatar
          </InputLabel>

          <FormControl margin='normal' required fullWidth>
            <Dropdown dropdownList={ ['Gamer', 'Viewer', 'Sponsor'] } handleChange={ this.changeAccountType } selectedValue={ this.state.accountType } />
          </FormControl>
          <InputLabel htmlFor='account' className='update-profile--label'>
            Edit account type
          </InputLabel>

          {this.renderInput(this.props.email, 'email', IconEmail, IconEmailActive)}
          <InputLabel htmlFor='account' className='update-profile--label'>
            Edit Streamers Edge account email
          </InputLabel>

          {this.renderInput(this.props.twitch, 'twitch', IconEmail, IconEmailActive)}
          <InputLabel htmlFor='account' className='update-profile--label'>
            Edit Active Linked Accounts
          </InputLabel>

          {this.renderInput(this.props.facebook, 'facebook', IconEmail, IconEmailActive)}
          <InputLabel htmlFor='account' className='update-profile--label'>
            Edit Active Linked Accounts
          </InputLabel>

          {this.renderInput(this.props.google, 'google', IconEmail, IconEmailActive)}
          <InputLabel htmlFor='account' className='update-profile--label'>
            Edit Active Linked Accounts
          </InputLabel>

          {this.renderInput(this.props.peerplays, 'peerplays', IconEmail, IconEmailActive)}
          <InputLabel htmlFor='account' className='update-profile--label'>
            Edit Linked Accounts
          </InputLabel>
        </form>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//     ...bindActionCreators({setLoggedIn: AccountActions.setIsLoggedInAction,
//       setAccount: AccountActions.setAccountAction
//     }, dispatch)
//   };
// }

const mapStateToProps = (state) => ({
  account: state.getIn(['profiles', 'currentAccount']),
  email: state.getIn(['profiles', 'currentAccount', 'email']),
  userType: state.getIn(['profiles', 'currentAccount', 'userType']),
  twitch: state.getIn(['profiles', 'currentAccount', 'twitch']),
  youtube: state.getIn(['profiles', 'currentAccount', 'youtube']),
  facebook: state.getIn(['profiles', 'currentAccount', 'facebook']),
  google: state.getIn(['profiles', 'currentAccount', 'googleName']),
  peerplays: state.getIn(['profiles', 'currentAccount', 'peerplaysAccountName'])
});

export default connect(mapStateToProps)(UpdateProfile);
