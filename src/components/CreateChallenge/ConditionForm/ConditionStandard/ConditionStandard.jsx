import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tooltip} from '@material-ui/core';

class ConditionStandard extends Component {
  state = {
    value: this.numberWithCommas(this.props.value)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.numberWithCommas(this.props.value)
      });
    }
  }

  numberWithCommas(num) {
    const {type, balancePrecision} = this.props;

    return Number(num).toLocaleString('en-US', {
      maximumFractionDigits: type === 'bounty' ? balancePrecision : 0
    });
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
    const num = value.replace(/,/g, '');
    const reg = new RegExp(/^\d*\.?\d*$/);

    if (this.props.type === 'bounty' && reg.test(num)) {
      this.setState({value: num});
    }

    if (this.props.type === 'param' && !/\D/.test(num)) {
      this.setState({value: num});
    }
  }

  handleBlur = () => {
    const num = this.state.value.replace(/,/g, '');
    this.props.onChange(+num);
  }

  render() {
    const {size} = this.props;
    const {value} = this.state;

    return (
      <>
        <div className={ `condition-standard__wrapper-${size}` }>
          <div className='condition-standard__decrease condition-standard__justify' onClick={ this.handleDecrease }>-</div>
          <div className='condition-standard__justify'>
            <Tooltip title={ value } placement='top'>
              <input
                className='condition-standard__input'
                value={ value }
                onChange={ this.handleChange }
                onBlur={ this.handleBlur }
              />
            </Tooltip>
          </div>
          <div className='condition-standard__increase condition-standard__justify' onClick={ this.handleIncrease }>+</div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  balancePrecision: state.getIn(['peerplays', 'balancePrecision'])
});

export default connect(
  mapStateToProps,
  null
)(ConditionStandard);