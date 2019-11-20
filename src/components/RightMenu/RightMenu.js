import React, {Component} from 'react';
import classNames from 'classnames';
import UserDetails from './UserDetails';
import NavLink from '../NavLink';
import InviteContainer from './InviteContainer';
import {GenUtil} from '../../utility';

const trans = GenUtil.translate;

class RightMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        {title: trans('rightMenu.links.update'), href: '/update-profile'},
        {title: trans('rightMenu.links.preferences'), href: '/preferences'},
        {title: trans('rightMenu.links.create'), href: '/create-challenge'}
      ]
    };
  }

  render() {
    return (
      <>
        <div className={ classNames('right-menu', {'right-menu__open': this.props.open}) }>
          <UserDetails />
          <NavLink links={ this.state.links } className='right-menu-links'/>
          <InviteContainer />
        </div>
      </>
    );
  }
}

export default RightMenu;
