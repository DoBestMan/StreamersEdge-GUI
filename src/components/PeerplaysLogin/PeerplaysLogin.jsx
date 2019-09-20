import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from '@material-ui/core';

import {GenUtil} from '../../utility';
import {ModalActions} from '../../actions';
import {peerplaysImg2X} from '../../assets/images/socials';

import PeerplaysLoginForm from './PeerplaysLoginForm';

const translate = GenUtil.translate;

/**
 * TODO:
 * - realtime account lookup implementation similar to peerplays-core-gui account login username field.
 * - error messages in html markup reflecting status of account auth or above ^
 * - depending on use-case, proper redux state, actions, & reducers tweaking.
 * - see other TODO blocks within this .jsx file.
 */
class PeerplaysLogin extends Component {
  render() {
    return (
      <>
        <div className='peerplayslogin-page'>
          <IconButton className='donate__close' aria-label='Close' onClick={ this.props.toggleModal }>
            <CloseIcon />
          </IconButton>
          <img
            src={ peerplaysImg2X }
            alt='Peerplays Global'
            width='360'
            height='90'
            onMouseOver={ (e) => (e.currentTarget.src = peerplaysImg2X) }
            onMouseOut={ (e) => (e.currentTarget.src = peerplaysImg2X) }
          />
          <span className='peerplayslogin__subHeader'>{translate('peerplays.login')}</span>
          <PeerplaysLoginForm goRegister={ this.props.goRegister } />
        </div>
      </>
    );
  }
}

PeerplaysLogin.propTypes = {
  goRegister: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['account', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeerplaysLogin);
