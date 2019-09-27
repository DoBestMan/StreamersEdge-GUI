import React, {Component} from 'react';
import classNames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import NavLink from '../NavLink';
import {GenUtil} from '../../utility';

const trans = GenUtil.translate;

class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      links: [
        {title: trans('leftMenu.links.challenges'), href: '/challenges'},
        {title: trans('leftMenu.links.categories'), href: '/categories'},
        {title: trans('leftMenu.links.popular'), href: '/popular'}
      ]
    };
  }

  handleChange = (e) => {
    this.setState({
      searchString: e.target.value
    });
  }

  render() {
    const {open, toggleOpen} = this.props;

    return (
      <>
        <div className={ classNames('left-menu', {'left-menu__open': open}) }>
          <div className='left-menu-search'>
            <input
              className='left-menu-search__input'
              placeholder='Search Users, Challenges...'
              value={ this.state.searchString }
              onChange={ this.handleChange }
            />
            <div className='left-menu-search__icon'>
              <SearchIcon className='left-menu-search__icon__color' fontSize='large' />
            </div>
          </div>
          <NavLink links={ this.state.links } className='left-menu-link' />
        </div>
        <div
          className={ classNames('left-menu-indicator', {'left-menu-indicator__open': open}) }
          onClick={ toggleOpen }
        />
      </>
    );
  }
}

export default LeftMenu;