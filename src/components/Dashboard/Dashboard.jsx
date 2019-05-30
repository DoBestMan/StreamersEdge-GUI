import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {
  render() {
    return(
      <>
        <span className='dashboard'>Dashboard component</span>
      </>
    );
  }
}

export default connect()(Dashboard);