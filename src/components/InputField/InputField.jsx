import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormControl, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Input from '../../../src/assets/images/email.svg';
import InputActive from '../../../src/assets/images/email--active.svg';
import styles from './MUI.css';

class InputField extends Component{
  state = {
    image: Input, 
    dropdownOpen: false
  };

  mouseOver = () => {
    this.setState({image: InputActive});
  }

  //if there is no value switch back to default untouched image
  mouseOut = () => {
    if(this.props.inputValue === '') {
      this.setState({image: Input});
    } else {
      this.setState({image: InputActive});
    }
  }

  handleChange = (event) => {
    this.props.handleChange(event.target.value);
  }

  render(){
    const {classes} = this.props;

    return(
      <div className='input'>
        <FormControl margin='normal' required fullWidth>
          <img className='input--background' src={ this.state.image } alt=''/>
          <TextField
            className={ 'input--text' }
            disableUnderline={ true }
            onChange={ this.handleChange }
            onMouseOver={ this.mouseOver }
            onMouseOut={ this.mouseOut }
            InputProps={ {className: classes.input, disableUnderline: true} }
          />
        </FormControl>
      </div>
    );
  }
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputField);