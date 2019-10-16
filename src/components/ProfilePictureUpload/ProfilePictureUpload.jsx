import React, {Component} from 'react';
import {profileDefault, profileDefaultActive, avatarFrame} from '../../assets/images/avatar';
import {ValidationUtil, StorageUtil} from '../../utility';
import {ProfileService} from '../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AccountActions} from '../../actions';
import {UploadFileTypes} from '../../constants';
import classNames from 'classnames';

class ProfilePictureUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {avatar: this.props.avatar ? this.props.avatar : profileDefault, frame: avatarFrame};
  }

  onChooseFile = (event) => {
    const file = event.target.files[0];

    if (!!file && this.isValidImage(file)) {
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
        console.error(err);
      });
  };

  isValidImage = (file) => {
    const err = ValidationUtil.imageUpload(file, UploadFileTypes.IMAGE.PROFILE);

    if (err) {
      !!this.props.error ? this.props.error(err) : console.error(err);
      return false;
    } else {
      return true;
    }
  }

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
                <img className={ classNames('profile__picture', {'profile-picture__prop' : !this.props.avatar}) } src={ this.props.avatar || this.props.customAvatar } alt='' />
                <img className={ classNames('profile__frame', {'profile-frame__prop' : !this.props.avatar}) } src={ frame } alt='' />
              </div>
              :
              <div>
                <img className='profile__picture' src={ avatar } alt='' />
                <img className='profile__frame' src={ frame } onMouseOver={ this.mouseOver } onMouseOut={ this.mouseOut } alt='' />
              </div>
            }
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
