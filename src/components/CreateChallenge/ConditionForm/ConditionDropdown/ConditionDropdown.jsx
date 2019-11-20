import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Select, MenuItem} from '@material-ui/core';
import DropdownIcon from '@material-ui/icons/UnfoldMore';
import {GenUtil} from '../../../../utility';
import styles from './Mui.css';

const trans = GenUtil.translate;

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
      <DropdownIcon classes={ {root: this.props.classes.dropdownAnchor} } color='primary' />
    );
  }

  render() {
    const {classes} = this.props;

    return (
      <>
        <div className='condition-dropdown'>
          {this.props.join === 'must' ? (
            <div className='condition-dropdown__left--select'>
              {trans('createChallenge.condition.conditions.must')}
            </div>
          ) : (
            <div className='condition-dropdown__left'>
              <Select
                className='condition-dropdown__right-dropdown'
                classes={ {
                  root: classes.dropdown,
                  select: classes.dropdownSelect
                } }
                value={ this.props.join }
                IconComponent={ () => <> </> }
                MenuProps={ {
                  classes: {paper: classes.dropdownStyle}, //overrides dropdown styles
                  getContentAnchorEl: null
                } }
                onChange={ this.handleChangeJoin }
              >
                <MenuItem className='dropdown__menuItem' value='AND'>{trans('createChallenge.condition.conditions.and')}</MenuItem>
                <MenuItem className='dropdown__menuItem' value='OR'>{trans('createChallenge.condition.conditions.or')}</MenuItem>
              </Select>
            </div>
          )}
          {this.props.gameStats && (
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
                {Object.entries(this.props.gameStats).map((stat) => (
                  <MenuItem key={ stat[1] } className='dropdown__menuItem' value={ stat[0] }>{stat[1]}</MenuItem>
                ))}
              </Select>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ConditionDropdown);