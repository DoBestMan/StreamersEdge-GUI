import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Select, MenuItem} from '@material-ui/core';
import DropdownIcon from '@material-ui/icons/UnfoldMore';
import styles from './Mui.css';

class ConditionDropdown extends Component {
  handleChangeValue = (e) => {
    const value = e.target.value;
    this.props.onChangeParam(value);
  }

  handleChangeJoin = (e) => {
    const value = e.target.value;
    this.props.onChangeJoin(value);
  }

  renderAnchor = () => {
    return (
      <DropdownIcon classes={ {root: this.props.classes.dropdownAnchor} }color='primary' />
    );
  }

  render() {
    const {classes} = this.props;

    return (
      <>
        <div className='condition-dropdown'>
          {this.props.join === 'must' ? (
            <div className='condition-dropdown__left'>
              The User Must
            </div>
          ) : (
            <div className='condition-dropdown__left'>
              <Select
                className='condition-dropdown__right-dropdown'
                classes={ {
                  root: classes.dropdown
                } }
                value={ this.props.join }
                IconComponent={ () => <> </> }
                MenuProps={ {
                  classes: {paper: classes.dropdownStyle}, //overrides dropdown styles
                  getContentAnchorEl: null
                } }
                onChange={ this.handleChangeJoin }
              >
                <MenuItem className='dropdown__menuItem' value='and'>And</MenuItem>
                <MenuItem className='dropdown__menuItem' value='or'>Or</MenuItem>
              </Select>
            </div>
          )}
          <div className='condition-dropdown__right'>
            <Select
              className='condition-dropdown__right-dropdown'
              classes={ {
                root: classes.dropdown
              } }
              value={ this.props.value }
              IconComponent={ this.renderAnchor }
              MenuProps={ {
                classes: {paper: classes.dropdownStyle}, //overrides dropdown styles
                getContentAnchorEl: null
              } }
              onChange={ this.handleChangeValue }
            >
              <MenuItem className='dropdown__menuItem' value='kill'>Kill</MenuItem>
              <MenuItem className='dropdown__menuItem' value='score'>Score</MenuItem>
              <MenuItem className='dropdown__menuItem' value='time'>Tmrating</MenuItem>
            </Select>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ConditionDropdown);