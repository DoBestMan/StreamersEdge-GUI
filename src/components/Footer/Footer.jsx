import React, {Component} from 'react';
import {Config, GenUtil} from '../../utility';
const translate = GenUtil.translate;

class Footer extends Component {
  render() {
    return(
      <footer className='footer'>
        {translate('copyright')}
        <div className='app__version'>{Config.version}</div>
      </footer>
    );
  }
}

export default Footer;