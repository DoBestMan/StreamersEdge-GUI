import React, {Component} from 'react';
import {profileDefault, profileDefaultActive, avatarFrame} from '../../assets/images/avatar';
import {ValidationUtil, StorageUtil, GenUtil} from '../../utility';
import {ProfileService} from '../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AccountActions} from '../../actions';
import {UploadFileTypes} from '../../constants';
import classNames from 'classnames';
import imageCompression from 'browser-image-compression';
import CircularProgress from '@material-ui/core/CircularProgress';
const translate = GenUtil.translate;

class ProfilePictureUpload extends Component {
  state = {
    avatar: this.props.avatar ? this.props.avatar : profileDefault,
    frame: avatarFrame,
    loading: false,
    errorMessage: ''
  };

  onChooseFile = (event) => {
    const file = event.target.files[0];

    if (!!file) {
      this.setState({loading: true});

      if (this.isValidImage(file)) {
        this.compressFile(file);
      }
    }
  };

  compressFile = async (file) => {
    let options = {
      maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
      maxWidthOrHeight: 800, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
      useWebWorker: true // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
    };

    try {
      const compressedFile = await imageCompression(file, options);
      this.onUpload(compressedFile);
    } catch (error) {
      this.setState({
        loading: false,
        errorMessage: error
      });
    }
  };

  onUpload = (file) => {
    const data = new FormData();
    data.append('file', file);

    ProfileService.uploadProfilePicture(data)
      .then((profile) => {
        this.props.setAccount(profile);
        this.setState({
          avatar: profile.avatar,
          errorMessage: ''
        });
        StorageUtil.set('se-user', JSON.stringify(profile));
        this.setState({loading: false, showErrorText: false});
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errorMessage: err
        });
      });
  };

  isValidImage = (file) => {
    const err = ValidationUtil.imageUpload(file, UploadFileTypes.IMAGE.PROFILE);

    if (err) {
      this.setState({
        loading: false,
        errorMessage: err
      });
      this.render();
      return false;
    } else {
      this.setState({errorMessage: ''});
      return true;
    }
  };

  mouseOver = () => {
    if (this.props.avatar) {
      this.setState({frame: avatarFrame});
    } else {
      this.setState({frame: avatarFrame, avatar: profileDefaultActive});
    }
  };

  mouseOut = () => {
    if (this.props.avatar) {
      this.setState({frame: avatarFrame});
    } else {
      this.setState({frame: avatarFrame, avatar: profileDefault});
    }
  };

  render() {
    const {frame, avatar} = this.state;
    return (
      <>
        <div className='profile__wrapper'>
          <label htmlFor='file-input'>
            {this.props.customAvatar ?
              <div>
                {
                  this.state.loading ?
                    <CircularProgress className='profile__loader'/> :
                    <img className={ classNames('profile__picture', {'profile-picture__prop' : !this.props.avatar}) } src={ this.props.avatar || this.props.customAvatar } alt='' />
                }
                <img className={ classNames('profile__frame', {'profile-frame__prop' : !this.props.avatar}) } src={ frame } alt='' />
              </div>
              :
              <div>
                {
                  this.state.loading ? <CircularProgress className='profile__loader'/> : <img className='profile__picture' src={ avatar } alt='' />
                }
                <img className='profile__frame' src={ frame } onMouseOver={ this.mouseOver } onMouseOut={ this.mouseOut } alt='' />
              </div>
            }
          </label>
        </div>
        <input className='image__upload ' id='file-input' type='file' onChange={ this.onChooseFile } />

        <div className='profile__upload-avatar'>
          <span className='profile__upload-avatar-label'>{translate('updateProfile.userInfo.avatar')}</span>
          <span className='profile__upload-img-text'>{this.state.errorMessage}</span>
        </div>


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
