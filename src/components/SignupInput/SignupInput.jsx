import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormControl, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';

class InputField extends Component{
  state = {
    image: this.props.inputImage,
    dropdownOpen: false
  };



  mouseOver = () => {
    this.setState({image: this.props.activeInputImage});
  }

  //if there is no value switch back to default untouched image
  mouseOut = () => {
    if(this.props.inputValue === '') {
      this.setState({image: this.props.inputImage});
    } else {
      this.setState({image: this.props.activeInputImage});
    }
  }

  handleChange = (event) => {
    this.setState({image: this.props.activeInputImage});
    this.props.handleChange(event);
  }

  render(){
    const {classes} = this.props;

    return(
      <div className='signup-input'>
        <FormControl className='signup-input__form' margin='normal' required fullWidth>
          <img src={ this.state.image } alt=''/>
          <TextField
            name={ this.props.name }
            className={ 'signup-input__txt' }
            onChange={ this.handleChange }
            onMouseOver={ this.mouseOver }
            onMouseOut={ this.mouseOut }
            onBlur = { this.props.onBlur }
            InputProps={ {classes: {input: classes.input}, disableUnderline: true} }
            type={ this.props.type }
            placeholder= { this.props.placeholder }
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