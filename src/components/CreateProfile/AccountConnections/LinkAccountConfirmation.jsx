import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LinkAccountConfirmation extends Component {
  render() {
    const platform = this.props.platform.charAt(0).toUpperCase() + this.props.platform.slice(1);

    return (
      <div>
        <Dialog open={ this.props.open } onClose={ this.props.handleClose } aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>{platform}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.props.handleClose } color='primary' style={ {backgroundColor: 'red'} }>
              Disagree
            </Button>
            <Button onClick={ this.props.submit } color='primary' style={ {backgroundColor: 'black'} } autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LinkAccountConfirmation;
