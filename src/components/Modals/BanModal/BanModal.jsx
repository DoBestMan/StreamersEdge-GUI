import React, {Component} from 'react';
import {BannedIcon, CrossIcon} from '../../../assets/images/ban/index';
import {ModalActions} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GenUtil} from '../../../utility';

const translate = GenUtil.translate;

class BanModal extends Component {
  render() {
    return (
      <div className='ban-card__wrapper'>
        <div className='ban-card'>
          <div className='ban-card__cross' onClick={ this.props.toggleModal }>
            <img className='ban-card__cross-img' src={ CrossIcon } alt=''/>
          </div>
          <div className='ban-card__icon'>
            <img className='ban-card__icon-img' src={ BannedIcon } alt=''/>
          </div>
          <div className='ban-card-text'>
            <p className='ban-card-text__primary'>{translate('ban.primary')}</p>
            <p className='ban-card-text__secondary'>{translate('ban.secondary')}<span className='ban-card-text__underlined'>{translate('ban.secondaryUnderlined')}</span></p>
            <p className='ban-card-text__secondary'>
              <span className='ban-card-text__blue'>{translate('ban.contact')}</span>{translate('ban.orSend')}<span className='ban-card-text__white'>{translate('ban.email')}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(BanModal);

