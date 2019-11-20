import React, {Component} from 'react';
import {FormControl} from '@material-ui/core';
import CustomInput from '../../CustomInput';
import GameAvatar from '../../GameAvatar';
import {GenUtil, ValidationUtil} from '../../../utility';

import {Fortnite, PUBG, Legends} from '../../../assets/images/challenge';
import {EmailIcon, EmailIconActive, InvalidIcon} from '../../../assets/images/signup';

const trans = GenUtil.translate;
const GAMES = [
  {name: 'Fortnite', value: 'fortnite', src: Fortnite},
  {name: 'PUBG', value: 'pubg', src: PUBG},
  {name: 'League of Legends', value: 'league of legends', src: Legends}
];

class ChallengeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchList: GAMES,
      isNameClicked: false
    };
  }

  handleChangeName = (newValue) => {
    this.setState({
      isNameClicked: true
    });
    this.props.onChange('name', newValue);
  }

  handleChangeSearchString = (newValue) => {
    let searched = [];
    // eslint-disable-next-line
    GAMES.map((game) => {
      if (game.value.includes(newValue.toLowerCase())) {
        searched.push(game);
      }
    });
    this.setState({
      searchString: newValue,
      searchList: searched.length ? searched : GAMES
    });
  }

  render() {
    const {searchList} = this.state;

    return (
      <>
        <div className='challenge-info'>
          <FormControl fullWidth>
            <p className='challenge-info__formlabel'>{ trans('createChallenge.name.label') }</p>
            <CustomInput
              name='name'
              value={ this.props.challengeName }
              muiInputClass='inputRegister'
              hasActiveGlow={ true }
              maxLength={ 60 }
              placeholder={ trans('createChallenge.name.placeholder') }
              handleChange ={ this.handleChangeName }
              iconRightActive={ InvalidIcon }
              isValid={ () => {
                if (this.state.isNameClicked) {
                  return ValidationUtil.challengeName(this.props.challengeName).success;
                } else {
                  return true;
                }
              } }
              handleRightIconClick={ () => {
                return  ValidationUtil.challengeName(this.props.challengeName).errors;
              } }
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth>
            <p className='challenge-info__formlabel'>{ trans('createChallenge.game.label') }</p>
            <CustomInput
              name='search'
              muiInputClass='inputRegister'
              hasActiveGlow={ true }
              placeholder={ trans('createChallenge.game.placeholder') }
              iconLeft={ EmailIcon }
              iconLeftActive={ EmailIconActive }
              handleChange={ this.handleChangeSearchString }
              fullWidth
            />
          </FormControl>
          <div className='challenge-info__game'>
            {!!searchList.length && searchList.map((game) => {
              const isSelected = game.value === this.props.challengeGame;

              return (
                <GameAvatar
                  key={ game.value }
                  name={ game.name }
                  value={ game.value }
                  src={ game.src }
                  selected={ isSelected }
                  onClick={ (value) => this.props.onChange('game', value) }
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ChallengeForm;