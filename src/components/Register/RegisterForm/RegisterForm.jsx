
/**
 * Form that handles account creation
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AuthService from '../../../services/AuthService';

/*<TextField
    style={{
        backgroundColor: "blue"
    }}
    InputProps={{
        style: {
            color: "red"
        }
    }}
/>*/

class RegisterForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
  } 

  handleSubmit = (event) => {
    event.preventDefault();

    const account = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      repeatPassword: this.state.password
    };

    AuthService.register(account).then((r) => {
      console.log(r);
    });
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });    
  }
  
  render(){
    return(
      <>
       <form className='register-form' onSubmit={ this.handleSubmit }>
         <FormControl className='inputStyle' margin='normal' required fullWidth>
           <TextField OutlinedInputProps={ {style: {color: 'white'}} } 
             InputLabelProps={ {style: {color: 'white'}} } InputProps={ {style: {color: 'white'}} }
             label='Email' className='inputStyle register-form__input' name='email' onChange={ this.handleChange }/>
         </FormControl>
         <FormControl margin='normal' required fullWidth>
           <TextField InputLabelProps={ {style: {color: 'white'}} } 
             InputProps={ {style: {color: 'white'}} } label='Password' className='register-form__input' name='password' onChange={ this.handleChange }/>
         </FormControl>
         <FormControl margin='normal' required fullWidth>
           <TextField InputLabelProps={ {style: {color: 'white'}} } 
             InputProps={ {style: {color: 'white'}} } label='Username' className='register-form__input' name='username' onChange={ this.handleChange }/>
         </FormControl>
         <Button type='submit' style={ {color: 'white'} } variant='outlined'>
        Register
         </Button>
       </form>
      </>
    );
  }
}

export default RegisterForm;
