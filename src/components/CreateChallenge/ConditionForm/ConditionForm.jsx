import React, {Component} from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {GenUtil} from '../../../utility';

import styles from './Mui.css';
import ConditionDropdown from './ConditionDropdown';
import ConditionStandard from './ConditionStandard';
import {sUSD} from '../../../assets/images/challenge';

const trans = GenUtil.translate;

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
            <p>{trans('createChallenge.condition.label')}</p>

            {conditions.map((condition, index) => (
              <div key={ index } className='condition-form__condition'>
                <ConditionDropdown
                  join={ condition.join }
                  value={ condition.param }
                  gameStats={ this.props.gameStats }
                  onChangeJoin = { (newJoin) => this.handleChangeJoin(index, newJoin) }
                  onChangeParam={ (newParam) => this.handleChangeParam(index, newParam) }
                />
                <ConditionStandard
                  type='param'
                  size='small'
                  value={ condition.value }
                  onChange={ (newValue) => this.handleChangeValue(index, newValue) }
                />
                <Button
                  className={ classNames({'condition-form__invisible': index !== conditions.length - 1}) }
                  classes={ {root: classes.addButton} }
                  onClick={ () => this.handleClickAdd(index) }
                >
                  {`+ ${trans('createChallenge.condition.add')}`}
                </Button>
                <Button
                  className={ classNames({'condition-form__invisible': index === 0}) }
                  classes={ {root: classes.deleteButton} }
                  onClick={ () => this.handleClickDelete(index) }
                >
                  <DeleteIcon fontSize='large' classes={ {root: classes.deleteIcon} } />
                </Button>
              </div>
            ))}
          </div>

          <div className='condition-form__bounty'>
            <span className='condition-form__bounty-label'>{trans('createChallenge.condition.bounty')}</span>
            <ConditionStandard
              type='bounty'
              size='large'
              value={ this.props.ppyAmount }
              onChange={ (value) => this.props.onChange('ppyAmount', value) }
            />
            <img className='condition-form__bounty-currency' src={ sUSD } alt='' />
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ConditionForm);
