import React, {Component} from 'react';
import {Config, GenUtil} from '../../utility';
const translate = GenUtil.translate;

class Footer extends Component {
  render() {
    return(
      <footer className='footer'>
        <div className='divider-radial'/>
        <span className='footer__copyright'>{translate('copyright')}</span>
        <div className='app__version'>{Config.version}</div>
      </footer>
    );
  }
}

export default Footer;