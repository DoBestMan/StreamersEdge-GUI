import React, {Component} from 'react';
import ProfilePictureUpload from '../../ProfilePictureUpload';
import {Card, CardContent} from '@material-ui/core';
import CustomInput from '../../CustomInput';
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

  validateEmail = () => {
    if (this.state.isEmailInputClicked) {
      return ValidationUtil.seEmail(this.props.email).success;
    }

    return true;
  }

  render() {
    return(
      <Card className='user-info__card'>
        <span className='user-info__header'>
          {translate('updateProfile.userInfo.header')}
        </span>
        <CardContent className='user-info__content'>
          <div className='user-info__inputs'>
            <div className='user-info__email'>
              <span className='user-info__email__label'>{translate('updateProfile.userInfo.email')}</span>
              <div className='user-info__email__input'>
                <CustomInput
                  name='email'
                  hasActiveGlow={ true }
                  theme='update-profile'
                  value={ this.props.email }
                  handleChange={ this.handleEmailChange }
                  placeholder={ translate('register.enterEmail') }
                  iconLeft={ EmailIcon }
                  iconLeftActive={ EmailIconActive }
                  iconRightActive={ InvalidIcon }
                  handleRightIconClick={ () => {
                    return  ValidationUtil.seEmail(this.props.email).errors;
                  } }
                  isValid={ this.validateEmail }/>
              </div>
            </div>
          </div>
          <div className='user-info__avatar'>
            <ProfilePictureUpload />
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default UserInfo;
