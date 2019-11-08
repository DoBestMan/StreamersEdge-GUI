import React, {Component} from 'react';
import ProfilePictureUpload from '../../ProfilePictureUpload';
import CustomInput from '../../CustomInput';
import Dropdown from '../../Dropdown';
import {
  EmailIcon,
  EmailIconActive,
  InvalidIcon
} from '../../../assets/images/signup';
import {GenUtil, ValidationUtil} from '../../../utility';

const translate = GenUtil.translate;

class UserInfo extends Component {

  state = {
    isEmailInputClicked: false
  }

  handleEmailChange = (email) => {
    this.setState({isEmailInputClicked: true});
    this.props.handleEmailChange(email);
  }

  handleUserTypeChange = (value) => {
    this.props.handleUserTypeChange(value);
  }

  render() {
    return(
      <div>
        <span className='update-user-info__header'>
          {translate('updateProfile.userInfo.updateHeader')}
        </span>
        <div className='update-user-info__content'>
          <div className='update-user-info__inputs'>
            <div className='update-user-info__account-type'>
              <span className='update-user-info__account-type__label'>{translate('updateProfile.userInfo.editUserType')}</span>
              <Dropdown value={ this.props.userType } dropdownList={ translate('createProfile.accountTypes').split(',') } handleChange={ this.handleUserTypeChange }/>
            </div>
            <div className='update-user-info__email'>
              <span className='update-user-info__email__label'>{translate('updateProfile.userInfo.editEmail')}</span>
              <div className='update-user-info__email__input test1234'>
                <CustomInput
                  name='email'
                  hasActiveGlow={ true }
                  value={ this.props.email }
                  theme='update-profile'
                  placeholder={ translate('register.enterEmail') }
                  handleChange={ this.handleEmailChange }
                  iconLeft={ EmailIcon }
                  iconLeftActive={ EmailIconActive }
                  iconRightActive={ InvalidIcon }
                  handleRightIconClick={ () => {
                    return  ValidationUtil.seEmail(this.props.email).errors;
                  } }
                  isValid={ () => {
                    if (this.state.isEmailInputClicked) {
                      return ValidationUtil.seEmail(this.props.email).success;
                    } else {
                      return true;
                    }
                  }  }/>
              </div>
            </div>
          </div>
          <div className='update-user-info__avatar'>
            <ProfilePictureUpload />
            <span className='update-user-info__avatar-label'>{translate('updateProfile.userInfo.avatar')}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
