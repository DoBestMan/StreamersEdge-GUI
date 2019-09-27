/**
 * Custom styled wrapper for material ui select dropdown.
 * Required props: dropdownList, handleChange.
 * Classes props is used to make the styles from MUI.css useable for style overrides.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {MenuItem, FormControl, Select} from '@material-ui/core';
import dropdown from '../../assets/images/dropdown.svg';
import dropdownTouched from '../../assets/images/dropdown-active.svg';
import styles from './MUI.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: dropdown,
      dropdownOpen: false
    };
  }

  mouseOver = () => {
    this.setState({image: dropdownTouched});
  };

  //if there is no value switch back to default untouched image
  mouseOut = () => {
    if (this.props.value === '') {
      this.setState({image: dropdown});
    } else {
      this.setState({image: dropdownTouched});
    }
  };

  onOpen = () => {
    this.setState({dropdownOpen: true});
  };

  onClose = () => {
    this.setState({dropdownOpen: false});

    //switch back to default untouched image if no value is selected
    if (this.props.value === '') {
      this.setState({image: dropdown});
    }
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.props.handleChange(value);
  }

  render() {
    const {classes, dropdownList, value} = this.props;
    return (
      <div className='dropdown'>
        <FormControl className='dropdown__form'>
          <img className='dropdown__row' src={ this.state.image } alt='' />
          <Select
            className='dropdown__input'
            value={ value }
            open={ this.state.dropdownOpen }
            onOpen={ this.onOpen }
            onClose={ this.onClose }
            onChange={ this.handleChange }
            onMouseOver={ this.mouseOver }
            onMouseOut={ this.mouseOut }
            IconComponent={ () => <> </> } //this removes the default material ui dropdown icon
            inputProps={ {classes: {selectMenu: classes.textBoxStyle}} } //overrides input/textbox styles
            MenuProps={ {
              classes: {paper: classes.dropdownStyle}, //overrides dropdown styles
              getContentAnchorEl: null
            } }
          >
            {dropdownList.map((value, index) => (
              <MenuItem className='dropdown__menuItem' key={ index } value={ value }>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

Dropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  dropdownList: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Dropdown);
