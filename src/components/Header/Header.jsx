import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {AppActions, ModalActions} from '../../actions';
import {GenUtil} from '../../utility';
import {ModalTypes} from '../../constants';
import HeaderLogo from '../../assets/images/se-logo.png';
import loginIcon from '../../assets/images/loginicon.png';
import loginIconActive from '../../assets/images/loginicon_active.png';
import menuIcon from '../../assets/images/menuicon.png';
const translate = GenUtil.translate;
class Header extends Component {
  openLoginModal = () => {
    this.props.setModalType(ModalTypes.LOGIN);
    this.props.toggleModal();
  };

  render() {
    const path = this.props.location.pathname;
    let logButton = (
      <span onClick={ this.openLoginModal } className='header-link'>
        {translate('header.login')}
      </span>
    );

    if (this.props.isLoggedIn) {
      logButton = (
        <span onClick={ this.props.logout } className='header-link'>
          {translate('header.logout')}
        </span>
      );
    }

    return (
      <>
        <div className='header'>
          <div className='header-left'>
            <img src={ menuIcon } alt='menuIcon' />
            <NavLink exact className='header-link' activeClassName='' to=''>
              {translate('header.menu')}
            </NavLink>
            <NavLink exact className='header-link' activeClassName='' to=''>
              {translate('header.popular')}
            </NavLink>
          </div>
          <div className='header-center'>
            <img className='headerimage' src={ HeaderLogo } alt='Header' />
          </div>
          <div className='header-right'>
            <NavLink exact className='header-link' activeClassName='header-link__active' to='/sign-up'>
              {translate('header.signup')}
            </NavLink>
            {logButton}
            <img src={ path === '/login' ? loginIconActive : loginIcon } alt='avatar' />
          </div>
        </div>
        <div className='header-divider__top' />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.getIn(['modal', 'isOpen']),
  modalType: state.getIn(['modal', 'type']),
  isLoggedIn: state.getIn(['account', 'isLoggedIn'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    logout: AppActions.logout
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
