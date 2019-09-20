import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GenUtil} from '../../../utility';

const translate = GenUtil.translate;

class InformationBox extends Component {
  render() {
    let top, left;

    if (this.props.position) {
      top = this.props.position.top - 5;
      left = this.props.position.left + 30;
    }

    return this.props.position && (
      <>
        <div className='infobox-container' style={ {top: top, left: left} }>
          <div className='infobox-header'>
            {translate('peerplays.information.title')}
          </div>
          <div className='infobox-body'>
            {translate('peerplays.information.content')}
            <u>{translate('peerplays.information.register')}</u>
          </div>
        </div>
      </>
    );
  }
}

InformationBox.propTypes = {
  position: PropTypes.object.isRequired
};

export default InformationBox;
