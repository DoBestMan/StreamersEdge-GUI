import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {ValidIcon, InvalidIcon} from '../../assets/images/signup';
import {connect} from 'react-redux';

class ErrorBoxValidation extends Component {

  render() {
    const top = this.props.position ? this.props.position.top - 20 : 0;
    const left = this.props.position ? this.props.position.left + 60 : 0;

    return (
      <div>
        <div style={ {position: 'absolute', zIndex: 3500, top:top, left: left} }>
          {this.props.visibility ?
            <div className='errorBox__validation'>
              <div className='errorBox__validation_header'><p>Invalid</p></div>
              <div className='errorBox__validation_text'>
                {this.props.validationConditions.map((err, index)=> {
                  return <div  style={ {display:'flex'} } key={ index }>
                    {err.success ?
                      <img className='errorBox__validation__img' src={ ValidIcon } alt='valid icon'/> :
                      <img className='errorBox__validation__img' src={ InvalidIcon } alt='valid icon'/>
                    }
                    <span style={ {display: 'inline-block'} }>{err.errorString}</span>
                  </div>;
                })}
              </div>
            </div> : null}
        </div>
      </div>);
  }
}
ErrorBoxValidation.propTypes = {
  visibility: PropTypes.bool,
  validationConditions: PropTypes.arrayOf(PropTypes.shape({
    errorString: PropTypes.string,
    success: PropTypes.bool
  }))
};

const mapStateToProps = (state) => ({
  visibility: state.getIn(['errorBox', 'visibility']),
  validationConditions: state.getIn(['errorBox', 'validationConditions']),
  position: state.getIn(['errorBox', 'position'])
});


export default connect(
  mapStateToProps,
)(ErrorBoxValidation);
