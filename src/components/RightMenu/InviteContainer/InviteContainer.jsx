import React, {Component} from 'react';
import {GenUtil} from '../../../utility';
import Icon1 from '../../../assets/images/rightmenu/icon1.png';
import Icon2 from '../../../assets/images/rightmenu/icon2.jpg';

const trans = GenUtil.translate;

class InviteContainer extends Component {
  render() {
    return (
      <>
        <div className='invite'>
          <div className='invite-title'>
            {trans('rightMenu.invite.accept')}
          </div>
          <div className='invite-list'>
            {[...Array(5)].map((e, i) => (
              <a key={ i } href='#'>
                <img src={ Icon1 } alt='' width='45' height='52' />
              </a>
            ))}
          </div>
          <div className='invite-title'>
            {trans('rightMenu.invite.new')}
          </div>
          <div className='invite-list'>
            {[...Array(5)].map((e, i) => (
              <a key={ i } href='#'>
                <img src={ Icon2 } alt='' width='45' height='52' />
              </a>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default InviteContainer;
