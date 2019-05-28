import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Translate} from 'react-redux-i18n';

class Home extends Component{
  render(){
    return(
        <>
        <p className='code-me'>
          <Translate value='codeMe' />
          <Button className='btn btn--red'>Material UI Button</Button>
        </p>
      </>
    );
  }
}

export default Home;