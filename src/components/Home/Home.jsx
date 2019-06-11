import React, {Component} from 'react';
import Dropdown from '../Dropdown';

// import Button from '@material-ui/core/Button';
// import {Link} from 'react-router-dom';
// import {Translate} from 'react-redux-i18n';

class Home extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      platforms: ['Twitch', 'NNoopep', 'ZuckBook'], 
      selectedValue: ''
    };
  }

  changePlatform(val) {
    this.setState({selectedValue: val});
  }
  
  render(){

    return(
      <>
        <Dropdown dropdownList={ this.state.platforms } handleChange={ this.changePlatform.bind(this) }  selectedValue={ this.state.selectedValue }/>
      </>
    );
  }
}

export default Home;