import React, {Component} from 'react';
import ProfilePictureUpload from '../../ProfilePictureUpload';
import {Card, CardContent, InputLabel} from '@material-ui/core';
import Dropdown from '../../Dropdown';
import CustomInput from '../../CustomInput';
import {GenUtil} from '../../../utility';
const translate = GenUtil.translate;

class UserInfo extends Component {

  handleUserTypeChange = (value) => {
    this.props.handleUserTypeChange(value);
  }

  handleEmailChange = (email) => {
    this.props.handleEmailChange(email);
  }

  render() {

    return(
      <Card className='user-info__card'>
        <span className='user-info__header'>
          {translate('updateProfile.userInfo.header')}
        </span>
        <CardContent className='user-info__content'>
          <div className='user-info__inputs'>
            <div className='user-info__account-type'>
              <span className='user-info__account-type__label'>{translate('updateProfile.userInfo.userType')}</span>
              <Dropdown defaultValue={ 'test1' } dropdownList={ ['test1', 'test2'] } handleChange={ this.handleUserTypeChange }/>
            </div>
            <div className='user-info__email'>
              <span className='user-info__email__label'>{translate('updateProfile.userInfo.email')}</span>
              <div className='user-info__email__input test1234'>
                <CustomInput name='email' hasActiveGlow={ true } theme='update-profile' handleChange={ this.handleEmailChange }
                  onBlur={ () => this.props.validation('email') }/>
                <InputLabel className='register-error' shrink error={ true }>
                  {this.props.errors.email}
                </InputLabel>
              </div>
            </div>
          </div>
          <div className='user-info__avatar'>
            <ProfilePictureUpload />
            <span className='user-info__avatar-label'>{translate('updateProfile.userInfo.avatar')}</span>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default UserInfo;