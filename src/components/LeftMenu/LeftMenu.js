import React, {Component} from 'react';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import {List, ListItem} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const LINKS = [
  {title: 'Challenges', href: '/challenges'},
  {title: 'Categories', href: '/categories'},
  {title: 'Popular Challege', href: '/popular'}
];

class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ''
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
          <List disablePadding>
            {LINKS.map((link) => (
              <ListItem key={ link.href } disableGutters>
                <NavLink
                  className='left-menu-item'
                  activeClassName='left-menu-item__active'
                  to={ link.href }
                  exact
                >
                  { link.title }
                </NavLink>
              </ListItem>
            ))}
          </List>
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