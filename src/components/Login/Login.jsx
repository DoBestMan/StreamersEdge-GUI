import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AppActions from '../../actions/AppActions';
import {bindActionCreators} from 'redux';
import querystring from 'query-string';
import PropTypes from 'prop-types';

class Login extends Component {
  static propTypes = {
    testSionSpy: PropTypes.func.isRequired
  };
  
  handleSubmit() {
    let next;

    if (this.props.location.search) {
      next = querystring.parse(this.props.location.search).next;
    }

    this.props.login({name: 'freddy3', id: -1}, next);
  }

  testSionSpy() {
    console.log('sion spy working');
  }

  render() {
    return(
      <div>
        <p className='login'>Login component</p>
        <Button className='btn btn--red' onClick={ this.handleSubmit.bind(this) }>Fake Auth</Button>
        <Button className='sion btn btn--red' onClick={ this.props.testSionSpy }>Sion Spy</Button>
      </div>
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