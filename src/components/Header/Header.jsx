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

  openSignUpModal = () => {
    this.props.setModalType(ModalTypes.SIGN_UP);
    this.props.toggleModal();
  };

  render() {
    let logButton = (
      <span onClick={ this.openLoginModal } className='header__link'>
        {translate('header.login')}
      </span>
    );

    const signUpButton = (
      <span onClick={ this.openSignUpModal } className='header__link'>
        {translate('header.signup')}
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
            {signUpButton}
            {logButton}
            <img className={ this.props.isLoggedIn ? 'header__logo' : 'header__logo--display-none' } src={ loginIcon }
              onMouseOver={ (e) => e.currentTarget.src = loginIconActive } onMouseOut={ (e) => e.currentTarget.src =  loginIcon } alt='avatar' />
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
