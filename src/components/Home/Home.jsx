import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

class Home extends Component{
  render(){
    return(
        <>
        <p className='code-me'>
          CODE ME!!
          <Button className='btn btn--red'>Material UI Button</Button>
        </p>
      </>
    );
  }
}

export default Home;