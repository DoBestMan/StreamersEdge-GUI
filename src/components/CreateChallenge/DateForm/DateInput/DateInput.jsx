import React, {Component} from 'react';
import CalendardIcon from '@material-ui/icons/DateRange';

class DateInput extends Component {
  render() {
    return (
      <>
        <div className='date-input__wrapper' onClick={ this.props.onFocus }>
          <CalendardIcon className='date-input__icon' fontSize='large' />
          {this.props.value}
        </div>
      </>
    );
  }
}

export default DateInput;