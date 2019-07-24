import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {AppActions, ModalActions} from '../../actions';
import {GenUtil} from '../../utility';
import {ModalTypes, RouteConstants as Routes} from '../../constants';
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
    let logButton = (
      <span onClick={ this.openLoginModal } className='header__link'>
        {translate('header.login')}
      </span>
    );

    if (this.props.isLoggedIn) {
      logButton = (
        <span onClick={ this.props.logout } className='header__link'>
          {translate('header.logout')}
        </span>
      );
    }

    return (
      <>
        <div className='header'>
          <div className='header--left'>
            <img src={ menuIcon } alt='menuIcon' />
            <NavLink exact className='header__link' activeClassName='' to=''>
              {translate('header.menu')}
            </NavLink>
            <NavLink exact className='header__link' activeClassName='' to=''>
              {translate('header.popular')}
            </NavLink>
          </div>
          <div className='header--center'>
            <img className='header__image' src={ HeaderLogo } alt='Header' />
          </div>
          <div className='header--right'>
            <NavLink exact className='header__link' activeClassName='header__link--active' to={ Routes.SIGN_UP }>
              {translate('header.signup')}
            </NavLink>
            {logButton}
            <img src={ this.props.path === '/login' ? loginIconActive : loginIcon } alt='avatar' />
          </div>
        </div>
        <div className='divider-radial' />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.getIn(['modal', 'isOpen']),
  modalType: state.getIn(['modal', 'type']),
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])
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
