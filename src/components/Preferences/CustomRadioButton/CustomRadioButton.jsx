import React from 'react';
import {Radio} from '@material-ui/core';
import {RadioButtonChecked, RadioButtonUnchecked} from '@material-ui/icons';


const CustomRadioButton = (props) => (
  <Radio
    { ...props }
    checkedIcon={ <RadioButtonChecked className='checked' /> }
    icon={ <RadioButtonUnchecked className='unchecked' /> }
  />
);

export default CustomRadioButton;