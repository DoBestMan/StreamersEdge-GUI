import React, {Component} from 'react';
import {avatarFrame, profileDefault} from '../../assets/images/avatar';

class Avatar extends Component {
  render() {
    const avatar = this.props.avatar ? this.props.avatar : profileDefault;

    return (
      <div className='avatar__wrapper'>
        <img className='avatar__frame' src={ avatarFrame } alt='' />
        <img className='avatar__img' src={ avatar } alt={ '' }/>
      </div>
    );
  }
}

export default Avatar;
