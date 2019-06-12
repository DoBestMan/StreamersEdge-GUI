import React, {Component} from 'react';
// import Button from '@material-ui/core/Button';
// import {Link} from 'react-router-dom';
// import {Translate} from 'react-redux-i18n';
import SignupInput from '../../components/SignupInput';
import Input from '../../../src/assets/images/signup_email_input.png';
import InputActive from '../../../src/assets/images/signup_email_active_input.png';
class Home extends Component{
  state = {
    inputValue: ''
  };

  handleChange = (val) => {
    this.setState({inputValue: val});
  }
  
  render(){
    
    return(
      <div>
        <SignupInput handleChange={ this.handleChange } inputValue={ this.state.inputValue } inputImage={ Input } activeInputImage={ InputActive }/>
        <button>sadasdas</button>
      </div>
    );
  }
}

export default Home;

/*
import React, {Component} from 'react';
import InputField from '../InputField';

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
<<<<<<< HEAD
        <InputField handleChange={ this.handleChange } inputValue={ this.state.inputValue } />
=======
        <Dropdown dropdownList={ this.state.platforms } handleChange={ this.changePlatform.bind(this) }  selectedValue={ this.state.selectedValue }/>
>>>>>>> develop
      </>
    );
  }
}

export default Home;
*/