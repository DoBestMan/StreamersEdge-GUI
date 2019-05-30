import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AppActions from '../../actions/AppActions';
import {bindActionCreators} from 'redux';
import querystring from 'query-string';

class Login extends Component {
  handleSubmit() {
    let next;

    if (this.props.location.search) {
      next = querystring.parse(this.props.location.search).next;
    }

    this.props.login({name: 'freddy3', id: -1}, next);
  }

  render() {
    return(
      <>
        <p className='login'>Login component</p>
        <Button className='btn btn--red' onClick={ this.handleSubmit.bind(this) }>Fake Auth</Button>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({login: AppActions.login}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Login);