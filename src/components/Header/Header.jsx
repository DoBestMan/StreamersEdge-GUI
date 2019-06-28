/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderLogo from '../../assets/images/se-logo.png';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import avatarIcon from '../../assets/images/avataricon.png'
import avatarIconActive from '../../assets/images/avataricon.png'
import menuIcon from '../../assets/images/menuicon.png';

class Header extends Component {
  
  render() {
    const path = this.props.location.pathname;

    return(
  <>
    <div className='header'>
      <div className='header-left'>
        <img className='meme' src={ menuIcon } alt='menuIcon'></img>
          <NavLink exact className="header-link" activeClassName="" to="">Menu</NavLink>
          <NavLink exact className="header-link" activeClassName="" to="">Popular</NavLink>
      </div>
      <div className='header-center'>
      <img className='headerimage' src={ HeaderLogo } alt='Header'></img>
      </div>
      <div className='header-right'>
        <NavLink exact className="header-link" activeClassName="header-link__active" to="/sign-up">Sign Up</NavLink>
        <NavLink exact className="header-link" activeClassName="header-link__active" to="/login">Log In</NavLink>
        <img className='meme' src={ path === '/login' ? avatarIcon : avatarIconActive} alt='avatar'></img>
      </div>
    </div>
    <div className='header-divider__top'/>
  </>
    );
  }
}



export default Header;