import React, {Component} from 'react';
import {profileDefault, profileDefaultActive, uploadFrame, uploadFrameActive} from '../../../../assets/images/avatar';
import {ValidationUtil, StorageUtil} from '../../../../utility';
import {ProfileService} from '../../../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AccountActions} from '../../../../actions';

class ProfilePictureUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {avatar: this.props.avatar ? this.props.avatar : profileDefault, frame: uploadFrame};
  }

  onChooseFile = (event) => {
    const file = event.target.files[0];

    if (!!file && this.checkMimeType(file) && this.maxSelectFile(file)) {
      this.onUpload(file);
    }
  };

  onUpload = (file) => {
    const data = new FormData();
    data.append('file', file);

    ProfileService.uploadProfilePicture(data)
      .then((profile) => {
        this.props.setAccount(profile);
        this.setState({
          avatar: profile.avatar
        });
        StorageUtil.set('se-user', JSON.stringify(profile));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  maxSelectFile(file) {
    const err = ValidationUtil.fileSize(file);

    if (err) {
      !!this.props.error ? this.props.error(err) : console.log(err);
      return false;
    } else {
      return true;
    }
  }

  // Return true if pass
  checkMimeType(file) {
    const err = ValidationUtil.imageType(file);

    if (err) {
      !!this.props.error ? this.props.error(err) : console.log(err);
      return false;
    } else {
      return true;
    }
  }

  mouseOver = () => {
    if (this.props.avatar) {
      this.setState({frame: uploadFrameActive});
    } else {
      this.setState({frame: uploadFrameActive, avatar: profileDefaultActive});
    }
  };

  mouseOut = () => {
    if (this.props.avatar) {
      this.setState({frame: uploadFrame});
    } else {
      this.setState({frame: uploadFrame, avatar: profileDefault});
    }
  };

  render() {
    const {frame, avatar} = this.state;
    return (
      <>
        <div className='profile__wrapper'>
          <label htmlFor='file-input'>
            <img className='profile__picture' src={ avatar } alt='' />
            <img className='profile__frame' src={ frame } onMouseOver={ this.mouseOver } onMouseOut={ this.mouseOut } alt='' />
          </label>
        </div>

        <input className='image__upload ' id='file-input' type='file' onChange={ this.onChooseFile } />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({setAccount: AccountActions.setAccountAction}, dispatch)
  };
};

const mapStateToProps = (state) => ({
  avatar: state.getIn(['profiles', 'currentAccount', 'avatar']),
  account: state.getIn(['profiles', 'currentAccount'])
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePictureUpload);
