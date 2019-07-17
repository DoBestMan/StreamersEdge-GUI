/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {Card, CardActions, Button, InputLabel, CircularProgress} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {PeerplaysAuthUtil, ValidationUtil} from '../../utility';
import {AuthService, PeerplaysService} from '../../services';
import styles from './MUI.css';

/**
 * TODO:
 * - realtime account lookup implementation similar to peerplays-core-gui account login username field.
 * - error messages in html markup reflecting status of account auth or above ^
 * - depending on use-case, proper redux state, actions, & reducers tweaking.
 * - see other TODO blocks within this .jsx file.
 */
class PeerplaysLogin extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      errors: {
        username: null,
        login: null
      }
    };
  }
  /**
   * Event handler for opening modal that contains the form for which the end user is to enter their username and password credentials for their already existing peerplays account.
   *
   * @memberof PeerplaysLogin
   */
  componentDidMount = () => {
    // Connect to blockchain
    PeerplaysService.connectToBlockchain(this.loading);
  };

  loading = (val) => {
    this.setState({loading: val});
  };

  handleSubmit = (values, {setFieldError, setSubmitting}) => {
    this.setState({loader: true});
    this.props.peerplaysLogin(values.username, values.password).then((res) => {
      if (res.isAuth) {
        const account = {
          youtube: '',
          facebook: '',
          peerplaysAccountName: values.username,
          bitcoinAddress: ''
        };

        AuthService.linkPeerplaysAccount(account).then(() => {
          this.handleRedirect();
        });
      } else {
        setFieldError('username', 'Wrong Username or Password');
        this.setState({loader: false, login: res});
      }

      setSubmitting(false);
    });
  };

  validateUsername = (username) => {
    const error = ValidationUtil.username(username);
    this.setState({
      errors: {
        ...this.state.errors,
        username: error
      }
    });

    return error;
  };

  validateLogin = () => {
    const error = this.state.errors.login;

    if (!!error) {
      return 'Wrong Username or Password';
    } else {
      return null;
    }
  };

  //pass in redirect url, otherwise you are returned to dashboard
  handleRedirect = () => {
    !!this.props.redirect ? this.props.history.push(this.props.redirect) : this.props.history.push('/dashboard');
  };

  handleBackButtonRedirect = () => {
    !!this.props.backButtonRedirect ? this.props.history.push(this.props.backButtonRedirect) : this.props.history.push('/dashboard');
  };

  render() {
    const {classes} = this.props;
    const {errors, loading} = this.state;

    return (
      <div className='card'>
        <div className='card__header'>
          <p>Log In to the Peerplays Wallet</p>
        </div>
        <Card className='card__container'>
          <div className='card__body'>
            <Formik initialValues={ {username: '', password: ''} } onSubmit={ this.handleSubmit }>
              <Form id='peerplays-auth'>
                <div className='label'>
                  <InputLabel className='label--black'> Account Name </InputLabel>
                </div>
                <Field className='form__input' validate={ this.validateUsername } fullWidth margin='normal' variant='outlined' name='username' component={ TextField } />
                <div className='label'>
                  <InputLabel className='label--black'> Password </InputLabel>
                </div>
                <Field className='form__input' validate={ this.validateLogin } fullWidth margin='normal' variant='outlined' type='password' name='password' component={ TextField } />
                <CardActions className='form__btn-wrapper'>
                  <Button className={ `${classes.btnLogin} form__btn` } disabled={ loading || errors.username !== null } variant='contained' type='submit' form='peerplays-auth' color='inherit'>
                    {this.state.loading ? <CircularProgress className='loader' size='24' /> : <>LOG IN</>}
                  </Button>
                  <Button className={ `${classes.btnBack} btn-back` } onClick={ this.handleBackButtonRedirect }>
                    BACK
                  </Button>
                </CardActions>
              </Form>
            </Formik>
          </div>
        </Card>
        <div className='signup-link'>
          <a className='signup-link__text' href='https://github.com/PBSA/peerplays-core-gui/releases'>
            Don't have an account?
          </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    peerplaysLogin: PeerplaysAuthUtil.peerplaysLogin
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PeerplaysLogin));
