/**
 * CreateProfile.jsx is the container for the Create/Update profile page, and contains the master form.
 * This would be the Redux injection point if needed.
 */

import React, {Component} from 'react';
import CreateProfileForm from './CreateProfileForm';
import HeaderLogo from '../../assets/images/profile/streamers_edge_logo.png';

class CreateProfile extends Component{
  
  render(){
    return(
      <>
      <div className='profile-header'>
        <img className='profile-headerlogo' src={ HeaderLogo } alt='Header'></img>
      </div>
      <div className='profile-divider__top'/>
      <div className='profile-page'>
        <div className='profile-form'>
          <CreateProfileForm location={ this.props.location } />
        </div>
      </div>
      <div className='profile-divider__bottom'/>
      <div className='profile-footer'>
      </div>
      </>
    );
  }
}

export default CreateProfile;
