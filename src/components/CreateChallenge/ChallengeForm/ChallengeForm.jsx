import React, {Component} from 'react';
import {FormControl} from '@material-ui/core';
import CustomInput from '../../CustomInput';
import GameAvatar from '../../GameAvatar';
import {GenUtil} from '../../../utility';

import {Fortnite, PUBG, Legends} from '../../../assets/images/challenge';
import {EmailIcon, EmailIconActive} from '../../../assets/images/signup';

const trans = GenUtil.translate;
const GAMES = [
  {name: 'Fortnite', value: 'fortnite', src: Fortnite},
  {name: 'PUBG', value: 'pubg', src: PUBG},
  {name: 'League of Legends', value: 'legends', src: Legends}
];

class ChallengeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ''
    };
  }

  handleChangeSearchString = (newValue) => {
    this.setState({
      searchString: newValue
    });
  }

  render() {
    return (
      <>
        <div className='challenge-info'>
          <FormControl fullWidth>
            <p className='challenge-info__formlabel'>{ trans('createChallenge.name.label') }</p>
            <CustomInput
              name='name'
              muiInputClass='inputRegister'
              hasActiveGlow={ true }
              placeholder={ trans('createChallenge.name.placeholder') }
              handleChange ={ this.props.onChangeName }
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
            {GAMES.map((game) => {
              const isSelected = game.value === this.props.challengeGame;

              return (
                <GameAvatar
                  key={ game.value }
                  name={ game.name }
                  value={ game.value }
                  src={ game.src }
                  selected={ isSelected }
                  onClick={ this.props.onChangeGame }
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