import React, {Component} from 'react';
import {NavLink as Link} from 'react-router-dom';
import {List, ListItem} from '@material-ui/core';

class NavLink extends Component {
  render() {
    const {links, ...others} = this.props;

    return (
      <>
        <List { ...others } disablePadding>
          {links.map((link) => (
            <ListItem key={ link.href } disableGutters>
              <Link
                className='navlink-item'
                activeClassName='navlink-item__active'
                to={ link.href }
                exact
              >
                { link.title }
              </Link>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

export default NavLink;
