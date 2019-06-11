/**
 * The LinkCrypto component is Step 3 of the Create/Update profile form.
 */

import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class LinkCrypto extends Component {

  constructor(props) {
    super(props);
    
    // Set the initial input values
    this.state = {
      type: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const {value} = event.target;
    this.setState({
      type: value
    });    
  }

  handleSubmit(event) {
    event.preventDefault();
    const type = this.state.type;
    console.log(type);
  }

      
  render () {
    return (
      <form className='root' autoComplete='off' onSubmit={ this.handleSubmit }>
        <FormControl className={ 'account-select' }>
          <InputLabel htmlFor='account' className='account-select'>Link cryptocurrency accounts</InputLabel>
          <Select
            value={ this.state.type }
            onChange={ this.handleChange }
            inputProps={ {
              name: 'Link Account',
              id: 'account'
            } }
          >
            <MenuItem value=''>
              <em>Select</em>
            </MenuItem>
            <MenuItem value={ 'Wallet' }>Link your wallet</MenuItem>
          </Select>
        </FormControl>
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
      GO
        </Button>
      </form>
    );
  }
}

export default LinkCrypto;
