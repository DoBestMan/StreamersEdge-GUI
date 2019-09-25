import React, {Component} from 'react';
import {
  TextField,
  FormLabel
} from '@material-ui/core';
import {translate} from '../../../../src/utility/GeneralUtils';

import Add from '../../../assets/images/preferences/Add.png';
import Close from '../../../assets/images/preferences/X.png';
import Close_Over from '../../../assets/images/preferences/X_Over.png';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    };
  }

  componentWillUnmount() {
    this.props.setError('search', null);
  }

  handleChangeQuery = (e) => {
    this.setState({
      searchQuery: e.target.value
    });
  }

  addUser = () => {
    const {searchQuery} = this.state;
    const {list, whiteList, addToList, setError, type} = this.props;

    let exists= list.includes(searchQuery);

    if(exists && !whiteList.includes(searchQuery)) {
      addToList(searchQuery);
      setError('search', null);
      this.setState({searchQuery: ''});
    } else if(whiteList.includes(searchQuery)){
      if (type === 'user') {
        setError('search', translate('preferences.invites.errors.user.alreadyAdded'));
      } else {
        setError('search', translate('preferences.invites.errors.game.alreadyAdded'));
      }
    } else {
      if (type === 'user') {
        setError('search', translate('preferences.invites.errors.user.notFound'));
      } else {
        setError('search', translate('preferences.invites.errors.game.notFound'));
      }
    }
  }

  render() {
    const {type, classes, whiteList, errors} = this.props;

    return (
      <>
        <div className='userSearch'>
          <TextField
            name='search'
            placeholder={ type === 'user' ?
              translate('preferences.invites.searchUsersPlaceholder') :
              translate('preferences.invites.searchGamesPlaceholder')
            }
            variant='outlined'
            value={ this.state.searchQuery }
            onChange={ this.handleChangeQuery }
            className={ 'userSearch__textbox' }
            InputProps={ {
              classes: {
                input: classes.userSearchTextbox, notchedOutline: classes.textboxBorder
              }
            } }
          />
          <img src={ Add } onClick={ this.addUser } alt=''/>
        </div>
        <FormLabel className={ 'errorLabel' } shrink='true' error={ true }>{errors.search}</FormLabel>
        {whiteList.length > 0 ?
          <div>
            {whiteList.map((item, index) => (
              <div className='whitelistedUsers' key={ index }>
                <p className='whitelistedUsers__text'>{item}</p>
                <img className='whitelistedUsers__image'
                  src={ Close }
                  alt=''
                  onClick={ this.props.removeFromList.bind(this, index) }
                  onMouseOver={ (e) => e.currentTarget.src = Close_Over }
                  onMouseOut={ (e) => e.currentTarget.src = Close }
                />
              </div>
            ))}
          </div>
          :
          null
        }
      </>
    );
  }
}

export default SearchForm;