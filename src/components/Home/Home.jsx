import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileService from '../../services/ProfileService';
import AccountActions from '../../actions/AccountActions';
import {bindActionCreators} from 'redux';

class Home extends Component{

  // Redirect to dashboard, if the user is not logged in then they will go to the login page instead.
  componentDidMount() {
    ProfileService.getProfile().then((profile) => {
      console.log(profile);
      this.props.setAccount(profile);
      this.props.setLoggedIn(true);
      this.props.history.push('/dashboard');
    });

  }

  handleChange = (val) => {
    this.setState({inputValue: val});
  }
  
  render(){
    
    return(
      <div className='code-me'>
        You are not logged in
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({setLoggedIn: AccountActions.setIsLoggedInAction,
      setAccount: AccountActions.setAccountAction
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Home);