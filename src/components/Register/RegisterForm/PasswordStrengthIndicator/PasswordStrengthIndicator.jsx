import React, {Component} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import zxcvbn from 'zxcvbn';
import {withStyles} from '@material-ui/core/styles';
import {GenUtil} from '../../../../utility';
import styles from './MUI.css';

const translate = GenUtil.translate;

class PasswordStrengthIndicator extends Component {

  render() {
    const {classes, password, error} = this.props;
    let values = [0, 0, 0, 0];
    let rootBarStyles = [classes.rootBar, classes.rootBar, classes.rootBar, classes.rootBar];
    let stage = classes.stage1;
    let rank = '';

    if (password) {
      let score = zxcvbn(password).score;

      if (error) {
        score = 0;
      }

      if (score === 0) {
        stage = classes.stage1;
        rank = translate('register.passwordStrength.veryWeak');
      } else if (score === 1) {
        stage = classes.stage1;
        rootBarStyles[0] = classes.rootBarFilled;
        rank = translate('register.passwordStrength.veryWeak');
      } else if (score === 2) {
        stage = classes.stage2;
        rootBarStyles[0] = classes.rootBarFilled;
        rootBarStyles[1] = classes.rootBarFilled;
        rank = translate('register.passwordStrength.weak');
      } else if (score === 3) {
        stage = classes.stage3;
        rootBarStyles[0] = classes.rootBarFilled;
        rootBarStyles[1] = classes.rootBarFilled;
        rootBarStyles[2] = classes.rootBarFilled;
        rank = translate('register.passwordStrength.medium');
      } else {
        stage = classes.stage4;
        rootBarStyles[0] = classes.rootBarFilled;
        rootBarStyles[1] = classes.rootBarFilled;
        rootBarStyles[2] = classes.rootBarFilled;
        rootBarStyles[3] = classes.rootBarFilled;
        rank = translate('register.passwordStrength.strong');
      }

      for (const index of values.keys()) {
        if (score-1 >= index) {
          values[index] = 100;
        } else {
          values[index] = 0;
        }
      }
    }

    return (
      <>
      <div className='password-indicator'>
        <LinearProgress classes={  {root: rootBarStyles[0], bar: stage} } color='primary' variant='determinate' value={ values[0] }/>
        <LinearProgress classes={  {root: rootBarStyles[1], bar: stage} } color='primary' variant='determinate' value={ values[1] }/>
        <LinearProgress classes={  {root: rootBarStyles[2], bar: stage} } color='primary' variant='determinate' value={ values[2] }/>
        <LinearProgress classes={  {root: rootBarStyles[3], bar: stage} } color='primary' variant='determinate' value={ values[3] }/>
      </div>
      <div className='password-indicator__status'>{rank}</div>
      </>
    );
  }
}


export default withStyles(styles)(PasswordStrengthIndicator);
