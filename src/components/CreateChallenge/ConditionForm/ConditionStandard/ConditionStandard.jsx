import React, {Component} from 'react';
import {Tooltip} from '@material-ui/core';

class ConditionStandard extends Component {
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleDecrease = () => {
    if (this.props.value > 0) {
      this.props.onChange(this.props.value - 1);
    }
  }

  handleIncrease = () => {
    this.props.onChange(this.props.value + 1);
  }

  handleChange = (e) => {
    const {value} = e.target;
    let reg = /[^(\d||,)]/;

    // Accpet only numbers
    if (!reg.test(value)) {
      this.props.onChange(+value.replace(/,/g, ''));
    }
  }

  render() {
    const {value, size} = this.props;

    return (
      <>
        <div className={ `condition-standard__wrapper-${size}` }>
          <div className='condition-standard__decrease condition-standard__justify' onClick={ this.handleDecrease }>-</div>
          <div className='condition-standard__justify'>
            <Tooltip title={ this.numberWithCommas(value) } placement='top'>
              <input
                className='condition-standard__input'
                value={ this.numberWithCommas(value) }
                onKeyUp={ this.handleKeyUp }
                onChange={ this.handleChange }
              />
            </Tooltip>
          </div>
          <div className='condition-standard__increase condition-standard__justify' onClick={ this.handleIncrease }>+</div>
        </div>
      </>
    );
  }
}

export default ConditionStandard;