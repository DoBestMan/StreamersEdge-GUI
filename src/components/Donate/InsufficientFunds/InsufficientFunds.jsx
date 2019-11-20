import React from 'react';
import insufficient_funds from '../../../assets/images/donate/insufficient_funds.png';
import add_funds_btn from '../../../assets/images/donate/add_funds_btn.png';
import {GenUtil} from '../../../utility';

const translate = GenUtil.translate;

const addFunds = () => {
  console.log('addFunds');
};

const insufficient = () => (
  <div className='insufficient'>
    <img src={ insufficient_funds } alt='insufficient_funds'/>
    <span className='insufficient__header'>{translate('donate.insufficientHeader')}</span>
    <span className='insufficient__subHeader'>{translate('donate.insufficientSubHeader')}</span>
    <img className='donate__submit'
      src={ add_funds_btn }
      alt='add funds'
      onClick={ addFunds }
    />
  </div>
);

export default insufficient;