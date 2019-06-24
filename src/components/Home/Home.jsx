import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {Translate} from 'react-redux-i18n';

class Home extends Component{
  state = {
    inputValue: ''
  };

  handleChange = (val) => {
    this.setState({inputValue: val});
  }

  render(){

    return(
      <>
        <p className='code-me'>
          <Link to='/login'>Login</Link>
          <Link to='/dashboard'>
            <Button className='btn btn--red'>Dashboard</Button>
          </Link>
          <Translate value='codeMe' />
        </p>
      </>
    );
  }
}

export default Home;