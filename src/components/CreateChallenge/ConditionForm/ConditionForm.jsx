import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Mui.css';
import ConditionDropdown from './ConditionDropdown';
import ConditionStandard from './ConditionStandard';
import {sUSD} from '../../../assets/images/challenge';

class ConditionForm extends Component {
  handleClickAdd = (index) => {
    this.props.onChangeConditions('add', index);
  }

  handleClickDelete = (index) => {
    this.props.onChangeConditions('delete', index);
  }

  handleChangeJoin = (index, newJoin) => {
    this.props.onChangeConditions('update', index, Object.assign(this.props.conditions[index], {join: newJoin}));
  }

  handleChangeParam = (index, newParam) => {
    this.props.onChangeConditions('update', index, Object.assign(this.props.conditions[index], {param: newParam}));
  }

  handleChangeValue = (index, newValue) => {
    this.props.onChangeConditions('update', index, Object.assign(this.props.conditions[index], {value: newValue}));
  }

  render() {
    const {classes, conditions} = this.props;

    return (
      <>
        <div className='condition-form__wrapper'>
          <div className='condition-form__conditions'>
            <p>Challenge Conditions</p>

            <div className='condition-form__condition'>
              <ConditionDropdown
                join={ conditions[0].join }
                value={ conditions[0].param }
                onChangeJoin = { (newJoin) => this.handleChangeJoin(0, newJoin) }
                onChangeParam={ (newParam) => this.handleChangeParam(0, newParam) }
              />
              <ConditionStandard value={ conditions[0].value } size='small' onChange={ (newValue) => this.handleChangeValue(0, newValue) } />
              <Button classes={ {root: classes.addButton} } onClick={ () => this.handleClickAdd(0) }>
                + Add
              </Button>
              <Button className='condition-form__invisible' classes={ {root: classes.deleteButton} }>
                <DeleteIcon fontSize='large' classes={ {root: classes.deleteIcon} } />
              </Button>
            </div>
            {conditions.length > 1 && conditions.slice(1).map((condition, index) => (
              <div key={ index } className='condition-form__condition'>
                <ConditionDropdown
                  join={ condition.join }
                  value={ condition.param }
                  onChangeJoin = { (newJoin) => this.handleChangeJoin(index + 1, newJoin) }
                  onChangeParam={ (newParam) => this.handleChangeParam(index + 1, newParam) }
                />
                <ConditionStandard value={ condition.value } size='small' onChange={ (newValue) => this.handleChangeValue(index + 1, newValue) } />
                <Button classes={ {root: classes.addButton} } onClick={ () => this.handleClickAdd(index + 1) }>
                  + Add
                </Button>
                <Button classes={ {root: classes.deleteButton} } onClick={ () => this.handleClickDelete(index + 1) }>
                  <DeleteIcon fontSize='large' classes={ {root: classes.deleteIcon} } />
                </Button>
              </div>
            ))}
          </div>

          <div className='condition-form__bounty'>
            <span className='condition-form__bounty-label'>Bounty</span>
            <ConditionStandard value={ this.props.ppyAmount } size='large' onChange={ this.props.onChangePPY } />
            <img className='condition-form__bounty-currency' src={ sUSD } alt='' />
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ConditionForm);
