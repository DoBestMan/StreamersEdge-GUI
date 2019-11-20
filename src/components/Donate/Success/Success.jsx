import React from 'react';
import success_img from '../../../assets/images/donate/success.png';
import {GenUtil} from '../../../utility';

const translate = GenUtil.translate;

const success = () => (
  <div className='success'>
    <img src={ success_img } alt='success'/>
    <span className='success__header'>{translate('donate.successHeader')}</span>
    <span className='success__subHeader'>{translate('donate.successSubHeader')}</span>
  </div>
);

export default success;